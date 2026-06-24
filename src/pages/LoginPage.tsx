import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LoginPageProps {
    onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('') 

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
                setError('Invalid email or password')
                return
            }
            const data = await response.json()
            localStorage.setItem('token', data.token)
            onLogin()
        } catch(err) {
            setError(`Something went wrong: ${err}`)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-[390px] h-[844px] overflow-y-hidden overflow-x-hidden rounded-3xl shadow-2xl border border-gray-800 bg-background">
                <Card className="justify-center h-full w-full">
                    <CardHeader className="text-center">
                        <CardTitle>Log in</CardTitle>
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
                                <Label>Password</Label>
                                <Input 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Button 
                                    variant="outline" 
                                    onClick={handleLogin}>
                                    Log in
                                </Button>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                    <CardFooter>
                        {/* "Don't have an account? Sign up" */}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}