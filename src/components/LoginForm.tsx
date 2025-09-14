'use client';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/lib/redux/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Submitting login with data:", formData);

    try {
      const result = await dispatch(login({
        email: formData.email,
        password: formData.password,
      }));

      console.log("Login dispatch result:", result);
      
      // Handle the response based on your Redux slice implementation
      if (result.payload) {
        // If payload contains token directly as string
        let token = result.payload;
        
        // If payload is an object with token property
        if (typeof result.payload === 'object' && result.payload.token) {
          token = result.payload.token;
        }
        
        // If payload is a string (JWT token), use it directly
        if (typeof result.payload === 'string' && result.payload.startsWith('eyJ')) {
          token = result.payload;
        }

        if (token) {
          // Store token in cookie or localStorage as needed
          document.cookie = `token=${token}; Path=/; Secure; SameSite=Strict`;
          console.log("Login successful, redirecting to dashboard");
          router.push("/dashboard");
        } else {
          throw new Error("No token received from login");
        }
      } else {
        throw new Error("Login failed - no response payload");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError((err as Error).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Login</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors  text-gray-700"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors  text-gray-700"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : "Login"}
          </button>
        </form>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <p className="text-sm text-center text-gray-600">
          Don't have an account?
          <Link 
            href="/register" 
            className="text-blue-600 hover:text-blue-500 hover:underline ml-1 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}