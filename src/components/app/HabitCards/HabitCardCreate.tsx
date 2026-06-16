import type { Habit, NoteType } from "@/types"
import { useState } from "react"

import {
  Field,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface HabitCardProps {
    onAdd: (habit: Habit) => void
}

const INITIAL_FORM_STATE: Habit = {
  id: "",
  title: "",
  description: "",
  type: null, 
  completed: false
};

export function HabitCreateCard({ onAdd }: HabitCardProps) {
    const [card, setCard] = useState<Habit>(INITIAL_FORM_STATE)

    const handleReset = () => {
        setCard(INITIAL_FORM_STATE)
    }

    function handleAdd(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        onAdd({...card, id:crypto.randomUUID()})
        handleReset()
    }

    return (
        <div>
            <form onSubmit={handleAdd}>
                <Field className="flex flex-col gap-4">
                    <Field>    
                        <Label>Habit title</Label>
                        <InputGroup className='h-8'>
                            <InputGroupInput 
                                placeholder="Enter title" 
                                onChange={(e) => setCard({ ...card, title: e.target.value})}
                                value={card.title}>
                            </InputGroupInput>
                        </InputGroup>
                    </Field>
                    <Field>
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
                    </Field>
                    <Field>    
                        <Label>Description (optional)</Label>
                        <Textarea 
                            value={card.description || ""}
                            onChange={(e) => setCard({ ...card, description: e.target.value})}
                            placeholder="Enter text"
                            className="h-30"
                        />
                    </Field>
                    <Field className="flex flex-row items-center gap-2 mt-2">
                        <Button 
                            className='max-w-28'
                            type="submit"
                            variant='outline'>Create habit</Button>
                        <Button 
                            className='max-w-18'
                            type="button"
                            onClick={handleReset}
                            variant='outline'>Clear</Button>
                    </Field>
                </Field>
            </form>
        </div>
    )
}
