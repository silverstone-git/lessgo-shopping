import {getBackendLocation} from "./urls";

export const carouselItemsByCategory = async (categoryNameShort: string, jwt: string) => {
    const backendLocation: string | undefined = getBackendLocation();
    const res = await fetch(`${backendLocation}/api/items/category/`, {
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify({
            "Authorization": jwt,
            "category": categoryNameShort,
        })
    });
    const resJ = await res.json();

    return resJ.carouselArray;
}