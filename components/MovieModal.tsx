"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { X, Play, Plus, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Movie, gemsForYou } from "@/lib/data";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  allContent?: Movie[];
  onSelectMovie?: (movie: Movie) => void;
}

export default function MovieModal({ movie, onClose, allContent = [], onSelectMovie }: MovieModalProps) {
  useEffect(() => {
    if (movie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [movie]);

  const moreLikeThis = useMemo(() => {
    if (!movie) return [];
    const candidates = (allContent.length > 0 ? allContent : gemsForYou)
      .filter(m => m.id !== movie.id && m.type === movie.type && !m.title.startsWith("Movie Title"));
    
    // Shuffle the candidates array
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    
    return candidates.slice(0, 6);
  }, [movie, allContent]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-black/70 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-[#181818] text-white rounded-lg shadow-2xl my-8 md:my-10 h-max overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#181818] rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition group"
          >
            <X className="w-6 h-6 text-white group-hover:scale-110 transition shrink-0" />
          </button>

          {/* Banner */}
          <div className="relative w-full h-[400px]">
            <Image
              src={movie.bannerUrl}
              alt={movie.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/60 to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 md:left-12">
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">{movie.title}</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    if (movie.link) {
                      window.location.href = movie.link;
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-6 md:px-8 py-2 bg-white text-black font-bold rounded shadow hover:bg-white/80 transition text-base"
                >
                  <Play className="w-5 h-5 fill-black" />
                  Play
                </button>
                <button className="w-9 h-9 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="w-9 h-9 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition">
                  <ThumbsUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="px-6 md:px-12 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column (Meta + Synopsis) */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                  <span className="text-green-500 font-bold">{movie.match}% match</span>
                  <span className="text-gray-300">{movie.year}</span>
                  {movie.seasons && (
                    <span className="text-gray-300">{movie.seasons}</span>
                  )}
                  {movie.duration && (
                    <span className="text-gray-300">{movie.duration}</span>
                  )}
                  <span className="border border-gray-600 px-1 py-0.5 rounded text-[10px] text-gray-300 uppercase shrink-0">
                    HD
                  </span>
                  <span className="border border-gray-600 px-1 py-0.5 rounded text-[10px] text-gray-300 shrink-0">
                    {movie.maturity}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-100">{movie.synopsis}</p>
              </div>

              {/* Right Column (Cast, Genres etc.) */}
              <div className="text-sm flex flex-col gap-3">
                <div>
                  <span className="text-gray-400">Cast: </span>
                  <span className="text-gray-200">{movie.cast}</span>
                </div>
                <div>
                  <span className="text-gray-400">Genres: </span>
                  <span className="text-gray-200">{movie.genres}</span>
                </div>
                <div>
                  <span className="text-gray-400">This show is: </span>
                  <span className="text-gray-200">{movie.thisIs}</span>
                </div>
              </div>
            </div>


            {/* More Like This */}
            <div className="mt-12 mb-8">
              <h3 className="text-2xl font-bold mb-6">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {moreLikeThis.map((item) => (
                   <div 
                     key={item.id} 
                     className="bg-[#2f2f2f] rounded overflow-hidden group cursor-pointer relative shadow-lg"
                     onClick={() => onSelectMovie && onSelectMovie(item)}
                   >
                      <div className="relative h-32 w-full">
                         <Image src={item.bannerUrl} alt={item.title} fill className="object-cover" referrerPolicy="no-referrer" />
                         <div className="absolute top-2 right-2 flex gap-1">
                           {item.seasons && <span className="bg-black/50 text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">{item.seasons}</span>}
                         </div>
                      </div>
                      <div className="p-4">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-green-500 font-bold text-xs">{item.match}% match</span>
                            <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center group-hover:border-white transition">
                               <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition" />
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                           <span className="border border-gray-600 px-1 py-0.5 rounded text-[9px] text-gray-300 truncate">
                              {item.maturity}
                           </span>
                           <span>{item.year}</span>
                         </div>
                         <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mt-2">{item.synopsis}</p>
                      </div>
                   </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
