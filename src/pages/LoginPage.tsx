import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LoginPageProps {
    onLogin: () => void
    onPasswordChange: () => void
    onSignIn: () => void
}

export default function LoginPage({ onLogin, onPasswordChange, onSignIn }: LoginPageProps) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = async () => {
        const url = 'http://localhost:3000/auth/login'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        }
        try {
            const response = await fetch(url, requestOptions) 
            if (!response.ok) {
                throw new Error('Invalid')
            }
            const data = await response.json()
            localStorage.setItem('token', data.token)
            onLogin()
        } catch(error) {
            return `Something went wrong: ${error}`
        }
    }

    function handlePassword() {
        onPasswordChange()
    }

    function handleSignIn() {
        onSignIn()
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col justify-center w-[390px] h-[844px] overflow-y-hidden overflow-x-hidden rounded-3xl shadow-2xl border border-gray-800 bg-background">
                <Card className="py-8 mx-4">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold -mb-2">Log in</CardTitle>
                        <CardDescription>Login to your Habits account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <Label>Email</Label>
                                <Input 
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <div className="flex flex-row justify-between">
                                    <Label>Password</Label>
                                    <Label 
                                        className="hover:underline cursor-pointer"
                                        onClick={handlePassword}
                                        >
                                        Forgot your password?
                                    </Label>
                                </div>
                                <Input 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Button 
                                    variant="default" 
                                    onClick={handleLogin}>
                                    Log in
                                </Button>
                            </Field>
                            <Field>
                                <Label className="flex flex-row justify-center text-center">
                                    Don't have an account yet? <span 
                                                                className="underline hover:cursor-pointer"
                                                                onClick={handleSignIn}
                                                                >
                                                                Sign up
                                                                </span>
                                </Label>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}