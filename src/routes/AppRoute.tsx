import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function AppRoute(props: any) {
    return(
                <li className="routeli">
                    <Link to={(typeof props.loggedIn === 'string' && props.loggedIn === 'true') || (typeof props.loggedIn === 'boolean' && props.loggedIn)? "/home": "/"} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={icon({name: 'house', style: 'solid'})} />
                        <div className="md:block hidden">Home</div>
                    </Link>
                </li>
        );
}

export default AppRoute;