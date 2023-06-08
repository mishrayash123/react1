import React from "react";
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Forgetpassword from "./components/Forgetpassword"
import TaskManager from "./components/TaskManager"
import {useEffect,useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./components/firebase-config";


function App() {
    const [showdata, setshowdata] = useState(false);
    const [uid, setuid] = useState("hfhjgvhb");

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              setshowdata(true);
              setuid(user.uid)
              
          } else {
              setshowdata(false);
             setuid("")
          }
      });
  
  }, [auth.currentUser]);

    return (

        <div className="bg-gray-50 dark:bg-neutral-700">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                <Route path="/"
                        element={
                            <>{
                                showdata ? <TaskManager uid={uid}/> : <Login />
                            }
                            </>
                        }/>
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
