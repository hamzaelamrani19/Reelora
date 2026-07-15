export type Movie = {
  id: string;
  title: string;
  thumbnailUrl: string;
  bannerUrl: string;
  match: number;
  year: string;
  maturity: string;
  seasons?: string;
  duration?: string;
  synopsis: string;
  cast: string;
  genres: string;
  thisIs: string;
  isRecentlyAdded?: boolean;
  isNewSeason?: boolean;
  isTop10?: boolean;
  popularity?: number;
  link?: string;
  type: "movie" | "tv";
};

const defaultSynopsis = "After years of imprisonment, Morpheus — the King of Dreams — embarks on a journey across worlds to find what was stolen from him and restore his power.";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const generateMockMovies = (count: number, seedBase: string, type: "movie" | "tv"): Movie[] => {
  return Array.from({ length: count }).map((_, i) => {
    let seedStr = seedBase + i;
    let seed = 0;
    for (let j = 0; j < seedStr.length; j++) {
      seed = seedStr.charCodeAt(j) + ((seed << 5) - seed);
    }
    
    return {
      id: `${seedBase}-${i}`,
      title: `Movie Title ${i + 1}`,
      thumbnailUrl: `https://picsum.photos/seed/${seedBase}${i}thumb/400/600`,
      bannerUrl: `https://picsum.photos/seed/${seedBase}${i}banner/1200/800`,
      match: Math.floor(pseudoRandom(seed++) * 40) + 60,
      year: "2024",
      maturity: "U/A 16+",
      seasons: type === "tv" ? `${Math.floor(pseudoRandom(seed++) * 3) + 1} Seasons` : undefined,
      duration: type === "movie" ? `${Math.floor(pseudoRandom(seed++) * 60) + 60}m` : undefined,
      synopsis: defaultSynopsis,
      cast: "Tom Sturridge, Boyd Holbrook, Patton Oswalt, Vivienne Acheampong",
      genres: type === "tv" ? "TV Dramas, US TV Shows" : "Movies, Action, Drama",
      thisIs: "Dark, Imaginative",
      isRecentlyAdded: pseudoRandom(seed++) > 0.7,
      isNewSeason: type === "tv" && pseudoRandom(seed++) > 0.8,
      type
    };
  });
};

export const heroMovie: Movie = {
  id: "hero-1",
  title: "BHOOTH BANGLA",
  thumbnailUrl: "https://picsum.photos/seed/hero/400/600",
  bannerUrl: "https://picsum.photos/seed/hero/1600/900",
  match: 98,
  year: "2024",
  maturity: "U/A 16+",
  duration: "2h 15m",
  synopsis: "When Arjun's sister's wedding is threatened by a demon, he must uncover the truth behind the curse that has plagued their village for generations.",
  cast: "Akshay Kumar, Paresh Rawal, Rajpal Yadav",
  genres: "Horror, Comedy, Bollywood Movies",
  thisIs: "Goofy, Scary",
  type: "movie",
};

export const sciFiMovies = generateMockMovies(12, "scifi", "tv");
export const rousingShows = generateMockMovies(12, "rousing", "tv");
export const continueWatching = [
  ...generateMockMovies(2, "cont_tv", "tv"),
  ...generateMockMovies(3, "cont_mv", "movie")
];
export const emmyDramas = generateMockMovies(10, "emmy", "tv");
export const kDramas = generateMockMovies(10, "kdrama", "tv");

export const top10Series = generateMockMovies(10, "top10series", "tv").map(m => ({ ...m, isTop10: true }));
export const top10MoviesList = generateMockMovies(10, "top10movies", "movie").map(m => ({ ...m, isTop10: true }));
export const gemsForYou = [
  ...generateMockMovies(5, "gems_tv", "tv"),
  ...generateMockMovies(5, "gems_mv", "movie")
];

export const episodes = [
  { id: 1, title: "Season of Mists", duration: "46m", desc: "When a gathering of the Endless exposes deep-seated grievances, Morpheus embarks on a mission to Hell to free the soul of a condemned mortal.", image: "https://picsum.photos/seed/ep1/300/169" },
  { id: 2, title: "The Ruler of Hell", duration: "51m", desc: "Bequeathed the key to Hell, Morpheus throws a lavish banquet to determine which god, demon or faerie can be entrusted with its dark power.", image: "https://picsum.photos/seed/ep2/300/169" },
  { id: 3, title: "More Devils Than Vast Hell Can Hold", duration: "51m", desc: "All the world's a stage as Morpheus summons history's greatest dramatist to perform an enchanting play for a supernatural audience.", image: "https://picsum.photos/seed/ep3/300/169" },
  { id: 4, title: "Brief Lives", duration: "45m", desc: "Morpheus grudgingly helps Delirium search for their vanished sibling in the waking world — where a deadly force lurks in the shadows.", image: "https://picsum.photos/seed/ep4/300/169" },
  { id: 5, title: "The Song of Orpheus", duration: "55m", desc: "To honor a promise to a sibling, Morpheus must shatter a vow to another. In ancient Greece, a wedding-night tragedy turns a son against his father.", image: "https://picsum.photos/seed/ep5/300/169" }
];
