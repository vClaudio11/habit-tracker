import { Habit } from "@/types"
import { useState } from "react"

// HabitTodoCard components
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

// HabitCreateCard components
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

interface HabitCardProps {
    card: Habit
    habits: Habit
    onAdd: Habit 
    onDelete: string 
}

export function HabitEditCard({ onDelete }: HabitCardProps) {
    const [edit, setEdit] = useState(false)
    

    return (
        <div>

        </div>
    )
}

export function HabitTodoCard({ habits }: HabitCardProps) {
    
    return (
        <div>
            <Field orientation="horizontal">
                <Checkbox id={habits.id}/>
                    <FieldContent>
                        <FieldLabel>{habits.title}</FieldLabel>
                        <FieldDescription>{habits.description}</FieldDescription>
                        <FieldDescription>{habits.type}</FieldDescription>
                    </FieldContent>
            </Field>
        </div>
    )
}

export function HabitCreateCard({ onAdd }: HabitCardProps) {
    const [card, setCard] = useState<Habit[]>([])

    return (
        <div>
            <Field>
                <FieldLabel>Habit Title</FieldLabel>
                <InputGroup className='h-8'>
                    <InputGroupInput placeholder="Enter title" value={card.title}></InputGroupInput>
                </InputGroup>
            </Field>
        </div>
    )
}