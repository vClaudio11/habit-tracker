import type { Habit, NoteType } from "@/types"
import { useState } from "react"
import { TrashIcon } from "@/components/icons/heroicons-trash"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface HabitCardProps {
    onDelete: (id: string) => void
    habits: Habit
}

export function HabitEditCard({ onDelete, habits }: HabitCardProps) {
    const [edit, setEdit] = useState(false)
    

    return (
        <div className="gap-4">
            <Card size="sm" className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <div className="flex flex-row justify-between items-center">
                        <CardTitle>{habits.title}</CardTitle>
                        <TrashIcon className="text-red-500"></TrashIcon>
                    </div>
                    <CardDescription>
                        {habits.type}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{habits.description}</p>
                </CardContent>
                <CardFooter className="flex flex-row min-w-max">
                    <Button variant="outline" size="sm" className="w-full">Edit</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
