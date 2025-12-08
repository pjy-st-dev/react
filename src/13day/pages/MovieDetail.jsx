import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

function MovieDetail(){
    const { id } = useParams();
    const { movies } = useContext(MovieContext);

    const movie = movies.find(m => String(m.id) === id);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
        <h1>{movie.title}</h1>
        <p>Year: {movie.year}</p>
        <p>{movie.plot}</p>
        </div>
    );
}

export default MovieDetail;