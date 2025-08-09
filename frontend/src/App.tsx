import { Routes,Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Verification from "./pages/verification"
import { Toaster } from "react-hot-toast"
import Home from "./pages/home"
import { authStore } from "./store/store"
import { useEffect, type ReactNode,} from "react"

interface Chi{
  children:ReactNode
}

function App() {
  const{checkAuth,user,isAuthenticated}=authStore()

  const Authentificated=({children}:Chi)=>{
    if(isAuthenticated){
      return <Navigate to="/"/>
    }
   return children
  }

  const ProtectedRoute=({children}:Chi)=>{
    if(!isAuthenticated){
      return <Navigate to='/login'/>
    }
    if(!isAuthenticated && !user.isVerified){
      return <Navigate to='/verify'/>
    }
    return children


  }

  useEffect(()=>{
    checkAuth()
     
      
  },[checkAuth])


  console.log("is authentificated :",isAuthenticated)
  console.log(user)

  return (
    <>
      <div>
          
      </div>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
             <Home/>
          </ProtectedRoute>
          }/>
        <Route path="/signup" element={
          <Authentificated>
            <Signup/>
          </Authentificated>
          }/>
         <Route path="/login" element={
           <Authentificated>
            <Login/>
          </Authentificated>
          }/>
         <Route path="/verification" element={<Verification/>}/>
      </Routes>
      <Toaster/>
        
    </>
  )
}

export default App
