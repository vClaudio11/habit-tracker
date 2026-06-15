export type NoteType = 'Health' | 'Education' | 'Finance' | null

export interface Habit {
    id: string
    title: string
    type: NoteType
    description: string
    completed: boolean
}