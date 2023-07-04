import { useEffect, useState } from "react";
import Snacc from "../../../common/components/SnackBarComponent";
import Loading from "../../../common/components/Loading";
import { useParams } from "react-router-dom";
import ItemBigCard from "./ItemBigCard";
import { Item } from "../../../models/models";
import { checkJWTFromStorage, checkLoggedIn } from "../../../common/scripts/auth_repository";
import { getItem } from "../../../common/scripts/items_repository";
import { showSnackBar } from "../../../common/scripts/snacc";
import { checkIfAlreadyCart } from "../../../cart/scripts/cart_repository";
import { getUserReviewsList } from "../scripts/reviews";
import ShoppingCart from "../../../cart/components/ShoppingCart";

function ItemPage(props:any) {
    const initItem: Item = Item.johnDoe();
    const [item, setItem] = useState(initItem);
    const [auth, setAuth] = useState(localStorage.jwtToken);
    // eslint-disable-next-line
    const [loggedIn, setLoggedIn] = useState(localStorage.loggedIn);
    const [isVendor, setIsVendor] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let { passedId } = useParams();
    const [alreadyAddedToCart, setAlreadyAddedToCart] = useState(false);
    const [userReviewsList, setUserReviewsList] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState(new Map());

    async function setupItemPage() {
        await checkJWTFromStorage(setLoggedIn, setAuth);
        const tempCheckLoggedInRes = await checkLoggedIn(auth, setLoggedIn, undefined, setIsVendor, undefined)
        const receivedItem = await getItem(passedId ? passedId : 'undefined', setIsLoading, setSnackBarMessage, auth);
        if(receivedItem !== null) {
            setItem (receivedItem);
            // caching item to local storage
            const localArrayString = localStorage.getItem('carouselArray');
            const newArr: Array<Array<string>> = [[receivedItem.image, receivedItem.itemName, receivedItem.itemId?.toString()!]];
            if(localArrayString) {
                const localArray: Array<Array<string>> = JSON.parse(localArrayString ?? '[]');
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

            // checking if the received item is in placed orders and getting its reviews
            if(tempCheckLoggedInRes.isLoggedIn) {
            // if(tempCheckLoggedInRes.isLoggedIn && !tempCheckLoggedInRes.isVendor) {
                await checkIfAlreadyCart(passedId, setAlreadyAddedToCart, auth);
                const tempUserReviewsList = await getUserReviewsList(setIsLoading, receivedItem.itemId ? receivedItem.itemId : 0);
                setUserReviewsList(tempUserReviewsList)
            } else {
                const localCartString = localStorage.getItem('anonymousCart');
                const localCart: Object = JSON.parse(localCartString === '' || localCartString === null ? '{}' : localCartString);
                setAlreadyAddedToCart(localCart.hasOwnProperty(passedId ?? ''));
                if(Object.keys(localCart).length === 0) {
                    setShowCart(false);
                } else {
                    setCart(new Map(Object.entries(localCart)));
                    setShowCart(true);
                }
            }
        } else {
            // the received item id doesnt exist / is deleted
            const localArrayString = localStorage.getItem('carouselArray');
            if(localArrayString) {
                const localArray: Array<Array<string>> = JSON.parse(localArrayString ?? '{}');
                const voidPoint = localArray.findIndex((el) => {return el[2] === passedId})
                if(voidPoint !== -1)
                    localArray.splice(voidPoint, 1);
                localStorage.setItem('carouselArray', JSON.stringify(localArray));
            }
            console.log("item doesnt exist");
            showSnackBar('Item doesn\'t exist', setSnackBarMessage);
        }
    }

    // eslint-disable-next-line
    useEffect(() => {
        setupItemPage();
        // eslint-disable-next-line
    }, [passedId, alreadyAddedToCart]);
    return(
        <div id="item" className="flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100">
            <ItemBigCard  {...{item: item, auth: auth,
                setSnackBarMessage: setSnackBarMessage,
                isVendor: isVendor,
                alreadyAddedToCart: alreadyAddedToCart,
                setAlreadyAddedToCart: setAlreadyAddedToCart,
                setIsLoading: setIsLoading,
                userReviewsList: userReviewsList,
                setUserReviewsList: setUserReviewsList,
                }}/>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
            <ShoppingCart {...{
                anonymous: true,
                cart: cart,
                showCart: showCart,
            }} />
        </div>
    )
}

export default ItemPage;