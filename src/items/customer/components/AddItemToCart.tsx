import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addItemToCart } from "../../../common/scripts/items_repository";

export function AddItemToCart(props: any) {
    if(props.auth && !props.isVendor) {
        return(
            <div onClick={() => addItemToCart(props.itemId, props.auth, props.setSnackBarMessage)} className=" cursor-pointer flex gap-4 bg-green-500 dark:bg-green-300 text-slate-100 dark:text-slate-800 p-3 rounded w-fit items-center">
                <FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'solid'})} />
                <div>Add to Cart</div>
            </div>
        );
    } else {
        return null;
    }
}