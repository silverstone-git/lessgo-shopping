import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';
import { useState, useEffect } from 'react';
import { Item } from './models/models';


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
        console.log(el);
        return el as Item;
    });
    // console.log(`item list is: ${itemList}`);
    return itemList;
}




function ItemMaster(props: any) {
    
    const initList: Array<Item> = [];
    const [listOfItems, setListOfItems] = useState(initList);

    const newItemCount: Map<string, number> = new Map();
    const [noOfItems, setNoOfItems] = useState(newItemCount);

    setInterval(function() {
        getItems(props.jwtToken).then((val) => {setListOfItems(val)});
    }, 10000);


    function changeCount(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var breh = noOfItems;
        const thisID = e.currentTarget.value;
        const thisCount = noOfItems.get(thisID);
        if(e.currentTarget.classList.contains('addButton')) {
            breh.set(thisID, thisCount ? thisCount + 1 : 1)
        } else if(e.currentTarget.classList.contains('subtractButton')) {
            breh.set(thisID, thisCount ? thisCount - 1 : 0);
        }
        // console.log(breh.keys());
        // console.log(breh.values());
        setNoOfItems(breh);
    }

    function ItemCard(props: any) {
        return (
        <div id={props.thisId} className=' w-1/2 md:w-1/4 overflow-hidden p-8'>
            <div className=' border rounded border-slate-500 flex flex-col justify-center'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Kawasaki_ZX-RR_2007TMS.jpg"></img>
                <div className="flex justify-between h-12 items-center gap-2">
                    <div>{props.itemName} {props.priceRs}</div>
                    <div className=' flex'>
                        <button className='addButton' value={props.thisId} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} />
                        </button>
                        <div>{props.thisCount}</div>
                        <button className='subtractButton' value={props.thisId} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'minus', style: 'solid'})} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
        )
    }

    function Items(props: any) {
        const listOfItems: Array<Item> = props.listOfItems;
        const countMap: Map<string, number> = props.noOfItems;
        return (
            <>
            {listOfItems.map(el => {
                // map each object into component
                const thisId = el.itemName + el.dateAdded;
                var thisCount = countMap.get(thisId)
                thisCount = thisCount != undefined ? thisCount : 0;
                return <ItemCard {...{"itemName": el.itemName, "priceRs": el.priceRs, "thisId": thisId, "thisCount": thisCount, "key": thisId}} />
            })}
            </>
        )
    }

	useEffect(() => {
	// run a command only once
        getItems(props.jwtToken).then((val) => {setListOfItems(val)});
}, [])
    
    console.log(noOfItems.keys());
    console.log(noOfItems.values());
    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className='flex w-full flex-wrap items-center justify-center'>
                <Items {...{"listOfItems": listOfItems, "noOfItems": noOfItems}} />
            </div>
        </div>
    );
}

export default ItemMaster;
