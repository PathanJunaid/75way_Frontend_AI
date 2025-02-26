import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";

export default function Authenticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation(); // Get current route
  const navigation = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (route: "profile" | "logout") => {
    handleClose();
    if (route === "logout") {
      logoutUser();
      navigation("/login");
    } else {
      navigation(`/${route}`);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigation("/login");
    }
  }, [isAuthenticated]);

  const menuItems = [
    { text: "Dashboard", path: "/" },
    { text: "Budget", path: "/budget" },
    { text: "Analysis", path: "/analysis" },
    { text: "Transactions", path: "/transactions" },
    { text: "Prediction", path: "/predict" },
  ];

  // Drawer for mobile menu
  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {menuItems.map(({ text, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={path}
              sx={{
                backgroundColor: location.pathname === path ? "#5385b7" : "transparent",
                color: location.pathname === path ? "white" : "black",
                "&:hover": {
                  backgroundColor: "#5385b7",
                },
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor: "#2c3e50", position: "sticky", top: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: App Name */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            color="white"
            sx={{ textDecoration: "none", fontWeight: "bold" }}
          >
            FinanceTracker
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Center: Menu (Hidden on mobile) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
            }}
          >
            {menuItems.map(({ text, path }) => (
              <Typography
                key={text}
                component={Link}
                to={path}
                color="white"
                sx={{
                  textDecoration: "none",
                  padding: "8px 12px",
                  backgroundColor: location.pathname === path ? "#5385b7" : "transparent",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#5385b7",
                  },
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>

          {/* Right: Profile */}
          {isAuthenticated && (
            <Box>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => handleMenuItemClick("profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("logout")}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>

      <Outlet />
    </Box>
  );
}
