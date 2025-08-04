"use client";
import './globals.css';
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function CartPage() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemsData = params.get("items");
    if (itemsData) {
      setItems(JSON.parse(itemsData));
    }
  }, []);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-gray-950 min-h-screen pt-20">
      <Navbar cartItemCount={items.length} onGoToCart={() => {}} />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-8">Sepetiniz</h1>
        {items.length === 0 ? (
          <p className="text-gray-400">Sepetiniz boş</p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 items-center bg-gray-800 p-4 rounded-lg shadow">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-white text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <div className="text-purple-400 text-xl font-bold">{item.price.toFixed(2)} TL</div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-10 border-t border-gray-700 pt-6">
              <span className="text-white text-xl">Toplam:</span>
              <span className="text-green-400 text-2xl font-bold">{total.toFixed(2)} TL</span>
            </div>
            <div className="text-right">
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold">
                Ödeme Yap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}