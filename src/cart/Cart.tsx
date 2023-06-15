import { useEffect, useState } from "react";
import Forbidden from "../Forbidden"
import { CartItem, } from "../models/models";
import Loading from "../common/components/Loading";
import Snacc from "../common/components/SnackBarComponent";
import CartItemCards from "./CartItemCards";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getUserCart } from "./scripts/cart_repository";




export default function Cart(props: any) {

    const [loggedIn, ] = useState(localStorage.loggedIn);
    const [jwtToken, ] = useState(localStorage.jwtToken);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const initCartArray: Array<CartItem> = [];
    const [cartItems, setCartItems] = useState(initCartArray);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();



    useEffect(() => {
        // get the user's cart by giving jwt to the backend
        getUserCart(jwtToken, setIsLoading, setSnackBarMessage).then((cartArray) => {
            setCartItems(cartArray);
        })
        // eslint-disable-next-line
    }, [jwtToken]);
    if(loggedIn) {
        return(
            
            <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800
            h-screen w-full text-slate-800 dark:text-slate-100'>
                <div onClick={() => {
                    navigate(-1);
                }} className=" cursor-pointer self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>
                <div className="text-md md:text-xl font-bold mt-4">Your Cart</div>
                <CartItemCards {...{"cartItems": cartItems, "jwtToken": jwtToken, "setIsLoading": setIsLoading, "setCartItems": setCartItems, setSnackBarMessage: setSnackBarMessage}} />

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