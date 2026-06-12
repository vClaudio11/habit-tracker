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
        <div>
            <Table>
                <TableBody>
                    <TableRow
                        key={habits.id}
                    >
                        <TableCell>
                            <Checkbox 
                                id={habits.id}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}