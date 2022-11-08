import React from 'react';
import './Header.css'
import img from '../assets/troll.png'


export default function Header(){
  return(
    <header className="header">
      <img className="header--img"  src={img}  alt="logo"/>
      <h2  className="header--title">Meme generator</h2>
      <h3 className="header--project">By Gabriel Calvo</h3>
    </header>
  )
  
}