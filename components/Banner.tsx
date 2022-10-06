import Image from "next/image"
import { useEffect, useState } from "react"
import { Movie } from "../typings"
import { baseUrl } from "../constants/movie"
import {FaPlay} from "react-icons/fa"
import { InformationCircleIcon } from "@heroicons/react/solid"

interface Props {
    netFlixOriginals: Movie[]
}  


function Banner({netFlixOriginals}: Props) {
    
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        setMovie(netFlixOriginals[Math.floor(Math.random() * netFlixOriginals.length)])
    }, [netFlixOriginals])

    const desc = typeof movie?.overview == "string" &&  movie?.overview.length > 200 ? `${movie?.overview.slice(0, 199)}...` : movie?.overview

    return (
      <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
          <div className="absolute top-0 left-0 h-[95vh] w-full -z-10">
            <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} alt="Movie Poster" layout="fill" objectFit="cover" />
          </div>
          <h1 className="text-shadow text-2xl lg:text-7xl md:text-4xl font-bold">{movie?.title || movie?.name || movie?.original_name}</h1>
          <p className="max-w-sm text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">{desc}</p>
          <div className="flex space-x-3">
            <button className="bannerButton bg-white text-black">
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                <p>Play</p>
            </button>
            <button className="bannerButton bg-[gray]/70 ">
                <p> More Info </p>
                <InformationCircleIcon className="h-5 w-5 md:h-7 md:w-7"/>
            </button>
          </div>
      </div>
    )
}

export default Banner