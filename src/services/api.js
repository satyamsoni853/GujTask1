import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getProducts: async () => {
    const response = await apiInstance.get("/products");
    // FakeStoreAPI products don't have a 'stock' field, so we'll simulate it randomly
    // Also map 'title' to 'name'
    const dataWithStock = response.data.map((p) => ({
      ...p,
      name: p.title,
      stock: Math.floor(Math.random() * 50) + 1,
    }));
    return { data: dataWithStock };
  },

  getProduct: async (id) => {
    const response = await apiInstance.get(`/products/${id}`);
    const data = { ...response.data, name: response.data.title };
    return { data };
  },

  addProduct: async (product) => {
    // FakeStoreAPI returns the object with a new ID
    const response = await apiInstance.post("/products", product);
    return { data: response.data };
  },

  updateProduct: async (id, updatedProduct) => {
    const response = await apiInstance.put(`/products/${id}`, updatedProduct);
    return { data: response.data };
  },

  deleteProduct: async (id) => {
    const response = await apiInstance.delete(`/products/${id}`);
    return { data: response.data };
  },

  getCategories: async () => {
    const response = await apiInstance.get("/products/categories");
    return { data: response.data };
  },
};
