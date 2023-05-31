
function LogOutRoute(props: any) {

    if(props.loggedIn) {
        // log the user out!!!
        return(
            <a className="routeli" href="/logout">Log Out</a>
        )
    } else {
        return null;
    }
}

export default LogOutRoute;