import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/MarvelLogo.png';
import  './Nav.scss';

const Nav: React.SFC = () => (
	<React.Fragment>
		<ul className="nav">
			<li>
				<NavLink
					exact={true}
					activeClassName="active"
					to="/"
				>
					Summary
				</NavLink>
			</li>
			<li>
				<NavLink
					activeClassName="active"
					to="/favourites"
				>
					Favourites
				</NavLink>
			</li>
		</ul>
		<div className="logo-container">
			<img src={Logo} alt="logo" className="logo" />
		</div>
	</React.Fragment>
);

export default Nav;