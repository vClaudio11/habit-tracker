import { useState } from "react"
import HabitPage from "./pages/HabitPage"
import LandingPage from "./pages/LandingPage"
import { AnimatePresence, motion } from 'framer-motion'
import LoginPage from "./pages/LoginPage"
import SignInPage from "./pages/SignInPage"
import { toast, Toaster } from "sonner"

type Page = 'landing' | 'login' | 'signup' | 'habits' | 'passwordChange'

function App() {
  const [page, setPage] = useState<Page>(() => {
    return localStorage.getItem('token') ? 'habits' : 'landing'
  })

  function onLogout() {
    localStorage.removeItem('token')
    setPage('landing')
  }

  function renderToast() {
        toast("Accounted creation successful", {
                    description: "Please login to your account",
                    position: "top-center",
                    classNames: {
                    content: "flex flex-col"
                }
            })
    }

  const pageVariants = {
      initial: { opacity: 0.2, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit:    { opacity: 0, y: -40 }
  }

  return (
    <div>
      <Toaster />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={pageVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'landing' && (
            <LandingPage 
              onLogin={() => setPage('login')}
              onSignup={() => setPage('signup')}
            />
          )}
          {page === 'login' && (
            <LoginPage 
              onLogin={() => setPage('habits')}
              onPasswordChange={() => setPage('passwordChange')}
              onSignInSwitch={() => setPage('signup')}
            />
          )}
          {page === 'signup' && (
            <SignInPage 
              onSwitchToLogin={() => setPage('login')}
              renderToast={() => renderToast()}
            />
          )}
          {page === 'habits' && (
            <HabitPage 
              onLogout={onLogout}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App