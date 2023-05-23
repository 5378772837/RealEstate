import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Admin from './components/pages/Admin'
import PageWrapper from './components/reusables/PageWrapper'
import Properties from './components/pages/Properties'
import Property from './components/pages/Property'
import AddProperty from './components/pages/AddProperty'
import EditProperty from './components/pages/EditProperty'
import './css/reusables/properties.css'

function App() {

  const [user, setUser] = useState({ id: undefined,email: "",password: "", isAgent:false })
  
  useEffect(() => {

    const id = localStorage.getItem("userId");
    if (id) {
      axios.get(`http://localhost:8080/user/findUserById/${id}`)
      .then((response)=>{
        setUser(response.data)
  
      })
      .catch((e)=>{
        console.log(e)
      })
    }  
  }, [])

  return (
    <PageWrapper user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/SignIn" element={<SignIn user={user} setUser={setUser} />} />
        <Route path="/SignUp" element={<SignUp user={user} setUser={setUser} />} />
        <Route path="/Admin" element={<Admin user={user} setUser={setUser}/>} />
        <Route path="/EditProperty" element={<EditProperty user={user} setUser={setUser}/>} />
        <Route path="/Property" element={<Property user={user} setUser={setUser}/>}/> 
        <Route path="/AddProperty" element={<AddProperty user={user} setUser={setUser}/>} /> 
        <Route path="/Properties" element={<Properties user={user} setUser={setUser}/>} />
      </Routes>
    </PageWrapper>
  )
}

export default App