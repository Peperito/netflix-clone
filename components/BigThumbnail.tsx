import { Movie } from "../typings"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"

interface Props {
    // add type document data when using firebase
    movie: Movie
}

function Thumbnail( {movie}: Props) {

  return (
        <div className="flex flex-col justify-end relative min-w-[180px] h-[40vh] cursor-pointer transition duration-200 ease-out md:min-w-[260px] md:hover:scale-105 bg-black">
        <div className="p-6 text-md font-bold z-30 bg-gradient-to-t from-black/80 to-transparent">
            <p className="py-2">{movie.name || movie.title}</p>
            <p className="text-sm font-light">{movie.release_date?.slice(0,4) || movie.first_air_date?.slice(0,4)}</p>
        </div>
        <Image
            src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
            }`}
            className="rounded-sm object-cover group"
            layout="fill"
            alt="thumbnail"
            id={String(movie.id)}
        />
        
    </div>
  )
}

export default Thumbnail