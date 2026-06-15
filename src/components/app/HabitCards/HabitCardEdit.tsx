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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import {
  Field,
} from "@/components/ui/field"

import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"

interface HabitCardProps {
    onDelete: (id: string) => void
    onEdit: (habit: Habit) => void
    habits: Habit
}

export function HabitEditCard({ onDelete, onEdit, habits }: HabitCardProps) {
    
    const CURRENT_FORM_STATE: Habit = {
        id: habits.id,
        title: habits.title,
        description: habits.description,
        type: habits.type,
    };

    const [edit, setEdit] = useState(false)
    const [card, setCard] = useState<Habit>(CURRENT_FORM_STATE)
    
    function deleteHabit() {
        onDelete(habits.id)
    }

    function changeEdit() {
        setEdit(!edit)
    }

    function handleEdit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setCard({...habits, title: card.title, description: card.description, type: card.type})
        onEdit(card)
        setEdit(false)
    }

    return (
        <div>
            {edit === false ? 
                <Card size="sm" className="mx-auto w-full max-w-sm">
                    <CardHeader>
                        <div className="flex flex-row justify-between items-center">
                            <CardTitle>{habits.title}</CardTitle>
                            <TrashIcon 
                                onClick={deleteHabit}
                                className="text-red-500 hover:cursor-pointer">
                            </TrashIcon>
                        </div>
                        <CardDescription>
                            {habits.type}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{habits.description}</p>
                    </CardContent>
                    <CardFooter className="flex flex-row min-w-max">
                        <Button 
                            variant="outline" size="sm" 
                            onClick={changeEdit}
                            className="w-full">
                            Edit
                        </Button>
                    </CardFooter>
                </Card>
            : 
                <Card>
                    <form onSubmit={handleEdit}>
                        <Field className="flex flex-col gap-4">
                            <CardHeader>
                                <Field>
                                    <Label>Habit title</Label>
                                    <InputGroup>
                                        <InputGroupInput
                                            value={card.title}
                                            onChange={(e) => setCard({...card, title: e.target.value})}
                                        >                                    
                                        </InputGroupInput>
                                    </InputGroup>
                                </Field>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">                            
                                <Select
                                    value={card.type}
                                    onValueChange={(value: NoteType | null) => {
                                        if (value) {
                                            setCard(card => ({...card, type: value}))}
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
                                <Field>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={card.description || ""}
                                        onChange={(e) => setCard({...card, description: e.target.value})}
                                        className="h-30"
                                    >
                                        {habits.description}
                                    </Textarea>                            
                                </Field>
                            </CardContent>
                            <CardFooter className="flex flex-row min-w-max gap-2">
                                <Button 
                                    variant="outline" size="sm" 
                                    type="submit"
                                    className="w-2/3">
                                    Submit changes
                                </Button>
                                <Button 
                                    variant="outline" size="sm" 
                                    onClick={changeEdit}
                                    className="w-1/3">
                                    Cancel
                                </Button>
                            </CardFooter>
                        </Field>
                    </form>
                </Card>
            }
        </div>
    )
}
