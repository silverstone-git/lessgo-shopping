import { Link } from "react-router-dom";

function AppRoute(props: any) {
    if(props.loggedIn) {
        return(
                <li className="routeli">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
        );
    } else {
        return(
                <li className="routeli">
                    <Link to="/">Home</Link>
                </li>
        )
    }
}

export default AppRoute;