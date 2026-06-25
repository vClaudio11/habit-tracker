
import { LogOut } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface LogoutProps {
    onLogout: () => void
}

export function Logout({ onLogout }: LogoutProps) {

    function handleLogout() {
        onLogout()
    }
    
    return(
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <div className="flex flex-col justify-center items-center">
                        <LogOut 
                        className="text-primary hover:cursor-pointer"
                        />
                        <Label>Logout</Label>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogHeader className='text-left'>Are you sure you want to logout of your account?</AlertDialogHeader>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-row justify-end items-center min-w-full'>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}