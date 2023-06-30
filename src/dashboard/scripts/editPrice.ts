import { showSnackBar } from "../../common/scripts/snacc";
import { getBackendLocation, } from "../../common/scripts/urls";
import { Item } from "../../models/models";

export async function changeItemPrice(itemId: number, setIsloading: any, setListedItems: any, soldItems: Item[], jwtToken: string, setSnackBarMessage: any, newPrice: number) {
    setIsloading(true);
    console.log("new price is: ", )
    const res = await fetch(`${getBackendLocation()}/api/items/edit-item-price`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            Authorization: jwtToken,
            newPrice: newPrice,
            itemId: itemId,
        })
    });
    const resJ = await res.json();
    setIsloading(false);
    if(resJ.succ) {
        showSnackBar("Price Updated Successfully", setSnackBarMessage);
    } else {
        showSnackBar("Error updating the price", setSnackBarMessage);
    }
}