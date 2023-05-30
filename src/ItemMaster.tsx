import React from 'react';
import { useState } from 'react';
// import * as dotenv from 'dotenv';
// dotenv.config();

type Item = {
    name: string,
    price: number,
    image: string,
};

async function getItems() {
    var itemList: Array<Item> = [];
    const res = await fetch(`http://localhost:8000/api/items/`);
    const resJ = await res.json();
    const data = resJ.itemList;

    console.log(`data list is: ${data}`);
    itemList = data.map((el: Object) => {
        return el as Item;
    });
    console.log(`item list is: ${itemList}`);
    return itemList;
}

function ItemMaster() {
    
    var initList: Array<Item> = [];
    const [listOfItems, setListOfItems] = useState(initList);
    getItems().then((val) => {setListOfItems(val)});
    const listOfComponents = listOfItems.map(el =>
        // map each object into component
        <div className=' h-24 w-24 overflow-hidden'>
            <div>{el.name}</div>
            <div>{el.price}</div>
            <img src={el.image}></img>
        </div>);
    
    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className='flex items-center justify-center'>
                {listOfComponents}
            </div>
        </div>
    );
}

export default ItemMaster;