import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { createStyles } from "@mui/styles";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useLoginMutation } from "../services/api";
import PasswordInput from "./PasswordInput";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
      flex: 1,
      mx: "auto",
      borderRadius: 3,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
      background: "white", // Semi-transparent white
      backdropFilter: "blur(10px)", // Glass effect
      border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
    },
    input: {
      mt: 2,
    },
    button: {
      my: 2,
      borderRadius: 2,
      background: "linear-gradient(135deg, #ff8c00, #ff3d00)",
      color: "#ffffff",
      "&:hover": {
        background: "linear-gradient(135deg, #ff6d00, #e02e00)",
      },
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontWeight: 500,
    },
  });

type FormData = typeof validation.__outputType;

export default function LoginForm() {
  const theme = useTheme();
  const style = useStyle(theme);
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data).unwrap();
      toast.success("User logged in successfully!");
      navigate("/", { replace: true });
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0]?.msg;
      toast.error(validationError ?? error?.data?.message ?? "Something went wrong!");
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card variant="outlined" sx={style.root}>
            <CardContent
              sx={{
                p: 4,
              }}
            >
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box textAlign="center" mb={2}>
                  <Typography variant="h4" component="h1">
                    <b>Welcome!</b>
                  </Typography>
                  <Typography>Sign in to continue</Typography>
                </Box>
                <TextField
                  sx={style.input}
                  fullWidth
                  type="text"
                  placeholder="Email"
                  label="Email"
                  {...register("email")}
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                />
                <PasswordInput
                  sx={style.input}
                  fullWidth
                  placeholder="Password"
                  label="Password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
                <Button
                  type="submit"
                  sx={style.button}
                  variant="contained"
                  fullWidth
                // disabled={!isValid}
                >
                  Log in
                </Button>
                <Typography textAlign="center">
                  Don&apos;t have an account?{" "}
                  <NavLink style={style.link as CSSProperties} to="/signup">
                    Sign up
                  </NavLink>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </ErrorBoundary>
  );
}
