import { useState } from "react"
import HabitPage from "./pages/HabitPage"
import LoginPage from "./pages/LoginPage"
import LandingPage from "./pages/LandingPage"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [home, setHome] = useState(true)
  const [login, setLogin] = useState(false)
  const [signIn, setSignIn] = useState(false)

  function onLogin() {
    setIsLoggedIn(true)
  }

  function onLogout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <div>
      {isLoggedIn ? (
        <HabitPage onLogout={onLogout}/>
      ) : (
        <LandingPage onLogin={onLogin}/>
      )}
      {/* <LoginPage onLogin={onLogin} onPasswordChange={onPasswordChange} onSignIn={onSignIn}/> */}
    </div>
  )
}

export default App