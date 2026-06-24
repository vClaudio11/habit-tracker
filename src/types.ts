export type NoteType = 'Health' | 'Education' | 'Finance' | null

export interface Habit {
    id: number
    title: string
    type: NoteType
    description: string
    completed: boolean
}

export interface DailyLog {
    date: string
    completed: number
    total: number
}