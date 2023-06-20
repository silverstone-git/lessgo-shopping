import { getBackendLocation, getFrontendLocation } from "../../common/scripts/urls";

export async function placeOrder(jwtToken: string, setSnackBarMessage: any) {
    const res = await fetch(`${getBackendLocation()}/api/orders/place/`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
            jwtToken: jwtToken,
        })
    });
    const resJ = await res.json();
    if(resJ.succ) {
        window.location.href = `${getFrontendLocation()}/thankyou/`;
    } else {
        setSnackBarMessage(resJ.message);
    }
}