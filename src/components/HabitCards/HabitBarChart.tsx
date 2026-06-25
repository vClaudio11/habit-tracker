import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DailyLog } from "@/types";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts"

interface BarChartProps {
    weeklyLog: DailyLog[]
}

const chartConfig = {
    habits: {
        label: "Completed habits",
        color: "#6366f1",
    },
} satisfies ChartConfig

export default function HabitBarChart({ weeklyLog }: BarChartProps) {
    const chartData = weeklyLog.map(d => ({
        date: d.date,
        completed: d.completed
    }))

    return (
        <div className="w-full">
            <Card className="flex flex-col gap-6">
                <CardHeader>
                    <CardTitle>Weekly log</CardTitle>
                    <CardDescription>Completed weekly habits</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[160px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(-2)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="completed" fill="var(--chart-1)" radius={8}/>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col text-sm text-center">
                    <div className="flex items-center text-muted-foreground">
                        Last 7 days
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}