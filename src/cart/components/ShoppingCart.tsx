import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../scripts/cart_repository";

export default function ShoppingCart(props: any) {


    if(props.cart.size > 0 && props.showCart) {
        //
        return(
            <button onClick={async (e) => {
                // send no Of Items to order function
                await addToCart(props.jwtToken, props.cart, props.setIsLoading, props.setSnackBarMessage, true, props.listOfItems, props.setNoOfItems, props.setListOfItems);
                props.setShowCart(false);
            }} className=' cursor-pointer fixed flex justify-center items-center bottom-[13vh] md:bottom-[5vh] right-[2vw] rounded-full h-12 w-12 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100'>
                <div className=" h-3 w-3 rounded-full bg-orange-700 absolute top-0 right-0"></div>
                <FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'solid'})} />
            </button>
        )
    } else {
        return null;
    }
}