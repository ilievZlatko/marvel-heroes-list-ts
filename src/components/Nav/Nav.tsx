import * as React from 'react';
import { NavLink } from 'react-router-dom';
import  './Nav.scss';

const Nav: React.SFC = () => (
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
);

export default Nav;