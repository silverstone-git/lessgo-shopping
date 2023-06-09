import { getFrontendLocation } from "../../common/scripts/urls";
import { mysqlToJsDateStringToString } from "../../common/scripts/date";
import CompleteOrder from './CompleteOrder';

export function OrdersCards(props: any) {
    
    
    if(props.myOrders.length > 0 && !props.isVendor) {
    const myOrdersMap = new Map<number, Array<any>>();
    for(var i = 0; i < props.myOrders.length; i ++) {
        if(myOrdersMap.has(props.myOrders[i].cart_id)) {
            const prevArr : any[] = myOrdersMap.get(props.myOrders[i].cart_id) as any[];
            prevArr.push(props.myOrders[i]);
            myOrdersMap.set(
                props.myOrders[i].cart_id,
                prevArr
            )
        } else {
            myOrdersMap.set(props.myOrders[i].cart_id, [props.myOrders[i],]);
        }
    }
    return(
    

        Array.from(myOrdersMap).map((cartEls: any) => {
            return(<div className=" bg-opacity-40 mb-20 bg-slate-500 rounded-lg">
            {/* <div className="bg-slate-500 w-full p-7 rounded-lg">Cart #{cartEls[0]}</div> */}
            <div className="bg-green-300 text-slate-800 w-full p-7 rounded-lg">Cart #{cartEls[0]}</div>

            {cartEls[1].map((el: any) => {return(
                <div id={el.order_id} onClick={() => {
                    window.location.href = `${getFrontendLocation()}/item/${el.item_id}`
                }} className="flex md:flex-row flex-col-reverse cursor-pointer justify-between w-full my-8 py-4 px-4">
                    <div className="flex flex-col gap-2">
                        <div className="mt-4 md:mt-0">{el.item_name}</div>
                        <div className="font-bold text-lg">₹{el.price_rs}</div>
                        <div>Order #{el.order_id}</div>
                        <div>Quantity - {el.count}</div>
                        <div>{el.description.substring(0, 20)}...</div>
                        <div className={`${el.received_at? 'block' : 'hidden'}`}> Completed {mysqlToJsDateStringToString(el.received_at)}</div>
                        <div className={`${!el.received_at && el.placed_at ? 'block' : 'hidden'}`}> Placed {mysqlToJsDateStringToString(el.placed_at)}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-36 h-36 flex justify-center items-center overflow-hidden">
                            <img src={el.image} className="object-cover" alt="" />
                        </div>
                    </div>
                </div>
            );})}

            </div>);
        }))
    } else if(props.myOrders.length > 0) {
    return(
        props.myOrders.map((el: any) => {
            return(
                <div id={el.order_id} onClick={() => {
                    window.location.href = `${getFrontendLocation()}/item/${el.item_id}`
                }} className="flex md:flex-row flex-col-reverse cursor-pointer justify-between bg-opacity-30 bg-slate-400 rounded-md w-full my-8 py-4 px-4">
                    <div className="flex flex-col gap-2">
                        <div className="mt-4 md:mt-0">{el.item_name}</div>
                        <div className="font-bold text-lg">₹{el.price_rs}</div>
                        <div>Quantity - {el.count}</div>
                        <div>Order #{el.order_id}</div>
                        <div>By {el.user_id}</div>
                        <div>{el.description.substring(0, 27)}...</div>
                        <div>Delivery Address - {el.address}</div>
                        <div className={`${el.received_at? 'block' : 'hidden'}`}> Completed {mysqlToJsDateStringToString(el.received_at)}</div>
                        <CompleteOrder receivedPayment={el.received_at} orderId={el.order_id} auth={props.auth} setIsLoading={props.setIsLoading} />
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