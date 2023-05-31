
function LogOut() {
    console.log("loggginidhfajsfsjdgff ooooooooooooooooooooooooooouuuuuuuuuuuuuuuuuuuttttttttttt");
    localStorage.setItem("loggedIn", 'false');
    localStorage.setItem("jwtToken", '');
    window.location.href = "http://localhost:3005/"
    return (
        null
    )
}

export default LogOut;