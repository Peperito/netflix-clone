import Image from "next/image"
import img from "../public/testlogo.png"
import {BellIcon, SearchIcon} from "@heroicons/react/solid"
import Link from "next/link"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"

function Header() {

  const [isScrolled, setIsScrolled] = useState(false)
  const { logOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className="flex items-center space-x-2">
            <Image src={img} alt="logo" width="100" height="100" />
            <ul className="hidden space-x-4 md:flex p-4">
                <li className="headerlink">Home</li>
                <li className="headerlink"></li>
                <li className="headerlink">TV Shows</li>
                <li className="headerlink">New & Popular</li>
                <li className="headerlink">My List</li>
            </ul>
        </div>
        <div className="flex items-center space-x-4 test-sm font-light">
            <SearchIcon className="hidden sm:inline h-6 w-6" />
            <p className="headerlink hidden lg:inline">Kids</p>
            <BellIcon className="h-6 w-6" />
            <div>
            <Link href="/account" >
                    <>
                    <Image
                      src="https://rb.gy/g1pwyx"
                      alt="Landscape picture"
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    </>
            </Link>
            <button onClick={logOut}>Logout</button>
            </div>
        </div>
    </header>
  )
}

export default Header