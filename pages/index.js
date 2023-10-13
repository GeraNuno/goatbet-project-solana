import Head from 'next/head'
import { Inter } from 'next/font/google'
import NavBar from '@/components/Navbar'
import Headmenu from '@/components/Headmenu'
import Slider from '@/components/Slider'
import Game from '@/components/game'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

import {useEffect, useState}from 'react'

export default function Home() {

  const [match, setMatch] = useState(null)
  // https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2020&status=FT
  // https://api-football-v1.p.rapidapi.com/v3/leagues?country=Mexico
  useEffect(() => {
    fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e427aa1f81msh6285b35a156aa04p179f68jsn6bed254745b5",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      },
    })
    .then((response) => {return response.json()
    })
    .then((data) => {
      console.log(data.response)
      setMatch(data.response[0])
      // console.log(data[0].fixture)
      //console.log(data.response[0])
      //console.log(data.response[0].score)
      //console.log(data.response[0].fixture)
      //console.log(data.response[0].teams)

     

    })
    .catch((error) => console.log("Error", error))
  }, [])

  return (
    <>
      <Head>
        <title>Goat Bet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      
      <main>

        <div class="Home">
          <header class="fondo">
            <Headmenu/>
          </header>

          <div class="contenido" id="contenido">
          <NavBar />
          <Slider/>

            <br/><br/><br/>

          <div className='bodyScore'>
            <Game imageSrc={match?.teams?.away?.logo} imageSrc2={match?.teams?.home?.logo} team1={match?.teams?.away?.name}
    team2={match?.teams?.home?.name} league={match?.league?.name}
    leagueImage={match?.league?.logo} score1={match?.goals?.away} score2={match?.goals?.home} referee={match?.fixture?.referee} matchDate={match?.fixture?.date.substring(0,10)}
    elapsed={match?.fixture?.status?.elapsed}></Game>
    </div>

            
          </div>
        </div>
        

        <Footer/>
      </main>
      <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
    </>
  )
}