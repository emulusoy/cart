"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Link from 'next/link';
interface HeaderProps {
  cartItemCount: number;
  onGoToCart: () => void;
}

const Navbar: React.FC<HeaderProps> = ({ cartItemCount, onGoToCart }) => {
  const [hover, setHover] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50 text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6 text-lg font-semibold">
          <Link href="/">Anasayfa</Link>
          <span className="text-gray-400">About</span>
          <span className="text-gray-400">Services</span>
          <span className="text-gray-400">Contact</span>
        </div>

        <div className="flex items-center gap-6">
          <FaUser className="cursor-pointer text-xl hover:text-purple-400" title="Üye Ol" />

          <div
            className="relative cursor-pointer"
            onClick={onGoToCart}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <FaShoppingCart className="text-2xl hover:text-purple-500 transition" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
            {hover && (
              <div className="absolute top-10 right-0 bg-gray-700 px-3 py-2 rounded shadow text-sm">
                Sepete Git
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;