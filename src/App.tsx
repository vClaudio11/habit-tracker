import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useReducer } from "react"
import { Habit } from "./types"
import { HabitCreateCard } from "./components/app/HabitCards/HabitCardCreate"
import { HabitTodoCard } from "./components/app/HabitCards/HabitCardTodo"
import { HabitEditCard } from "./components/app/HabitCards/HabitCardEdit"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type HabitAction = { type: "ADD_HABIT", payload: Habit} | { type: "DELETE_HABIT", payload: string}

function habitReducer(state: Habit[], action: HabitAction): Habit[] {
  switch (action.type) {
    case "ADD_HABIT":
      return [action.payload, ...state]
    case "DELETE_HABIT":
      return state.filter(h => h.id !== action.payload)
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
              <Card>
                  <CardHeader>
                    {/* Checkbox table of habits
                      - control overflow-y to auto for scroll of to-do, overflow hidden
                    */}
                    <FieldGroup className='min-h-78'>
                      <Table>
                        <TableRow>
                            <TableHead>Habit</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                      </Table>
                      {habits.map(habit => (
                        <HabitTodoCard key={habit.id} habits={habit}/>
                      ))}
                    </FieldGroup>
                  </CardHeader>
              </Card>
          </TabsContent>
          <TabsContent value='create'>
              <Card>
                  <CardHeader>
                    {/* TextArea field for Title, select tabs for type, TextArea for description */}
                    <FieldGroup className='min-h-78'>
                      <HabitCreateCard onAdd={handleAdd}/>
                    </FieldGroup>
                  </CardHeader>
              </Card>
          </TabsContent>
          <TabsContent value='edit'>
              <Card className="max-h-86 overflow-y-auto">
                <CardContent>
                  <Field>
                    {/* Card list of all active habits, with edit and delete button */}
                      {habits.map(habit => (
                        <HabitEditCard key={habit.id} habits={habit} onDelete={handleDelete}/>
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