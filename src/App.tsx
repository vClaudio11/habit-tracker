import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useReducer } from "react"
import { Habit } from "./types"
import { HabitCreateCard, HabitEditCard, HabitTodoCard } from "./components/app/HabitCard"
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
      <Tabs defaultValue='To-do' className='w-[400px]'>
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
                      {habits.map(habit => (
                        <HabitTodoCard habits={habit}/>
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
              <Card>
                  <CardHeader>
                    {/* Card list of all active habits, with edit and delete button */}
                    <FieldGroup className='min-h-78'>      
                      {habits.map(habit => (
                        <HabitEditCard key={habit.id} habit={habit} onDelete={handleDelete}/>
                      ))}
                    </FieldGroup>
                  </CardHeader>
              </Card>
          </TabsContent>
      </Tabs>
    </div>
  )
}

export default App