"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../home/app/components/Navbar";
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  selectedSize: string;
  selectedColor: string;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemsData = params.get("items");
    if (itemsData) {
      setItems(JSON.parse(itemsData));
    }
  }, []);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <Navbar cartItemCount={items.length} onGoToCart={() => {}} />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Sepetiniz</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <p className="text-gray-600 text-lg">Sepetinizde ürün bulunmamaktadır.</p>
            <p className="text-gray-400 mt-2">Alışverişe başlamak için ürünler sayfasına göz atın.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-center bg-white p-6 rounded-2xl shadow-lg">
                  <img src={item.image} alt={item.name} className="w-full sm:w-32 h-32 object-cover rounded-xl" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-gray-900 text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-gray-700">
                      <span className="font-medium">Beden: <span className="font-bold">{item.selectedSize}</span></span>
                      <span className="font-medium">Renk: <span className="font-bold">{item.selectedColor}</span></span>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" style={{ backgroundColor: item.selectedColor }}></div>
                    </div>
                  </div>
                  <div className="text-purple-600 text-2xl font-bold mt-4 sm:mt-0">{item.price.toFixed(2)} TL</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sipariş Özeti</h2>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600 text-lg">Ara Toplam:</span>
                <span className="text-gray-900 text-xl font-semibold">{total.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-gray-600 text-xl">Toplam:</span>
                <span className="text-green-600 text-3xl font-extrabold">{total.toFixed(2)} TL</span>
              </div>
              <button className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold transition-colors">
                Ödemeye Geç
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}