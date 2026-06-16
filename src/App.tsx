import { useReducer, useState, useEffect } from "react"
import { Habit, DailyLog } from "./types"
import { HabitCreateCard } from "./components/app/HabitCards/HabitCardCreate"
import { HabitTodoCard } from "./components/app/HabitCards/HabitCardTodo"
import { HabitEditCard } from "./components/app/HabitCards/HabitCardEdit"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import HabitRadialChart from "./components/app/HabitCards/HabitRadialChart"
import HabitBarChart from "./components/app/HabitCards/HabitBarChart"


type HabitAction = { type: "ADD_HABIT", payload: Habit} | 
                    { type: "DELETE_HABIT", payload: string} | 
                    { type: "EDIT_HABIT", payload: Habit} |
                    { type: "TOGGLE_HABIT", payload: string} |
                    { type: "RESET_HABITS" }

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
    case "RESET_HABITS":
      return state.map(h => ({ ...h, completed: false}))
      default:
      return state
    }
  }

function App() {
  const [habits, dispatch] = useReducer(habitReducer, [], () => {
    const stored = localStorage.getItem("habits")
    return stored ? JSON.parse(stored) : []
  })

  const completed = habits.filter(h => h.completed).length
  const total = habits.length

  const [weeklyLog, setWeeklyLog] = useState<DailyLog[]>(() => {
    const stored = localStorage.getItem("weeklyLog")
    const seeded = localStorage.getItem("weeklyLogSeeded")
    
    if (stored && seeded) return JSON.parse(stored)
    
    // Populate weekly log with empty habits or 0 habits
    const today = new Date()
    const seed = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (6 - i))
      return {
        date: date.toISOString().split("T")[0],
        completed: 0,
        total: 0
      }
    })

    // Merge existing data on top of the seeded
    const existing = stored ? JSON.parse(stored) : []
    const merged = seed.map(day => 
      existing.find((d: DailyLog) => d.date === day.date) || day
    )

    localStorage.setItem("weeklyLogSeeded", "true")
    return merged
  })

  useEffect(() => {
    localStorage.setItem("weeklyLog", JSON.stringify(weeklyLog))
  }, [weeklyLog])

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const lastDate = localStorage.getItem("lastACtiveDate")

    if (today !== lastDate) {
      dispatch({ type: "RESET_HABITS" })
      localStorage.setItem("lastACtiveDate", today)
    }
  }, [])

  
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
    
    // calculate number of completed before state loads
    const isCurrentlyCompleted = habits.find(h => h.id === id)?.completed
    const newCompleted = isCurrentlyCompleted
      ? habits.filter(h => h.completed).length -1
      : habits.filter(h => h.completed).length + 1

    updateLog(newCompleted, habits.length)
  }


  function updateLog(completed: number, total: number) {
    const today = new Date().toISOString().split("T")[0]

    setWeeklyLog(prev => {
      const existing = prev.findIndex(d => d.date === today)
      if (existing !== -1) {
        const updated = [...prev]
        updated[existing] = { date: today, completed: completed, total: total}
        return updated
      }
      return [... prev, { date: today, completed: completed, total: total}].slice(-7)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Radial chart */}
          <HabitRadialChart completed={completed} total={total}/>   
        {/* Bar chart */}
          <HabitBarChart weeklyLog={weeklyLog}/>
      </div>
      {/* Tabs component */}
      <Tabs defaultValue='To-do' className='w-100'>
          <TabsList>
              <TabsTrigger value='to-do'>To-do</TabsTrigger>
              <TabsTrigger value='create'>Create</TabsTrigger>
              <TabsTrigger value='edit'>Edit</TabsTrigger>
          </TabsList>
          {/* To-do tab */}
          <TabsContent value='to-do'>
              <Card className="overflow-y-auto">
                  <CardHeader>
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
          {/* Create tab */}
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
          {/* Edit tab */}
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