import { Habit } from "@/types"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

// use checkbox table for layout
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface HabitCardProps {
    habits: Habit
}

export function HabitTodoCard({ habits }: HabitCardProps) {
    
    return (
        <>
            <TableCell className='w-[70%]'>
                <div className="flex items-center gap-4">
                    <Checkbox/>
                    <span className="font-medium">{habits.title}</span>
                </div>
            </TableCell>
            <TableCell className='w-[30%]'>{habits.type}</TableCell>
        </>
    )
}
