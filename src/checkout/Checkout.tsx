import { useEffect, useState } from "react";
import { checkJWTFromStorage, checkLoggedIn } from "../common/scripts/auth_repository";
import Snacc from "../common/components/SnackBarComponent";
import Loading from "../common/components/Loading";
import Forbidden from "../Forbidden";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Checkout(props: any) {
    const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
    const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
    const [isVendor, setIsVendor] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    async function CheckoutSetup() {
        await checkJWTFromStorage(setLoggedIN, setJwtToken);
        await checkLoggedIn(jwtToken, setLoggedIN, undefined, setIsVendor, undefined);
    }
    useEffect(() => {
        CheckoutSetup();
    })
    if(loggedIn && !isVendor) {
        return (
            <div id="checkout">
                <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
                <div onClick={() => {
                    navigate(-1);
                }} className=" cursor-pointer self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>

                    <div className=" text-green-600 dark:text-green-300 text-3xl mb-6">
                        Under Construction
                    </div>

                    <Snacc {...{"message": snackBarMessage}} />
                </div>
                <Loading {...{"isLoading": isLoading}} />
            </div>
        );
    } else if(loggedIn) {
        return(<div id="checkout">
            <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
                <div className=" text-green-600 dark:text-green-300 text-3xl mb-6">
                    Please login as a Customer
                </div>
            </div>
        </div>);
    } else {
        return < Forbidden />
    }
}