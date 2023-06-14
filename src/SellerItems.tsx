import { CartItem, Item } from "./models/models";

export default function SellerItems(props: any) {

    
    async function deleteFromListing(itemId: number | undefined) {
        props.setIsLoading(true);

        // deleting from frontend

        // loss of generality in this line because order id is stripped from the received cart-item from parent
        const newSoldItems: Array<Item> = props.soldItems.slice();
        for(var i = 0; i < newSoldItems.length; i ++) {
            console.log("current orderId : ", newSoldItems[i].itemId, typeof newSoldItems[i].itemId);
            if(newSoldItems[i].itemId === itemId) {
                newSoldItems.splice(i, 1);
            }
        }
        props.setListedItems(newSoldItems);

        // deleting from backend
        let fetchLocation: string | undefined;
        if(window.location.href.search('localhost') === -1) {
            fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
        } else {
            fetchLocation = process.env.REACT_APP_CUR_SERVER;
        }
        const res = await fetch(`${fetchLocation}:8000/api/items/delete-listing/`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                "Authorization": props.jwtToken,
                "itemId": itemId
            })
        });
        const resJ = await res.json();
        if(resJ.succ) {
            props.showSnackBar("Item successfully deleted!")
        } else {
            props.showSnackBar(resJ.message)
        }
        props.setIsLoading(false);

    }

    if(props.soldItems.length > 0) {
        //
        return(
            <div className="flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14 w-full">
                {props.soldItems.map((el: CartItem) => {
                    return(
                        <div key={el.itemId} id={el.itemId?.toString()} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                            <div className=' border rounded border-slate-500 flex flex-col items-center justify-center'>
                                <div className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer" onClick={() => {
                                    //
                                    let goTo: string | undefined;
                                    if(window.location.href.search('localhost') === -1) {
                                    goTo = process.env.REACT_APP_LOCAL_SERVER;
                                    } else {
                                    goTo = process.env.REACT_APP_CUR_SERVER;
                                    }
                                    window.location.href = `${goTo}:3005/item/${el.itemId}`
                                }}>
                                    <img className='object-cover' alt="" src={el.image}></img>
                                </div>
                                <div className="flex flex-col justify-between ml-6 w-full">
                                    <div className='my-2 ml-2'>{`${el.itemName}, ₹${el.priceRs}`}</div>
                                    <div className="ml-2">{`${el.description.substring(0, 20)}...`}</div>
                                    <div className="flex justify-between my-3">
                                        <button onClick={() => {
                                            // send delete command to orders table given the order id with status  column 0
                                            deleteFromListing(el.itemId);
                                        }} className="p-4 dark:bg-red-300 dark:text-slate-800 text-slate-100 bg-red-600 rounded-full border border-white mr-3">Delete</button>
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