import { CartItem, Item } from "../../models/models";
import { showSnackBar } from "./snacc";
import { getBackendLocation } from "./urls";

export async function getListedItems(jwtToken: string, setIsLoading: any, setNoOfItems: any, showSnackBar: any, setSnackBarMessage: any ) {
    // gets user cart by getting from backend
    setIsLoading(true);
    const fetchLocation = getBackendLocation();
    const res = await fetch(`${fetchLocation}/api/items/listed/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "Authorization": jwtToken,
        })
    });
    const resJ = await res.json();
    const itemsArr: Array<Item> = [];
    if(resJ.succ) {
      const itemsObjectList: Array<Object> = JSON.parse(resJ.itemsObjectList);
        setNoOfItems(itemsObjectList.length);
        for(var i = 0; i < itemsObjectList.length; i ++) {
            itemsArr.push(Item.fromMap(itemsObjectList[i]));
        }
    } else {
      if(res.status === 404) {
        setNoOfItems(0);
      } else {
        showSnackBar(resJ.message, setSnackBarMessage);
      }
    }
    setIsLoading(false);
    return itemsArr;
}

export async function deleteFromListing(itemId: number | undefined, setIsLoading: any, setListedItems: any, soldItems: Array<CartItem>, jwtToken: string, setSnackBarMessage: any) {
    setIsLoading(true);

    // deleting from frontend

    // loss of generality in this line because order id is stripped from the received cart-item from parent
    const newSoldItems: Array<Item> = soldItems.slice();
    for(var i = 0; i < newSoldItems.length; i ++) {
        console.log("current orderId : ", newSoldItems[i].itemId, typeof newSoldItems[i].itemId);
        if(newSoldItems[i].itemId === itemId) {
            newSoldItems.splice(i, 1);
        }
    }
    setListedItems(newSoldItems);

    // deleting from backend

    const fetchLocation = getBackendLocation();
    const res = await fetch(`${fetchLocation}/api/items/delete-listing/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "Authorization": jwtToken,
            "itemId": itemId
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

