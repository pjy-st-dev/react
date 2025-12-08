
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";


function Home(){
    
    const { movies } = useContext(MovieContext);

    return (
        <div>
            <h1>Movie List</h1>
            <div style={{ display: "grid", gap: "16px" }}>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Home;