import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Mail } from 'lucide-react';

interface LoginPageProps {
    onLogin: () => void
    onPasswordChange: () => void
    onSignInSwitch: () => void
}

export default function LoginPage({ onLogin, onPasswordChange, onSignInSwitch }: LoginPageProps) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = async () => {
        const url = `${import.meta.env.VITE_API_URL}/auth/login`
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

    function switchToSignIn() {
        onSignInSwitch()
    }

    return(
        <div className="min-h-screen flex flex-col justify-center rounded-none border-none shadow-none">
            <Card className="py-8 mx-4">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold -mb-2">Log in</CardTitle>
                    <CardDescription>Login to your Cloud account</CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Field>
                            <Label>Email</Label>
                            <InputGroup>
                                <InputGroupInput 
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputGroupAddon>
                                    <Mail />
                                </InputGroupAddon>
                            </InputGroup>
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
                                type="password" 
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
                                                            onClick={switchToSignIn}
                                                            >
                                                            Sign up
                                                            </span>
                            </Label>
                        </Field>
                    </FieldGroup>
                </CardContent>
            </Card>
        </div>
    )
}