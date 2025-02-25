import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Button, Box, Typography } from "@mui/material";

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" color="error">
                Oops! Something went wrong.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                {error.message}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={resetErrorBoundary}
            >
                Try Again
            </Button>
        </Box>
    );
};

export default ErrorFallback;
