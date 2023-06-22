import { getBackendLocation } from "../../../common/scripts/urls";

export async function isAlreadyOrdered(jwtToken: string, itemId: number, setIsLoading: any) {
    // check if user has already ordered the item from backend
    if(itemId === undefined)
        return;
    setIsLoading(true);
    const res = await fetch(`${getBackendLocation()}/api/orders/is-ordered/`, {headers: {"Content-Type": "application/json", Authorization: jwtToken, item_id: itemId.toString()}});
    const resJ = await res.json();
    setIsLoading(false);
    return resJ.result;
}

export async function submitReview(rating: number, review: string, jwtToken: string, itemId: number) {
    console.log("received: ");
    console.log(rating, review, jwtToken, itemId);
}