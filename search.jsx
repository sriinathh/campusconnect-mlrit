import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];

const BookHub = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    if (!query) return;
    try {
      const response = await fetch(`https://www.pdfdrive.com/search?q=${query.replace(/\s+/g, "+")}`);
      const data = await response.text();
      const bookLinks = data.match(/href=\"(.*?)\"/g)?.map(link => link.replace(/href=|\"/g, "")) || [];
      setResults(bookLinks.slice(0, 10));
    } catch (error) {
      console.error("Error fetching data", error);
      setResults([]);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Engineering Book Hub</h1>
      <div className="flex gap-2 w-full max-w-lg mb-6">
        <Input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={searchBooks}>
          Search
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg">
        {categories.map((cat) => (
          <div key={cat} className="p-4 bg-white shadow-lg rounded-lg text-center text-blue-800 font-semibold transition duration-300 transform hover:scale-105">
            {cat}
          </div>
        ))}
      </div>
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Search Results</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {results.length === 0 ? (
            <p className="text-gray-600 text-center">No results found</p>
          ) : (
            results.map((link, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <a
                  href={`https://www.pdfdrive.com${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {decodeURIComponent(link.replace(/-/g, ' '))}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookHub;
