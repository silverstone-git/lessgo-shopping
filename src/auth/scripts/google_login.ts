import jwt_decode from "jwt-decode";
import { getBackendLocation, getFrontendLocation } from "../../common/scripts/urls";
import { createMyAccount } from "../../common/scripts/auth_repository";

export function loginSucc(codeRes: any, setUser: any) {
    // take information from response
    console.log("google login was succ with res: ", codeRes);
    setUser(codeRes);
}


async function googleUserExists(profileObj: any) {
    const res = await fetch(`${getBackendLocation()}/api/auth/google-finduser/`, {headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({
        email: profileObj.email
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
        console.log("jwt decoded", breh);
    } else {
        await createMyAccount(setIsLoading, setSnackBarMessage, breh.name, breh.email, '', '', 'user', 'google', breh.picture);
    }

    localStorage.setItem('jwtToken', `Bearer ${user.credential}`);
    localStorage.setItem('loggedIn', `true`);
    setProfile(breh);
    window.location.href = `${getFrontendLocation()}/`;
}
