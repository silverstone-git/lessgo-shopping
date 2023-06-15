import { deleteFromListing } from "../common/scripts/vendor_repository";
import { CartItem, } from "../models/models";

export default function SellerItems(props: any) {

    
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
                                            deleteFromListing(el.itemId, props.setIsLoading, props.setListedItems, props.soldItems, props.jwtToken, props.setSnackBarMessage);
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