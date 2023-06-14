import { CartItem, } from "./models/models";

export default function CartItemCards(props: any) {
    // props.auth will be used for buying an item added to cart

    // const initCardCartItems: Array<CartItem> = props.cartItems;
    // const [cardCartItems, setCardCartItems] = useState(props.cartItems);

    // useEffect(() => setCardCartItems(props.cartItems));


    async function deleteFromCart(id: number) {
        props.setIsLoading(true);


        // deleting from frontend
        // const newCartItems: Array<CartItem> = cardCartItems.slice();
        const newCartItems: Array<CartItem> = props.cartItems.slice();
        console.log("scanning for id : ", id, typeof id);
        for(var i = 0; i < newCartItems.length; i ++) {
            console.log("current id : ", newCartItems[i].orderId, typeof newCartItems[i].orderId);
            if(newCartItems[i].orderId === id) {
                newCartItems.splice(i, 1);
            }
        }
        console.log("changed array is - ", newCartItems);
        // setCardCartItems(newCartItems);
        props.setCartItems(newCartItems);

        // deleting from backend
        let fetchLocation: string | undefined;
        if(window.location.href.search('localhost') === -1) {
            fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
        } else {
            fetchLocation = process.env.REACT_APP_CUR_SERVER;
        }
        const res = await fetch(`${fetchLocation}:8000/api/orders/delete-from-cart/`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                "Authorization": props.jwtToken,
                "id": id,
            })
        });
        const resJ = await res.json();
        if(resJ.succ) {
            props.showSnackBar("Item successfully deleted!")
        } else {
            props.showSnackBar(resJ.message)
        }
        props.setIsLoading(false);

    }
    console.log("cart is: ");
    // console.log(cardCartItems);
    console.log(props.cartItems);
    return(
        <div className="flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14 w-full">
            {props.cartItems.map((el: CartItem) => {
                return(
                    <div key={el.itemId ? el.itemId.toString() : "" + el.count} id={el.itemId?.toString()}  className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden p-8'>
                        <div className=' border rounded border-slate-500 flex flex-col items-center justify-center w-full'>
                            <div onClick={() => {
                                let goTo: string | undefined;
                                if(window.location.href.search('localhost') === -1) {
                                goTo = process.env.REACT_APP_LOCAL_SERVER;
                                } else {
                                goTo = process.env.REACT_APP_CUR_SERVER;
                                }
                                window.location.href = `${goTo}:3005/item/${el.itemId}`
                            }} className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer">
                                <img className='object-cover' alt="" src={el.image}></img>
                            </div>
                            <div className="flex flex-col justify-between w-full ml-6">
                                <div className="flex flex-col ml-2">
                                    <div className='my-2'>{`${el.itemName}, ₹${el.priceRs}`}</div>
                                    <div >{`${el.description.substring(0, 20)}...`}</div>
                                    <div className="item-count my-2">
                                        Quantity: {el.count}
                                    </div>
                                </div>
                                <div className="flex my-3">
                                    <button onClick={(e) => {
                                        deleteFromCart(el.orderId!);
                                    }} className="p-4 dark:bg-red-300 dark:text-slate-800 text-slate-100 bg-red-600 rounded-full border border-white mr-3">Delete</button>
                                    <button className="p-4 dark:bg-green-300 dark:text-slate-800 text-slate-100 bg-green-600 rounded-full border border-white">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}