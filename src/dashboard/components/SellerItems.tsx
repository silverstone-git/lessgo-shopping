import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFrontendLocation } from "../../common/scripts/urls";
import { deleteFromListing } from "../../common/scripts/vendor_repository";
import { CartItem, } from "../../models/models";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { changeItemPrice } from "../scripts/editPrice";
import { useRef, useState } from "react";

export default function SellerItems(props: any) {

    const priceInputRef = useRef(null);
    const [newPrice, setNewPrice] = useState(0);

    
    if(props.soldItems.length > 0) {
        return(
            <div className="flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14 w-full">
                {props.soldItems.map((el: CartItem) => {
                    return(
                        <div key={el.itemId} id={el.itemId?.toString()} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                            <div className=' border rounded border-slate-500 flex flex-col items-center justify-center'>
                                <div className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer" onClick={() => {
                                    window.location.href = `${getFrontendLocation()}/item/${el.itemId}/`
                                }}>
                                    <img className='object-cover' alt="" src={el.image}></img>
                                </div>
                                <div className="flex flex-col justify-between ml-6 w-full">
                                    {props.itemPriceEditMode !== el.itemId 
                                    ? <div className="mt-2 ml-2 text-lg font-bold">₹{el.priceRs}</div>
                                    : <input ref={priceInputRef} type="number" defaultValue={el.priceRs} className="w-9/12" onChange={(e) => {
                                        setNewPrice(Number(e.target.value));
                                    }} />
                                    }
                                    <div className='mt-2 ml-2'>{el.itemName}</div>
                                    <div className="mt-2 ml-2">{`${el.description.substring(0, 20)}...`}</div>
                                    <div className="flex gap-4 my-3">
                                        <button onClick={() => {
                                            // send delete command to orders table given the order id with status  column 0
                                            deleteFromListing(el.itemId, props.setIsLoading, props.setListedItems, props.soldItems, props.jwtToken, props.setSnackBarMessage);
                                        }} className="h-8 w-8 dark:bg-red-300 dark:text-slate-800 text-slate-100 bg-red-600 rounded-full ">
                                            <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})} />
                                        </button>

                                        {/* edit button */}
                                        {props.itemPriceEditMode !== el.itemId ? <button onClick={() => {
                                            props.setItemPriceEditMode(el.itemId);
                                        }} className="h-8 w-8 dark:bg-green-300 dark:text-slate-800 text-slate-100 bg-green-600 rounded-full ">
                                            <FontAwesomeIcon icon={icon({name: 'edit', style: 'solid'})} />
                                        </button> : null }

                                        {/* save price button */}
                                        {props.itemPriceEditMode === el.itemId ? <button onClick={async () => {
                                            await changeItemPrice(el.itemId!, props.setIsLoading, props.setListedItems, props.soldItems, props.jwtToken, props.setSnackBarMessage, newPrice);
                                            props.setItemPriceEditMode(0);
                                        }} className="h-8 w-8 dark:bg-green-300 dark:text-slate-800 text-slate-100 bg-green-600 rounded-full ">
                                            <FontAwesomeIcon icon={icon({name: 'check', style: 'solid'})} />
                                        </button> : null }

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return(
            <div className="mt-7 md:text-xl text-md font-bold">Please Add Items from the 'Add Items' section!</div>
        )
    }

}