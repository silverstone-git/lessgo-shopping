import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getFrontendLocation } from "../../common/scripts/urls"
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function YourCartButton(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
  }, [navigate]);

    if(props.auth && window.location.href.search('cart') === -1 && !props.isVendor) {
        // if the user is authed up and isnt already in the cart section, show a button to take them to cart
        return (
            <div className=' md:text-sm text-xl text-slate-600 dark:text-slate-200 md:my-0 my-12 ml-6'>
            <button onClick={() => {
                window.location.href = `${getFrontendLocation()}/cart/`
            }
            } className=" flex justify-center items-center p-5 md:p-3 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100 md:font-normal font-thin rounded-full md:border-white border md:border-0">
                <div className="mr-4"><FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'solid'})} /></div>
                <div>Your Cart</div>
            </button>
            </div>
        )
    } else if(props.auth && !props.isVendor) {
        return(
            <div className=' text-sm text-slate-600 dark:text-slate-200 md:my-0 my-12 ml-6'>
            <button onClick={() => {
                window.location.href = `${getFrontendLocation()}/checkout/`
            }
            } className=" flex justify-center items-center p-3 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100 md:font-normal font-thin rounded-full md:border-white border md:border-0">
                <div className="mr-4"><FontAwesomeIcon icon={icon({name: 'arrow-right', style: 'solid'})} /></div>
                <div>Checkout</div>
            </button>
            </div>
        )
    } else {
        return null;
    }
}