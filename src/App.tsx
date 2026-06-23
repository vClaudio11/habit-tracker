import HabitPage from "./pages/HabitPage"
import LoginPage from "./pages/LoginPage"

function App() {
  const token = localStorage.getItem('token')

  function onLogin() {

  }

  return (
    <div>
      {token ? (
        <HabitPage />
      ) : (
        <LoginPage onLogin={onLogin}/>
      )}
    </div>
  )
}

export default App