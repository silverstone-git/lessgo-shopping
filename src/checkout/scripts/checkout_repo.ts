import { getBackendLocation, getFrontendLocation } from "../../common/scripts/urls";

export async function placeOrder(jwtToken: string, setSnackBarMessage: any, address: string | undefined = undefined) {
    const res = await fetch(`${getBackendLocation()}/api/orders/place/`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
            Authorization: jwtToken,
            address: address,
        })
    });
    const resJ = await res.json();
    if(resJ.succ) {
        window.location.href = `${getFrontendLocation()}/thankyou/`;
    } else {
        setSnackBarMessage("Some Error occurred");
    }
}