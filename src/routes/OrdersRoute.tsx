import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrdersRoute(props: any) {
    if(((typeof props.loggedIn === 'string' && props.loggedIn === 'true') || props.loggedIn) && props.isVendor) {
        return(
            <a className="routeli flex items-center gap-2" href="/your-orders" >
                <FontAwesomeIcon icon={icon({name: 'money-check-dollar', style: 'solid'})} />
                <div className="md:block hidden">Orders</div>
            </a>
        )
    } else {
        return null;
    }
}