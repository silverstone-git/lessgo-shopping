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