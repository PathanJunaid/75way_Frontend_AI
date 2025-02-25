import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

interface TransactionFormInputs {
    name: string;
    category: string;
    amount: number;
    date: string;
    budgetId: string;
}
const buttonStyle = {
    my: 2,
    borderRadius: 2,
    background: "linear-gradient(135deg, #ff8c00, #ff3d00)",
    color: "#ffffff",
    "&:hover": {
        background: "linear-gradient(135deg, #ff6d00, #e02e00)",
    },
};
const categories = [
    { label: "Food", budgetId: "1" },
    { label: "Groceries", budgetId: "1" },
    { label: "Entertainment", budgetId: "2" },
    { label: "Travel", budgetId: "3" },
    { label: "Health & Fitness", budgetId: "4" },
    { label: "Dining Out", budgetId: "5" }
];

const transactionSchema: yup.ObjectSchema<TransactionFormInputs> = yup.object({
    name: yup.string().required("Name is required"),
    category: yup.string().required("Category is required"),
    amount: yup.number().positive().integer().required("Amount is required"),
    date: yup.string().required("Date is required"), // Default to today's date
    budgetId: yup.string().required("Budget ID is required"),
});

const TransactionForm: React.FC = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, watch, formState: { errors } } = useForm<TransactionFormInputs>({
        resolver: yupResolver(transactionSchema),
        defaultValues: {
            name: "",
            category: "",
            amount: 1,
            date: new Date().toISOString().split("T")[0], // Default to today's date
            budgetId: "5",
        },
    });

    const selectedCategory = watch("category");
    const budgetId = categories.find((cat) => cat.label === selectedCategory)?.budgetId || "";

    const onSubmit = (data: TransactionFormInputs) => {
        console.log(data);
        console.log(budgetId);
        // dispatch(addTransaction({ ...data, budgetId }));
        toast.success('Transaction added');
        navigate('/dashboard');
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>

            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >

                    <Paper elevation={3} sx={{ p: 4, width: "400px", textAlign: "center" }}>
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                            <Typography variant="h5" mb={2}>
                                Add Transaction
                            </Typography>
                        </motion.div>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />}
                            />
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select label="Category" fullWidth margin="normal" error={!!errors.category} helperText={errors.category?.message}>
                                        {categories.map((cat) => (
                                            <MenuItem key={cat.label} value={cat.label}>
                                                {cat.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => <TextField {...field} type="number" label="Amount" fullWidth margin="normal" error={!!errors.amount} helperText={errors.amount?.message} />}
                            />
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => <TextField {...field} type="date" label="Date" fullWidth margin="normal" error={!!errors.date} helperText={errors.date?.message} />}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={buttonStyle}
                                fullWidth
                            >
                                Submit
                            </Button>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            </motion.div>
                        </Box>
                        {Object.keys(errors).length > 0 && (
                            <Typography color="error">Fix form errors before submitting!</Typography>
                        )}
                    </Paper>
                </motion.div>
            </Box>
        </ErrorBoundary>
    );
};

export default TransactionForm;
