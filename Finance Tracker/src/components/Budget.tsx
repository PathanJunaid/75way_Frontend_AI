import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Pagination,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorFallback from "./ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const buttonStyle = {
    my: 2,
    borderRadius: 2,
    background: "linear-gradient(135deg, #ff8c00, #ff3d00)",
    color: "#ffffff",
    "&:hover": {
        background: "linear-gradient(135deg, #ff6d00, #e02e00)",
    },
};

const Budget = () => {
    const { budgets } = useSelector((state: RootState) => state.budget);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState("");

    const budgetsPerPage = 10;

    const formatDateToMonth = (date: string) => date.slice(0, 7);

    const uniqueMonths = Array.from(
        new Set(budgets.map((budget) => formatDateToMonth(budget.startDate)))
    );

    const filteredBudgets = budgets.filter((budget) => {
        const matchesSearch = budget.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMonth = selectedMonth ? formatDateToMonth(budget.startDate) === selectedMonth : true;
        return matchesSearch && matchesMonth;
    });

    const sortedBudgets = [...filteredBudgets].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    const totalPages = Math.ceil(sortedBudgets.length / budgetsPerPage);
    const displayedBudgets = sortedBudgets.slice(
        (page - 1) * budgetsPerPage,
        page * budgetsPerPage
    );

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Box sx={{ width: "80%", margin: "auto", padding: 3 }}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="white">
                            Budgets
                        </Typography>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ border: "none", background: "transparent" }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={buttonStyle}
                                onClick={() => navigate(`/newbudget`)}
                            >
                                Create Budget
                            </Button>
                        </motion.button>
                    </Box>

                    {/* Search & Filter Section */}
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Search Budgets"
                                variant="outlined"
                                fullWidth
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ input: { color: "white" }, label: { color: "white" }, fieldset: { borderColor: "white" } }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: "white" }}>Select Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    sx={{ color: "white", '.MuiOutlinedInput-notchedOutline': { borderColor: "white" } }}
                                >
                                    <MenuItem value="">All Months</MenuItem>
                                    {uniqueMonths.map((month) => (
                                        <MenuItem key={month} value={month}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Budget List */}
                    <Grid container spacing={2}>
                        {displayedBudgets.map((budget, index) => (
                            <Grid item xs={12} key={budget.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card sx={{ backgroundColor: "white", color: "black" }}>
                                        <CardContent>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                {/* Left Side: Budget Details */}
                                                <Box>
                                                    <Typography variant="h6" color="black">{budget.name}</Typography>
                                                    <Typography variant="body1">Budget Left: ₹{budget.amountLeft}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {`Start: ${budget.startDate} | End: ${budget.endDate}`}
                                                    </Typography>
                                                </Box>

                                                {/* Right Side: Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    style={{ border: "none", background: "transparent" }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={buttonStyle}
                                                        onClick={() => navigate(`/budget/${budget.id}`)}
                                                    >
                                                        Show Detail
                                                    </Button>
                                                </motion.button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" marginTop={3}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            </motion.div>
        </ErrorBoundary>
    );
};

export default Budget;
