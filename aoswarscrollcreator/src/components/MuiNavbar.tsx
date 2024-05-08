import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

export const MenuIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
};

/**
 * The app bar that appears on top of the page
 */
export const MuiNavbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" component="div">
          {"AoS Warscroll Creator "}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontStyle: "italic" }}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {" by Lordbaconbane"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};