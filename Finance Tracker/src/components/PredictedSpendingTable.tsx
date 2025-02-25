import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

interface PredictedSpendingProps {
  predictedSpending: {
    [month: string]: {
      amount: number;
      increase_percentage: number;
    };
  };
}

const PredictedSpendingTable = ({ predictedSpending }: PredictedSpendingProps) => {
  return (
    <>
      <Typography variant="h5" mt={4}>
        Predicted Spending
      </Typography>
      <TableContainer component={Paper} sx={{ background: "#1e1e1e", color: "white" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>
                <b>Month</b>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <b>Amount ($)</b>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <b>Increase %</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(predictedSpending).map(([month, { amount, increase_percentage }]) => (
              <TableRow key={month}>
                <TableCell sx={{ color: "white" }}>{month}</TableCell>
                <TableCell sx={{ color: "white" }}>${amount.toFixed(2)}</TableCell>
                <TableCell sx={{ color: increase_percentage < 0 ? "red" : "green" }}>
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
