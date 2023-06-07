import React from "react";
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Forgetpassword from "./components/Forgetpassword"


function App() {


    return (

        <div className="bg-gray-50 dark:bg-neutral-700">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/login"
                        element={<Login/>}/>
                    <Route path="/signup"
                        element={<Signup/>}/>
                    <Route path="/forgetpassword"
                        element={<Forgetpassword/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
