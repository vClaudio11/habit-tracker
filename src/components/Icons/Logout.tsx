
import { LogOut } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export function Logout() {

    function handleLogout() {

    }
    
    return(
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <div className="flex flex-col justify-center items-center">
                        <LogOut 
                        onClick={handleLogout}
                        className="text-gray-700 hover:cursor-pointer"
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
                        <AlertDialogAction>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}