import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';



function ItemMasterRoute(props: any) {
	// route to the items-master page if logged in

	if(props.isVendor) {
		//
		return(
			<li className="routeli">
                <Link to="/item-master"  className="flex items-center gap-2">
                        <FontAwesomeIcon icon={icon({name: 'square-plus', style: 'solid'})} />
                        <div className="hidden md:block">Add Item</div>
					
				</Link>
            </li>
		);
	} else if((typeof props.loggedIn === 'string' && props.loggedIn === 'true') || (typeof props.loggedIn === 'boolean' && props.loggedIn)) {
		return(
			<li className="routeli">
                <Link to="/items"  className="flex items-center gap-2">
					<FontAwesomeIcon icon={icon({name: 'magnifying-glass', style: 'solid'})} />
					<div className="md:block hidden">Items</div>
				</Link>
            </li>
		);
	} else {
		return(
			<li className="routeli">
                <Link to="/login"  className="flex items-center gap-2">
					<FontAwesomeIcon icon={icon({name: 'right-to-bracket', style: 'solid'})} />
					<div className="md:block hidden">Log In</div>
				</Link>
            </li>
		);
	}
}

export default ItemMasterRoute;
