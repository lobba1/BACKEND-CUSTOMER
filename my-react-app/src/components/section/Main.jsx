import React from "react"
import { Route, Routes } from 'react-router-dom'
import Projects from '../../pages/Projects'
import Home from "../../pages/Home";
import Project from "../../pages/Project"

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/project" element={<Project />} />
            
        </Routes>
    )
}

export default Main