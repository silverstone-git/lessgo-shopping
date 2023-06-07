import React from 'react';
import { Link } from 'react-router-dom';



function ItemMasterRoute(props: any) {
	// route to the items-master page if logged in

	if(props.isVendor) {
		//
		return(
			<li className="routeli">
                <Link to="/item-master">Add Item</Link>
            </li>
		);
	} else if((typeof props.loggedIn === 'string' && props.loggedIn === 'true') || props.loggedIn) {
		return(
			<li className="routeli">
                <Link to="/items">Items</Link>
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
