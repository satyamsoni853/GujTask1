import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Edit, Trash2, Plus } from "lucide-react";
import ProductModal from "../components/ProductModal";

const ProductList = () => {
  const {
    filteredProducts: products,
    loading,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    if (currentProduct) {
      await updateProduct(currentProduct.id, productData);
    } else {
      await addProduct(productData);
    }
    // Optimistic update handled in context, just close modal
    setIsModalOpen(false);
  };

  if (loading && products.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h2>Products</h2>
          <p className="page-subtitle">Manage your product inventory</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            {products.length} {products.length === 1 ? "result" : "results"}
          </div>
          <button onClick={handleAddProduct} className="btn btn-primary">
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "3rem",
              color: "var(--text-secondary)",
            }}
          >
            No products found matching your search.
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-image-container">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-image"
                  />
                ) : (
                  <div style={{ color: "var(--text-secondary)" }}>No Image</div>
                )}
              </div>
              <div className="card-content">
                <div className="card-category">{product.category}</div>
                <h3 className="card-title" title={product.name}>
                  {product.name}
                </h3>
                <div className="card-footer">
                  <div className="card-price">
                    ${Number(product.price).toFixed(2)}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="btn-icon"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="btn-icon btn-danger"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
                  <span
                    className={`badge ${
                      product.stock > 10 ? "badge-stock" : "badge-low"
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={currentProduct}
        onSave={handleSaveProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductList;
