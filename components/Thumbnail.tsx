import { Movie } from "../typings"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"

interface Props {
    // add type document data when using firebase
    movie: Movie
}

function Thumbnail( {movie}: Props) {

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105
     flex flex-col items-center">
      <Image
            src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
            }`}
            className="rounded-sm object-cover"
            layout="fill"
            alt="thumbnail"
            id={String(movie.id)}
            
        />
      <p className="absolute bottom-4 z-20 thumbTitle scale-0 group-hover:scale-100 text-sm text-center">{movie.title || movie.name}</p>  
      <div 
      className="w-full h-full bg-gradient-to-t from-black/70 to-transparent z-10 scale-0 group-hover:scale-100" />
    </div>
  )
}

export default Thumbnail