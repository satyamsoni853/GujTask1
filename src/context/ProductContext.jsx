import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { api } from "../services/api";

const ProductContext = createContext();

/**
 * Custom hook to access product data and operations
 */
export const useProducts = () => useContext(ProductContext);

/**
 * Product Provider Component
 * Manages global state for products, categories, and filtering logic.
 * Handles API interactions and optimistic UI updates.
 */
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    setLoading(true);
    try {
      // FakeStoreAPI returns the new object with an ID (usually 21)
      const response = await api.addProduct(product);

      // We manually add it to our local state to simulate persistence
      // We overwrite the ID to be unique because FakeStore always returns 21 for new items
      const newProduct = {
        ...response.data,
        ...product,
        id: Date.now(),
        stock: Number(product.stock),
      };

      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message || "Failed to add product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updatedData) => {
    setLoading(true);
    try {
      // API call to PUT
      await api.updateProduct(id, updatedData);

      // Manually update local state
      setProducts((prev) =>
        prev.map((p) => (p.id === parseInt(id) ? { ...p, ...updatedData } : p))
      );
      return updatedData;
    } catch (err) {
      setError(err.message || "Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== parseInt(id)));
    } catch (err) {
      setError(err.message || "Failed to delete product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Derived state for filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        categories,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
