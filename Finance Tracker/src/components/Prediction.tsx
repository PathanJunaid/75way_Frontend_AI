import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    FormControl,
    FormHelperText,
} from "@mui/material";
import { motion } from "framer-motion";
import { usePredictMutation } from "../services/api";
import PredictedSpendingTable from "./PredictedSpendingTable";
import CategoryWiseSpendingTable from "./CategoryWiseSpendingTable";
import { toast } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const validation = yup.object().shape({
    months: yup
        .number()
        .min(1, "Minimum value is 1")
        .max(12, "Maximum value is 12")
        .required("Months is required"),
});

type FormData = { months: number };

const useStyles = makeStyles({
    formContainer: {
        display: "flex",
        // alignItems: "center",
        width: "100%",
    },
    inputField: {
        flex: 1,
        "& .MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            transition: "border-color 0.3s ease-in-out",
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "#ff3d00" }, // Matches button color on hover
            "&.Mui-focused fieldset": { borderColor: "#ff6d00", borderWidth: 2 }, // Focus effect
        },
        "& input": { color: "white" },
        "& label": { color: "gray" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#ff6d00" }, // Label color on focus
    },
    submitButton: {
        height: "56px",
        padding: "10px 20px",
        fontSize: "16px",
        background: "linear-gradient(135deg, #ff8c00, #ff3d00)",
        color: "#ffffff",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            background: "linear-gradient(135deg, #ff6d00, #e02e00)",
            transform: "scale(1.05)",
        },
        "&:active": {
            transform: "scale(0.98)",
        },
    },
});

interface SpendingData {
    predicted_spending: {
        [month: string]: {
            amount: number;
            increase_percentage: number;
        };
    };
    category_wise: {
        [category: string]: {
            [month: string]: number;
        };
    };
}

const Prediction = () => {
    const classes = useStyles();
    const [data, setData] = useState<SpendingData | null>(null);
    const [loading, setLoading] = useState(false);
    const [predict] = usePredictMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            months: 0
        },
        resolver: yupResolver(validation),
    });

    const onSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            const res = await predict(formData).unwrap();
            console.log(res);
            if (res.data.predicted_spending) {
                setData({
                    predicted_spending: res.data.predicted_spending,
                    category_wise: res.data.category_wise || {},
                });
                toast.success('Success')
            }else{
                toast.error(res?.message)
            }
        } catch (error: any) {
            const validationError = error?.data?.data?.errors?.[0]?.msg;
            toast.error(validationError ?? error?.data?.message ?? "Something went wrong!");

        } finally {
            setLoading(false);
        }
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Box textAlign="center" p={4} sx={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Typography variant="h4" gutterBottom>
                        Spending Prediction
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        get prediction for upcoming months
                    </Typography>
                    <Box component="form" className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
                        <FormControl className={classes.inputField} fullWidth>
                            <TextField
                                label="Enter number of months"
                                type="text"
                                {...register("months")}
                                error={!!errors.months}
                            />
                            <FormHelperText sx={{ minHeight: "20px", color: "red" }}>
                                {errors.months?.message}
                            </FormHelperText>
                        </FormControl>

                        <Button sx={{ borderRadius: '0px 10px 10px 0px', minWidth: 150 }} type="submit" variant="contained" disabled={loading} className={classes.submitButton}>
                            {loading ? "Processing..." : "Submit"}
                        </Button>
                    </Box>
                </motion.div>

                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} style={{ marginTop: 20 }}>
                        <CircularProgress sx={{ color: "#ff8c00" }} />
                        <Typography mt={2} variant="body1">
                            Predicting your spending...
                        </Typography>
                    </motion.div>
                )}

                {data && !loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <PredictedSpendingTable predictedSpending={data.predicted_spending} loading={loading} />
                        <CategoryWiseSpendingTable categoryWiseSpending={data.category_wise} predictedMonths={Object.keys(data.predicted_spending)} />
                    </motion.div>
                )}
            </Box>
        </ErrorBoundary>
    );
};

export default Prediction;
