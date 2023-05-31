import React from 'react';
import { Link } from 'react-router-dom';



function ItemMasterRoute(props: any) {
	// route to the items-master page if logged in
	console.log(`props received by item master conditional renderer are: ${props.jwtToken} and ${props.loggedIn}`)
	if(props.loggedIn) {
		return(
			<li className="routeli">
                <Link to="/item-master">Items</Link>
            </li>
		);
	} else {
		return(
			<li className="routeli">
                <Link to="/login">Login</Link>
            </li>
		);
	}
}

export default ItemMasterRoute;
