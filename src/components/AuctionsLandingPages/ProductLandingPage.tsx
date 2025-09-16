"use client";
import React from "react";
import { Hammer, LogIn, Sun, Moon, Clock } from "lucide-react";

interface ProductLandingPageProps {
  navigateToPage: (page: string) => void;
  getThemeClasses: (darkClass: string, lightClass: string) => string;
  toggleTheme: () => void;
  theme: string;
}

const ProductLandingPage: React.FC<ProductLandingPageProps> = ({
  navigateToPage,
  getThemeClasses,
  toggleTheme,
  theme,
}) => {
  return (
    <div
      className={`min-h-screen ${getThemeClasses(
        "bg-gradient-to-br from-purple-900 via-pink-900 to-slate-900 text-white",
        "bg-gradient-to-br from-purple-100 via-pink-100 to-gray-100 text-black"
      )}`}
    >
      <nav
        className={`fixed w-full z-50 ${getThemeClasses(
          "bg-black/90 backdrop-blur-lg shadow-2xl",
          "bg-white/90 backdrop-blur-lg shadow-2xl"
        )}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigateToPage("home")}
            >
              <div
                className={`w-10 h-10 ${getThemeClasses(
                  "bg-gradient-to-r from-purple-500 to-pink-500",
                  "bg-gradient-to-r from-purple-300 to-pink-300"
                )} rounded-xl flex items-center justify-center`}
              >
                <Hammer
                  className={`w-6 h-6 ${getThemeClasses(
                    "text-white",
                    "text-black"
                  )}`}
                />
              </div>
              <span
                className={`text-xl font-bold ${getThemeClasses(
                  "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
                  "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                )}`}
              >
                AuctionHub Products
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <span
                className={`font-medium ${getThemeClasses(
                  "text-pink-400",
                  "text-pink-600"
                )}`}
              >
                Product Marketplace Only
              </span>
              <button
                onClick={() => navigateToPage("home")}
                className={`${getThemeClasses(
                  "bg-gradient-to-r from-purple-600 to-pink-600",
                  "bg-gradient-to-r from-purple-400 to-pink-400"
                )} px-4 py-2 rounded-lg hover:shadow-lg transition-all ${getThemeClasses(
                  "text-white",
                  "text-black"
                )}`}
              >
                Back to Home
              </button>
              <button
                className={`${getThemeClasses(
                  "bg-gradient-to-r from-purple-600 to-pink-600",
                  "bg-gradient-to-r from-purple-400 to-pink-400"
                )} px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-1 ${getThemeClasses(
                  "text-white",
                  "text-black"
                )}`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login/Register</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-700/50"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span
                className={`${getThemeClasses(
                  "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
                  "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                )}`}
              >
                Product Marketplace
              </span>
            </h1>
            <p
              className={`text-xl ${getThemeClasses(
                "text-gray-300",
                "text-gray-700"
              )}`}
            >
              Discover amazing products from sellers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Vintage Camera Collection",
                price: "$2,340",
                time: "1d 8h",
                image: "📷",
              },
              {
                title: "Designer Handbag",
                price: "$890",
                time: "45m",
                image: "👜",
              },
              {
                title: "Antique Pocket Watch",
                price: "$1,550",
                time: "2d 15h",
                image: "⌚",
              },
              {
                title: "Rare Comic Book Set",
                price: "$1,200",
                time: "18h",
                image: "📚",
              },
              {
                title: "Vintage Vinyl Records",
                price: "$650",
                time: "4d 12h",
                image: "💿",
              },
              {
                title: "Art Painting Original",
                price: "$3,200",
                time: "6h",
                image: "🖼️",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${getThemeClasses(
                  "bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 hover:border-pink-400/50",
                  "bg-purple-100/30 backdrop-blur-sm border border-purple-300/30 hover:border-pink-600/50"
                )} rounded-2xl p-6 transition-all`}
              >
                <div className="text-6xl mb-4 text-center">{item.image}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-2xl font-bold ${getThemeClasses(
                      "text-pink-400",
                      "text-pink-600"
                    )}`}
                  >
                    {item.price}
                  </span>
                  <div
                    className={`flex items-center space-x-1 ${getThemeClasses(
                      "text-red-400",
                      "text-red-600"
                    )}`}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{item.time}</span>
                  </div>
                </div>
                <button
                  className={`${getThemeClasses(
                    "bg-gradient-to-r from-purple-600 to-pink-600",
                    "bg-gradient-to-r from-purple-400 to-pink-400"
                  )} w-full py-3 rounded-xl font-medium hover:shadow-lg transition-all ${getThemeClasses(
                    "text-white",
                    "text-black"
                  )}`}
                >
                  Place Bid
                </button>
              </div>
            ))}
          </div>

       
          <section className="mt-16">
            <h2
              className={`text-3xl font-bold text-center mb-8 ${getThemeClasses(
                "text-white",
                "text-black"
              )}`}
            >
              Advanced Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div
                className={`${getThemeClasses(
                  "bg-purple-900/30 border border-purple-500/30",
                  "bg-purple-100/30 border border-purple-300/30"
                )} p-6 rounded-2xl`}
              >
                <h3 className="text-xl font-semibold mb-2">Category Filters</h3>
                <p
                  className={`${getThemeClasses(
                    "text-gray-300",
                    "text-gray-700"
                  )}`}
                >
                  Search by product type and condition.
                </p>
              </div>
              <div
                className={`${getThemeClasses(
                  "bg-purple-900/30 border border-purple-500/30",
                  "bg-purple-100/30 border border-purple-300/30"
                )} p-6 rounded-2xl`}
              >
                <h3 className="text-xl font-semibold mb-2">Seller Ratings</h3>
                <p
                  className={`${getThemeClasses(
                    "text-gray-300",
                    "text-gray-700"
                  )}`}
                >
                  View trusted seller profiles.
                </p>
              </div>
              <div
                className={`${getThemeClasses(
                  "bg-purple-900/30 border border-purple-500/30",
                  "bg-purple-100/30 border border-purple-300/30"
                )} p-6 rounded-2xl`}
              >
                <h3 className="text-xl font-semibold mb-2">
                  Shipping Integration
                </h3>
                <p
                  className={`${getThemeClasses(
                    "text-gray-300",
                    "text-gray-700"
                  )}`}
                >
                  Easy shipping calculations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductLandingPage;
