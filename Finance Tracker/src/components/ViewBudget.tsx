import { Card, CardContent, Typography, Grid, Divider, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
}

const ViewBudget = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const budgetDetails = useSelector((state: RootState) =>
    state.budget.budgets.find((budget) => budget.id === id)
  );

  const transactions = useSelector((state: RootState) =>
    state.budget.transactions.filter((txn) => txn.budgetId === id)
  );

  const [page, setPage] = useState(0);
  const transactionsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (!budgetDetails) {
    return <Typography variant="h6" textAlign="center">Budget not found</Typography>;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
      >
        <Card sx={{ width: "85%", maxWidth: 700, p: 3, boxShadow: 4 }}>
          {/* Back Text */}
          <Typography
            variant="body2"
            color="primary"
            sx={{ mt: 2, ml: 2, cursor: "pointer", textAlign: "left", textDecoration: "underline", display: "flex", alignItems: "center" }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
            Back
          </Typography>
          <CardContent>
            {/* Budget Details */}
            <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
              {budgetDetails.name}
            </Typography>
            <Typography color="text.secondary" textAlign="center">
              {budgetDetails.description}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Budget Amount:</strong> ₹{budgetDetails.amount}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Amount Left:</strong> ₹{budgetDetails.amountLeft}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Start Date:</strong> {budgetDetails.startDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>End Date:</strong> {budgetDetails.endDate}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Transactions */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Transactions in this Period
            </Typography>

            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {transactions.slice(page * transactionsPerPage, (page + 1) * transactionsPerPage).map((txn, index) => (
                <Card key={txn.id} sx={{ my: 1, p: 2, boxShadow: 1 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {txn.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {txn.category} - {txn.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body1" color={txn.amount > 0 ? "error" : "success"}>
                        ₹{txn.amount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Button sx={buttonStyle} onClick={handlePrev} disabled={page === 0} variant="contained">
                Previous
              </Button>
              <Typography variant="body2" sx={{ alignSelf: "center" }}>
                Page {page + 1} of {totalPages}
              </Typography>
              <Button sx={buttonStyle} onClick={handleNext} disabled={page >= totalPages - 1} variant="contained">
                Next
              </Button>
            </Grid>
          </CardContent>
        </Card>


      </motion.div>
    </ErrorBoundary>
  );
};

export default ViewBudget;
