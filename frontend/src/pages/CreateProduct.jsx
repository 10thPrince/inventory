import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/products", {
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create product");
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">New Product</h1>
      <p className="text-sm text-slate-500 mb-4">Add a product to your inventory.</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-700 mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-700 mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;