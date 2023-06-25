import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { receivedPaymentFunc } from "../scripts/orders";

export default function CompleteOrder(props: any) {
    
    const [receivedPayment, setReceivedPayment] = useState(false);
    
    useEffect(() => {
        setReceivedPayment(props.receivedPayment)
    }, [props.receivedPayment]);
    
    if(receivedPayment) {
        return(
            
                        <div onClick={(e) => {e.stopPropagation()}} className=" flex z-10 justify-center opacity-50 items-center p-5 md:p-3 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100 md:font-normal font-thin rounded-full md:border-white border md:border-0">
                            <div className="mr-4"><FontAwesomeIcon icon={icon({name: 'check', style: 'solid'})} /></div>
                            <div>Received Payment</div>
                        </div>
        )
    } else {
        return(
            
                        <button onClick={(e) => {
                            props.setIsLoading(true)
                            receivedPaymentFunc(props.orderId, props.auth).then((succ) => {
                                if(succ) {
                                    setReceivedPayment(true);
                                }
                                props.setIsLoading(false);
                            })
                            e.stopPropagation();
                        }
                        } className=" flex z-10 justify-center items-center p-5 md:p-3 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100 md:font-normal font-thin rounded-full md:border-white border md:border-0">
                            {/* <div className="mr-4"><FontAwesomeIcon icon={icon({name: 'check', style: 'solid'})} /></div> */}
                            <div>Received Payment</div>
                        </button>
        );
    }
}