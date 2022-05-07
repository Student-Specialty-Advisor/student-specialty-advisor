import React from "react";
import { Link } from "react-router-dom";
import {
  StyledButton,
  StyledListItem,
} from "../Basic Elements/StyledBasicElements";
import {
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChatBotIcon from "@mui/icons-material/SmartToyOutlined";

function PublicNavbar(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-flex">
          <div className="navbar-logo-container">
            <Link to="/">
              <img
                className="navbar-logo"
                src={props.logo}
                alt="logo is still loading.."
              ></img>
            </Link>
          </div>
          {props.isMobile ? (
            <>
              <IconButton
                color="inherit"
                sx={{ color: "white", display: isOpen ? "none" : null }}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                PaperProps={{ sx: { backgroundColor: "var(--mydarkblue)" } }}
                anchor="right"
                open={isOpen}
                onClose={() => {
                  setIsOpen(false);
                }}
              >
                <List className="nav-drawer">
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/login");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <ListItemIcon>
                      <LoginIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Login" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/signup");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <ListItemIcon>
                      <AccountBoxIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Sign Up" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/assistance");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <ListItemIcon>
                      <ChatBotIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Assistance" />
                  </StyledListItem>
                </List>
              </Drawer>
            </>
          ) : (
            <div className="btn-container">
              <StyledButton
                variant="contained"
                size="large"
                onClick={() => {
                  props.history.push("/login");
                }}
              >
                Login
              </StyledButton>
              <StyledButton
                variant="contained"
                size="large"
                onClick={() => {
                  props.history.push("/signup");
                }}
              >
                Sign Up
              </StyledButton>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default PublicNavbar;
