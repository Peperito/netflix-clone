import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from "../utils/requests"

export const getServerSideProps = async () => {
  const [
    netFlixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return{
    props: {
      netFlixOriginals: netFlixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results
    }
  }
}

interface Props {
  netFlixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]

}

const Home = ({ netFlixOriginals, actionMovies, comedyMovies, documentaries, horrorMovies, romanceMovies, topRated, trendingNow }: Props) => {

  const { logOut, loading} = useAuth()

  if(loading) return null

  return (
    <div className='relative h-screen bg-gradient-to-b'>
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href='/favicon.ico'/>
      </Head>
    
    <Header />  

    <main className='relative pl-6 pb-24 lg:space-y-20 lg:pl-16'>
      <Banner netFlixOriginals={netFlixOriginals} />
      <section className='md:space-y-12'>
        <Row title="Trending Now" movies={trendingNow} />
        <Row title="Top rated" movies={topRated} />
        <Row title="Action Movies" movies={actionMovies} />
        <Row title="Comedies" movies={comedyMovies} />
        <Row title="Documentaries" movies={documentaries} />
        <Row title="Horror" movies={horrorMovies} />
      </section>
    </main>
  </div>
  )
}

export default Home
