import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Skeleton } from "@mui/material";

interface PredictedSpendingProps {
  predictedSpending?: {
    [month: string]: {
      amount: number;
      increase_percentage: number;
    };
  };
  loading: boolean;
}

const PredictedSpendingTable = ({ predictedSpending, loading }: PredictedSpendingProps) => {
  return (
    <>
      <Typography variant="h5" mt={4} mb={2} sx={{ color: "white" }}>
        Predicted Spending
      </Typography>
      <TableContainer component={Paper} sx={{ background: "#1e1e1e", color: "white", borderRadius: 2, boxShadow: "0px 4px 10px rgba(255, 140, 0, 0.2)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c2c2c" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Month</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount ($)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Increase %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton variant="text" width={80} height={24} sx={{ bgcolor: "gray" }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} height={24} sx={{ bgcolor: "gray" }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={60} height={24} sx={{ bgcolor: "gray" }} />
                  </TableCell>
                </TableRow>
              ))
              : Object.entries(predictedSpending || {}).map(([month, { amount, increase_percentage }]) => (
                <TableRow key={month} sx={{ "&:hover": { backgroundColor: "#2a2a2a" } }}>
                  <TableCell sx={{ color: "white" }}>{month}</TableCell>
                  <TableCell sx={{ color: "white" }}>${amount.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: increase_percentage < 0 ? "red" : "green", fontWeight: "bold" }}>
                    {increase_percentage}%
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PredictedSpendingTable;
