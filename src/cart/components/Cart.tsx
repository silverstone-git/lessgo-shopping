import { LegacyRef, useEffect, useRef, useState } from "react";
import Forbidden from "../../Forbidden"
import { CartItem, } from "../../models/models";
import Loading from "../../common/components/Loading";
import Snacc from "../../common/components/SnackBarComponent";
import CartItemCards from "./CartItemCards";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { addToCart, getUserCart } from "../scripts/cart_repository";
import { getFrontendLocation } from "../../common/scripts/urls";
import YourCartButton from "../../common/components/YourCartButton";
import { checkLoggedIn } from "../../common/scripts/auth_repository";




export default function Cart(props: any) {

    const [loggedIn, setLoggedIn] = useState(localStorage.loggedIn);
    const [jwtToken, ] = useState(localStorage.jwtToken);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const initCartArray: Array<CartItem> = [];
    const [cartItems, setCartItems] = useState(initCartArray);
    const [isLoading, setIsLoading] = useState(false);
    const [isVendor, setIsVendor] = useState(false);
    const newItemCount: Map<string, number> = new Map();
    const [noOfItems, setNoOfItems] = useState(newItemCount);
    const [editModeOn, setEditModeOn] = useState(-1);
    let navigate = useNavigate();

    const updaterRef = useRef();



    useEffect(() => {
        // get the user's cart by giving jwt to the backend
        checkLoggedIn(jwtToken, setLoggedIn, undefined, setIsVendor, setSnackBarMessage)
        getUserCart(jwtToken, setIsLoading, setSnackBarMessage).then((cartArray) => {
            setCartItems(cartArray);
        });
        setEditModeOn(0);
        // eslint-disable-next-line
    }, [jwtToken]);
    if(editModeOn > -1) {
        // component has been mounted
        editModeOn === 1 ? (updaterRef.current as any).style.display = "flex" : (updaterRef.current as any).style.display = "none";
    }
    if(loggedIn) {
        return(
            <div className='flex flex-col pt-7 items-center bg-slate-100 dark:bg-slate-800
            h-screen w-full text-slate-800 dark:text-slate-100'>
                <div className="flex justify-between w-full">
                <div onClick={() => {
                    navigate(-1);
                }} className=" cursor-pointer self-start pl-6 md:pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>

                <div onClick={() => {
                window.location.href = `${getFrontendLocation()}/checkout/`
                }} className=" md:invisible cursor-pointer self-start pr-6 flex items-center text-md md:text-xl gap-4"><div className=" font-bold text-sm sm:text-md md:text-xl">Checkout</div><FontAwesomeIcon icon={icon({name: 'arrow-right', style: 'solid'})} /></div>

                </div>
                <div className="text-md md:text-xl font-bold mt-4">Your Cart</div>
                <CartItemCards {...{
                    cartItems: cartItems,
                    jwtToken: jwtToken,
                    setIsLoading: setIsLoading,
                    setCartItems: setCartItems,
                    setSnackBarMessage: setSnackBarMessage,
                    noOfItems: noOfItems,
                    setNoOfItems: setNoOfItems,
                    editModeOn: editModeOn,
                    setEditModeOn: setEditModeOn,
                    }} />

                <Snacc {...{"message": snackBarMessage}} />
                <Loading {...{"isLoading": isLoading}} />
                <div className="flex items-center justify-center gap-4 fixed bottom-[5vh] right-[2vw]">
                    <YourCartButton auth={jwtToken} isVendor={isVendor} cart={cartItems} />

                    <button ref={updaterRef as unknown as LegacyRef<HTMLButtonElement> | undefined} onClick={async (e) => {
                        await addToCart(jwtToken, noOfItems, setIsLoading, setSnackBarMessage, true, cartItems, setNoOfItems, setCartItems);
                        (e.target as HTMLElement).style.display = "none";
                        setEditModeOn(0);
                    }} className=" flex relative md:static bottom-6 md:bottom-0 cursor-pointer justify-center items-center rounded-full h-12 w-12 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100">
                        
                        <div className=" h-3 w-3 rounded-full bg-orange-700 absolute top-0 right-0"></div>
                        <FontAwesomeIcon icon={icon({name: 'check', style: 'solid'})} />
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <Forbidden />
        );
    }
}