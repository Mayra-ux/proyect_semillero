import { Navigate, Route, Routes } from 'react-router-dom'
import App from "../App"
import Login from "../Login"


export const AppRouter = () => {
  return (

  <>

    <Routes>
        <Route path="/" element ={<Navigate to="login"/>}></Route>
        <Route path="/movies" element ={<App/>}></Route>
        <Route path="/login" element ={<Login/>}></Route>
    </Routes>

  </>
  )
}
