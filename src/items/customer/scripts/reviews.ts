import { showSnackBar } from "../../../common/scripts/snacc";
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

export async function submitReview(rating: number, review: string, jwtToken: string, itemId: number, setSnackBarMessage: any, setIsLoading: any) {
    setIsLoading(true);
    const res = await fetch(`${getBackendLocation()}/api/reviews/`, {headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({
        jwtToken: jwtToken,
        itemId: itemId,
        rating: rating,
        review: review,
    })});
    const resJ = await res.json();
    setIsLoading(false);
    if(resJ.succ)
        showSnackBar("Review submitted successfully", setSnackBarMessage);
    else
        showSnackBar("Some Error Occured", setSnackBarMessage);
}

export async function getUserReviewsList(jwtToken: string, setIsLoading: any, itemId: number) {
    if(jwtToken === '' || itemId === 0)
        return [];
    setIsLoading(true);
    const res = await fetch(`${getBackendLocation()}/api/reviews/`, {headers: {"Content-Type": "application/json", Authorization: jwtToken, item_id: itemId.toString()}});
    const resJ = await res.json();
    setIsLoading(false);
    return resJ.result;
}