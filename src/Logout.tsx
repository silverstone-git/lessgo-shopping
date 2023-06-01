
function LogOut() {
    localStorage.setItem("loggedIn", 'false');
    localStorage.setItem("jwtToken", '');
    window.location.href = "http://localhost:3005/"
    return (
        null
    )
}

export default LogOut;