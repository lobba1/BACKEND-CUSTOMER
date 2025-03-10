import React from 'react'
import {Link} from 'react-router-dom'

const SectionHeader = ({title}) => {
  return (
    <section className= "section-header">
               <h1>{title }</h1>
                <div className="nav-buttons">
                    <Link to="/projects/project" className= "btn btn-gray">Skapa project</Link>
                    <Link to= "/projects" className= "btn btn-yellow">Visa lista</Link>
                </div>

               </section>
  )
}

export default SectionHeader
