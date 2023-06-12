import { useEffect, useState } from "react";
import { Item } from "./models/models";

export default function SoldItems(props: any) {

    const initSoldItems: Array<Item> = [];
    const [soldItems, setSoldItems] = useState(initSoldItems)

    async function getSoldItems(jwtToken: string) {
        // gets user cart by getting from backend
        props.setIsLoading(true);
        let fetchLocation: string | undefined;
        if(window.location.href.search('localhost') === -1) {
        fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
        } else {
        fetchLocation = process.env.REACT_APP_CUR_SERVER;
        }
        const res = await fetch(`${fetchLocation}:8000/api/orders/sold/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "Authorization": jwtToken,
            })
        });
        const resJ = await res.json();
        const itemsArr: Array<Item> = [];
        if(resJ.succ) {
            for(var i = 0; i < resJ.itemsObjectList.length; i ++) {
                itemsArr.push(Item.fromMap(resJ.itemsObjectList[i]));
            }
        } else {
            props.showSnackBar(resJ.message);
        }
        props.setIsLoading(false);
        return itemsArr;
    }

    useEffect(() => {
        getSoldItems(props.auth).then((val) => {
            setSoldItems(val);
        })
    })

    return(
        <>
        <div className="flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14">
            {soldItems.map((el: Item) => {
                return(
                    <div key={el.itemId} id={el.itemId?.toString()} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                        <div className=' border rounded border-slate-500 flex flex-col items-center justify-center'>
                            <div className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center">
                                <img className='object-cover' alt="" src={el.image}></img>
                            </div>
                            <div className="flex flex-col justify-between items-center">
                                <div className='my-2'>{`${el.itemName}, ₹${el.priceRs}`}</div>
                                <div>{`${el.description.substring(0, 35)}...`}</div>
                                <div className="flex justify-between my-3">
                                    <button className="p-4 dark:bg-red-300 dark:text-slate-800 text-slate-100 bg-red-600 rounded-full border border-white mr-3">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}