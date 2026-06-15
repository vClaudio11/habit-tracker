import { useReducer } from "react"
import { Habit } from "./types"
import { HabitCreateCard } from "./components/app/HabitCards/HabitCardCreate"
import { HabitTodoCard } from "./components/app/HabitCards/HabitCardTodo"
import { HabitEditCard } from "./components/app/HabitCards/HabitCardEdit"


import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Field,
  FieldGroup,
} from "@/components/ui/field"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type HabitAction = { type: "ADD_HABIT", payload: Habit} | 
                    { type: "DELETE_HABIT", payload: string} | 
                    { type: "EDIT_HABIT", payload: Habit} |
                    { type: "TOGGLE_HABIT", payload: string}

function habitReducer(state: Habit[], action: HabitAction): Habit[] {
  switch (action.type) {
    case "ADD_HABIT":
      return [action.payload, ...state]
    case "DELETE_HABIT":
      return state.filter(h => h.id !== action.payload)
    case "EDIT_HABIT":
      return state.map(h => h.id === action.payload.id ? action.payload : h)
    case "TOGGLE_HABIT":
      return state.map(h => h.id === action.payload ? { ...h, completed: !h.completed} : h)
      default:
      return state
    }
  }

function App() {
  const [habits, dispatch] = useReducer(habitReducer, [])
  
  function handleAdd(habit: Habit) {
    dispatch({ type: "ADD_HABIT", payload: habit})
  }

  function handleDelete(id: string) {
    dispatch({ type: "DELETE_HABIT", payload: id})
  }

  function handleEdit(habit: Habit) {
    dispatch({ type: "EDIT_HABIT", payload: habit})
  }

  function toggleHabit(id: string) {
    dispatch({ type: "TOGGLE_HABIT", payload: id})
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Tabs component */}
      <Tabs defaultValue='To-do' className='w-100'>
          <TabsList>
              <TabsTrigger value='to-do'>To-do</TabsTrigger>
              <TabsTrigger value='create'>Create</TabsTrigger>
              <TabsTrigger value='edit'>Edit</TabsTrigger>
          </TabsList>
          <TabsContent value='to-do'>
              <Card className="overflow-y-auto">
                  <CardHeader>
                    {/* Checkbox table of habits
                      - control overflow-y to auto for scroll of to-do, overflow hidden
                    */}
                    <FieldGroup className='min-h-82'>
                      <Table className="table-fixed w-full">
                        <TableHeader>
                          <TableRow>
                              <TableHead className='w-[70%]'>Habit</TableHead>
                              <TableHead className='w-[30%]'>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                      <TableBody>
                        {habits.map(habit => (
                          <TableRow key={habit.id}>
                              <HabitTodoCard habits={habit} onToggle={toggleHabit}/>
                          </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </FieldGroup>
                  </CardHeader>
              </Card>
          </TabsContent>
          <TabsContent value='create'>
              <Card>
                  <CardHeader>
                    {/* TextArea field for Title, select tabs for type, TextArea for description */}
                    <FieldGroup className='min-h-82'>
                      <HabitCreateCard onAdd={handleAdd}/>
                    </FieldGroup>
                  </CardHeader>
              </Card>
          </TabsContent>
          <TabsContent value='edit'>
              <Card className="min-h-90 max-h-90 overflow-y-auto">
                <CardContent>
                  <Field className="gap-y-4">
                    {/* Card list of all active habits, with edit and delete button */}
                      {habits.map(habit => (
                        <HabitEditCard key={habit.id} habits={habit} onDelete={handleDelete} onEdit={handleEdit}/>
                      ))}                
                  </Field>
                </CardContent>
              </Card>
          </TabsContent>
      </Tabs>
    </div>
  )
}

export default App