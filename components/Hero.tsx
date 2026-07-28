"use client";

import Image from "next/image";
import { Play, Info } from "lucide-react";
import { Movie } from "@/lib/data";

interface HeroProps {
  movie: Movie;
  onOpenModal: (movie: Movie) => void;
  onPlay?: (movie: Movie) => void;
}

export default function Hero({ movie, onOpenModal, onPlay }: HeroProps) {
  return (
    <div className="relative w-full h-[85vh] lg:h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={movie.bannerUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        {/* Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-12 w-full max-w-2xl mt-20">
        <h1 className="text-4xl md:text-7xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-4 md:mb-6 drop-shadow-lg leading-tight">
          {movie.title}
        </h1>
        <p className="text-sm md:text-lg text-white/90 font-medium mb-6 md:mb-8 line-clamp-4 md:line-clamp-none max-w-xl text-shadow-sm">
          {movie.synopsis}
        </p>

        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <button
            onClick={() => {
              if (onPlay) {
                onPlay(movie);
              } else if (movie.link) {
                window.location.href = movie.link;
              } else {
                onOpenModal(movie);
              }
            }}
            className="flex items-center justify-center gap-2 px-5 md:px-8 py-2 md:py-3 bg-white text-black font-bold rounded hover:bg-white/80 transition shadow-md shrink-0"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
            Play
          </button>
          <button
            onClick={() => onOpenModal(movie)}
            className="flex items-center justify-center gap-2 px-5 md:px-8 py-2 md:py-3 bg-gray-500/60 text-white font-bold rounded hover:bg-gray-500/80 transition shadow-md shrink-0"
          >
            <Info className="w-5 h-5 md:w-6 md:h-6" />
            More Info
          </button>
        </div>
      </div>

      {/* Maturity Rating Right Edge */}
      <div className="absolute right-0 bottom-1/4 bg-gray-900/60 border-l-4 border-gray-300 py-2 px-4 hidden md:flex items-center pr-12 text-sm font-medium z-10">
        {movie.maturity}
      </div>
    </div>
  );
}
