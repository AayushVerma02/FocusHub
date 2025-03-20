"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (search === "") {
      alert("Please enter a search query");
      return;
    }
    router.push(`/Result/${search}`);
  };
  return (
    <div>
      <div className="w-[80%] mx-auto flex justify-center items-center h-[90vh]">
        <div className="text-center">
          <h1 className="w-100% mr-9 mb-7 font-serif text-5xl">Focus Hub</h1>
          <input
            className="p-3 w-[25vw] outline-0 placeholder:text-white border border-gray-300 rounded-md"
            type="text"
            placeholder="search here.."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={handleSearch}
            className="p-3 ml-1 bg-red-700 rounded-md cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Search;
