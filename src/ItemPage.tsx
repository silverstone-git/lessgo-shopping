import { useEffect, useState } from "react";
import Snacc from "./common/components/SnackBarComponent";
import Loading from "./common/components/Loading";
import { useParams } from "react-router-dom";
import ItemBigCard from "./ItemBigCard";
import { Category, Item } from "./models/models";

async function getItem(passedId: string, setIsLoading: any, showSnackBar: any, jwtToken: string, setSnackBarMessage: any) {
    // returns the Item item from the passed id to set the state
    setIsLoading(true);

    let fetchLocation: string | undefined;
    if(window.location.href.search('localhost') === -1) {
    fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
    } else {
    fetchLocation = process.env.REACT_APP_CUR_SERVER;
    }

    const options = {
        headers: {"Content-Type": "application/json"},
    }
    const res = await fetch(`${fetchLocation}:8000/api/items/get-item/${passedId}/`, options);
    const resJ = await res.json();
    setIsLoading(false);
    if(resJ.succ) {
        return Item.fromMap(JSON.parse(resJ.itemObjStr));
    } else {
        showSnackBar(resJ.message, setSnackBarMessage);
        return null
    }
}


const checkJWTFromStorage = async () => {
    const token = localStorage.getItem('jwtToken');
    if(token === '' || token === null || token === undefined) {
        localStorage.setItem('loggedIn', 'false');
        localStorage.setItem('jwtToken', "");
        return {
            loggedIn: false,
            jwtToken: "",
        }
    } else {
        // if such a token exists, update the authorization status
        localStorage.setItem('loggedIn', 'true');
        return {
            loggedIn: true,
            jwtToken: token
        }
    }
};

function showSnackBar(message: string, setSnackBarMessage: any) {
    setSnackBarMessage(message)
    setTimeout(() => {
        setSnackBarMessage("");
    }, 3000)
}




function ItemPage(props:any) {
    const initItem: Item = new Item('', '', Category.other, false, 0,new Date(), '', '', undefined);
    const [item, setItem] = useState(initItem);
    const [auth, setAuth] = useState('');
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let { passedId } = useParams();

    async function setupItemPage() {

        const tempJwtToken = await checkJWTFromStorage();
        const receivedItem = await getItem(passedId ? passedId : 'undefined', setIsLoading, showSnackBar, tempJwtToken.jwtToken, setSnackBarMessage)
        if(receivedItem !== null) {
            setItem (receivedItem);

            // caching item to local storage
            const localArrayString = localStorage.getItem('carouselArray');
            const newArr: Array<Array<string>> = [[receivedItem.image, receivedItem.itemName, receivedItem.itemId?.toString()!]];
            if(localArrayString) {
                const localArray: Array<Array<string>> = JSON.parse(localArrayString);
                let found = false;
                for(var i = 0; i < localArray.length; i ++) {
                    if(localArray[i][2] === newArr[0][2]) {
                        found = true
                    }
                }
                if(!found) {
                    localArray.unshift(newArr[0]);
                }
                if(localArray.length > 5) {
                    localArray.pop();
                }
                localStorage.setItem('carouselArray', JSON.stringify(localArray));
            } else {
                localStorage.setItem('carouselArray', JSON.stringify(newArr));
            }
        } else {
            // the received item id doesnt exist / is deleted
            const localArrayString = localStorage.getItem('carouselArray');
            if(localArrayString) {
                const localArray: Array<Array<string>> = JSON.parse(localArrayString);
                const voidPoint = localArray.findIndex((el) => {return el[2] === passedId})
                if(voidPoint !== -1)
                    localArray.splice(voidPoint, 1);
                localStorage.setItem('carouselArray', JSON.stringify(localArray));
            }
            showSnackBar('Item doesn\'t exist', setSnackBarMessage);
        }
        setAuth(tempJwtToken.jwtToken);
    }

    // eslint-disable-next-line
    useEffect(() => {
        setupItemPage();
        // eslint-disable-next-line
    }, [passedId,]);
    return(
        <div id="item" className="flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100">
            <ItemBigCard  {...{"item": item, "auth": auth}}/>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
    )
}

export default ItemPage;