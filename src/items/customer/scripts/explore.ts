import { getUserCart, itemsToZeroCartItemObjects, listOfCartItemsToMap } from "../../../cart/scripts/cart_repository";
import { checkJWTFromStorage, checkLoggedIn } from "../../../common/scripts/auth_repository";
import { getItems } from "../../../common/scripts/items_repository";
import { pageLength } from "../../../models/models";

export async function setupExplore(jwtToken: string, listOfItems: any[], page: number, setPage: any, setIsLoading: any, setSnackBarMessage: any, setLoggedIN: any, setJwtToken: any, setListOfItems: any, setNoOfItems: any, category: string, setExploreEnd: any = undefined) {
    await checkJWTFromStorage(setLoggedIN, setJwtToken);
    await checkLoggedIn(jwtToken, setLoggedIN, undefined, undefined, setSnackBarMessage);

    const curCart = await getUserCart(jwtToken, setIsLoading, undefined, category);
    const listOfCartIds: Array<number | undefined> = curCart.map((el) => {return el.itemId});

    const newItems = await getItems(jwtToken, page, category);
    if(newItems.length < pageLength && setExploreEnd) {
        setExploreEnd(true);
    }

    const tempListOfItems = listOfItems;

    if(tempListOfItems.length <= pageLength*page) {
    // if(newItems[0].itemId !== tempListOfItems[0 + page*10].item_id) {

        const newCartItemObjects: Array<any> = await itemsToZeroCartItemObjects(newItems);

        // putting the value of count for items which dont have count 0, ie, cart added items
        for(var i = 0; i < newCartItemObjects.length; i ++) {
            const cartItemIndex = listOfCartIds.indexOf(newCartItemObjects[i].item_id);
            if(cartItemIndex !== -1) {
                newCartItemObjects[i].count = curCart[cartItemIndex].count;
            } else {
                newCartItemObjects[i].count = 0;
            }
        }

        setListOfItems(listOfItems.concat(newCartItemObjects));
        setNoOfItems(listOfCartItemsToMap(curCart));
    }
}