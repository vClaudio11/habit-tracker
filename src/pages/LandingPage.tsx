import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent } from "@/components/ui/field";
import { Cloudy } from 'lucide-react';
import { useState } from "react";
import LoginPage from "./LoginPage";
import SignInPage from "./SignInPage";
import { toast, Toaster } from "sonner"


interface LandingPageProps {
    onLogin: () => void
}

type viewTypes = 'landing' | 'login' | 'signup'

export default function LandingPage({ onLogin }: LandingPageProps) {
    const [view, setView] = useState<viewTypes>('landing')

    function renderToast() {
        toast("Accounted creation successful", {
                    description: "Please login to your account",
                    position: "top-center",
                    classNames: {
                    content: "flex flex-col"
                }
            })
    }

    function onPasswordChange() {

    }

    return(
        <div>
            {/* Default landing page */}
            <Toaster />
            {view === 'landing' && (
                <div className="min-h-screen flex flex-col justify-center items-center rounded-none border-none shadow-none">
                    <Card className="flex flex-col justify-center items-center min-w-full py-8 mx-4">
                        <CardHeader className="flex flex-col justify-center items-center min-w-screen">
                            <Cloudy />
                            <CardTitle>Welcome to Cloud</CardTitle>
                        </CardHeader>
                        <FieldContent className="">
                            <Field>
                                <Button
                                    variant="default"
                                    onClick={() => setView('login')}
                                >
                                    Login
                                </Button>
                            </Field>
                            <Field>
                                <Button
                                    variant="outline"
                                    onClick={() => setView('signup')}
                                >
                                    Sign up
                                </Button>
                            </Field>
                        </FieldContent>
                    </Card>
                </div>
            )}

            {/* Login view */}
            {view === 'login' && (
                <LoginPage 
                    onLogin={onLogin} 
                    onSignInSwitch={() => setView('signup')} 
                    onPasswordChange={onPasswordChange}
                />
            )}
            
            {/* Signup view */}
            {view === 'signup' && (
                <SignInPage 
                    onSwitchToLogin={() => setView('login')}
                    renderToast={() => renderToast()}
                />
            )}
        </div>
    )
}