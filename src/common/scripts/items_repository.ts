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


export const getHotCarouselItems = async () => {
    //
    const res  = await fetch(`${getBackendLocation()}/api/items/get-hot-items/`, {
        headers: {"Content-Type": "application/json"},
    })
    const resJ = await res.json();
    if(resJ.succ) {
        return JSON.parse(resJ.carouselArray);
    } else {
        return [[]];
    }
}

export const addItemToCart = async (itemId: string, auth: string, setSnackBarMessage: React.Dispatch<React.SetStateAction<any>>, setAlreadyCart: React.Dispatch<React.SetStateAction<any>>) =>  {
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
    setAlreadyCart(true);
}

export async function getItem(passedId: string, setIsLoading: React.Dispatch<React.SetStateAction<any>>, setSnackBarMessage: React.Dispatch<React.SetStateAction<any>>, jwtToken: string ) {
    // returns the Item item from the passed id to set the state
    setIsLoading(true);
    const options = {
        headers: {"Content-Type": "application/json", "Authorization": jwtToken},
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


export async function getItems(jwtToken: String, page: number, category: string) {

    const fetchLocation = getBackendLocation();
    const res = await fetch(`${fetchLocation}/api/items/get-items/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "Authorization": jwtToken,
            "page": page,
            "category": category,
        })
    });
    const resJ = await res.json();

    let objArr: Array<any>;
    try {
        objArr = JSON.parse(resJ.itemList);
    } catch(e) {
        objArr = [];
    }

    const itemsArr: Array<Item> = [];
    for(var i = 0; i < objArr.length; i ++) {
        itemsArr.push(Item.fromMap(objArr[i]));
    }

    return itemsArr;
}
