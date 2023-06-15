import { showSnackBar } from "../../common/scripts/snacc";
import { getBackendLocation } from "../../common/scripts/urls";
import { CartItem } from "../../models/models";

export async function getUserCart(jwtToken: string, setIsLoading: any, setSnackBarMessage: any) {
    // gets user cart by getting from backend
    setIsLoading(true);
    const fetchLocation = getBackendLocation();
    const res = await fetch(`${fetchLocation}/api/orders/cart/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "Authorization": jwtToken,
        })
    });
    const resJ = await res.json();
    const itemsArr: Array<CartItem> = [];
    if(resJ.succ) {
        for(var i = 0; i < resJ.itemsObjectList.length; i ++) {
            itemsArr.push(CartItem.fromMap(resJ.itemsObjectList[i]));
        }
    } else {
        showSnackBar(resJ.message, setSnackBarMessage);
    }
    setIsLoading(false);
    return itemsArr;
}

    export async function deleteFromCart(id: number, setIsLoading: any, setSnackBarMessage: any, cartItems: Array<CartItem>, setCartItems: any, jwtToken: string) {
        setIsLoading(true);


        // deleting from frontend
        // const newCartItems: Array<CartItem> = cardCartItems.slice();
        const newCartItems: Array<CartItem> = cartItems.slice();
        console.log("scanning for id : ", id, typeof id);
        for(var i = 0; i < newCartItems.length; i ++) {
            console.log("current id : ", newCartItems[i].orderId, typeof newCartItems[i].orderId);
            if(newCartItems[i].orderId === id) {
                newCartItems.splice(i, 1);
            }
        }
        console.log("changed array is - ", newCartItems);
        // setCardCartItems(newCartItems);
        setCartItems(newCartItems);

        // deleting from backend
        const fetchLocation = getBackendLocation();
        const res = await fetch(`${fetchLocation}/api/orders/delete-from-cart/`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                "Authorization": jwtToken,
                "id": id,
            })
        });
        const resJ = await res.json();
        if(resJ.succ) {
            showSnackBar("Item successfully deleted!", setSnackBarMessage)
        } else {
            showSnackBar(resJ.message, setSnackBarMessage)
        }
        setIsLoading(false);

    }