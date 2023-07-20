import React, { useEffect } from "react";
import {Routes,Route,  useNavigate, Navigate} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import AllTransactions from "./pages/AllTransactions";
import Income from "./pages/Income";
import Expense from "./pages/Expense";

function App() {

  const navigate = useNavigate();
  
  useEffect( ()=>{
    axios.get("http://localhost:8080/api/v1/users/check-authentication",{withCredentials:true})
    .then((success)=>{
      
    }).catch(()=>{
      console.log("cleared");
      localStorage.clear();
      navigate("/login");
    })
    
  },[navigate])

  return (
    <>
      <Routes>
        <Route 
        path="/" 
        element={ 
        <ProtectedRoutes>
            <HomePage/>
        </ProtectedRoutes>} 
        /> 
        <Route 
        path="/transaction" 
        element={ 
        <ProtectedRoutes>
            <AllTransactions/>
        </ProtectedRoutes>} 
        /> 
        <Route 
        path="/income" 
        element={ 
        <ProtectedRoutes>
            <Income/>
        </ProtectedRoutes>} 
        /> 
        <Route 
        path="/expense" 
        element={ 
        <ProtectedRoutes>
            <Expense/>
        </ProtectedRoutes>} 
        /> 

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children;
  }
  else{
    return <Navigate to="/login" />
  }
}


export default App;
