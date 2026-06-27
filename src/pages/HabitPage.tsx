import { useReducer, useState, useEffect, useRef } from "react"
import { Habit, DailyLog } from "../types"
import { HabitCreateCard } from "../components/HabitCards/HabitCardCreate"
import { HabitTodoCard } from "../components/HabitCards/HabitCardTodo"
import { HabitEditCard } from "../components/HabitCards/HabitCardEdit"
import { Logout } from "@/components/Icons/Logout"

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
import HabitRadialChart from "../components/HabitCards/HabitRadialChart"
import HabitBarChart from "../components/HabitCards/HabitBarChart"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"




// Reducer declarations
type HabitAction = { type: "ADD_HABIT", payload: Habit} | 
                    { type: "DELETE_HABIT", payload: number} | 
                    { type: "EDIT_HABIT", payload: Habit} |
                    { type: "TOGGLE_HABIT", payload: number} |
                    { type: "RESET_HABITS" } |
                    { type: "SET_HABITS", payload: Habit[]}

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
    case "SET_HABITS":
      return action.payload
      default:
      return state
    }
  }

interface HabitPageProps {
  onLogout: () => void
}


export default function HabitPage({ onLogout }: HabitPageProps) {
  const [habits, dispatch] = useReducer(habitReducer, [], () => {
      const stored = localStorage.getItem("habits")
      return stored ? JSON.parse(stored) : []
    })
  const completed = habits.filter(h => h.completed).length
  const total = habits.length
  const [weeklyLog, setWeeklyLog] = useState<DailyLog[]>([])
  const [loading, setLoading] = useState(true)
  const hasFetched = useRef(false)
  

  // Ensure that array is seeded with 7 "" array elements
  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchWeeklyLog = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/weekly-log`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      const data = await response.json()

      if (data.length === 0) {
        // if weekly-log is empty then seed the results
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
        // update UI - synchronous 
        setWeeklyLog(seed)

        // POST seed to DB - async
        await fetch(`${import.meta.env.VITE_API_URL}/weekly-log/seed`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(seed)
        })

        setLoading(false)
      } else {
        setWeeklyLog(data)
        setLoading(false)
      }
    }

    fetchWeeklyLog()
  }, [])



  useEffect(() => {
    const fetchHabits = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      const data = await response.json()
      dispatch({ type: "SET_HABITS", payload: data})
    }

    fetchHabits()
  }, [])



  // reset habits from checked --> unchecked if lastActiveDate != current date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const lastDate = localStorage.getItem("lastActiveDate")

    if (today !== lastDate) {
      dispatch({ type: "RESET_HABITS" })
      localStorage.setItem("lastActiveDate", today)
    }
  }, [])


  
  // callback function props
  async function handleAdd(habit: Habit) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: habit.title,
        type: habit.type,
        description: habit.description
      })
    })
    const data = await response.json()
    dispatch({ type: "ADD_HABIT", payload: data})
  }



  async function handleDelete(id: number) {
    const token = localStorage.getItem('token')
    await fetch(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    dispatch({ type: "DELETE_HABIT", payload: id})
  }



  async function handleEdit(habit: Habit) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/habits/${habit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: habit.title,
        type: habit.type,
        description: habit.description,
      })
    })
    const data = await response.json()
    dispatch({ type: "EDIT_HABIT", payload: data})
  }



  function toggleHabit(id: number) {
    dispatch({ type: "TOGGLE_HABIT", payload: id})
    
    // calculate number of completed before state loads
    const isCurrentlyCompleted = habits.find(h => h.id === id)?.completed
    const newCompleted = isCurrentlyCompleted
      ? habits.filter(h => h.completed).length -1
      : habits.filter(h => h.completed).length + 1

    updateLog(newCompleted, habits.length)
  }

  async function updateLog(completed: number, total: number) {
    const today = new Date().toISOString().split("T")[0]
    const token = localStorage.getItem('token')

    const response = await fetch(`${import.meta.env.VITE_API_URL}/weekly-log/${today}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ completed, total})
    })

    const data = await response.json()

    setWeeklyLog(prev => prev.map(d => d.date === today ? data : d))
  }



  function handleLogout() {
    onLogout()
  }



    return( 
        <div className="flex flex-col justify-center items-center min-h-screen rounded-none border-none shadow-none">
          {loading ? (
            <div className="flex justify-center items-center h-full w-full [--radius:1rem]">
              <Item variant='muted' className="flex flex-col justify-center items-center text-center">
                <ItemMedia>
                  <Spinner />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="line-clamp-1">Loading your habits...</ItemTitle>
                </ItemContent>
              </Item>
            </div>
          ) : (
            <Card className="flex flex-col justify-center min-h-screen rounded-none border-none shadow-none">
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>Habit tracker</CardTitle>
                  <CardDescription>Log your habits</CardDescription>
                </div>
                <div>
                  <Logout onLogout={handleLogout}/>
                </div>
              </CardHeader>
              <CardContent>
                {/* Charts */}
                <div className="grid grid-cols-2 gap-4 w-full mb-8 mt-4">
                    <HabitRadialChart completed={completed} total={total}/>   
                    <HabitBarChart weeklyLog={weeklyLog}/>
                </div>
                <Tabs defaultValue='To-do' className='w-auto'>
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
                                {habits.map(habit => (
                                  <HabitEditCard key={habit.id} habits={habit} onDelete={handleDelete} onEdit={handleEdit}/>
                                ))}                
                            </Field>
                          </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
        )}
        </div>
    )
}