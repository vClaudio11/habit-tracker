import { useState } from "react"
import HabitPage from "./pages/HabitPage"
import LoginPage from "./pages/LoginPage"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  function onLogin() {
    setIsLoggedIn(true)
  }

  return (
    <div>
      {isLoggedIn ? (
        <HabitPage />
      ) : (
        <LoginPage onLogin={onLogin}/>
      )}
    </div>
  )
}

export default App