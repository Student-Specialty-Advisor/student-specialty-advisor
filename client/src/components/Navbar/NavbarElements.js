import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: rgb(32, 53, 73);
  height: 11.5vh;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  z-index: 12;
`;

export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #ffffff;
  }
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  margin-right: 50px;
  margin-left: 50px;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
width: 100vw; */
  }
`;

export const NavBtnLink = styled(Link)`
  background: #f39313;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  border-radius: 0.1875cm;
  font-weight: 550;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
