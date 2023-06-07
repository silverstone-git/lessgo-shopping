
function LogOutRoute(props: any) {

    if((typeof props.loggedIn === 'string' && props.loggedIn === 'true') || props.loggedIn) {
        // log the user out!!!
        return(
            <a className="routeli" href="/logout">Log Out</a>
        )
    } else {
        return null;
    }
}

export default LogOutRoute;