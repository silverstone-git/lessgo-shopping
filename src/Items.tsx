import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';
import { useState, useEffect } from 'react';
import Forbidden from './Forbidden';
import Snacc from './Snacc';
import Loading from './Loading';
import { Item } from './models/models';
import ShoppingCart from './ShoppingCart';


async function getItems(jwtToken: String) {

    let fetchLocation: string | undefined;
    if(window.location.href.search('localhost') === -1) {
      fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
    } else {
      fetchLocation = process.env.REACT_APP_CUR_SERVER;
    }
    const res = await fetch(`${fetchLocation}:8000/api/items/get-items/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "Authorization": jwtToken,
        })
    });
    const resJ = await res.json();

    const itemsArr: Array<Item> = [];
    const objArr: Array<any> = JSON.parse(resJ.itemList);
    for(var i = 0; i < objArr.length; i ++) {
        itemsArr.push(Item.fromMap(objArr[i]));
    }

    return itemsArr;
}




function Items(props: any) {
    
    const initList: Array<Item> = [];
    const [listOfItems, setListOfItems] = useState(initList);


    const newItemCount: Map<string, number> = new Map();
    const [noOfItems, setNoOfItems] = useState(newItemCount);


    const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    function showSnackBar(message: string) {
        setSnackBarMessage(message)
        setTimeout(() => {
            setSnackBarMessage("");
        }, 3000)
    }

    function showLoading(val: boolean) {
        setIsLoading(val);
    }



  const checkJWTFromStorage = () => {
    const token = localStorage.getItem('jwtToken');
    if(token === '' || token === null || token === undefined) {
      setLoggedIN(false);
      setJwtToken("");
      localStorage.setItem('loggedIn', 'false');
      localStorage.setItem('jwtToken', "");
    } else {
      // if such a token exists, update the authorization status
      setLoggedIN(true);
      localStorage.setItem('loggedIn', 'true');
    }
  };


  const checkLoggedIn = (jwtToken: String) => {
		// to check if logged in at every render
    let fetchLocation: string | undefined;
    if(window.location.href.search('localhost') === -1) {
      fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
    } else {
      fetchLocation = process.env.REACT_APP_CUR_SERVER;
    }
    fetch(`${fetchLocation}:8000/api/auth/isLoggedIn/`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"Authorization": `${jwtToken}`}),
    },
    )
    .then((val) => val.json()).then((val: any) => {
        setLoggedIN(val.isLoggedIn);
    });
};


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
            if(thisCount === 0 || thisCount === undefined) {
                // pass
            } else if(thisCount === 1) {
                breh.delete(thisID);
            } else {
                breh.set(thisID, thisCount - 1);
            }
        }
        setNoOfItems(breh);
    }

    function ItemCard(props: any) {
        return (
        <div id={props.itemId} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
            <div className=' border rounded border-slate-500 flex flex-col items-center justify-center'>
                <div onClick={() => {
                    let goTo: string | undefined;
                    if(window.location.href.search('localhost') === -1) {
                    goTo = process.env.REACT_APP_LOCAL_SERVER;
                    } else {
                    goTo = process.env.REACT_APP_CUR_SERVER;
                    }
                    window.location.href = `${goTo}:3005/item/${props.itemId}`
                }} className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer">
                    <img className='object-cover' alt="" src={props.image}></img>
                </div>
                <div className="flex flex-col justify-between w-full">
                    <div className='ml-5 mt-4 '>{`${props.itemName}, ₹${props.priceRs}`}</div>
                    <div className='ml-5 '>{`${props.description.substring(0, 20)}...`}</div>
                    <div className=' flex items-center mb-4 ml-4 mt-2'>
                        <button className='subtractButton flex justify-center items-center bg-red-600 text-slate-100 dark:bg-red-300 dark:text-slate-800 rounded-full w-8 h-8' value={props.itemId} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'minus', style: 'solid'})} />
                        </button>
                        <div className='px-2'>{props.thisCount}</div>
                        <button className='addButton flex justify-center items-center bg-green-600 text-slate-100 dark:bg-green-300 dark:text-slate-800 rounded-full w-8 h-8' value={props.itemId} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
        )
    }

    function ItemCards(props: any) {
        const listOfItems: Array<Item> = props.listOfItems;
        const countMap: Map<string, number> = props.noOfItems;
        return (
            <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800
            h-screen w-full text-slate-800 dark:text-slate-100'>
                <div className='my-4 text-md md:text-xl font-bold'>All Items</div>
                <div className='flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14 '>
                {listOfItems.map(el => {
                    // map each object into component
                    const thisId: string = el.itemId ? el.itemId.toString(): `${el.itemName}///${el.dateAdded}`;
                    var thisCount = countMap.get(thisId);
                    thisCount = thisCount !== undefined ? thisCount : 0;
                    return <ItemCard {...{...el, "thisCount": thisCount, "key": thisId}} />
                })}
                </div>
                <ShoppingCart {...{"cart": noOfItems, "auth": jwtToken, "showSnackBar": showSnackBar, "setIsLoading": showLoading}} />

                {/* <div className='self-center'> */}
                <Snacc {...{"message": snackBarMessage}} />
                {/* </div> */}
                <Loading {...{"isLoading": isLoading}} />
            </div>
        )
    }

	useEffect(() => {
	// run a command only once
        checkJWTFromStorage();
        checkLoggedIn(jwtToken);

        getItems(jwtToken).then((val) => {
            setListOfItems(val)
        });
    }, [jwtToken]);

    
    if((typeof loggedIn === 'string' && loggedIn === 'true') || (typeof loggedIn === 'boolean' && loggedIn)) {
        //
        return (
            <>
            <div id='items'>
                <ItemCards {...{"listOfItems": listOfItems, "noOfItems": noOfItems}} />
            </div>
            </>
        );
    } else {
        return(<Forbidden />);
    }
}

export default Items;
