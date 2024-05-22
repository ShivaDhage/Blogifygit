import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
//import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{

       if (userData) {
          dispatch(login({userData}))
       } else{
         dispatch(logout)
       }
    })
    .finally(()=>setLoading(false))
  },[])
  return !loading?(
    <div>
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
         Todo: {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
     </div>
    </div>
  ) : null
}

export default App
