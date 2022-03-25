import { useEffect, useState } from "react";
import { GenreResponseProps, MovieProps } from "../@types/movie"
import { api } from "../services/api";
import { MovieCard } from "./MovieCard"

interface ContentProps {
  selectedGenre: GenreResponseProps
  selectedGenreId: number
  setSelectedGenre: React.Dispatch<React.SetStateAction<GenreResponseProps>>
}

export function Content({ selectedGenre, selectedGenreId, setSelectedGenre }: ContentProps ) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}