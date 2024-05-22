import React,{Children, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({childern,authentication=true}) {
    const navigate=useNavigate()
    const[loading,setLoading]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)

    useEffect(()=>{
      //TODO: make it less complex
      if (authentication && authStatus!==authentication) {
          navigate("/login")
      } else if (!authentication && authStatus!==authentication) {
         navigate("/")
      }

    },[authStatus,navigate,authentication])
  
  return loader ? <h1>Loading...</h1> :<>{Children}</>
    
}
