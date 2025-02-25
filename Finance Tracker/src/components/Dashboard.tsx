import { Card, CardContent } from "./card";
import { Typography, Grid, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const Dashboard = () => {
  const navigate = useNavigate();
  const { transactions, budgets, walletAmount } = useSelector(
    (state: RootState) => state.budget
  );

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayedTransactions = sortedTransactions.slice(0, 5);
  const displayedBudgets = budgets.slice(0, 3);

  const buttonStyle = {
    my: 2,
    borderRadius: 2,
    background: "linear-gradient(135deg, #ff8c00, #ff3d00)",
    color: "#ffffff",
    "&:hover": {
      background: "linear-gradient(135deg, #ff6d00, #e02e00)",
    },
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box sx={{ width: "85%", margin: "auto", padding: 3 }}>
        <Grid container spacing={3} justifyContent={"space-between"}>
          {/* Left Section: Wallet & Budget */}
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Amount in Wallet</Typography>
                  <Typography variant="h4" color="green" fontWeight="bold">
                    ₹{walletAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Updated: {new Date().toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            <Grid container spacing={2} sx={{ marginTop: 5, pl: 0 }}>
              <Typography variant="h6" sx={{ pl: 3 }}>Category Budget</Typography>
              {displayedBudgets.map((budget) => (
                <Grid item xs={12} key={budget.id}>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <Card>
                      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                          <Typography variant="h6">{budget.name}</Typography>
                          <Typography variant="body1">Budget Left: ₹{budget.amountLeft}</Typography>
                        </Box>
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={buttonStyle}
                            onClick={() => navigate(`/budget/${budget.id}`)}
                          >
                            Review Budget
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {budgets.length > 2 && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outlined" color="primary" sx={buttonStyle} fullWidth onClick={() => navigate("/budget")}>
                  Show More
                </Button>
              </motion.div>
            )}
          </Grid>

          {/* Right Section: Transactions */}
          <Grid item xs={12} md={7}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="h6">Latest Transactions</Typography>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={() => navigate("/newtransaction")}>
                  Add Transaction
                </Button>
              </motion.div>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {displayedTransactions.map((transaction, index) => (
                <Grid item xs={12} key={transaction.id}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card>
                      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {transaction.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {transaction.date}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          color={transaction.amount > 0 ? "error" : "success"}
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

            {transactions.length > 5 && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outlined" color="primary" sx={buttonStyle} fullWidth onClick={() => navigate("/transactions")}>
                  View More
                </Button>
              </motion.div>
            )}
          </Grid>
        </Grid>
      </Box>
    </ErrorBoundary>
  );
};

export default Dashboard;
