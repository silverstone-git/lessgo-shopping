import { useEffect, useState } from "react";
import { checkJWTFromStorage, checkLoggedIn, getUserAddress } from "../common/scripts/auth_repository";
import Snacc from "../common/components/SnackBarComponent";
import Loading from "../common/components/Loading";
import Forbidden from "../Forbidden";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getUserCart } from "../cart/scripts/cart_repository";
import { placeOrder } from "./scripts/checkout_repo";
import React from "react";

export default function Checkout(props: any) {
    const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
    const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
    const [isVendor, setIsVendor] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [addressDefault, setAddressDefault] = useState(false);
    const [address, setAddress] = useState('');
    const initPriceQuantity: Array<Array<number>> = [];

    // price quantity array is like =>  [[price, quantity, odd/eve, order id, name]]
    const [priceQuantity, setPriceQuantity] = useState(initPriceQuantity);
    const [grandTotal, setGrandTotal] = useState(0);
    const [cartExist, setCartExist] = useState(true);
    let navigate = useNavigate();

    function toggleAddressDefault() {
        setAddressDefault(!addressDefault);
    }

    async function placeOrderFront() {
        // if address is '' and user has no address field entry, cancel the order, notify the user
        if(!addressDefault) {
            if(address.length < 6) {
                setSnackBarMessage("Please enter a valid address");
            } else {

                placeOrder(jwtToken, setSnackBarMessage, address);
            }
        } else {
            const myAddress = await getUserAddress(jwtToken);
            if(myAddress === undefined || myAddress === '') {
                setSnackBarMessage("No default was found. Please enter the address");
            } else {
                setAddress(myAddress)
                placeOrder(jwtToken, setSnackBarMessage);
            }
        }

    }

    const isAlreadyTallied = (arreee: Array<Array<number>>, id: number) => arreee.find((el) => {return (el[2] === id);})

    async function CheckoutSetup(priceQuantity: Array<Array<any>>, jwtToken: string, getUserCart: any) {
        await checkJWTFromStorage(setLoggedIN, setJwtToken);
        await checkLoggedIn(jwtToken, setLoggedIN, undefined, setIsVendor, undefined);

        // fetch cart, add prices
        const cart = await getUserCart(jwtToken, setIsLoading, setSnackBarMessage);
        if(cart.length > 0) {
            //
            const newPriceQuantity = priceQuantity.slice();
            let s = 0;
            for(var i = 0; i < cart.length; i ++) {
                if(!isAlreadyTallied(newPriceQuantity, cart[i].orderId)) {
                    newPriceQuantity.push([cart[i].priceRs, cart[i].count, cart[i]!.orderId!, i % 2, cart[i].itemName]);
                    console.log("to be added: ", (cart[i]!.priceRs * cart[i]!.count));
                    s += (cart[i]!.priceRs * cart[i]!.count);
                }
            }
            setGrandTotal(s);
            setPriceQuantity(newPriceQuantity);
        } else {
            setCartExist(false);
        }
    }
    useEffect(() => {
        CheckoutSetup(priceQuantity, jwtToken, getUserCart);
        // eslint-disable-next-line
    }, [jwtToken])
    if(isVendor) {
        return(<div id="checkout">
            <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
                <div className=" text-green-600 dark:text-green-300 text-3xl mb-6">
                    Please login as a Customer
                </div>
            </div>
        </div>);
    } else if(loggedIn && !cartExist) {
        return(<div id="checkout">
            <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
                <div className=" text-green-600 dark:text-green-300 text-3xl mb-6">
                    No Items in Cart!
                </div>
            </div>
        </div>);
    } else if(loggedIn) {
        return (
            <div id="checkout">
                <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
                <div onClick={() => {
                    navigate(-1);
                }} className=" cursor-pointer self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>

                <form action="" onSubmit={async (e) => {e.preventDefault();}} className="h-full w-full pb-14 bg-slate-100 dark:bg-slate-800 flex flex-col items-center">
                    <div className="">
                        <div className=" text-green-600 dark:text-green-300 text-3xl md:mt-0 mt-12">
                            Billing Address
                        </div>
                        <div className="mt-6">
                            Use Default Address
                            <input className="ml-4" type="checkbox" name="" id="" onChange={toggleAddressDefault} checked={addressDefault} />
                        </div>
                        <textarea onChange={(e) => setAddress(e.target.value)} className={`${addressDefault ? 'hidden' : 'block'} mt-4 w-52 h-36 item-master-input`} minLength={2} maxLength={500} />
                    </div>
                    <div className=" w-full  bg-slate-100 dark:bg-slate-800 pb-28 flex flex-col items-center">
                        <div className="md:w-5/12 w-full flex flex-col items-center mt-12">
                            <div className={` flex pl-3 py-2  md:w-auto w-[90vw] `}>
                                <div className="w-36">Name</div>
                                <div className="w-24">Price</div>
                                <div className="ml-6">Qty</div>
                            </div>
                            {priceQuantity.map((el) => {
                                return(
                                <div className={`${el[3] === 1? 'dark:bg-green-300 text-slate-800 bg-green-500' : 'bg-green-800 text-slate-100'} flex px-8 py-2 md:w-auto w-full `} id={el[2].toString()}>
                                    <div className="w-36">{el[4]}</div>
                                    <div className="w-24">{el[0]}</div>
                                    <div className="ml-6">{el[1]}</div>
                                </div>
                                )
                            })}
                            <div className={`overflow-visible bg-green-800 text-slate-100 dark:bg-green-200 dark:text-slate-700 rounded-xl w-[70vw] md:w-5/12 flex justify-center px-8 py-2 mt-6 `}>
                                <div className="flex">
                                <div className="w-24">Total</div>
                                <div className="ml-6">{grandTotal}</div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" onClick={placeOrderFront} className="dark:bg-green-300 bg-green-500 text-slate-100 dark:text-slate-800 p-4 rounded mt-6">
                            Place Order    
                        </button>
                    </div>

                </form>

                    <Snacc {...{"message": snackBarMessage}} />
                </div>
                <Loading {...{"isLoading": isLoading}} />
            </div>
        );
    } else {
        return < Forbidden />
    }
}