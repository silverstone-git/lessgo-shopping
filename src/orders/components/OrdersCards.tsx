import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFrontendLocation } from "../../common/scripts/urls";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export function OrdersCards(props: any) {
    if(props.myOrders.length > 0 && !props.isVendor) {
    return(

        props.myOrders.map((el: any) => {
            return(
                <div id={el.item_id} onClick={() => {
                    window.location.href = `${getFrontendLocation()}/item/${el.item_id}`
                }} className="flex md:flex-row flex-col-reverse cursor-pointer justify-between bg-opacity-30 bg-slate-400 rounded-md w-full my-8 py-4 px-4">
                    <div className="flex flex-col gap-2">
                        <div className="mt-4 md:mt-0">{el.item_name}</div>
                        <div>₹{el.price_rs}</div>
                        <div>Quantity - {el.count}</div>
                        <div>{el.description.substring(0, 20)}...</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-36 h-36 flex justify-center items-center overflow-hidden">
                            <img src={el.image} className="object-cover" alt="" />
                        </div>
                    </div>
                </div>
            );
        }))
    } else if(props.myOrders.length > 0) {
        console.log(props.myOrders);
    return(
        props.myOrders.map((el: any) => {
            return(
                <div id={el.item_id} onClick={() => {
                    window.location.href = `${getFrontendLocation()}/item/${el.item_id}`
                }} className="flex md:flex-row flex-col-reverse cursor-pointer justify-between bg-opacity-30 bg-slate-400 rounded-md w-full my-8 py-4 px-4">
                    <div className="flex flex-col gap-2">
                        <div className="mt-4 md:mt-0">{el.item_name}</div>
                        <div>₹{el.price_rs}</div>
                        <div>Quantity - {el.count}</div>
                        <div>Ordered by {el.user_id}</div>
                        <button onClick={() => {
                            // window.location.href = `${getFrontendLocation()}/cart/`
                            console.log("complete order");
                            // TODO: dynamic styling based on if completed order
                        }
                        } className=" flex justify-center items-center p-5 md:p-3 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100 md:font-normal font-thin rounded-full md:border-white border md:border-0">
                            <div className="mr-4"><FontAwesomeIcon icon={icon({name: 'check', style: 'solid'})} /></div>
                            <div>Received Payment</div>
                        </button>
                        <div>{el.description.substring(0, 20)}...</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-36 h-36 flex justify-center items-center overflow-hidden">
                            <img src={el.image} className="object-cover" alt="" />
                        </div>
                    </div>
                </div>
            );
        }))
    } else {
        return (
            <div>Please visit the cart to add some orders!</div>
        )
    }
}