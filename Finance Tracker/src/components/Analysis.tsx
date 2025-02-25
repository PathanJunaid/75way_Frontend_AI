import React, { useState } from "react";
import {
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
    LineChart, Line
} from "recharts";
import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../store/store"; // Import useAppSelector to fetch Redux data
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

// Button Styles
const buttonStyle = {
    my: 2,
    borderRadius: 2,
    background: "linear-gradient(135deg, #ff8c00, #ff3d00)",
    color: "#ffffff",
    "&:hover": {
        background: "linear-gradient(135deg, #ff6d00, #e02e00)",
    },
};

const AnalysisPage: React.FC = () => {
    const [chartType, setChartType] = useState<"Pie" | "Bar" | "Line">("Pie");

    // Fetch budget data from Redux store
    const budgets = useAppSelector((state) => state.budget.budgets);

    // Format data for charts
    const chartData = budgets.map((budget) => ({
        name: budget.name,
        amount: budget.amount,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random colors
    }));

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Box textAlign="center" p={4}>
                <Typography variant="h4" gutterBottom>
                    Budget Analysis
                </Typography>

                {/* Chart Type Buttons */}
                <Box display="flex" justifyContent="center" gap={2} mb={2}>
                    <Button sx={buttonStyle} onClick={() => setChartType("Pie")}>Pie Chart</Button>
                    <Button sx={buttonStyle} onClick={() => setChartType("Bar")}>Bar Chart</Button>
                    <Button sx={buttonStyle} onClick={() => setChartType("Line")}>Line Chart</Button>
                </Box>

                {/* Chart Rendering */}
                <ResponsiveContainer width="100%" height={400}>
                    {chartType === "Pie" && (
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="amount"
                                nameKey="name"
                                cx="50%" cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    )}

                    {chartType === "Bar" && (
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    )}

                    {chartType === "Line" && (
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </Box>
        </ErrorBoundary>
    );
};

export default AnalysisPage;
