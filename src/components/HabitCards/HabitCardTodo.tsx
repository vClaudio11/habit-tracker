import { Habit } from "@/types"
// use checkbox table for layout
import { Checkbox } from "@/components/ui/checkbox"
import {
  TableCell,
} from "@/components/ui/table"

interface HabitCardProps {
    habits: Habit
    onToggle: (id: number) => void
}

export function HabitTodoCard({ habits, onToggle }: HabitCardProps) {
    
    return (
        <>
            <TableCell className='w-[70%]'>
                <div className="flex items-center gap-4">
                    <Checkbox
                        checked={habits.completed}
                        onCheckedChange={() => onToggle(habits.id)}
                    />
                    <span className="font-medium">{habits.title}</span>
                </div>
            </TableCell>
            <TableCell className='w-[30%]'>{habits.type}</TableCell>
        </>
    )
}
