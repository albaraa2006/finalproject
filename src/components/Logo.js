import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
    return(
        <div className='ma4 mt0 mh5'>
            <Tilt className="Tilt br2" options={{ max: 50 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa1"> <img style = {{paddingTop: '5px'}} alt = 'brain logo' src = {brain}/></div>
            </Tilt>
        </div>
    )
}

export default Logo