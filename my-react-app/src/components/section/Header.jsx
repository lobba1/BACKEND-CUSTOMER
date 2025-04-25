import React from react 
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Header>
            <div className="container">

                <h1>Project 1 - 701560, CM24 - DATABASTEKNIK</h1>
            <div>
            <Link to = "/projects/new"> skapa project </Link>
            <Link to = "/projects"> visa lista </Link>
            
            </div>
            </div>
        </Header>
    )
}