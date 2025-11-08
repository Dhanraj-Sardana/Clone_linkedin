import { Routes,Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Signin from './components/Signin.jsx'
import Login from './components/Login.jsx'
import Log from './components/Log.jsx'
import Logout from './components/Logout.jsx'
function App() {
  

  return (
    <>
<Routes>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/log' element={<Log/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/logout' element={<Logout/>}/>
        
        
      </Routes>

          </>
  )
}

export default App
