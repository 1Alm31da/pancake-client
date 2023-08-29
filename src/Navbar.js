import React from 'react'
import "./navbar.css";

export default function Navbar() {
  return (
    <div className='navbarMain'>
        <div className='left-text'>
            <div className='back-option'> <a href='http://localhost:3000' target="_blank" style={{cursor: "pointer"}}>‹</a></div>
            <div className='game-modalidade'>
                <strong>Futebol</strong>
                <p className='game-liga'>Liga Betclic</p>
            </div>
            <div className='main-players'>
                <strong className='home-cl'>SL BENFICA</strong>
                 <p className='vs'>VS</p>
                 <strong className='out-cl'>VITÓRIA SC</strong>
            </div>
        </div>
        <div className='right-text'>
            <div>
                <p className='date-game'><strong>sáb 2 set</strong>, 20h30</p><br/>
                <p className='place-game'>ESTÁDIO SLB</p>
            </div>
            <div className='vl'></div>
            <div className='icon-fa'><i className="fa-regular fa-user fa-xl" style={{color: "#fffff"}}></i></div>
        </div>
    </div>
  )
}
