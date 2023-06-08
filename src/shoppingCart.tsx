import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShoppingCart(props: any) {
    if(props.cart.size > 0) {
        //
        return(
            <div className=' absolute flex justify-center items-center bottom-[2vh] right-[2vw] rounded-full h-12 w-12 bg-green-500'>
                <FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'solid'})} />
            </div>
        )
    } else {
        return null;
    }
}