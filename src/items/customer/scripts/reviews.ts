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
        Authorization: jwtToken,
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

export async function getUserReviewsList(setIsLoading: any, itemId: number) {
    if(itemId === 0)
        return [];
    setIsLoading(true);
    const res = await fetch(`${getBackendLocation()}/api/reviews/`, {headers: {"Content-Type": "application/json", item_id: itemId.toString()}});
    const resJ = await res.json();
    setIsLoading(false);
    return JSON.parse(resJ.result);
}

export function mysqlToJsDateUtc(passedDate: number) {

    const d = new Date();
    // since js gives -330 offset for, say, +5:30, minus minus becomes plus
    const utcMillis = passedDate - d.getTimezoneOffset()*60*1000;

    return utcMillis;

}