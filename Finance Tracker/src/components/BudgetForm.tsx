import * as yup from "yup";
import { motion } from "framer-motion";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Typography, Box, Card, CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

// Styles using makeStyles
const useStyles = makeStyles({
    formContainer: {
        width: "50%",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
    },
    formField: {
        marginBottom: "15px",
    },
});

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

// Validation Schema using Yup
const validationSchema = yup.object().shape({
    name: yup.string().required("Budget Name is required"),
    amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required"),
    category: yup.string().required("Category is required"),
});

// Type for Form Data
type FormData = yup.InferType<typeof validationSchema>;

const BudgetForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: "onTouched",
    });

    // Form Submit Handler
    const onSubmit = (data: FormData) => {
        console.log("Submitted Data:", data);
        reset(); // Reset form after submission
        toast.success('Budget created')
        navigate('/dashboard')
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>

            <Box height="100vh"
                width="100vw"
                display="flex"
                justifyContent="center"
                alignItems="center">

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className={classes.formContainer}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Add New Budget
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                {/* Budget Name */}
                                <TextField
                                    fullWidth
                                    label="Budget Name"
                                    {...register("name")}
                                    variant="outlined"
                                    className={classes.formField}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />

                                {/* Amount */}
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    {...register("amount")}
                                    variant="outlined"
                                    type="number"
                                    className={classes.formField}
                                    error={!!errors.amount}
                                    helperText={errors.amount?.message}
                                />

                                {/* Category */}
                                <TextField
                                    fullWidth
                                    label="Category"
                                    {...register("category")}
                                    variant="outlined"
                                    className={classes.formField}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                />

                                {/* Submit Button */}
                                <Button type="submit" fullWidth sx={buttonStyle} disabled={!isValid}>
                                    Add Budget
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </motion.div>
            </Box>
        </ErrorBoundary>
    );
};

export default BudgetForm;
