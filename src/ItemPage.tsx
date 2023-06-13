import { useEffect, useState } from "react";
import { Category, Item } from "./models/models";
import Snacc from "./Snacc";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";

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
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "Authorization": jwtToken,
        })
    }
    const res = await fetch(`${fetchLocation}:8000/api/items/get-item/${passedId}/`, options);
    const resJ = await res.json();
    setIsLoading(false);
    if(resJ.succ) {
        return Item.fromMap(resJ.itemObj);
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
    const [item, setItem] = useState(new Item('', '', Category.other, false, 0, new Date(), '', '', 0));
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let { passedId } = useParams();

    async function setupItemPage() {

        if(typeof passedId != 'string') {
            passedId = '404';
        }

        const tempJwtToken = await checkJWTFromStorage();
        const receivedItem = await getItem(passedId, setIsLoading, showSnackBar, tempJwtToken.jwtToken, setSnackBarMessage)
        if(receivedItem !== null) {
            setItem (receivedItem);
        }
    }

    useEffect(() => {setupItemPage()});
    return(
        <div id="item" className="flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100">
            <div className="flex flex-col items-center md:w-11/12 w-full">
                <div className=" self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>
                <div id="item-image" className="h-[40vh] w-full relative bottom-8"><img src={item.image} alt="" /></div>
                <div className="text-xl">{item.itemName}</div>
                <div className="text-md">{item.description}</div>
                <div className="font-bold"> In {item.category}</div>
                <div>Add a Review</div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
    )
}

export default ItemPage;