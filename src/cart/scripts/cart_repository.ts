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

export async function addToCart(auth: string, cart: Map<string, number>, setIsLoading: React.Dispatch<React.SetStateAction<any>>, setSnackBarMessage: React.Dispatch<React.SetStateAction<any>>, strictMode: boolean, originalCartArray: Array<CartItem> | undefined) {
    //send a place order post request to backend

    // show loading icono

    setIsLoading(true);

    let snaccMessage = "Item(s) added to cart successfully";

    if(strictMode && originalCartArray) {
        // compare the new cart item count to old and send the difference as count to backend so as to
        // let negative value to be sent when user wants to decrease cart items
        for (var i = 0; i < originalCartArray.length; i ++) {
            cart.set(originalCartArray[i].itemId!.toString(), cart.get(originalCartArray[i].itemId!.toString())! - originalCartArray[i].count );
        }
        snaccMessage = "Updated Cart Successfully!"
    }

    const fetchLocation = getBackendLocation();
    const res = await fetch(`${fetchLocation}/api/orders/add-to-cart/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "Authorization": auth,
            "cart": Object.fromEntries(cart),
        }),
    })
    const resJ = await res.json();
    if(resJ.succ) {
        showSnackBar(snaccMessage, setSnackBarMessage);
        // proceed to clear the cart state in parent
    } else {
        showSnackBar(resJ.message, setSnackBarMessage);
    }

    if(strictMode && originalCartArray) {
        // set the difference map back to normal map for frontend heap reasons
        for (var i = 0; i < originalCartArray.length; i ++) {
            cart.set(originalCartArray[i].itemId!.toString(), cart.get(originalCartArray[i].itemId!.toString())! + originalCartArray[i].count );
        }
    }

    // stop loading icon
    setIsLoading(false);
}



export function listOfCartItemsToMap(cartItems: Array<CartItem>) {
    const newMap = new Map<string, number>;
    for(var i = 0; i < cartItems.length; i ++) {
        newMap.set(cartItems[i].itemId!.toString(), cartItems[i].count);
    }
    return newMap;
}

export function changeCount(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, noOfItems: Map<string, number>, setNoOfItems: any) {

    // strict mode means that the number to be sent can be negative as well, so as to decrease no. of items in cart

    var breh: Map<string, number> = new Map();
    const newArr = Array.from(noOfItems.entries());
    for( var i = 0; i < newArr.length; i ++) {
        if(newArr[i][1] > 0) {
            breh.set(newArr[i][0], newArr[i][1]);
        }
    }
    const thisID = e.currentTarget.value;
    const thisCount = noOfItems.get(thisID) ? noOfItems.get(thisID) : 0;
    if(e.currentTarget.classList.contains('addButton')) {
        breh.set(thisID, thisCount ? thisCount + 1 : 1)
    } else if(e.currentTarget.classList.contains('subtractButton')) {
        if(thisCount === 0 || thisCount === undefined) {
            // pass
        } else if(thisCount === 1) {
            breh.delete(thisID);
        } else {
            breh.set(thisID, thisCount - 1);
        }
    }
    setNoOfItems(breh);
}