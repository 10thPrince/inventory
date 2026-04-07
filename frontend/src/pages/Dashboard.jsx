import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products");
      setProducts(data.products || []);
    } catch (err) {
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const adjustQuantity = async (id, direction) => {
    const amount = 1;
    const endpoint = `/products/${id}/${direction}`;
    await api.patch(endpoint, { amount });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your products and stock levels.</p>
        </div>
        <Link
          to="/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          + New Product
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Quantity</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium text-slate-800">{p.name}</td>
                <td className="px-4 py-2 text-slate-700">${p.price}</td>
                <td className="px-4 py-2 text-slate-700">{p.quantity}</td>
                <td className="px-4 py-2 space-x-2 text-sm">
                  <button
                    onClick={() => adjustQuantity(p.id, "decrease")}
                    className="px-2 py-1 border rounded text-slate-700 hover:bg-slate-100"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => adjustQuantity(p.id, "increase")}
                    className="px-2 py-1 border rounded text-slate-700 hover:bg-slate-100"
                  >
                    +1
                  </button>
                  <Link
                    to={`/products/${p.id}/edit`}
                    className="px-3 py-1 border rounded text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 border rounded text-red-700 border-red-200 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr>
                <td className="px-4 py-4 text-center text-slate-500" colSpan="4">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
