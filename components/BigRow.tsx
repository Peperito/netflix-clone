import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { useRef, useState } from "react"
import { Movie } from "../typings"
import BigThumbnail from "./BigThumbnail"

interface Props {
  // add type document data when using firebase
    title: string,
    movies: Movie[]
}


function BigRow({title, movies } : Props) {

  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if(rowRef.current){
      const {scrollLeft, clientWidth} = rowRef.current

      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2
      
      rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})
    }
  }

  

  return (
    <div className="flex flex-col relative h-[42vh] space-y-1 md:space-y-2 md:mt-14 ">

        <h2 className="w-56 cursor-pointer text-md font-semibold text-gray-200 hover:text-white transition duration-200 md:text-2xl">{title}</h2>

        <div className="group relative md:-ml-2 flex justify-between">
            <div className={`absolute top-0 bottom-0 z-40 m-auto w-14 bg-gradient-to-r from-black h-auto md:h-auto
            cursor-pointer transition opacity-0 group-hover:opacity-70 ${
              !isMoved && 'hidden'
            }`}>
            </div>
            <ChevronLeftIcon 
            className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 text-white md:h-12 md:w-12
            cursor-pointer transition opacity-0 group-hover:opacity-100 hover:scale-125 ${
              !isMoved && 'hidden'
            }`}
            onClick={() => handleClick("left")}
            />
            
            <div className="flex items-center space-x-1 overflow-x-scroll md:space-x-2 thumbrow overflow-y-hidden" ref={rowRef}>
              {movies.map((movie) => (
                    <BigThumbnail key={movie.id} movie={movie}/>
              ))}
            </div>
              
            <div className={`absolute top-0 bottom-0 z-40 right-0 m-auto w-14 bg-gradient-to-l from-black h-auto
            cursor-pointer transition opacity-0 group-hover:opacity-70`}>
            </div>
            <ChevronRightIcon 
            className="absolute top-0 bottom-0 right-2 z-40 m-auto w-9 text-white  h-auto md:w-12
            cursor-pointer transition opacity-0 group-hover:opacity-100 hover:scale-125" 
             onClick={() => handleClick("right")}
             />
        </div>
    </div>
  )
}

export default BigRow