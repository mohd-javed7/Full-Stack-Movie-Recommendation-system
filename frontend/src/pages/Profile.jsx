import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileHybrid = ({ darkMode }) => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const handleRowClick = (item) => {
    navigate('/recommendations', { state: { movie: item } })
  };

  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/search/recent", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentSearches(res.data.recentSearches || []);
      } catch (err) {
        console.log("Error fetching searches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, [token]);

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-all duration-300 ${
        darkMode
          ? "bg-black text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* ======= HERO SECTION ======= */}
        <div
          className={`rounded-3xl overflow-hidden shadow-2xl mb-10 border transition-all duration-300 ${
            darkMode
              ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
              : "bg-gradient-to-r from-indigo-50 to-purple-50 border-gray-200"
          }`}
        >
          <div className="p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Welcome,
                <span className="block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  {username}
                </span>
              </h1>

              <p
                className={`mt-3 text-lg opacity-80 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Here’s your personalized dashboard with your latest activity.
              </p>
            </div>

            <div
              className={`w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center text-3xl font-bold border backdrop-blur-md ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-gray-300"
              }`}
            >
              {username?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
        </div>

        {/* ======= GRID: SUMMARY + RECENT SEARCHES ======= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* SUMMARY CARD */}
          <div
            className={`p-6 rounded-2xl shadow-xl border backdrop-blur-md ${
              darkMode
                ? "bg-gray-900/60 border-gray-700"
                : "bg-white/60 border-gray-200"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Quick Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="opacity-70">Total Searches</span>
                <span className="font-semibold">{recentSearches.length}</span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="opacity-70">Account Type</span>
                <span className="font-semibold">Standard</span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="opacity-70">Upcoming Features</span>
                <span className="font-semibold">AI Recs</span>
              </div>
            </div>
          </div>

          {/* MAIN RECENT SEARCHES CARD */}
          <div
            className={`md:col-span-2 p-6 rounded-2xl shadow-2xl border backdrop-blur-md transition-all ${
              darkMode
                ? "bg-gray-800/60 border-gray-700"
                : "bg-white/70 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recent Searches</h2>
              <span className="opacity-60 text-sm">
                {loading ? "Loading..." : `${recentSearches.length} items`}
              </span>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="space-y-3">
                <div className="h-4 w-2/3 rounded bg-gray-400/20 animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-gray-400/20 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-gray-400/20 animate-pulse" />
              </div>
            )}

            {/* EMPTY */}
            {!loading && recentSearches.length === 0 && (
              <p className="text-gray-400 text-sm mt-3">
                No recent searches. Try searching something!
              </p>
            )}

            {/* RECENT SEARCHES LIST */}
            {!loading && recentSearches.length > 0 && (
              <ul className="space-y-3 mt-4">
                {recentSearches.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleRowClick(item)}
                    className={`p-4 rounded-xl flex items-center justify-between shadow hover:scale-[1.02] transition-transform cursor-pointer border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div>
                      <h4 className="font-semibold text-lg">{item}</h4>
                      <p className="text-xs opacity-60">Tap to explore similar</p>
                    </div>

                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          className={`mt-10 p-4 rounded-xl border text-sm text-gray-400 ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          Pro tip: Search for any movie to start building smarter recommendations.
        </div>
      </div>
    </div>
  );
};

export default ProfileHybrid;
