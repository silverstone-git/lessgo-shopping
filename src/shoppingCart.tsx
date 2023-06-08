import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Snacc from "./Snacc";

export default function ShoppingCart(props: any) {

    const [snackBarMessage, setSnackBarMessage] = useState("");

    function showSnackBar(message: string) {
        setSnackBarMessage(message)
        setTimeout(() => {
            setSnackBarMessage("");
        }, 3000)
    }

    async function placeOrder(auth: string, cart: any) {
        //send a place order post request to backend

        // show loading icon

        console.log("received cart is: ");
        console.log(cart);
        let fetchLocation: string | undefined;
        if(window.location.href.search("localhost") === -1) {
            fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
        } else {
            fetchLocation = process.env.REACT_APP_CUR_SERVER;
        }
        const res = await fetch(`${fetchLocation}:8000/api/items/place-order/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "Authorization": auth,
                "cart": Object.fromEntries(cart),
            }),
        })
        const resJ = await res.json();
        if(resJ.succ) {
            showSnackBar("Order has been placed successfully");
            // proceed to clear the cart state in parent
        } else {
            showSnackBar(resJ.message);
        }

        // stop loading icon
    }
    if(props.cart.size > 0) {
        //
        return(
            <div onClick={async (e) => {
                // send no Of Items to order function
                await placeOrder(props.auth, props.cart);
            }} className=' absolute flex justify-center items-center bottom-[2vh] right-[2vw] rounded-full h-12 w-12 bg-green-500'>
                <FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'solid'})} />
            <Snacc {...{"message": snackBarMessage}} />
            </div>
        )
    } else {
        return null;
    }
}