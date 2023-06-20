import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';
import { useState, useEffect } from 'react';
import Forbidden from './Forbidden';
import Snacc from './common/components/SnackBarComponent';
import Loading from './common/components/Loading';
import ShoppingCart from './cart/components/ShoppingCart';
import { getFrontendLocation } from './common/scripts/urls';
import { changeCount, getUserCart, itemsToZeroCartItemObjects, listOfCartItemsToMap } from './cart/scripts/cart_repository';
import { checkJWTFromStorage, checkLoggedIn } from './common/scripts/auth_repository';
import { getItems } from './common/scripts/items_repository';




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
    

    function ItemCard(props: any) {
        return (
        <div id={props.item_id} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
            <div className=' border rounded border-slate-500 flex flex-col items-center justify-center'>
                <div onClick={() => {
                    window.location.href = `${getFrontendLocation()}/item/${props.item_id}/`
                }} className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer">
                    <img className='object-cover' alt="" src={props.image}></img>
                </div>
                <div className="flex flex-col justify-between w-full">
                    <div className='ml-5 mt-4 text-lg font-bold'>{`₹${props.price_rs}`}</div>
                    <div className='ml-5 text-xl '>{props.item_name}</div>
                    <div className='ml-5 text-sm'>{`${props.description.substring(0, 20)}...`}</div>
                    <div className=' flex items-center mb-4 ml-4 mt-2'>
                        <button className='subtractButton flex justify-center items-center bg-red-600 text-slate-100 dark:bg-red-300 dark:text-slate-800 rounded-full w-8 h-8' value={props.item_id} onClick={(e) => {changeCount(e, props.noOfItems, props.setNoOfItems);props.setShowCart(true);}}>
                            <FontAwesomeIcon icon={icon({name: 'minus', style: 'solid'})} />
                        </button>
                        <div className='px-2'>{props.thisCount}</div>
                        <button className='addButton flex justify-center items-center bg-green-600 text-slate-100 dark:bg-green-300 dark:text-slate-800 rounded-full w-8 h-8' value={props.item_id} onClick={(e) => {changeCount(e, props.noOfItems, props.setNoOfItems);props.setShowCart(true);}}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
        )
    }

    function ItemCards(props: any) {
        const listOfItems: Array<any> = props.listOfItems;
        const countMap: Map<string, number> = props.noOfItems;
        return (
            <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800
            h-screen w-full text-slate-800 dark:text-slate-100'>
                <div className='my-4 text-md md:text-xl font-bold'>All Items</div>
                <div className='flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14 '>
                {listOfItems.map(el => {
                    // map each object into component
                    const thisId: string = el.item_id ? el.item_id.toString(): `${el.item_name}///${el.date_added}`;
                    var thisCount = countMap.get(thisId);
                    thisCount = thisCount !== undefined ? thisCount : 0;
                    return <ItemCard {...{...el, "thisCount": thisCount, "key": thisId, noOfItems: props.noOfItems, setNoOfItems: props.setNoOfItems, showCart: props.showCart, setShowCart: props.setShowCart}} />
                })}
                </div>
                <ShoppingCart {...{"cart": props.noOfItems, setNoOfItems: props.setNoOfItems, "jwtToken": props.jwtToken, "setSnackBarMessage": props.setSnackBarMessage, "setIsLoading": props.setIsLoading, listOfItems: props.listOfItems, setListOfItems: props.setListOfItems, showCart: showCart, setShowCart: setShowCart}} />

                <Snacc {...{"message": snackBarMessage}} />
                <Loading {...{"isLoading": isLoading}} />
            </div>
        )
    }

    async function setupExplore(jwtToken: string) {
        await checkJWTFromStorage(setLoggedIN, setJwtToken);
        await checkLoggedIn(jwtToken, setLoggedIN, undefined, undefined, setSnackBarMessage);

        const curCart = await getUserCart(jwtToken, setIsLoading, setSnackBarMessage);
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
