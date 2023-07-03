import jwt_decode from "jwt-decode";
import { getBackendLocation } from "../../common/scripts/urls";
import { createMyAccount } from "../../common/scripts/auth_repository";
import { addToCart } from "../../cart/scripts/cart_repository";

export function loginSucc(codeRes: any, setUser: any) {
    // take information from response
    console.log("google login was succ with res: ", codeRes);
    setUser(codeRes);
}


async function googleUserExists(profileObj: any) {
    const res = await fetch(`${getBackendLocation()}/api/auth/google-finduser/`, {headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({
        email: profileObj.email,
        oauth: 'google',
    })});
    const resJ = await res.json();
    if(resJ.exists)
        return true;
    else
        return false;
}

export async function setProfileFromUser(user: any, setProfile: any, setIsLoading: any, setSnackBarMessage: any) {
    // sets the profile, ie the name, email, dp etc in login view
    const breh: any = jwt_decode(user.credential);

    if(breh && (await googleUserExists(breh))) {
        // pass
    } else {
        await createMyAccount(setIsLoading, setSnackBarMessage, breh.name, breh.email, '', '', 'user', 'google', breh.picture);
    }

    localStorage.setItem('jwtToken', `Bearer ${user.credential}`);
    localStorage.setItem('loggedIn', `true`);
    setProfile(breh);
}

export async function getCartFromLocal(setIsLoading: any) {
    // cart string is stringified version of ->
    /*
    {
        '123414214': 2,
        '761273517': 1,
    }
    */
    const cart = JSON.parse(localStorage.getItem('anonymousCart') ?? '');
    if(JSON.stringify(cart) !== JSON.stringify({})) {
        await addToCart(localStorage.getItem('jwtToken')!, new Map(Object.entries(cart)), setIsLoading, undefined, true, undefined, undefined, undefined)
        localStorage.setItem('anonymousCart', '');
    }
}