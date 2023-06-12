import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LogOutRoute(props: any) {

    if((typeof props.loggedIn === 'string' && props.loggedIn === 'true') || props.loggedIn) {
        // log the user out!!!
        return(
            <a className="routeli flex items-center gap-2" href="/logout" >
                <FontAwesomeIcon icon={icon({name: 'right-from-bracket', style: 'solid'})} />
                <div className="md:block hidden">Log Out</div>
            </a>
        )
    } else {
        return null;
    }
}

export default LogOutRoute;