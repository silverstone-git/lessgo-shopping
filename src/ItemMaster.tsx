import React from 'react';
import { useState, useEffect } from 'react';
// import * as dotenv from 'dotenv';
// dotenv.config();

type Item = {
    name: string,
    price: number,
    image: string,
};

async function getItems(jwtToken: String) {
    var itemList: Array<Item> = [];
    const res = await fetch(`http://localhost:8000/api/items/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        },
    });
    const resJ = await res.json();
    const data = resJ.itemList;

    // console.log(`data list is: ${data}`);
    itemList = data.map((el: Object) => {
        return el as Item;
    });
    // console.log(`item list is: ${itemList}`);
    return itemList;
}

function ItemMaster(props: any) {
    
    var initList: Array<Item> = [];
    const [listOfItems, setListOfItems] = useState(initList);
    var intervalId = setInterval(function() {
        getItems(props.jwtToken).then((val) => {setListOfItems(val)});
    }, 10000);
    const listOfComponents = listOfItems.map(el =>
        // map each object into component
        <div className=' w-1/2 md:w-1/4 overflow-hidden p-8'>
            <div className=' border rounded border-slate-500 flex flex-col justify-center'>
                <img src={el.image}></img>
                <div className="flex gap-2">
                    <div>{el.name}</div>
                    <div>{el.price}</div>
                </div>
            </div>
        </div>);

	useEffect(() => {
	// run a command only once
        getItems(props.jwtToken).then((val) => {setListOfItems(val)});
}, [])
    
    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className='flex w-full flex-wrap items-center justify-center'>
                {listOfComponents}
            </div>
        </div>
    );
}

export default ItemMaster;
