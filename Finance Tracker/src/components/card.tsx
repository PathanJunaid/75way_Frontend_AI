import React from "react";
import { Card as MUICard, CardContent as MUICardContent, SxProps, Theme } from "@mui/material";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // ✅ Add this line to allow sx prop
}

export function Card({ children, sx, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MUICard
        elevation={3}
        {...props}
        sx={{
          borderRadius: 3,
          width: "100%",
          ...sx, 
        }}
      >
        {children}
      </MUICard>
    </motion.div>
  );
}

export function CardContent({ children, sx, ...props }: CardProps) {
  return <MUICardContent {...props} sx={sx}>{children}</MUICardContent>;
}
