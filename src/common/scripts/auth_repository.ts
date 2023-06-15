import { showSnackBar } from "./snacc";
import { getBackendLocation } from "./urls";


export const checkLoggedIn = async (jwtToken: String, setLoggedIn: any, setUsername: any = undefined, setIsVendor: any, setSnackBarMessage: any = undefined) => {
  // to check if logged in at every render
  const fetchLocation = getBackendLocation();
  const res = await fetch(`${fetchLocation}/api/auth/isLoggedIn/`,
  {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "Authorization": `${jwtToken}`,
      "sendUsername": setUsername ? true : false,
  }),
  },
  )
  const resJ = await res.json();

  if(res.status === 403 || res.status === 200) {
    setLoggedIn(resJ.isLoggedIn);
    if(setUsername)
      setUsername(resJ.username);
    setIsVendor(resJ.isVendor);
  } else {
    if(setSnackBarMessage)
      showSnackBar("Unhandled Exception", setSnackBarMessage);
  }
  return resJ
};

export const checkJWTFromStorage = async (setLoggedIn: any, setJwtToken: any) => {
  const token = localStorage.getItem('jwtToken');
  if(token === '' || token === null || token === undefined) {
    setLoggedIn(false);
    setJwtToken("");
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('jwtToken', "");
  } else {
    // if such a token exists, update the authorization status
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  }
};