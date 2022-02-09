import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

function Navbar() {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/' activeStyle>
			"Logo"
		</NavLink>
		<NavLink to='/about' activeStyle>
			About
		</NavLink>
		<NavLink to='/videos' activeStyle>
			Videos
		</NavLink>
		<NavLink to='/curricilum' activeStyle>
			Curricilum
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-up'>Sign Up</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn>
		<NavBtn>
		<NavBtnLink to='/signup'>Sign Up</NavBtnLink>
		</NavBtn>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;

