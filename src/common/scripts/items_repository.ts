import { Item } from "../../models/models";
import { showSnackBar } from "./snacc";
import {getBackendLocation} from "./urls";

export const carouselItemsByCategory = async (categoryNameShort: string, jwt: string): Promise<string[][]> => {
    const backendLocation: string | undefined = getBackendLocation();
    const res = await fetch(`${backendLocation}/api/items/category/`, {
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify({
            Authorization: jwt,
            category: categoryNameShort,
        })
    });
    const resJ = await res.json();
    if(resJ.succ) {
        return JSON.parse(resJ.carouselArray);
    } else {
        return [[]];
    }

}

export const addItemToCart = async (itemId: string, auth: string, setSnackBarMessage: any) =>  {
    const cartMap = (new Map<string, number>()).set(itemId.toString(), 1);
    const cartObj = Object.fromEntries(cartMap);

    const res = await fetch(`${getBackendLocation()}/api/orders/add-to-cart`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
            Authorization: auth,
            cart: cartObj,
        })
    });
    const resJ = await res.json();
    resJ.succ ? setSnackBarMessage("Item added to cart successfully") : setSnackBarMessage(resJ.message);
}

export async function getItem(passedId: string, setIsLoading: any, setSnackBarMessage: any) {
    // returns the Item item from the passed id to set the state
    setIsLoading(true);
    const options = {
        headers: {"Content-Type": "application/json"},
    }
    const fetchLocation = getBackendLocation();
    const res = await fetch(`${fetchLocation}/api/items/get-item/${passedId}/`, options);
    const resJ = await res.json();
    setIsLoading(false);
    if(resJ.succ) {
        return Item.fromMap(JSON.parse(resJ.itemObjStr));
    } else {
        showSnackBar(resJ.message, setSnackBarMessage);
        return null
    }
}
