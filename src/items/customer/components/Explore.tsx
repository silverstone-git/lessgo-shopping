import React from 'react';
import { useState, useEffect } from 'react';
import Forbidden from '../../../Forbidden';
import { getUserCart, itemsToZeroCartItemObjects, listOfCartItemsToMap } from '../../../cart/scripts/cart_repository';
import { checkJWTFromStorage, checkLoggedIn } from '../../../common/scripts/auth_repository';
import { getItems } from '../../../common/scripts/items_repository';
import ItemCards from './ExploreItemCards';


function Items(props: any) {
    
    const initList: Array<any> = [];
    const [listOfItems, setListOfItems] = useState(initList);


    const newItemCount: Map<string, number> = new Map();
    const [noOfItems, setNoOfItems] = useState(newItemCount);


    const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showCart, setShowCart] = useState(false);
    

    async function setupExplore(jwtToken: string) {
        await checkJWTFromStorage(setLoggedIN, setJwtToken);
        await checkLoggedIn(jwtToken, setLoggedIN, undefined, undefined, setSnackBarMessage);

        const curCart = await getUserCart(jwtToken, setIsLoading, undefined);
        const listOfCartIds: Array<number | undefined> = curCart.map((el) => {return el.itemId});

        // long term plan -> get 10 items only
        const allItems = await getItems(jwtToken);
        const allCartItemObjects: Array<any> = await itemsToZeroCartItemObjects(allItems);

        // putting the value of count for items which dont have count 0, ie, cart added items
        for(var i = 0; i < allCartItemObjects.length; i ++) {
            const cartItemIndex = listOfCartIds.indexOf(allCartItemObjects[i].item_id);
            if(cartItemIndex !== -1) {
                allCartItemObjects[i].count = curCart[cartItemIndex].count;
            } else {
                allCartItemObjects[i].count = 0;
            }
        }

        setListOfItems(allCartItemObjects);
        setNoOfItems(listOfCartItemsToMap(curCart));
    }

	useEffect(() => {
	// run a command only once
        setupExplore(jwtToken)
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
                }} />
            </div>
            </>
        );
    } else {
        return(<Forbidden />);
    }
}

export default Items;
