import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

interface RadialChartProps {
    completed: number
    total: number
}

const chartConfig = {
    habits: {
        label: "habits",
        color: "#6366f1"
    }
}   satisfies ChartConfig

export default function HabitRadialChart({completed, total}: RadialChartProps) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    const chartData = [{ value: percentage, fill: "#6366f1"}]
    const finalAngle = 90 - (360 * (percentage / 100))
    
    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Daily log</CardTitle>
                    <CardDescription>Daily completed habits</CardDescription>
                </CardHeader>
                    <CardContent className="flex justify-center">

                        <ChartContainer
                            config={chartConfig}
                            className="h-[160px] w-[160px]"
                        >
                            <RadialBarChart
                                data={chartData}
                                startAngle={90}
                                endAngle={finalAngle}
                                outerRadius={60}
                                innerRadius={50}
                                cx="50%"
                                cy="50%"
                            >

                            <PolarGrid
                                gridType="circle"
                                radialLines={false}
                                stroke="none"
                                className="first:fill-muted last:fill-background"
                                polarRadius={[60, 50]}
                            />
                            <RadialBar 
                                dataKey="value" 
                                background 
                                cornerRadius={10}
                            />
                            
                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x="50%"
                                                        y="50%"
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                    >
                                                        <tspan
                                                            x="50%"
                                                            dy="-4"
                                                            className="fill-foreground text-2xl font-bold"
                                                            >
                                                            {percentage}%
                                                        </tspan>
                                                        <tspan
                                                            x="50%"
                                                            dy="20"
                                                            className="fill-muted-foreground text-xs"
                                                            >
                                                            {completed}/{total} Done
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />


                                </PolarRadiusAxis>
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col text-sm text-center">
                        <div className="flex items-center text-muted-foreground">
                            {total === 0 ? "No habits created yet"
                            : percentage === 100 ? "Daily habits completed"
                            : `${total - completed} habit${total - completed === 1 ? "" : "s"} left to go`}                         
                        </div>
                    </CardFooter>
            </Card>
        </div>
    )
}