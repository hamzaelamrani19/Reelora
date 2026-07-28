"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/lib/data";
import clsx from "clsx";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onOpenModal: (movie: Movie) => void;
  onTitleClick?: () => void;
}

export default function MovieRow({ title, movies, onOpenModal, onTitleClick }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (rowRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
           rowRef.current.scrollTo({ left: 0, behavior: "smooth" });
           setIsMoved(false);
        } else {
           const scrollTo = scrollLeft + clientWidth - 100;
           rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
           setIsMoved(true);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="py-4 md:py-6 relative z-20" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <h2 
        className="text-white font-bold md:text-xl lg:text-2xl px-4 md:px-12 mb-4 hover:text-gray-300 transition cursor-pointer"
        onClick={onTitleClick}
      >
        {title}
      </h2>

      <div className="group relative">
        <button
          className={clsx(
            "absolute top-0 bottom-0 left-0 bg-black/50 z-30 w-12 items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/70",
            !isMoved && "hidden",
            "flex"
          )}
          onClick={() => handleClick("left")}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div
          ref={rowRef}
          className="flex items-center gap-2 overflow-x-hidden scrollbar-hide px-4 md:px-12 transition-all duration-300"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative shrink-0 w-[130px] md:w-[180px] lg:w-[200px] aspect-[2/3] cursor-pointer transition duration-300 transform md:hover:scale-105 hover:z-40 group/card rounded overflow-hidden shadow-lg bg-[#141414]"
              onClick={() => onOpenModal(movie)}
            >
              <Image
                src={movie.thumbnailUrl}
                alt={movie.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 130px, (max-width: 1024px) 180px, 200px"
              />
              {/* Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
                {movie.isRecentlyAdded && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Recently added
                  </span>
                )}
                {movie.isNewSeason && !movie.isRecentlyAdded && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    New Seasons
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className={clsx(
            "absolute top-0 bottom-0 right-0 bg-black/50 z-30 w-12 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/70",
            movies.length === 0 && "hidden"
          )}
          onClick={() => handleClick("right")}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
