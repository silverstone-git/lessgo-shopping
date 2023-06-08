
function LogOut() {
    localStorage.setItem("loggedIn", 'false');
    localStorage.setItem("jwtToken", '');

    let goTo: string | undefined;
    if(window.location.href.search('localhost') === -1) {
    goTo = process.env.REACT_APP_LOCAL_SERVER;
    } else {
    goTo = process.env.REACT_APP_CUR_SERVER;
    }
    window.location.href = `${goTo}:3005/`
    return (
        null
    )
}

export default LogOut;