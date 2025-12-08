import {createContext, useState, useEffect} from 'react';

export const MovieContext = createContext();

function MovieProvider({children}){
    
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function load() {
        const res = await fetch("https://ghibliapi.vercel.app/films");
        const data = await res.json();
        setMovies(data);   // 배열이라 map 사용 가능!
    }
    load();
    }, []);

  return (
    <MovieContext.Provider value={{ movies }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;