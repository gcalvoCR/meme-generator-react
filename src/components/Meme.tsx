import React from 'react'
import './Meme.css'
import html2canvas from 'html2canvas'
import { MemeData } from '../App';

interface MemeProps {
  handleClick(): void;
  handleChange(event: any): void;
  handleClear(event: any): void;
  meme: MemeData;
}

export default function Meme({handleClick, handleChange, handleClear, meme}: MemeProps){
  
  
  const printRef = React.useRef<HTMLDivElement>();

  const handleDownloadImage = async () => {
    const element= printRef.current;
    if (element){
      const canvas = await html2canvas(element, {
        useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version
      });
      const data = canvas.toDataURL('image/jpg');
      const link = document.createElement('a');
    
      if (typeof link.download === 'string') {
        link.href = data;
        link.download = 'image.jpg';
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
      }
    } 
  };
  
  return(
    <main>
      <div className="form">
        <input  
          type="text" 
          className="form--input first"
          name='topText'
          onChange={handleChange}
          value={meme.topText}
          placeholder="Top Text"
        />
        <input  
          type="text" 
          className="form--input second"
          name='bottomText'
          onChange={handleChange}
          value={meme.bottomText}
          placeholder="Bottom Text"
        />
        <button onClick={handleClick} className="form--button first">Pick random image</button>
        <button onClick={handleClear} className="download--button">Clear text</button>
        <button onClick={handleDownloadImage} className="download--button">Download</button>
      </div>
      <br/>
      <div ref={printRef as React.RefObject<HTMLDivElement>} className='meme'>
        <img src={meme.randomImage} className="meme--image" alt=''/>
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
      <br/>
    </main>
  )
}