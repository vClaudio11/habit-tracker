import type { Habit, NoteType } from "@/types"
import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"

interface HabitCardProps {
    onDelete: (id: string) => void
    habits: Habit
}

export function HabitEditCard({ onDelete, habits }: HabitCardProps) {
    const [edit, setEdit] = useState(false)
    

    return (
        <div>
            <Field orientation="horizontal">
                <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                <FieldContent>
                    <FieldTitle>{habits.title}</FieldTitle>
                    <FieldDescription>
                        {habits.description}
                    </FieldDescription>
                </FieldContent>
            </Field>
        </div>
    )
}