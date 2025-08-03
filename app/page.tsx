"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { NextPage } from "next";
import { useState, useEffect } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
};

const CartContent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const itemsParam = searchParams.get('items');
    if (itemsParam) {
      setCartItems(JSON.parse(decodeURIComponent(itemsParam)));
    }
  }, [searchParams]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Sepetim
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Sepetinizde ürün bulunmamaktadır.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="text-lg text-gray-700">{item.name}</span>
                <span className="font-semibold text-gray-900">{item.price.toFixed(2)} TL</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Toplam:</span>
            <span className="text-xl font-bold text-blue-600">{total.toFixed(2)} TL</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Cart: NextPage = () => {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <CartContent />
    </Suspense>
  );
};

export default Cart;