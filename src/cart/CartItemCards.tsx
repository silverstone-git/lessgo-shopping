import { getFrontendLocation } from "../common/scripts/urls";
import { CartItem, } from "../models/models";
import { deleteFromCart } from "./scripts/cart_repository";

export default function CartItemCards(props: any) {

    return(
        <div className="flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14 w-full">
            {props.cartItems.map((el: CartItem) => {
                return(
                    <div key={el.itemId ? el.itemId.toString() : "" + el.count} id={el.itemId?.toString()}  className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                        <div className=' border rounded border-slate-500 flex flex-col items-center justify-center w-full'>
                            <div onClick={() => {
                                window.location.href = `${getFrontendLocation()}/item/${el.itemId}`
                            }} className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer">
                                <img className='object-cover' alt="" src={el.image}></img>
                            </div>
                            <div className="flex flex-col justify-between w-full ml-6">
                                <div className="flex flex-col ml-2">
                                    <div className='my-2'>{`${el.itemName}, ₹${el.priceRs}`}</div>
                                    <div >{`${el.description.substring(0, 20)}...`}</div>
                                    <div className="item-count my-2">
                                        Quantity: {el.count}
                                    </div>
                                </div>
                                <div className="flex my-3">
                                    <button onClick={(e) => {
                                        deleteFromCart(el.orderId!, props.setIsLoading, props.setSnackBarMessage, props.cartItems, props.setCartItems, props.jwtToken);
                                    }} className="p-4 dark:bg-red-300 dark:text-slate-800 text-slate-100 bg-red-600 rounded-full border border-white mr-3">Delete</button>
                                    {/* <button className="p-4 dark:bg-green-300 dark:text-slate-800 text-slate-100 bg-green-600 rounded-full border border-white">Buy</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}