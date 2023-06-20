import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFrontendLocation } from "../common/scripts/urls";

export default function Thankyou(props: any) {

    return (
        <div className='flex flex-col justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className="text-2xl font-bold">Thank You for shopping with us</div>
            <button className="dark:bg-green-300 mt-7 dark:text-slate-600 bg-green-500 text-slate-100 p-4 text-lg rounded-full" onClick={() => {
                window.location.href = `${getFrontendLocation()}/`;
            }}>
                <FontAwesomeIcon className="mr-4" icon={icon({name: 'arrow-right', style: 'solid'})} />
                Continue Shopping
            </button>
        </div>
    );
}