import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders, getVendorOrders } from "../scripts/orders";
import * as authRepo from '../../common/scripts/auth_repository';
import Forbidden from "../../Forbidden";
import Snacc from "../../common/components/SnackBarComponent";
import Loading from "../../common/components/Loading";
import { OrdersCards } from "./OrdersCards";

export function YourOrders(props: any) {
    let navigate = useNavigate();
    const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIn] = useState(localStorage.loggedIn);
	const [isVendor, setIsVendor] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [myOrders, setMyOrders] = useState([]);
    const [vendorOrders, setVendorOrders] = useState([]);
    async function yourOrdersSetup(jwtToken: string) {
        setIsLoading(true);
        await authRepo.checkJWTFromStorage(setLoggedIn, setJwtToken);
        const tempIsVendor = (await authRepo.checkLoggedIn(jwtToken, setLoggedIn, undefined, setIsVendor, setSnackBarMessage)).isVendor;
        setIsLoading(false);
        let tempMyOrders = [];
        let tempVendorOrders = [];
        if(!tempIsVendor)
            tempMyOrders = await getMyOrders(jwtToken, setSnackBarMessage, setIsLoading);
        else
            tempVendorOrders = await getVendorOrders(jwtToken, setSnackBarMessage, setIsLoading);
        setMyOrders(tempMyOrders);
        setVendorOrders(tempVendorOrders);
    }
    useEffect(() => {
        yourOrdersSetup(jwtToken);
    }, [jwtToken])
    if(loggedIn && !isVendor) {
        return(
        <div className='flex flex-col pt-[12vh] items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
            <div onClick={() => {
                navigate(-1);
            }} className=" cursor-pointer self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>
            <div className="flex flex-col items-center w-full pt-6">
                <div className=" w-full px-8  bg-slate-100 dark:bg-slate-800 pb-14 md:pb-0">
                    <OrdersCards {...{myOrders: myOrders, isVendor: isVendor}} />
                </div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
        );
    } else if(loggedIn) {
        // its a vendor!
        // now, orders pertaining to the vendor will be rendered
        return(
        <div className='flex flex-col pt-[12vh] items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
            <div onClick={() => {
                navigate(-1);
            }} className=" cursor-pointer self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>
            <div className="flex flex-col items-center w-full pt-6">
                <div className=" w-full px-8  bg-slate-100 dark:bg-slate-800 pb-14 md:pb-0">
                    <OrdersCards {...{isVendor: isVendor, myOrders: vendorOrders, auth: jwtToken, setIsLoading: setIsLoading}} />
                </div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
        )
    } else {
        return(
            <Forbidden />
        )
    }
}