"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar, { Category } from "@/components/Navbar";
import Hero from "@/components/Hero";
import NoticeBanner from "@/components/NoticeBanner";
import MovieRow from "@/components/MovieRow";
import MovieModal from "@/components/MovieModal";
import Image from "next/image";
import {
  Movie,
  heroMovie,
  sciFiMovies,
  rousingShows,
  continueWatching,
  emmyDramas,
  top10Series,
  gemsForYou,
  kDramas,
  top10MoviesList,
} from "@/lib/data";
import { contentLinks } from "@/lib/contentLinks";

const netflixAndTvSeriesData: Movie[] = [
  {
    id: "ns-1",
    title: "I Will Find You (2026)",
    thumbnailUrl: "https://picsum.photos/seed/IWillFindYou/500/750",
    bannerUrl: "https://picsum.photos/seed/IWillFindYouBanner/1200/800",
    match: 99,
    year: "2026",
    maturity: "18+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "When a seemingly perfect family is torn apart by a sudden disappearance, a desperate father must navigate a labyrinth of dark secrets, deceit, and unexpected alliances to bring his loved ones home. Every clue leads deeper into a dangerous conspiracy.",
    cast: "To be announced",
    genres: "TV Thrillers, Drama",
    thisIs: "Suspenseful, Gripping",
    type: "tv"
  },
  {
    id: "ns-2",
    title: "Teach You a Lesson (2026)",
    thumbnailUrl: "https://picsum.photos/seed/TeachYouALesson/500/750",
    bannerUrl: "https://picsum.photos/seed/TeachYouALessonBanner/1200/800",
    match: 98,
    year: "2026",
    maturity: "16+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "In a highly competitive elite academy, a brilliant but rebellious new teacher arrives with unconventional methods. As students start achieving extraordinary results, dark rumors surface about the true price of perfection and the teacher's hidden agenda.",
    cast: "To be announced",
    genres: "Teen TV Shows, Drama",
    thisIs: "Dark, Psychological",
    type: "tv"
  },
  {
    id: "ns-3",
    title: "The WONDERfools (2026)",
    thumbnailUrl: "https://picsum.photos/seed/TheWONDERfools/500/750",
    bannerUrl: "https://picsum.photos/seed/TheWONDERfoolsBanner/1200/800",
    match: 97,
    year: "2026",
    maturity: "13+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "Set in a whimsical retro town, a group of uniquely flawed heroes team up to solve bizarre mysteries. Armed with peculiar superpowers that often misfire, they must face down a supernatural threat that endangers their peaceful existence.",
    cast: "Park Eun-bin, Cha Eun-woo, Kim Hae-sook",
    genres: "K-Dramas, Action & Adventure, Comedy",
    thisIs: "Quirky, Exciting",
    type: "tv"
  },
  {
    id: "ns-4",
    title: "Glory (2026)",
    thumbnailUrl: "https://picsum.photos/seed/Glory2026/500/750",
    bannerUrl: "https://picsum.photos/seed/Glory2026Banner/1200/800",
    match: 99,
    year: "2026",
    maturity: "18+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "A powerful saga of revenge, redemption, and unbreakable will. Years after a devastating betrayal, a determined survivor meticulously executes a masterful plan to dismantle the lives of the absolute worst villains from her past.",
    cast: "To be announced",
    genres: "TV Dramas, Thriller",
    thisIs: "Intense, Emotional",
    type: "tv"
  },
  {
    id: "ns-5",
    title: "Berlin and the Lady with an Ermine (2026)",
    thumbnailUrl: "https://picsum.photos/seed/BerlinLadyErmine/500/750",
    bannerUrl: "https://picsum.photos/seed/BerlinLadyErmineBanner/1200/800",
    match: 96,
    year: "2026",
    maturity: "16+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "In this thrilling heist narrative, Berlin targets one of the most famous and fiercely guarded Renaissance portraits in the world. With high-stakes romance, intricate double-crosses, and a flawless plan, it’s a robbery that will go down in history.",
    cast: "Pedro Alonso",
    genres: "Crime TV Shows, Thriller",
    thisIs: "Slick, Suspenseful",
    type: "tv"
  },
  {
    id: "ns-6",
    title: "BAKI-DOU: The Invincible Samurai (2026)",
    thumbnailUrl: "https://picsum.photos/seed/BakiDou/500/750",
    bannerUrl: "https://picsum.photos/seed/BakiDouBanner/1200/800",
    match: 98,
    year: "2026",
    maturity: "18+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "The world's most terrifying martial artists face their greatest challenge yet when a legendary samurai from Japan's past is cloned and brought back to life. Baki and his allies must push beyond their limits to survive against a perfect warrior who knows no equal.",
    cast: "Nobunaga Shimazaki, Akio Otsuka",
    genres: "Anime Series, Action",
    thisIs: "Violent, Adrenaline Rush",
    type: "tv"
  },
  {
    id: "ns-7",
    title: "My Royal Nemesis (2026)",
    thumbnailUrl: "https://picsum.photos/seed/MyRoyalNemesis/500/750",
    bannerUrl: "https://picsum.photos/seed/MyRoyalNemesisBanner/1200/800",
    match: 97,
    year: "2026",
    maturity: "13+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "An ambitious commoner unexpectedly inherits a position in the royal court, only to cross swords with the kingdom's most arrogant and captivating prince. As their fierce rivalry turns into an undeniable romance, they must uncover a treasonous plot threatening the crown.",
    cast: "To be announced",
    genres: "Romantic TV Dramas, Period Pieces",
    thisIs: "Swoonworthy, Witty",
    type: "tv"
  },
  {
    id: "ns-8",
    title: "Reacher (2022)",
    thumbnailUrl: "https://picsum.photos/seed/Reacher/500/750",
    bannerUrl: "https://picsum.photos/seed/ReacherBanner/1200/800",
    match: 99,
    year: "2022",
    maturity: "18+",
    seasons: "2 Seasons",
    duration: undefined,
    synopsis: "Jack Reacher, a veteran military police investigator, has just recently entered civilian life. He is a drifter, carrying no phone and the barest of essentials as he travels the country and explores the nation he once served.",
    cast: "Alan Ritchson, Maria Sten",
    genres: "TV Action & Adventure, TV Thrillers",
    thisIs: "Action-packed, Suspenseful",
    type: "tv"
  },
  {
    id: "ns-9",
    title: "Breaking Bad (2008)",
    thumbnailUrl: "https://picsum.photos/seed/BreakingBad/500/750",
    bannerUrl: "https://picsum.photos/seed/BreakingBadBanner/1200/800",
    match: 99,
    year: "2008",
    maturity: "18+",
    seasons: "5 Seasons",
    duration: undefined,
    synopsis: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    cast: "Bryan Cranston, Aaron Paul",
    genres: "Crime TV Shows, TV Dramas",
    thisIs: "Gritty, Intense",
    type: "tv"
  },
  {
    id: "ns-10",
    title: "The Gentlemen (2024)",
    thumbnailUrl: "https://picsum.photos/seed/TheGentlemen/500/750",
    bannerUrl: "https://picsum.photos/seed/TheGentlemenBanner/1200/800",
    match: 96,
    year: "2024",
    maturity: "18+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "When aristocratic Eddie inherits the family estate, he discovers that it's home to an enormous weed empire, and its proprietors aren't going anywhere.",
    cast: "Theo James, Kaya Scodelario",
    genres: "Crime TV Shows, TV Comedies",
    thisIs: "Witty, Action Comedy",
    type: "tv"
  },
  {
    id: "ns-11",
    title: "Squid Game (2021)",
    thumbnailUrl: "https://picsum.photos/seed/SquidGame/500/750",
    bannerUrl: "https://picsum.photos/seed/SquidGameBanner/1200/800",
    match: 98,
    year: "2021",
    maturity: "18+",
    seasons: "1 Season",
    duration: undefined,
    synopsis: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.",
    cast: "Lee Jung-jae, Park Hae-soo",
    genres: "TV Dramas, TV Thrillers",
    thisIs: "Suspenseful, Psychological",
    type: "tv"
  }
];

function MainContent() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<Movie[]>([]);
  const [dynamicCategoryShows, setDynamicCategoryShows] = useState<Movie[]>([]);
  const [isFetchingCategory, setIsFetchingCategory] = useState(false);
  const [dynamicHero, setDynamicHero] = useState<Movie>(heroMovie);
  const [fetchedSeries, setFetchedSeries] = useState<Movie[]>([]);
  const [fetchedTvMovies, setFetchedTvMovies] = useState<Movie[]>([]);
  const [fetchedAnime, setFetchedAnime] = useState<Movie[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearch = searchParams.get('search');

  const allContent = [
    dynamicHero, 
    ...sciFiMovies, 
    ...rousingShows, 
    ...continueWatching, 
    ...emmyDramas, 
    ...top10Series, 
    ...gemsForYou, 
    ...kDramas, 
    ...top10MoviesList,
    ...fetchedSeries,
    ...fetchedTvMovies,
    ...fetchedAnime,
    ...netflixAndTvSeriesData,
  ];
  const uniqueContent = Array.from(new Map(allContent.map(m => [m.id, m])).values());

  const trendingContent = [...uniqueContent]
    .filter(m => m && m.title && !m.title.startsWith("Movie Title"))
    .sort((a, b) => {
      const popA = a.popularity || 0;
      const popB = b.popularity || 0;
      return popB - popA;
    })
    .map(m => ({ ...m, isRecentlyAdded: true }));

  useEffect(() => {
    const TMDB_API_KEY = "36d5bd68af176dcddf45c89ce6e5160e";
    const specificShows = [
      "I Will Find You",
      "Teach You a Lesson",
      "The WONDERfools",
      "Glory",
      "Berlin and the Lady with an Ermine",
      "BAKI-DOU: The Invincible Samurai",
      "My Royal Nemesis",
      "Reacher",
      "Breaking Bad",
      "The Gentlemen",
      "Squid Game",
      "FROM",
      "The Witness",
      "Summer '36",
      "Elle",
      "A Knight of the Seven Kingdoms",
      "Avatar: The Last Airbender",
      "Bloodhounds",
      "Constable Kanakam",
      "Nemesis",
      "Peacemaker",
      "Secret Stories Roslin",
      "Spider-Noir",
      "Star Wars: Andor",
      "Blood Sisters",
      "The Dinosaurs",
      "The Boys"
    ];

    const fetchSpecific = async () => {
      try {
        const fetched = await Promise.all(specificShows.map(async (title, index) => {
           const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US`);
           const data = await res.json();
           const result = data.results?.[0]; // take the first result
           if (result) {
              const year = (result.first_air_date || "2026").split("-")[0];
              return {
                id: `tmdb-specific-${result.id}-${index}`,
                title: result.name || title,
                thumbnailUrl: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : (netflixAndTvSeriesData[index]?.thumbnailUrl || `https://picsum.photos/seed/series${index}/500/750`),
                bannerUrl: result.backdrop_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : (netflixAndTvSeriesData[index]?.bannerUrl || `https://picsum.photos/seed/seriesbanner${index}/1200/800`),
                match: 99,
                year: year,
                maturity: "16+",
                duration: undefined,
                seasons: "1 Season",
                synopsis: result.overview || (netflixAndTvSeriesData[index]?.synopsis || "An exciting TV series."),
                cast: "View on TMDB",
                genres: "TV Series",
                thisIs: "Trending",
                popularity: result.popularity || 0,
                type: "tv",
                link: contentLinks[title]
              } as Movie;
           } else {
              // fallback if TMDB doesn't find it exactly
              if (netflixAndTvSeriesData[index]) {
                const item = netflixAndTvSeriesData[index];
                if (!item.link && contentLinks[title]) {
                   return { ...item, link: contentLinks[title] };
                }
                return item;
              }
              return {
                id: `tmdb-specific-fallback-${index}`,
                title: title,
                thumbnailUrl: `https://picsum.photos/seed/series${index}/500/750`,
                bannerUrl: `https://picsum.photos/seed/seriesbanner${index}/1200/800`,
                match: 99,
                year: "2026",
                maturity: "16+",
                duration: undefined,
                seasons: "1 Season",
                synopsis: "An exciting TV series.",
                cast: "Unknown",
                genres: "TV Series",
                thisIs: "Trending",
                popularity: 0,
                type: "tv",
                link: contentLinks[title]
              } as Movie;
           }
        }));
        setFetchedSeries(fetched as Movie[]);
      } catch (e) {
        console.error(e);
        setFetchedSeries(netflixAndTvSeriesData);
      }
    };
    fetchSpecific();
  }, []);

  useEffect(() => {
    const TMDB_API_KEY = "36d5bd68af176dcddf45c89ce6e5160e";
    const specificTvMovies = [
      "Karate Kid Legends",
      "Spider-Man: Homecoming",
      "The Batman",
      "Bullet Train",
      "Dune",
      "Jurassic World: Fallen Kingdom",
      "Spider-Man 2",
      "The Equalizer 3",
      "Fear Street Part One: 1994",
      "The Gray Man",
      "Rampage",
      "The Meg",
      "Gladiator II",
      "Spider-Man: Far From Home",
      "War Machine",
      "Godzilla x Kong: The New Empire",
      "The Lord of the Rings: The Two Towers",
      "Devil's Advocate",
      "The Nun II",
      "Purple Hearts",
      "Mortal Kombat",
      "Meg 2: The Trench",
      "Extraction",
      "Extraction 2",
      "Furiosa: A Mad Max Saga",
      "No Country for Old Men",
      "In the Hand of Dante",
      "The Creator",
      "War Dogs",
      "Kartavya",
      "29",
      "Kara",
      "Husbands in Action",
      "Voicemails for Isabelle",
      "Dhurandhar: The Revenge (Raw & Undekha)",
      "Bhooth Bangla",
      "Driver's Ed",
      "Little Brother",
      "The Yeti",
      "The Sheep Detectives",
      "Shelter",
      "Whistle",
      "Over Your Dead Body",
      "Apocalypse Z: The Beginning of the End",
      "Michael",
      "My Dearest Assassin",
      "The Highest Stakes",
      "Avatar: Fire and Ash",
      "Blades of the Guardians",
      "Cold Storage",
      "Crime 101",
      "Hellfire",
      "Humint",
      "Infinite",
      "Is God Is",
      "28 Years Later",
      "Mike & Nick & Nick & Alice",
      "Mortal Kombat 2",
      "Peaky Blinders: The Immortal Man",
      "Project Hail Mary",
      "Scary Movie",
      "Scream 7",
      "The Bluff",
      "The Devil Wears Prada 2",
      "The Drama",
      "The 98th Annual Academy Awards",
      "The Furious",
      "Enola Holmes 3",
      "Wake Up Dead Man: A Knives Out Mystery",
      "Trap House",
      "The Housemaid",
      "The Wrecking Crew",
      "The Rip",
      "The Magic Faraway Tree",
      "Sisu: Road to Revenge",
      "Predator: Badlands",
      "Now You See Me: Now You Don’t",
      "Mercy",
      "Lee Cronin’s The Mummy",
      "In the Grey",
      "Greenland 2: Migration",
      "Five Nights at Freddy’s 2",
      "Chainsaw Man The Movie: Reze Arc",
      "Anaconda",
      "A Great Awakening"
    ];

    const fetchSpecificMovies = async () => {
      try {
        const fetched = await Promise.all(specificTvMovies.map(async (title, index) => {
           const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US`);
           const data = await res.json();
           const result = data.results?.[0]; // take the first result
           if (result) {
              const year = (result.release_date || "2024").split("-")[0];
              return {
                id: `tmdb-movie-specific-${result.id}-${index}`,
                title: result.title || title,
                thumbnailUrl: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : `https://picsum.photos/seed/movie${index}/500/750`,
                bannerUrl: result.backdrop_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : `https://picsum.photos/seed/moviebanner${index}/1200/800`,
                match: 99,
                year: year,
                maturity: "16+",
                duration: "2h",
                synopsis: result.overview || "An exciting adventure.",
                cast: "View on TMDB",
                genres: "Movies",
                thisIs: "Trending",
                popularity: result.popularity || 0,
                type: "movie",
                link: contentLinks[title]
              } as Movie;
           } else {
              return {
                id: `tmdb-movie-specific-fallback-${index}`,
                title: title,
                thumbnailUrl: `https://picsum.photos/seed/movie${index}/500/750`,
                bannerUrl: `https://picsum.photos/seed/moviebanner${index}/1200/800`,
                match: 99,
                year: "2024",
                maturity: "16+",
                duration: "2h",
                synopsis: "An exciting adventure.",
                cast: "Unknown",
                genres: "Movies",
                thisIs: "Trending",
                popularity: 0,
                type: "movie",
                link: contentLinks[title]
              } as Movie;
           }
        }));
        setFetchedTvMovies(fetched as Movie[]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSpecificMovies();
  }, []);

  useEffect(() => {
    const TMDB_API_KEY = "36d5bd68af176dcddf45c89ce6e5160e";
    const specificAnime = [
      "GOAT",
      "The Super Mario Bros. Movie", // Fallback for The Super Mario Galaxy Movie if not found, let's keep original names first but TMDB uses search anyway.
      "The Super Mario Galaxy Movie", 
      "Hoppers",
      "Chainsaw Man",
      "Ne Zha 2",
      "Aztec Batman",
      "King of Kings",
      "Fixed",
      "Smurfs",
      "Lilo & Stitch"
    ];

    const fetchAnime = async () => {
      try {
        const fetched = await Promise.all(specificAnime.map(async (title, index) => {
           // use multi search to get TV or Movie
           const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US`);
           const data = await res.json();
           const result = data.results?.[0]; // take the first result
           if (result) {
              const isTV = result.media_type === "tv" || (!result.media_type && result.first_air_date);
              const year = (result.release_date || result.first_air_date || "2025").split("-")[0];
              return {
                id: `tmdb-anime-specific-${result.id}-${index}`,
                title: result.title || result.name || title,
                thumbnailUrl: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : `https://picsum.photos/seed/anime${index}/500/750`,
                bannerUrl: result.backdrop_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : `https://picsum.photos/seed/animebanner${index}/1200/800`,
                match: 99,
                year: year,
                maturity: "13+",
                duration: isTV ? undefined : "2h",
                seasons: isTV ? "1 Season" : undefined,
                synopsis: result.overview || "An exciting adventure.",
                cast: "View on TMDB",
                genres: "Animation & Anime",
                thisIs: "Trending",
                popularity: result.popularity || 0,
                type: isTV ? "tv" : "movie",
                link: contentLinks[title]
              } as Movie;
           } else {
              return {
                id: `tmdb-anime-specific-fallback-${index}`,
                title: title,
                thumbnailUrl: `https://picsum.photos/seed/anime${index}/500/750`,
                bannerUrl: `https://picsum.photos/seed/animebanner${index}/1200/800`,
                match: 99,
                year: "2025",
                maturity: "13+",
                duration: "2h",
                synopsis: "An exciting adventure.",
                cast: "Unknown",
                genres: "Animation & Anime",
                thisIs: "Trending",
                popularity: 0,
                type: "movie",
                link: contentLinks[title]
              } as Movie;
           }
        }));
        // Remove duplicate super mario if both are fetched or keep the original requested list
        // Actually, user explicitly asked for "The Super Mario Galaxy Movie (2026)" so let's just use it directly.
        setFetchedAnime(fetched.filter(f => f.title !== "The Super Mario Bros. Movie") as Movie[]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAnime();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("netmirror_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    } else {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    const allFetched = [
      ...fetchedSeries,
      ...fetchedTvMovies,
      ...fetchedAnime,
      ...sciFiMovies,
      ...top10Series,
      ...top10MoviesList,
      ...netflixAndTvSeriesData
    ];

    const uniqueFetched = Array.from(new Map(allFetched.map(m => [m.id, m])).values());
    const available = uniqueFetched.filter(m => {
      if (!m || !m.title || m.title.startsWith("Movie Title")) return false;
      if (activeCategory === "home") return true;
      return m.type === activeCategory;
    });

    if (available.length === 0) return;

    // Filter to latest to show in the Trending & Box Office section
    const latestAvailable = available.sort((a, b) => {
       const yearA = parseInt(a.year) || 0;
       const yearB = parseInt(b.year) || 0;
       if (yearA === yearB) return Math.random() - 0.5; // Randomize same year
       return yearB - yearA;
    }).slice(0, 15);

    // Initial setup if current hero isn't in the available list
    setDynamicHero(prev => {
      if (!latestAvailable.find(m => m.id === prev.id)) {
        return latestAvailable[Math.floor(Math.random() * latestAvailable.length)];
      }
      return prev;
    });

    const interval = setInterval(() => {
      setDynamicHero(prev => {
        const currentIndex = latestAvailable.findIndex(m => m.id === prev.id);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % latestAvailable.length;
        return latestAvailable[nextIndex];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [fetchedSeries, fetchedTvMovies, fetchedAnime, activeCategory]);

  useEffect(() => {
    if (urlSearch === 'Top 10 Series in Netflix' || urlSearch === 'TV Series') {
      setIsFetchingCategory(false);
      setDynamicCategoryShows(fetchedSeries.length > 0 ? fetchedSeries : netflixAndTvSeriesData);
    } else if (urlSearch === 'TV Movies') {
      setIsFetchingCategory(false);
      setDynamicCategoryShows(fetchedTvMovies.length > 0 ? fetchedTvMovies : rousingShows);
    } else if (urlSearch === 'Trending & Box Office') {
      setIsFetchingCategory(false);
      setDynamicCategoryShows(trendingContent.length > 0 ? trendingContent : sciFiMovies);
    } else if (urlSearch === 'Animation & Anime') {
      setIsFetchingCategory(false);
      setDynamicCategoryShows(fetchedAnime.length > 0 ? fetchedAnime : kDramas);
    } else {
      setDynamicCategoryShows([]);
    }
  }, [urlSearch, fetchedSeries, fetchedTvMovies, fetchedAnime, activeCategory]);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setHistory(prev => {
      const newHistory = prev.filter(m => m.id !== movie.id);
      const updated = [movie, ...newHistory].slice(0, 20);
      localStorage.setItem("netmirror_history", JSON.stringify(updated));
      return updated;
    });
  };

  const handlePlay = (movie: Movie) => {
    setHistory(prev => {
      const newHistory = prev.filter(m => m.id !== movie.id);
      const updated = [movie, ...newHistory].slice(0, 20);
      localStorage.setItem("netmirror_history", JSON.stringify(updated));
      return updated;
    });
    if (movie.link) {
      window.location.href = movie.link;
    }
  };

  const matchCategory = (movie: Movie) => {
    if (activeCategory === "home") return true;
    return movie.type === activeCategory;
  };

  const filterMovies = (movies: Movie[]) => {
    return movies.filter(m => matchCategory(m));
  };

  const continueW = filterMovies(history);
  
  const rawEmmy = filterMovies(emmyDramas);
  const emmy = fetchedSeries.length > 0 ? filterMovies([...fetchedSeries, ...rawEmmy.slice(7)]) : rawEmmy;
  
  const gems = filterMovies(gemsForYou);
  const animationAnime = fetchedAnime.length > 0 ? filterMovies(fetchedAnime) : filterMovies(kDramas);

  const scifi = filterMovies(trendingContent.length > 0 ? trendingContent.slice(0, 15) : sciFiMovies);
  const rousing = fetchedTvMovies.length > 0 ? filterMovies(fetchedTvMovies) : filterMovies(rousingShows);

  const searchResults = uniqueContent.filter(m => {
    if (!matchCategory(m)) return false;
    const q = searchQuery.toLowerCase();
    return m.title.toLowerCase().includes(q) || m.cast.toLowerCase().includes(q) || m.genres.toLowerCase().includes(q);
  });

  return (
    <main className="min-h-screen bg-[#141414] relative pb-20">
      <Navbar 
        activeCategory={activeCategory} 
        onCategoryChange={(cat) => {
          setActiveCategory(cat);
          router.push('/');
        }}
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      {searchQuery ? (
        <div className="pt-32 px-4 md:px-12 min-h-screen">
          <h2 className="text-gray-400 mb-6 text-xl">Search results for: <span className="text-white font-bold">"{searchQuery}"</span></h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map(movie => (
                <div
                  key={movie.id}
                  className="relative aspect-[2/3] cursor-pointer transition duration-300 transform md:hover:scale-105 hover:z-40 group/card rounded overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-transparent hover:border-gray-500 bg-[#141414]"
                  onClick={() => handleOpenModal(movie)}
                >
                  <Image
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
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
          ) : (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-2xl mb-4">No matches found for "{searchQuery}"</p>
              <p>Suggestions:</p>
              <ul className="text-sm mt-2">
                <li>Try different keywords</li>
                <li>Looking for a movie or TV show? Check your category selection.</li>
                <li>Try using a movie title, actor name, or genre.</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <>
          <Hero movie={dynamicHero} onOpenModal={handleOpenModal} onPlay={handlePlay} />
          
          <div className="-mt-32 relative z-20">
            <NoticeBanner />
            { (urlSearch === 'TV Series' || urlSearch === 'TV Movies' || urlSearch === 'Animation & Anime' || urlSearch === 'Trending & Box Office') ? (
              <div className="px-4 md:px-12 py-8 mt-4">
                <h2 className="text-white font-bold md:text-xl lg:text-2xl mb-6">{urlSearch}</h2>
                {isFetchingCategory ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-4 md:gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="aspect-[2/3] bg-gray-800 animate-pulse rounded" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-4 md:gap-6">
                    {dynamicCategoryShows.filter(matchCategory).map((movie, index) => (
                      <div
                        key={movie.id}
                        className="relative aspect-[2/3] cursor-pointer transition duration-300 transform md:hover:scale-105 hover:z-40 group/card"
                        onClick={() => handleOpenModal(movie)}
                      >
                         <div className="absolute inset-0 z-10 rounded overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-transparent hover:border-gray-500 bg-[#141414]">
                          <Image
                            src={movie.thumbnailUrl}
                            alt={movie.title}
                            fill
                            className="object-contain"
                            referrerPolicy="no-referrer"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10 opacity-0 group-hover/card:opacity-100 transition-opacity">
                             <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                               Update Focus
                             </span>
                           </div>
                       </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 md:gap-4">
                {scifi.length > 0 && <MovieRow title="Trending & Box Office" movies={scifi} onOpenModal={handleOpenModal} onTitleClick={() => router.push('/?search=' + encodeURIComponent('Trending & Box Office'))} />}
                {rousing.length > 0 && <MovieRow title="TV Movies" movies={rousing} onOpenModal={handleOpenModal} onTitleClick={() => router.push('/?search=' + encodeURIComponent('TV Movies'))} />}
                
                {emmy.length > 0 && <MovieRow title="TV Series" movies={emmy} onOpenModal={handleOpenModal} onTitleClick={() => router.push('/?search=' + encodeURIComponent('TV Series'))} />}
                
                <MovieRow title="Continue Watching for You" movies={continueW} onOpenModal={handleOpenModal} />
                
                {animationAnime.length > 0 && <MovieRow title="Animation & Anime" movies={animationAnime} onOpenModal={handleOpenModal} onTitleClick={() => router.push('/?search=' + encodeURIComponent('Animation & Anime'))} />}
              </div>
            )}
          </div>
        </>
      )}

      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        allContent={uniqueContent} 
        onSelectMovie={handleOpenModal}
        onPlay={handlePlay}
      />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#141414]" />}>
      <MainContent />
    </Suspense>
  );
}
