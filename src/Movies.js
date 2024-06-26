import React, { useEffect, useState } from 'react';
import axios from "axios"
import YouTube from 'react-youtube';
import './App.css';
import { Input, Form,Col,Row,Image } from 'antd'

import {
  SearchOutlined
} from '@ant-design/icons';



function Movies() {

  

   const API_URL = "https://api.themoviedb.org/3"
   const API_KEY = "2a48eb6e213d95a81c16cf3551d9cc3e"
   const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
   const URL_IMAGE = "https://image.tmdb.org/t/p/original"

   // VARIABLES DE ESTADO

   const [movies, setMovies] = useState([])
   const [searchKey , setSearchKey] = useState("")
   const [trailer, setTrailer] = useState(null)
   const [movie, setMovie] = useState({title: "Loading Movies"})
   const [playing, setPlaying] = useState(false)

   // funcion para realizar la peticion GET a la API

   const fetchMovies = async(searchKey) =>{

    const type = searchKey ? "search" : "discover"

    const {data: {results},
  } = await axios.get (`${API_URL}/${type}/movie`,{
    params:{
      api_key:API_KEY,
      query:searchKey

    }
  });

  setMovies(results)
  setMovie(results[0])

  if(results.length){
    await fetchMovie(results[0].id)
  }

   }

  // Funcion para la peticion de un solo objeto y mostrar en el reproductor de video

   const fetchMovie = async (id) => {

      const {data} = await axios.get (`${API_URL}/movie/${id}`, {
        params:{
          api_key: API_KEY,
          append_to_response:"videos"
        }
      }
      )

      if(data.videos && data.videos.results){
        const trailer = data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : data.videos.results[0])
      }

      setMovie(data)
   }

   const selectMovie = async (movie) => {
      fetchMovie(movie.id)
      setMovie(movie)
      window.scrollTo(0,0)

   }

   //funcion para buscar peliculas

   const searchMovies = (e) =>{
    e.preventDefault();
    fetchMovies(searchKey)
   }

   useEffect(() =>{
    fetchMovies();
   },[])

  return (
    <>


<div className='card-container'>

  <h2 className='text-center mt-5 mb-5'>Trailer Movies</h2>

{/* buscador */}

<Form className='text-center mb-4' onSubmitCapture = {searchMovies}>
  <Input prefix ={<SearchOutlined />} className= "mb-10" size="large" type='text' placeholder='Search the movie, type and press enter' onChange={(e) => setSearchKey(e.target.value)}>  
  </Input>
</Form>

<br></br>
<br></br>

<div>
        <main >
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

<br></br>

{/* Contenedor que mapea las peliculas actuales desde la API */}

                  <Col flex="auto"
                    style={{
                      overflow: "auto",
                      height: "100vh",
                      width: "auto",
                      position: "sticky",
                      top: 0,
                      left: 0
                    }}>
                    <div align="center">

                      <Row justify="space-evenly">
                        <Image.PreviewGroup>
                          {movies.length !== 0 &&
                            movies.map((docs, index) => (
                              <div className="site-card-wrapper" key={index} onClick={() => selectMovie(docs)}>
                                <img
                                  key={index}
                                  width={300}
                                  height={600}
                                  src={`${URL_IMAGE + docs.poster_path}`}
                                  placeholder={
                                    <img
                                      preview={false}
                                      src="./resources/loading.svg"
                                      width={10}
                                      height={10}
                                    />
                                  }
                                />
                                
                                <br /><br />
                                
          
                              </div>
                            ))}
                        </Image.PreviewGroup>
                      </Row>
                     
          
                    </div>
                  </Col>
                </div>
         
        

        
       
    
    </>
  )
}

export default Movies