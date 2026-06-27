import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent } from "@/components/ui/field";
import { Cloudy } from 'lucide-react';
interface LandingPageProps {
    onLogin: () => void
    onSignup: () => void
}

export default function LandingPage({ onLogin, onSignup }: LandingPageProps) {

    return(
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center rounded-none border-none shadow-none">
                <div className="flex flex-col gap-12 py-8 mx-4 min-w-full transition-all duration-300">
                    <CardHeader className="flex flex-col justify-center items-center text-center min-w-full">
                        <Cloudy />
                        <CardTitle>Welcome to Cloud</CardTitle>
                        <CardDescription>Centralized habits for everyday optimization.</CardDescription>
                    </CardHeader>
                    <FieldContent className="flex flex-row gap-2 mx-16">
                        <Field className="">
                            <Button
                                variant="default"
                                onClick={() => onLogin()}
                            >
                                Login
                            </Button>
                        </Field>
                        <Field>
                            <Button
                                variant="outline"
                                onClick={() => onSignup()}
                            >
                                Sign up
                            </Button>
                        </Field>
                    </FieldContent>
                </div>
            </div>
        </div>    
    )
}