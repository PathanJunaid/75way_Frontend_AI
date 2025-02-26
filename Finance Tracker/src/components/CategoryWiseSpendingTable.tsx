import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const useStyles = makeStyles({
    pagination: {
        "& .MuiTablePagination-root": {
            color: "white",
        },
        "& .MuiTablePagination-toolbar": {
            color: "white",
        },
        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "white !important",
        },
        "& .MuiTablePagination-selectIcon": {
            color: "white",
        },
        "& .MuiTablePagination-actions button": {
            color: "white",
        },
    },
});

interface CategoryWiseSpendingProps {
    categoryWiseSpending: {
        [category: string]: {
            [month: string]: number;
        };
    };
    predictedMonths: string[];
}

const CategoryWiseSpendingTable = ({ categoryWiseSpending, predictedMonths }: CategoryWiseSpendingProps) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    // Convert object to an array for pagination
    const categoriesArray = Object.entries(categoryWiseSpending);

    // Paginate records
    const paginatedCategories = categoriesArray.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                            {paginatedCategories.map(([category, months]) => (
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

                {/* Pagination with Dark Theme */}
                <TablePagination
                    component="div"
                    count={categoriesArray.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[10]}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    className={classes.pagination}
                />
            </ErrorBoundary>
        </>
    );
};

export default CategoryWiseSpendingTable;
