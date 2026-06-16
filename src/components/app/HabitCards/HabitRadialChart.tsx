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
                    <CardContent>

                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px] w-full"
                        >
                            <RadialBarChart
                                data={chartData}
                                startAngle={90}
                                endAngle={finalAngle}
                                outerRadius={90}
                                innerRadius={80}
                            >
                                <PolarGrid
                                    gridType="circle"
                                    radialLines={false}
                                    stroke="none"
                                    className="first:fill-muted last:fill-background"
                                    polarRadius={[90, 80]}
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
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-4xl font-bold"
                                                            >
                                                            {percentage}%
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
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
                    <CardFooter className="flex-col gap-2 text-sm text-center">
                        <div className="flex items-center">
                            {total === 0 ? "No habits created yet"
                            : percentage === 100 ? "Daily habits completed"
                            : `${total - completed} habit${total - completed === 1 ? "" : "s"} left to go`}                         
                        </div>
                    </CardFooter>
            </Card>
        </div>
    )
}