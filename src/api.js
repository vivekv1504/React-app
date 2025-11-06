import axios from 'axios';


const USE_MOCK = false; 

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const TMDB_BASE = 'https://api.themoviedb.org/3';
const YOUTUBE_BASE = 'https://www.googleapis.com/youtube/v3';


export async function fetchMoviesFromTMDB({ query = '', genre = '', minRating = 0, page = 1 }) {
  if (!TMDB_API_KEY) throw new Error('TMDB API key missing. Set REACT_APP_TMDB_API_KEY in .env');

  try {
    if (query) {
      const res = await axios.get(`${TMDB_BASE}/search/movie`, {
        params: { api_key: TMDB_API_KEY, query, page }
      });
      return res.data;
    } else {
      
      const params = {
        api_key: TMDB_API_KEY,
        page,
        sort_by: 'popularity.desc',
        'vote_average.gte': minRating || 0
      };
      if (genre) params.with_genres = genre;
      const res = await axios.get(`${TMDB_BASE}/discover/movie`, { params });
      return res.data;
    }
  } catch (err) {
    throw err;
  }
}

export async function fetchTMDBGenres() {
  if (!TMDB_API_KEY) return [];
  const res = await axios.get(`${TMDB_BASE}/genre/movie/list`, { params: { api_key: TMDB_API_KEY } });
  return res.data.genres || [];
}

/**
 * Fetch trailer from TMDB's video endpoint (primary method)
 * @param {number} movieId - TMDB movie ID
 * @returns {Object|null} YouTube video data or null if not found
 */
export async function fetchTMDBTrailer(movieId) {
  if (!TMDB_API_KEY) {
    console.warn('TMDB API key missing.');
    return null;
  }

  try {
    const res = await axios.get(`${TMDB_BASE}/movie/${movieId}/videos`, {
      params: { api_key: TMDB_API_KEY }
    });

    if (res.data.results && res.data.results.length > 0) {
      // Find first YouTube trailer or teaser
      const trailer = res.data.results.find(
        video => video.site === 'YouTube' && 
        (video.type === 'Trailer' || video.type === 'Teaser')
      ) || res.data.results.find(video => video.site === 'YouTube');

      if (trailer) {
        return {
          videoId: trailer.key,
          title: trailer.name,
          type: trailer.type
        };
      }
    }
    return null;
  } catch (err) {
    console.error('Error fetching TMDB trailer:', err);
    return null;
  }
}

/**
 * Fetch YouTube trailer using YouTube Data API (fallback method)
 * @param {string} movieTitle - The title of the movie
 * @param {string} year - Release year (optional, for better search results)
 * @returns {Object|null} YouTube video data or null if not found
 */
export async function fetchYouTubeTrailer(movieTitle, year = '') {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key missing. Set REACT_APP_YOUTUBE_API_KEY in .env');
    return null;
  }

  try {
    // Try multiple search queries for better results
    const searchQueries = [
      `${movieTitle} ${year} official trailer`,
      `${movieTitle} ${year} trailer`,
      `${movieTitle} trailer`,
      `${movieTitle} ${year} teaser`
    ];

    for (const searchQuery of searchQueries) {
      console.log('Searching YouTube for:', searchQuery.trim());
      
      const res = await axios.get(`${YOUTUBE_BASE}/search`, {
        params: {
          part: 'snippet',
          maxResults: 3, // Get top 3 results to find best match
          q: searchQuery.trim(),
          type: 'video',
          key: YOUTUBE_API_KEY
        }
      });

      if (res.data.items && res.data.items.length > 0) {
        // Prefer videos with "trailer" or "official" in the title
        const video = res.data.items.find(item => {
          const title = item.snippet.title.toLowerCase();
          return title.includes('trailer') || title.includes('official') || title.includes('teaser');
        }) || res.data.items[0];

        return {
          videoId: video.id.videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high?.url,
          channelTitle: video.snippet.channelTitle
        };
      }
    }
    
    return null;
  } catch (err) {
    console.error('Error fetching YouTube trailer:', err);
    if (err.response) {
      console.error('YouTube API Error:', err.response.data);
    }
    return null;
  }
}


export async function fetchMoviesFromOMDB({ query = '', page = 1 }) {
  if (!OMDB_API_KEY) throw new Error('OMDB API key missing. Set REACT_APP_OMDB_API_KEY in .env');
  const res = await axios.get('https://www.omdbapi.com/', {
    params: { apikey: OMDB_API_KEY, s: query, page }
  });
  return res.data;
}


const mockMovies = [
  {
    id: 1,
    title: 'They call Him OG',
    genre: 'Drama',
    rating: 8.1,
    year: 2020,
    overview: 'A moving story about community and courage.',
    
  },
  {
    id: 2,
    title: 'Space Trails',
    genre: 'Sci-Fi',
    rating: 7.4,
    year: 2019,
    overview: 'A crew makes a surprising discovery traveling between stars.',
    
  },
  {
    id: 3,
    title: 'K-Ramp',
    genre: 'Comedy',
    rating: 8.8,
    year: 2025,
    overview: 'A group of friends tries to win a local comedy contest.',
    
  },
  {
    id:4,
    title: 'Little Hearts',
    genre: 'Comedy',
    rating: 9.8,
    year: 2025,
    overview: 'A  comedy Love story.',
    
  }
];

export async function fetchMovies({ query = '', genre = '', minRating = 0, page = 1 }) {
  if (USE_MOCK) {
   
    let res = mockMovies.filter(m => m.rating >= minRating);
    if (genre) res = res.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
    if (query) res = res.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    return { results: res, total_results: res.length, page: 1 };
  }

  
  try {
    if (TMDB_API_KEY) {
      const data = await fetchMoviesFromTMDB({ query, genre, minRating, page });
      
      const normalized = data.results.map(item => ({
        id: item.id,
        title: item.title,
        rating: item.vote_average,
        year: item.release_date ? item.release_date.split('-')[0] : '',
        overview: item.overview,
        poster: item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : ''
      }));
      return { results: normalized, total_results: data.total_results, page: data.page };
    } else if (OMDB_API_KEY && query) {
      const data = await fetchMoviesFromOMDB({ query, page });
      if (data.Search) {
        const normalized = data.Search.map((item, idx) => ({
          id: `${item.imdbID}-${idx}`,
          title: item.Title,
          rating: item.imdbRating ? parseFloat(item.imdbRating) : 0,
          year: item.Year,
          overview: '',
          poster: item.Poster && item.Poster !== 'N/A' ? item.Poster : ''
        }));
        return { results: normalized, total_results: normalized.length, page };
      }
      return { results: [], total_results: 0, page };
    } else {
     
      return { results: mockMovies, total_results: mockMovies.length, page: 1 };
    }
  } catch (err) {
    throw err;
  }
}
