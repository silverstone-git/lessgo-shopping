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

    itemList = data.map((el: Object) => {
        return el as Item;
    });
    return itemList;
}




function Items(props: any) {
    
    const initList: Array<Item> = [];
    const [listOfItems, setListOfItems] = useState(initList);


    const newItemCount: Map<string, number> = new Map();
    const [noOfItems, setNoOfItems] = useState(newItemCount);

    // setInterval(function() {
    //     getItems(props.jwtToken).then((val) => {setListOfItems(val)});
    // }, 10000);


    function changeCount(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // JSON.parse(JSON.stringify(myObj));
        var breh: Map<string, number> = new Map();
        const newArr = Array.from(noOfItems.entries());
        for( var i = 0; i < newArr.length; i ++) {
            if(newArr[i][1] > 0) {
                breh.set(newArr[i][0], newArr[i][1]);
            }
        }
        const thisID = e.currentTarget.value;
        const thisCount = noOfItems.get(thisID) ? noOfItems.get(thisID) : 0;
        if(e.currentTarget.classList.contains('addButton')) {
            breh.set(thisID, thisCount ? thisCount + 1 : 1)
        } else if(e.currentTarget.classList.contains('subtractButton')) {
            if(thisCount == 0 || thisCount == undefined) {
                // pass
            } else if(thisCount == 1) {
                breh.delete(thisID);
            } else {
                breh.set(thisID, thisCount - 1);
            }
        }
        // console.log(`new map is :`);
        // console.log(breh.entries());
        setNoOfItems(breh);
    }

    function ItemCard(props: any) {
        return (
        <div id={props.thisId} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
            <div className=' border rounded border-slate-500 flex flex-col justify-center'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Kawasaki_ZX-RR_2007TMS.jpg"></img>
                <div className="flex justify-between h-12 items-center gap-2">
                    <div className='ml-5 py-3'>{props.itemName} {props.priceRs}</div>
                    <div className=' flex items-center'>
                        <button className='subtractButton p-5' value={props.thisId} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'minus', style: 'solid'})} />
                        </button>
                        <div className='px-4'>{props.thisCount}</div>
                        <button className='addButton p-5' value={props.thisId} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} />
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
    
    return (
        <div className='flex items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className='mt-[20vh] flex w-full flex-wrap items-center justify-center bg-slate-100 dark:bg-slate-800'>
                <Items {...{"listOfItems": listOfItems, "noOfItems": noOfItems}} />
            </div>
            </div>
    );
}

export default Items;
