import React from 'react';
import { useState, useEffect } from 'react';
import Forbidden from '../../../Forbidden';
import ItemCards from './ExploreItemCards';
import { setupExplore } from '../scripts/explore';
import { Category } from '../../../models/models';


function Items(props: any) {
    
    const initList: Array<any> = [];
    const [listOfItems, setListOfItems] = useState(initList);

    const [page, setPage] = useState(0);


    const newItemCount: Map<string, number> = new Map();
    const [noOfItems, setNoOfItems] = useState(newItemCount);


    const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [category, setCategory] = useState(Category.other);
    


	useEffect(() => {
	// run a command only once
        setupExplore(jwtToken, listOfItems, page, setPage, setIsLoading, setSnackBarMessage, setLoggedIN, setJwtToken, setListOfItems, setNoOfItems)
        // eslint-disable-next-line
    }, [jwtToken]);

    
    if((typeof loggedIn === 'string' && loggedIn === 'true') || (typeof loggedIn === 'boolean' && loggedIn)) {
        //
        return (
            <>
            <div id='items'>
                <ItemCards {...{
                    listOfItems: listOfItems,
                    noOfItems: noOfItems,
                    snackBarMessage: snackBarMessage,
                    isLoading: isLoading,
                    setNoOfItems: setNoOfItems,
                    setIsLoading: setIsLoading,
                    setSnackBarMessage: setSnackBarMessage,
                    jwtToken: jwtToken,
                    setListOfItems: setListOfItems,
                    showCart: showCart,
                    setShowCart: setShowCart,
                    page: page,
                    setPage: setPage,
                    setLoggedIN: setLoggedIN,
                    category: category,
                    setCategory: setCategory,
                }} />
            </div>
            </>
        );
    } else {
        return(<Forbidden />);
    }
}

export default Items;
