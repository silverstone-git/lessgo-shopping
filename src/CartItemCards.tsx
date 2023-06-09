import { CartItem, } from "./models/models";

export default function CartItemCards(props: any) {
    // props.auth will be used for buying an item added to cart
    return(
        <div className="flex justify-center items-center">
            {props.cartItems.map((el: CartItem) => {
                return(
                    <div key={el.itemId} id={el.itemId?.toString()} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                        <div className=' border rounded border-slate-500 flex flex-col items-center justify-center'>
                            <div className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center">
                                <img className='object-cover' alt="" src={el.image}></img>
                            </div>
                            <div className="flex flex-col justify-between items-center">
                                <div className='ml-5'>{`${el.itemName}, ₹${el.priceRs}`}</div>
                                <div className='ml-5'>{`${el.description.substring(0, 20)}...`}</div>
                                <div className="item-count">
                                    {el.count}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}