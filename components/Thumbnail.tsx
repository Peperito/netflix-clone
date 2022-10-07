import { Movie } from "../typings"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"

interface Props {
    // add type document data when using firebase
    movie: Movie
}

function Thumbnail( {movie}: Props) {

  

  return (
    <div className="flex flex-col">
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 bg-black">
        
        <Image
            src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
            }`}
            className="rounded-sm object-cover group"
            layout="fill"
            alt="thumbnail"
            id={String(movie.id)}
        />
        <p className="absolute h-full w-full hidden group-hover:block">{movie.title || movie.name}</p>
    </div>

    </div>
  )
}

export default Thumbnail