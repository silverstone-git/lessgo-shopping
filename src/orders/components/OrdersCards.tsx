import { getFrontendLocation } from "../../common/scripts/urls";

export function OrdersCards(props: any) {
    if(props.myOrders.length > 0) {
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
        })
    )
    } else {
        return (
            <div>Please visit the cart to add some orders!</div>
        )
    }
}