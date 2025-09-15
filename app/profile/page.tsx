"use client";
import React, { useState } from "react";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔑 Dummy authentication (replace with API call)
    if (formData.username && formData.password) {
      setUser({ username: formData.username });
      setIsLoggedIn(true);
    } else {
      alert("Please enter username and password!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setFormData({ username: "", password: "" });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {!isLoggedIn ? (
        <>
          <h1 className="text-xl font-bold mb-4">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <p className="mb-2">
            Welcome, <span className="font-semibold">{user?.username}</span>!
          </p>
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Page;
