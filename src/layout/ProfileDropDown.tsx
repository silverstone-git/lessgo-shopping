import { useRef } from "react";
import { getFrontendLocation } from "../common/scripts/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function showDropDown(optionsMenuRef: any) {

    // showing your orders, your cart, listing, etc.
    const optionsMenu = (optionsMenuRef.current as HTMLDivElement);
    if(optionsMenu.style.opacity === "1") {
        optionsMenu.style.opacity = "0";
        setTimeout(() => {
            optionsMenu.style.display = "none";
        }, 500)
    } else {
        optionsMenu.style.opacity = "1";
        setTimeout(() => {
            optionsMenu.style.display = "flex";
        }, 100)
    }
                
}

export default function ProfileDropDown(props: any) {
    const optionsMenuRef = useRef<HTMLDivElement>(null);
    if(props.loggedIn && props.isVendor) {
        return (
            <div className="self-center justify-self-center flex flex-col items-center justify-center">
            <div onClick={() => showDropDown(optionsMenuRef)} className=" text-slate-800 dark:text-slate-100 ml-4 font-bold cursor-pointer flex">
                {props.username.split(' ')[0].length < 10 ? props.username.split(' ')[0] : `${props.username.split(' ')[0]}...`}
                {props.dp ? <img src={props.dp} alt="" className="rounded-full" /> : null }
 
            </div>

            <div ref={optionsMenuRef} className=" absolute top-10 md:top-18 right-1 w-48 px-3 py-6 gap-6 shadow-md hidden opacity-0 transition-opacity dark:bg-green-300 dark:text-slate-800 border-slate-800 dark:border-slate-100 bg-green-100  text-slate-800 border rounded-xl flex-col items-start">
                <div onClick={() => {
                    window.location.href = `${getFrontendLocation()}/your-orders/`;
                }} className="flex gap-2 w-full items-center cursor-pointer">
                    <FontAwesomeIcon icon={icon({name: 'money-check-dollar', style: 'solid'})} />
                    <div className="cursor-pointer ">Orders</div>
                </div>
            </div>
            </div>
            

        )
    } else if(props.loggedIn){
        return (
            <div className="self-center justify-self-center flex flex-col items-center justify-center">
            <div onClick={() => showDropDown(optionsMenuRef)} className=" text-slate-800 dark:text-slate-100 ml-4 font-bold cursor-pointer flex items-center">
                {!props.dp ? <div className="hidden md:block">{props.username.split(' ')[0].length < 10 ? props.username.split(' ')[0] : `${props.username.split(' ')[0]}...`}</div> : null}
                {props.dp ? <img src={props.dp} alt="" className="rounded-full h-8 w-8 ml-2" /> : null }
            </div>

            <div ref={optionsMenuRef} className=" absolute top-10 md:top-18 right-1 w-48 px-3 py-6 gap-6 shadow-md hidden opacity-0 transition-opacity dark:bg-green-300 dark:text-slate-800 border-slate-800 dark:border-slate-100 bg-green-100  text-slate-800 border rounded-xl flex-col items-start">
                <div className="flex items-center gap-2 w-full cursor-pointer" onClick={() => {
                    window.location.href = `${getFrontendLocation()}/your-orders/`;
                }}>
                    <FontAwesomeIcon icon={icon({name: 'money-check-dollar', style: 'solid'})} />
                    <div>Your Orders</div>
                </div>
                <div className="flex items-center gap-2 w-full cursor-pointer" onClick={() => {
                    window.location.href = `${getFrontendLocation()}/cart/`
                }}>
                    <FontAwesomeIcon icon={icon({name: 'shopping-cart', style: 'solid'})} />
                    <div>Cart</div>
                </div>
                <div className="flex items-center gap-2 w-full cursor-pointer" onClick={() => {
                    window.location.href = `${getFrontendLocation()}/logout/`
                }}>
                    <FontAwesomeIcon icon={icon({name: 'right-from-bracket', style: 'solid'})} />
                    <div>Log Out</div>
                </div>
            </div>
            </div>
            

        );
    } else {
        return null;
    }
}