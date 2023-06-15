import { getFrontendLocation } from "./common/scripts/urls";

function LogOut() {
    localStorage.setItem("loggedIn", 'false');
    localStorage.setItem("jwtToken", '');
    window.location.href = `${getFrontendLocation()}/`
    return (
        null
    )
}

export default LogOut;