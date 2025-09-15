"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");

    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUser({ username: savedUsername });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const debugToken = async () => {
    const token = localStorage.getItem("token");

    let debugOutput = `=== TOKEN DEBUG INFO ===\n`;
    debugOutput += `Token exists: ${!!token}\n`;
    debugOutput += `Token length: ${token?.length || 0}\n`;
    debugOutput += `Token preview: ${
      token ? token.substring(0, 10) + "..." : "null"
    }\n`;
    debugOutput += `Full token: ${token}\n\n`;

    if (token) {
      try {
        debugOutput += `Testing API call with token...\n`;
        const response = await fetch("https://pavetheway-backend.onrender.com/api/resume/", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        debugOutput += `Response Status: ${response.status}\n`;
        debugOutput += `Response OK: ${response.ok}\n`;

        const responseText = await response.text();
        debugOutput += `Response Body: ${responseText}\n`;

        // Try to parse as JSON
        try {
          const jsonData = JSON.parse(responseText);
          debugOutput += `Parsed JSON: ${JSON.stringify(jsonData, null, 2)}\n`;
        } catch (e) {
          debugOutput += `Failed to parse JSON: ${e}\n`;
        }
      } catch (error) {
        debugOutput += `Network Error: ${error}\n`;
      }
    }

    setDebugInfo(debugOutput);
    console.log(debugOutput);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Please enter both username and password!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", { username: formData.username });

      const response = await fetch("https://pavetheway-backend.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      console.log("Login response status:", response.status);

      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok && data.token) {
        console.log("Token received:", data.token);

        // Store token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", formData.username);

        // Update state
        setUser({ username: formData.username });
        setIsLoggedIn(true);

        // Clear form
        setFormData({ username: "", password: "" });

        console.log("Login successful, token stored");

        // Automatically test the token after login
        setTimeout(debugToken, 500);
      } else {
        // Handle login errors
        setError(
          data.non_field_errors?.[0] ||
            data.detail ||
            "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear stored data
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Reset state
    setIsLoggedIn(false);
    setUser(null);
    setFormData({ username: "", password: "" });
    setError("");
    setDebugInfo("");

    console.log("User logged out successfully");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {!isLoggedIn ? (
        <>
          <h1 className="text-xl font-bold mb-4">Login</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Successfully logged in!
          </div>

          <div className="space-y-2 mb-4">
            <p className="mb-2">
              Welcome, <span className="font-semibold">{user?.username}</span>!
            </p>
            <p>
              Status:{" "}
              <span className="text-green-600 font-semibold">
                Authenticated
              </span>
            </p>
            <p>
              Token:{" "}
              <span className="text-xs text-gray-500 break-all">
                ***{localStorage.getItem("token")?.slice(-8)}
              </span>
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={debugToken}
              className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Debug Token
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          {debugInfo && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto whitespace-pre-wrap border">
                {debugInfo}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
