import React from 'react';
import './style/App.css';
import './style/Gradiant.css';
import NavBar from './components/NavBar';
import {Route, Routes} from 'react-router-dom';
import Landing from './pages/Landing';
import Projects from './pages/Projects';

function App() {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/projects" element={<Projects/>}/>
            </Routes>
        </>
    );
}

export default App;
