import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFrontendLocation } from "../../common/scripts/urls";
import { CartItem, } from "../../models/models";
import { deleteFromCart, listOfCartItemsToMap } from "../scripts/cart_repository";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { changeCount } from "../../cart/scripts/cart_repository";
import { useEffect } from "react";


export default function CartItemCards(props: any) {

    async function setupCartItemCart(cartItems: any) {
        await props.setNoOfItems(listOfCartItemsToMap(props.cartItems));
    }


    useEffect(() => {
        setupCartItemCart(props.cartItems);
    }, [props.cartItems])

    return(
        <div className="flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-20 w-full">
            {props.cartItems.map((el: CartItem) => {
                return(
                    <div key={el.itemId ? el.itemId.toString() : "" + el.count} id={el.itemId?.toString()}  className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                        <div className=' border rounded border-slate-500 flex flex-col items-center justify-center w-full'>
                            <div onClick={() => {
                                window.location.href = `${getFrontendLocation()}/item/${el.itemId}/`
                            }} className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer">
                                <img className='object-cover' alt="" src={el.image}></img>
                            </div>
                            <div className="flex flex-col justify-between w-full ml-6">
                                <div className="flex flex-col ml-2">
                                    <div className='mt-2 text-lg font-bold'>{`₹${el.priceRs}`}</div>
                                    <div className='my-2'>{el.itemName}</div>
                                    <div >{`${el.description.substring(0, 20)}...`}</div>
                                </div>
                                <div className=' flex items-center justify-between mb-4 ml-4 mt-4'>
                                    <div className="flex my-3">
                                        <button onClick={(e) => {
                                            deleteFromCart(el.orderId!, props.setIsLoading, props.setSnackBarMessage, props.cartItems, props.setCartItems, props.jwtToken);
                                        }} className=" h-8 w-8 dark:bg-red-300 dark:text-slate-800 text-slate-100 bg-red-600 rounded-full border border-white mr-3">
                                            <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})} />

                                        </button>
                                    </div>
                                    <div className=" flex items-center m-4 mr-8">
                                        <button className='subtractButton flex justify-center items-center bg-red-600 text-slate-100 dark:bg-red-300 dark:text-slate-800 rounded-full w-8 h-8' value={el.itemId?.toString()} onClick={(e) => {
                                            if(props.noOfItems.get(el.itemId?.toString()) !== 1) {
                                                changeCount(e, props.noOfItems, props.setNoOfItems);
                                                props.setEditModeOn(1);
                                            }
                                            }}>
                                            <FontAwesomeIcon icon={icon({name: 'minus', style: 'solid'})} />
                                        </button>
                                        <div className='px-2'>{props.noOfItems.get(el.itemId?.toString())}</div>
                                        <button className='addButton flex justify-center items-center bg-green-600 text-slate-100 dark:bg-green-300 dark:text-slate-800 rounded-full w-8 h-8' value={el.itemId?.toString()} onClick={(e) => {
                                            changeCount(e, props.noOfItems, props.setNoOfItems);
                                            props.setEditModeOn(1);
                                        }}>
                                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}