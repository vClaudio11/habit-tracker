import type { Habit, NoteType } from "@/types"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface HabitCardProps {
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
    const [card, setCard] = useState<Habit>({
        id: '',
        title: '',
        description: '',
        type: ''
    })

    return (
        <div>
            <Field className="flex flex-col gap-2">
                <Field>    
                    <Label>Habit title</Label>
                    <InputGroup className='h-8'>
                        <InputGroupInput placeholder="Enter title" value={card.title}></InputGroupInput>
                    </InputGroup>
                </Field>
                <div>
                    <Select
                        value={card.type}
                        onValueChange={(value: NoteType | null) => {
                            if (value) {
                                setCard(prev => ({...prev, type: value}))}
                            }
                        }
                    >
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder='Select habit type'/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='Health'>Health</SelectItem>
                                <SelectItem value='Education'>Education</SelectItem>
                                <SelectItem value='Finance'>Finance</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Field>    
                    <Label>Description</Label>
                    <Textarea 
                        value={card.description || ""}
                        placeholder="Enter text"
                        className="h-30"
                    />
                </Field>
                <Field className="flex flex-row items-center gap-2">
                    <Button 
                        className='max-w-28'
                        variant='outline'>Create habit</Button>
                    <Button 
                        className='max-w-18'
                        variant='outline'>Clear</Button>
                </Field>
            </Field>
        </div>
    )
}
