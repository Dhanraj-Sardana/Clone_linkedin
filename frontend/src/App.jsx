import { Routes,Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Signin from './components/Signin.jsx'
import Login from './components/Login.jsx'
import Log from './components/Log.jsx'
function App() {
  

  return (
    <>
<Routes>
        <Route index element={<Login/>}/>
        <Route path='/login' element={<Log/>}/>
        <Route path='/main-page' element={<Home/>}/>
        <Route path='/signin' element={<Signin/>}/>
        
      </Routes>

          </>
  )
}

export default App
