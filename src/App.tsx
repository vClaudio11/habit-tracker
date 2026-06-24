import { useState } from "react"
import HabitPage from "./pages/HabitPage"
import LoginPage from "./pages/LoginPage"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

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
        <LoginPage onLogin={onLogin}/>
      )}
    </div>
  )
}

export default App