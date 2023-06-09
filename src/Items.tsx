import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';
import { useState, useEffect } from 'react';
import Forbidden from './Forbidden';
import ShoppingCart from './shoppingCart';
import Snacc from './Snacc';
import Loading from './Loading';


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

    return JSON.parse(resJ.itemList);
}




function Items(props: any) {
    
    const initList: Array<any> = [];
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

	// const fetchRes = await fetch(receivedItem.image);
	// receivedItem.image = await fetchRes.blob();
	// const vidFetchRes = await fetch(receivedItem.video);
	// receivedItem.video = await vidFetchRes.blob();
        return (
        <div id={props.item_id} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
            <div className=' border rounded border-slate-500 flex flex-col justify-center'>
                <div className="h-28 w-28 overflow-hidden flex justify-center align-center">
                    <img alt="" src={props.image}></img>
                </div>
                <div className="flex flex-col justify-between h-28 items-center gap-2">
                    <div className='ml-5 mt-2'>{`${props.item_name}, ₹${props.price_rs}`}</div>
                    <div className='ml-5'>{`${props.description.substring(0, 20)}...`}</div>
                    <div className=' flex items-center mb-4'>
                        <button className='subtractButton bg-red-500 rounded-l px-2' value={props.item_id} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'minus', style: 'solid'})} />
                        </button>
                        <div className='px-2'>{props.thisCount}</div>
                        <button className='addButton bg-green-500 rounded-r px-2' value={props.item_id} onClick={(e) => changeCount(e)}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
        )
    }

    function ItemCards(props: any) {
        const listOfItems: Array<any> = props.listOfItems;
        const countMap: Map<string, number> = props.noOfItems;
        return (
            <>
            <div id='items' className='flex items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
                <div className='mt-[20vh] flex w-full flex-wrap items-center justify-center bg-slate-100 dark:bg-slate-800'>
                {listOfItems.map(el => {
                    // map each object into component
                    var thisCount = countMap.get(el.item_id.toString())
                    thisCount = thisCount !== undefined ? thisCount : 0;
                    return <ItemCard {...{...el, "thisCount": thisCount, "key": el.item_id}} />
                })}
                </div>
                <ShoppingCart {...{"cart": noOfItems, "auth": jwtToken, "showSnackBar": showSnackBar, "setIsLoading": showLoading}} />
            </div>
            </>
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
            <ItemCards {...{"listOfItems": listOfItems, "noOfItems": noOfItems}} />
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
            </>
        );
    } else {
        return(<Forbidden />);
    }
}

export default Items;
