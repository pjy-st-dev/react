import { Link } from "react-router-dom";

function MovieCard({ movie }){
    return (
        <Link to={`/movie/${movie.id}`}>
            <div style={{ border: "1px solid gray", padding: 16 }}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
            </div>
        </Link>
    );
}


export default MovieCard;