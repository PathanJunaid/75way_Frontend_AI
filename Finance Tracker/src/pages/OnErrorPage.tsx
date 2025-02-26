import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function OnErrorPage() {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography variant="h2" color="error" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                sx={{ mt: 2 }}
            >
                Go to Dashboard
            </Button>
        </Box>
    );
}
