import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Mail } from 'lucide-react';
import { useState } from "react";
import { User } from 'lucide-react';
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

interface SignInPageProps {
    onSwitchToLogin: () => void
}

export default function SignInPage({ onSwitchToLogin }: SignInPageProps) {
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    

    const formSchema = z.object({
        username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(12, "Username cannot be more than 12 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        ),
        email: z
        .string()
        .min(1, "Email is required")
        .pipe(z.email("Invalid email address")),
        password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
        confirmedPassword: z
        .string()
        .min(1, "Please confirm your password")
    })

    .refine((data) => data.password === data.confirmedPassword, {
        message: "Passwords do not match",
        path: ["confirmedPassword"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: { username: "", email: "", password: "", confirmedPassword: ""},
    })
    
    async function handleSignup() {
        if (!newName || !newEmail || !newPassword || !confirmPassword) {
            setError('All fields must be filled out')
            return 
        }

        onSwitchToLogin()
    }



    function onSubmit() {
        toast("Accounted creation successful")
    }

    function switchToLogin() {
        onSwitchToLogin()
    }

    
    return(
        <div>
            <div className="min-h-screen flex flex-col justify-center rounded-none border-none shadow-none">
            <Card className="py-8 mx-4">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold -mb-2">Sign up</CardTitle>
                    <CardDescription>Create a new Cloud account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="signupForm" onSubmit={form.handleSubmit(onSubmit)}></form>
                    <FieldGroup>
                        <Controller 
                            name='username'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Username <span className="text-destructive">*</span> </FieldLabel>
                                    <InputGroup>          
                                        <InputGroupInput 
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="username123"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                        <InputGroupAddon>
                                            <User />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                            )}
                        />
                        <Controller 
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (        
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email <span className="text-destructive">*</span> </FieldLabel>
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
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>                      
                                    <FieldLabel>Password <span className="text-destructive">*</span> </FieldLabel>                   
                                    <Input 
                                        {...field}
                                        aria-invalid={fieldState.invalid}                                
                                        placeholder="••••••••"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Controller 
                            name="confirmedPassword"
                            control={form.control}
                            render={({ field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label>Confirm password <span className="text-destructive">*</span> </Label>
                                    <Input 
                                        {...field}
                                        aria-invalid={fieldState.invalid}                                
                                        placeholder="••••••••"
                                        autoComplete="off"
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
                                form="signupForm"
                            >
                                Create new account
                            </Button>
                            <span className="text-center">{error}</span>
                        </Field>
                        <Field>
                            <Label className="flex flex-row justify-center text-center">
                                Already have an account? <span 
                                                            className="underline hover:cursor-pointer"
                                                            onClick={switchToLogin}
                                                            >
                                                            Login here
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