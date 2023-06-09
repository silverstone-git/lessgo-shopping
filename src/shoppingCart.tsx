import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShoppingCart(props: any) {


    async function addToCart(auth: string, cart: any) {
        //send a place order post request to backend

        // show loading icono

        props.setIsLoading(true);

        let fetchLocation: string | undefined;
        if(window.location.href.search("localhost") === -1) {
            fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
        } else {
            fetchLocation = process.env.REACT_APP_CUR_SERVER;
        }
        const res = await fetch(`${fetchLocation}:8000/api/orders/add-to-cart/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "Authorization": auth,
                "cart": Object.fromEntries(cart),
            }),
        })
        const resJ = await res.json();
        if(resJ.succ) {
            props.showSnackBar("Item(s) added to cart successfully");
            // proceed to clear the cart state in parent
        } else {
            props.showSnackBar(resJ.message);
        }

        // stop loading icon
        props.setIsLoading(false);
    }
    if(props.cart.size > 0) {
        //
        return(
            <button onClick={async (e) => {
                // send no Of Items to order function
                await addToCart(props.auth, props.cart);
            }} className=' cursor-pointer absolute flex justify-center items-center bottom-[2vh] right-[2vw] rounded-full h-12 w-12 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100'>
                <FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'solid'})} />
            </button>
        )
    } else {
        return null;
    }
}