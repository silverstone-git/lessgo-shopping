import { CartItem, } from "./models/models";

export default function CartItemCards(props: any) {
    // props.auth will be used for buying an item added to cart
    return(
        <div className="flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14">
            {props.cartItems.map((el: CartItem) => {
                return(
                    <div key={el.itemId} id={el.itemId?.toString()} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                        <div className=' border rounded border-slate-500 flex flex-col items-center justify-center'>
                            <div className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center">
                                <img className='object-cover' alt="" src={el.image}></img>
                            </div>
                            <div className="flex flex-col justify-between items-center">
                                <div className='my-2'>{`${el.itemName}, ₹${el.priceRs}`}</div>
                                <div>{`${el.description.substring(0, 35)}...`}</div>
                                <div className="item-count my-2">
                                    Quantity: {el.count}
                                </div>
                                <div className="flex justify-between my-3">
                                    <button className="p-4 dark:bg-red-300 dark:text-slate-800 text-slate-100 bg-red-600 rounded-full border border-white mr-3">Delete</button>
                                    <button className="p-4 dark:bg-green-300 dark:text-slate-800 text-slate-100 bg-green-600 rounded-full border border-white">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}