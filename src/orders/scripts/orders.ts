import { getBackendLocation } from "../../common/scripts/urls";

export async function getMyOrders(jwtToken: string, setSnackBarMessage: any, setIsLoading: any) {
    setIsLoading(true);
    const res = await fetch(`${getBackendLocation()}/api/orders/your-orders/`, {
        headers: {"Content-Type": "application/json", "Authorization": jwtToken}
    });
    const resJ: any= await res.json();
    setIsLoading(false);
    if(resJ.succ) {
        const parsedOrders = JSON.parse(resJ.orders);
        return parsedOrders;
    } else {
        setSnackBarMessage("Some Error Occurred");
        return [];
    }
}


export async function getVendorOrders(jwtToken: string, setSnackBarMessage: any, setIsLoading: any): Promise<any> {
    setIsLoading(true);
    const res = await fetch(`${getBackendLocation()}/api/orders/vendor-orders/`, {
        headers: {"Content-Type": "application/json", "Authorization": jwtToken}
    });
    const resJ: any= await res.json();
    setIsLoading(false);
    if(resJ.succ) {
        const parsedOrders = JSON.parse(resJ.orders);
        return parsedOrders;
    } else {
        setSnackBarMessage("Some Error Occurred");
        return [];
    }
}

export async function receivedPaymentFunc(orderId: number, auth: string) {
    const res = await fetch(`${getBackendLocation()}/api/orders/received-payment/`, {headers: { "Content-Type": "application/json"}, method: "POST", body: JSON.stringify({
        Authorization: auth,
        orderId: orderId,
    })});
    const resJ = await res.json();
    return resJ.succ;
}