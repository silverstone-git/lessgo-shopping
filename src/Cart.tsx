import { useEffect, useState } from "react";
import Forbidden from "./Forbidden"
import { CartItem, } from "./models/models";
import Loading from "./Loading";
import Snacc from "./Snacc";
import CartItemCards from "./CartItemCards";




export default function Cart(props: any) {

    const [loggedIn, ] = useState(localStorage.loggedIn);
    const [jwtToken, ] = useState(localStorage.jwtToken);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const initCartArray: Array<CartItem> = [];
    const [cartItems, setCartItems] = useState(initCartArray);
    const [isLoading, setIsLoading] = useState(false);


    function showSnackBar(message: string) {
        setSnackBarMessage(message)
        setTimeout(() => {
            setSnackBarMessage("");
        }, 3000)
    }

    async function getUserCart(jwtToken: string) {
        // gets user cart by getting from backend
        setIsLoading(true);
        let fetchLocation: string | undefined;
        if(window.location.href.search('localhost') === -1) {
        fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
        } else {
        fetchLocation = process.env.REACT_APP_CUR_SERVER;
        }
        const res = await fetch(`${fetchLocation}:8000/api/orders/cart/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "Authorization": jwtToken,
            })
        });
        const resJ = await res.json();
        const itemsArr: Array<CartItem> = [];
        if(resJ.succ) {
            for(var i = 0; i < resJ.itemsObjectList.length; i ++) {
                itemsArr.push(CartItem.fromMap(resJ.itemsObjectList[i]));
            }
        } else {
            showSnackBar(resJ.message);
        }
        setIsLoading(false);
        return itemsArr;
    }

    useEffect(() => {
        // get the user's cart by giving jwt to the backend
        getUserCart(jwtToken).then((cartArray) => {
            setCartItems(cartArray);
        })
        // eslint-disable-next-line
    }, [jwtToken]);
    if(loggedIn) {
        return(
            
            <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800
            h-screen w-full text-slate-800 dark:text-slate-100'>
                Cart Items
                <CartItemCards {...{"cartItems": cartItems, "jwtToken": jwtToken, "setIsLoading": setIsLoading, "setCartItems": setCartItems}} />

                <Snacc {...{"message": snackBarMessage}} />
                <Loading {...{"isLoading": isLoading}} />
            </div>
        );
    } else {
        return (
            <Forbidden />
        );
    }
}