import React, { useEffect, useState } from 'react';
import './App.css';
import Carousel from './components/Carousel';
import Header from './components/Header';
import Meme from './components/Meme';

export interface MemeResponse {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export interface MemeData {
  topText: string;
  bottomText: string;
  randomImage: string;
}

function App() {

  // 
  const placeHolder:MemeData = {
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg', 
  }
  const LOCAL_MEME = 'memeInfo'

  const [meme, setMeme] = useState<MemeData>(() => {
      console.log('initializing meme')
      const info = localStorage.getItem(LOCAL_MEME)
      if (info) {
        try{
          return JSON.parse(info)
        } catch(error){
          return placeHolder;
        }
      }
      return placeHolder;
  });
  const [allMemes, setAllMemes] = useState<Array<MemeResponse>>([])

  useEffect(()=> {
    async function getMemes(){
      const res = await fetch('https://api.imgflip.com/get_memes')
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    getMemes()
  }, [])

  function randomizeImage(){
    const item = allMemes[Math.floor(Math.random()*allMemes.length)]
    setMeme(prevMeme => {
      const info = {...prevMeme, randomImage: item.url}
      localStorage.setItem(LOCAL_MEME, JSON.stringify(info))
      return info
    })
  }

  function handleTextChange(event: any){
    const {name, value} = event.target
    setMeme(prevMeme => {
      const info = {...prevMeme, [name]: value}
      localStorage.setItem(LOCAL_MEME, JSON.stringify(info))
      return info
    })
  }

  function handleImageChange(event: any){
    setMeme(prevMeme => {
      const info = {...prevMeme, randomImage: event.target.src}
      localStorage.setItem(LOCAL_MEME, JSON.stringify(info));
      return info
    })
  }

  function handleClear(event: any){
    setMeme(prevMeme => {
      const info = {...prevMeme, topText: '', bottomText: '',}
      localStorage.setItem(LOCAL_MEME, JSON.stringify(info));
      return info
    })
  }

  return (
    <div className="App">
      <Header/>
      <Meme handleClick={randomizeImage} handleChange={handleTextChange} handleClear={handleClear} meme={meme}/>
      <div className='carousel'>
            <Carousel
                show={4}
                infiniteLoop
            >
             {allMemes.map(meme => (
              <div key={meme.id}>
                    <div >
                        <img src={meme.url} alt={meme.name} style={{height: '150px'}} onClick={handleImageChange} />
                    </div>
                </div>
             ))}
            </Carousel>
        </div>
    </div>
  );
}

export default App;
