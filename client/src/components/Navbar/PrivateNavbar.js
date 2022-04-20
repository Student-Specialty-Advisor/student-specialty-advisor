import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Dropdown from "./Dropdown";
import {
  NavItems,
  DropDownElements1,
  DropDownElements2,
  DropDownElements3,
} from "./NavItems";
import {
  StyledButton,
  StyledListItem,
} from "../Basic Elements/StyledBasicElements";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Settings";
import QuizIcon from "@mui/icons-material/Quiz";
import ProgramsIcon from "@mui/icons-material/School";
import VideosIcon from "@mui/icons-material/VideoLibrary";
import MeetingsIcon from "@mui/icons-material/Groups";
import ForumIcon from "@mui/icons-material/Forum";

function PrivateNavbar(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropDown, showDropDown] = useState(false);
  const [dropDown2, showDropDown2] = useState(false);
  const [dropDown3, showDropDown3] = useState(false);

  const logout = () => {
    AuthService.logout();
    window.location.href = "/login";
  };
  const isAdmin = AuthService.isAdmin();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-flex">
          <div className="navbar-logo-container">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
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
                      props.history.push("/profile");
                    }}
                  >
                    <ListItemIcon>
                      <ProfileIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Profile" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Logout" />
                  </StyledListItem>
                  <Divider
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  />
                  {isAdmin ? (
                    <StyledListItem
                      button
                      onClick={() => {
                        setIsOpen(false);
                        props.history.push("/dashboard");
                      }}
                    >
                      <ListItemIcon>
                        <DashboardIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText color="inherit" primary="Dashboard" />
                    </StyledListItem>
                  ) : null}
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/quiz");
                    }}
                  >
                    <ListItemIcon>
                      <QuizIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      color="inherit"
                      primary="Compatibility Quiz"
                    />
                  </StyledListItem>
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/programs/se");
                    }}
                  >
                    <ListItemIcon>
                      <ProgramsIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Programs" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/videos/se");
                    }}
                  >
                    <ListItemIcon>
                      <VideosIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Videos" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/meetings/about");
                    }}
                  >
                    <ListItemIcon>
                      <MeetingsIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Meetings" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    onClick={() => {
                      setIsOpen(false);
                      props.history.push("/forum");
                    }}
                  >
                    <ListItemIcon>
                      <ForumIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText color="inherit" primary="Community Forum" />
                  </StyledListItem>
                </List>
              </Drawer>
            </>
          ) : (
            <>
              <ul className="nav-items">
                {isAdmin ? (
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : null}
                {NavItems.map((item) => {
                  if (item.title === "Programs") {
                    return (
                      <li
                        key={item.id}
                        className={item.cName}
                        onMouseEnter={() => showDropDown(true)}
                        onMouseLeave={() => showDropDown(false)}
                      >
                        <p>{item.title}</p>
                        {dropDown && (
                          <Dropdown
                            elements={DropDownElements1}
                            classClicked="services-subMenu clicked"
                            classSubMenu="services-subMenu"
                          />
                        )}
                      </li>
                    );
                  } else if (item.title === "Videos") {
                    return (
                      <li
                        key={item.id}
                        className={item.cName}
                        onMouseEnter={() => showDropDown2(true)}
                        onMouseLeave={() => showDropDown2(false)}
                      >
                        <p>{item.title}</p>
                        {dropDown2 && (
                          <Dropdown
                            elements={DropDownElements2}
                            classClicked="services-subMenu clicked2"
                            classSubMenu="services-subMenu2"
                          />
                        )}
                      </li>
                    );
                  } else if (item.title === "Meetings") {
                    return (
                      <li
                        key={item.id}
                        className={item.cName}
                        onMouseEnter={() => showDropDown3(true)}
                        onMouseLeave={() => showDropDown3(false)}
                      >
                        <p>{item.title}</p>
                        {dropDown3 && (
                          <Dropdown
                            elements={DropDownElements3}
                            classClicked="services-subMenu clicked3"
                            classSubMenu="services-subMenu3"
                          />
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.id} className={item.cName}>
                      <Link
                        className="nav-item-link"
                        to={item.path}
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="btn-container">
                <StyledButton
                  variant="contained"
                  size="large"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    props.history.push("/profile");
                  }}
                >
                  Profile
                </StyledButton>
                <StyledButton variant="contained" size="large" onClick={logout}>
                  Log Out
                </StyledButton>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default PrivateNavbar;
