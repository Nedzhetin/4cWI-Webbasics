interface Movie {
    release_date: any;
    title: string;
    url?: string;
}

function MovieCard({movie}: { movie: Movie }) {
    function onFavoriteClick() {
        alert("Favorite!");
    }

    return (
        <div className="relative w-48 h-64 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img src={movie.url} alt={movie.title}/>
            <div className="absolute w-full bottom-0 h-16 bg-amber-50">
                <button
                    className="absolute bottom-0 right-0"
                    onClick={() => onFavoriteClick()}
                >
                    Click
                </button>
                <h3>{movie.title}</h3>
                <p className="absolute bottom-0">{movie.release_date}</p>
            </div>
        </div>
    );
}

export default MovieCard;
