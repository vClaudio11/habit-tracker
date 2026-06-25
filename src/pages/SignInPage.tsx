import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Mail } from 'lucide-react';
import { useState } from "react";
import { User } from 'lucide-react';

interface SignInPageProps {
    onSwitchToLogin: () => void
}

export default function SignInPage({ onSwitchToLogin }: SignInPageProps) {
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                    <FieldGroup>
                        <Field>
                            <Label>Username</Label>
                            <InputGroup>          
                                <InputGroupInput 
                                    placeholder="username123"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <InputGroupAddon>
                                    <User />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <InputGroup>
                                <InputGroupInput 
                                    placeholder="name@example.com"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                                <InputGroupAddon>
                                    <Mail />
                                </InputGroupAddon>
                            </InputGroup>
                            
                        </Field>
                        <Field>
                            <div className="flex flex-row justify-between">
                                <Label>Password</Label>
                            </div>
                            <Input 
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <div className="flex flex-row justify-between">
                                <Label>Confirm password</Label>
                            </div>
                            <Input 
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Button 
                                variant="default" 
                                onClick={switchToLogin}>
                                Create new account
                            </Button>
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