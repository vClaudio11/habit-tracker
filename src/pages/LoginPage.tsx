import { useState } from "react"

interface LoginCardProps {
    onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginCardProps) {
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()

    return(
        <div>
            
        </div>
    )
}