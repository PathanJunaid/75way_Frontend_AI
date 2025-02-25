import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Card, CardContent } from "./card";
import { Typography, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const buttonStyle = {
    my: 2,
    borderRadius: 2,
    background: "linear-gradient(135deg, #ff8c00, #ff3d00)",
    color: "#ffffff",
    "&:hover": {
        background: "linear-gradient(135deg, #ff6d00, #e02e00)",
    },
};

const Transactions = () => {
    const navigate = useNavigate();
    const { transactions } = useSelector((state: RootState) => state.budget);

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const transactionsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const displayedTransactions = sortedTransactions.slice(startIndex, startIndex + transactionsPerPage);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Box sx={{ width: "85%", margin: "auto", padding: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" fontWeight="bold" textAlign="center" color="white">
                        All Transactions
                    </Typography>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button variant="contained" color="primary" sx={buttonStyle} onClick={() => navigate(`/newtransaction`)}>
                            Add transaction
                        </Button>
                    </motion.div>
                </Box>

                <Grid container spacing={2}>
                    {displayedTransactions.map((transaction, index) => (
                        <Grid item xs={12} key={transaction.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card>
                                    <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold">
                                                {transaction.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            color={transaction.amount < 0 ? "success.main" : "error.main"}
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {transaction.amount > 0 ? `-₹${Math.abs(transaction.amount)}` : `+₹${transaction.amount}`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Box display="flex" justifyContent="center" mt={3}>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} sx={buttonStyle}>
                            Previous
                        </Button>
                    </motion.div>
                    <Typography variant="body1" sx={{ mx: 2, alignSelf: "center" }}>
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} sx={buttonStyle}>
                            Next
                        </Button>
                    </motion.div>
                </Box>
            </Box>
        </ErrorBoundary>
    );
};

export default Transactions;
