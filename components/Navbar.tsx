"use client";

import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

export type Category = "home" | "tv" | "movie";

interface NavbarProps {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ activeCategory, onCategoryChange, searchQuery, onSearchChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      if (searchQuery) onSearchChange(""); // clear if closing
    }
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full z-50 transition-colors duration-300 flex items-center justify-between px-4 md:px-12 py-4",
        isScrolled || isSearchOpen ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center gap-8">
        <h1 
          className="text-red-600 font-black text-2xl md:text-3xl tracking-wide uppercase cursor-pointer"
          onClick={() => { onCategoryChange("home"); onSearchChange(""); }}
        >
          Reelora
        </h1>
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium">
          <li 
            className={clsx("cursor-pointer transition", activeCategory === "home" ? "text-white font-bold" : "text-gray-300 hover:text-gray-400")}
            onClick={() => onCategoryChange("home")}
          >
            Home
          </li>
          <li 
            className={clsx("cursor-pointer transition", activeCategory === "tv" ? "text-white font-bold" : "text-gray-300 hover:text-gray-400")}
            onClick={() => onCategoryChange("tv")}
          >
            TV Series
          </li>
          <li 
            className={clsx("cursor-pointer transition", activeCategory === "movie" ? "text-white font-bold" : "text-gray-300 hover:text-gray-400")}
            onClick={() => onCategoryChange("movie")}
          >
            Movies
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4 md:gap-6 text-white h-8">
        <div className="flex items-center">
          <div className={clsx(
            "flex items-center overflow-hidden transition-all duration-300 border",
            isSearchOpen ? "w-[200px] md:w-[250px] border-white bg-black/50 px-2 h-8" : "w-0 border-transparent bg-transparent h-8"
          )}>
            <Search className="w-4 h-4 text-white shrink-0 cursor-pointer" onClick={handleSearchToggle} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Titles, people, genres" 
              className={clsx(
                "bg-transparent text-white text-sm outline-none px-2 w-full transition-opacity",
                isSearchOpen ? "opacity-100" : "opacity-0"
              )}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          {!isSearchOpen && (
            <button className="hover:text-gray-300 transition" onClick={handleSearchToggle}>
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
