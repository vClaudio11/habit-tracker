import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Mail } from 'lucide-react';
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface LoginPageProps {
    onLogin: () => void
    onPasswordChange: () => void
    onSignInSwitch: () => void
}

export default function LoginPage({ onLogin, onPasswordChange, onSignInSwitch }: LoginPageProps) {

    async function handleLogin(values: z.infer<typeof formSchema>) {
        const url = `${import.meta.env.VITE_API_URL}/auth/login`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
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

    const formSchema = z.object({
        email: z
        .string()
        .min(1, "Email is required")
        .pipe(z.email("Invalid email address")),
        password: z
        .string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        defaultValues: { email: "", password: ""},
    })

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
                    <form id="loginForm" onSubmit={form.handleSubmit(handleLogin)}></form>
                    <FieldGroup>
                        <Controller 
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput 
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="name@example.com"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                        <InputGroupAddon>
                                            <Mail />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                            )}
                        />
                        <Controller 
                            name="password"
                            control={form.control}
                            render={({ field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="flex flex-row justify-between">
                                        <FieldLabel>Password</FieldLabel>
                                        <FieldLabel 
                                            className="hover:underline cursor-pointer"
                                            onClick={handlePassword}
                                            >
                                            Forgot your password?
                                        </FieldLabel>
                                    </div>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="••••••••"
                                        autoComplete="off"
                                        type="password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Field>
                            <Button 
                                variant="default"
                                type="submit" 
                                form="loginForm">
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