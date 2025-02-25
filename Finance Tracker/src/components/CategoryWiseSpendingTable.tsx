import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

interface CategoryWiseSpendingProps {
    categoryWiseSpending: {
        [category: string]: {
            [month: string]: number;
        };
    };
    predictedMonths: string[];
}

const CategoryWiseSpendingTable = ({ categoryWiseSpending, predictedMonths }: CategoryWiseSpendingProps) => {
    return (
        <>
            <Typography variant="h5" mt={4}>
                Category-wise Spending
            </Typography>
            <TableContainer component={Paper} sx={{ background: "#1e1e1e", color: "white", mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>
                                <b>Category</b>
                            </TableCell>
                            {predictedMonths.map((month) => (
                                <TableCell key={month} sx={{ color: "white" }}>
                                    <b>{month}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(categoryWiseSpending).map(([category, months]) => (
                            <TableRow key={category}>
                                <TableCell sx={{ color: "white" }}>{category}</TableCell>
                                {predictedMonths.map((month) => (
                                    <TableCell key={month} sx={{ color: "white" }}>
                                        ${months[month]?.toFixed(2) || "-"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default CategoryWiseSpendingTable;
