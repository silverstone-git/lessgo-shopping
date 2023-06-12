import { useEffect, useState } from "react";
import Forbidden from "./Forbidden";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Snacc from "./Snacc";
import Loading from "./Loading";
import SellerItems from "./SellerItems";
import { Item } from "./models/models";
import CarouselDashboard from "./CarouselDashboard";
// import { Carousel } from 'react-responsive-carousel';

function Dashboard() {
  const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
	const [username, setUsername] = useState("");
	const [isVendor, setIsVendor] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initListedItems: Array<Item> = [];
  const [soldItems, setListedItems] = useState(initListedItems)
  const [noOfItems, setNoOfItems] = useState(0);
  const initCarouselArray: Array<Array<string>> = []
  const [carouselArray, setCarouselArray] = useState(initCarouselArray);


  function showSnackBar(message: string) {
      setSnackBarMessage(message)
      setTimeout(() => {
          setSnackBarMessage("");
      }, 3000)
  }

  const checkJWTFromStorage = async () => {
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


  const checkLoggedIn = async (jwtToken: String) => {
		// to check if logged in at every render
    let fetchLocation: string | undefined;
    if(window.location.href.search('localhost') === -1) {
      fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
    } else {
      fetchLocation = process.env.REACT_APP_CUR_SERVER;
    }
		const res = await fetch(`${fetchLocation}:8000/api/auth/isLoggedIn/`,
		{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({"Authorization": `${jwtToken}`}),
		},
		)
    const resJ = await res.json();

    if(res.status === 403 || res.status === 200) {
      setLoggedIN(resJ.isLoggedIn);
      setUsername(resJ.username);
      setIsVendor(resJ.isVendor);
    } else {
      showSnackBar("Unhandled Exception");
    }
    return resJ
	};


  async function getListedItems(jwtToken: string) {
      // gets user cart by getting from backend
      setIsLoading(true);
      let fetchLocation: string | undefined;
      if(window.location.href.search('localhost') === -1) {
      fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
      } else {
      fetchLocation = process.env.REACT_APP_CUR_SERVER;
      }
      const res = await fetch(`${fetchLocation}:8000/api/items/listed/`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              "Authorization": jwtToken,
          })
      });
      const resJ = await res.json();
      const itemsArr: Array<Item> = [];
      if(resJ.succ) {
          setNoOfItems(resJ.itemsObjectList.length);
          for(var i = 0; i < resJ.itemsObjectList.length; i ++) {
              itemsArr.push(Item.fromMap(resJ.itemsObjectList[i]));
          }
      } else {
        if(res.status === 404) {
          setNoOfItems(0);
        } else {
          showSnackBar(resJ.message);
        }
      }
      setIsLoading(false);
      return itemsArr;
  }

  async function dashboardSetup() {
    await checkJWTFromStorage();
    const tempIsVendor = (await checkLoggedIn(jwtToken)).isVendor;
    if(tempIsVendor) {
      setListedItems(await getListedItems(jwtToken));
      setIsVendor(true);
    } else {
      setCarouselArray([
        ["https://picsum.photos/200/300", "Ah hell naw", "123"],
        ["https://picsum.photos/200/300", "Ah hell naw", "123"],
        ["https://picsum.photos/200", "Ah hell naw", "123"],
        ["https://picsum.photos/200", "Ah hell naw", "123"],
      ]);
    }
  }
  useEffect(() => {
    dashboardSetup();
  }, [jwtToken])


  if(isVendor) {
    // rendering the vendor dashboard if the user is a vendor
    return (

    <div id='dashboard'>

      <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800
            h-screen w-full text-slate-800 dark:text-slate-100'>

        <div className=" text-green-600 dark:text-green-300 text-3xl mb-6">
          Welcome <div className=" inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{username}</div>
        </div>

        <div className="bold text-md">
          {noOfItems === 0 ? "No Items are listed, please add new by going to Add new item section" : "Your Listings"}
        </div>
        <SellerItems {...{"soldItems": soldItems}} />
      </div>
      <Snacc {...{"message": snackBarMessage}} />
      <Loading {...{"isLoading": isLoading}} />
    </div>
    )
  }
  else if((typeof loggedIn === 'string' && loggedIn === 'true') || (typeof loggedIn === 'boolean' && loggedIn)) {

    return(
    <div id='dashboard'>

      <div className='flex flex-col pt-[80vh] justify-center items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
        <div className='font-bold text-xl md:text-3xl text-green-600 dark:text-green-300'>
          Welcome back <div className=" inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{username}</div>
        </div>
        <div className=' text-xl md:text-2xl text-slate-600 dark:text-slate-200 my-12'>
          <button onClick={() => {
            let goTo: string | undefined;
            if(window.location.href.search('localhost') === -1) {
            goTo = process.env.REACT_APP_LOCAL_SERVER;
            } else {
            goTo = process.env.REACT_APP_CUR_SERVER;
            }
            window.location.href = `${goTo}:3005/cart`
          }
          } className=" mt-7 flex justify-center items-center p-5 bg-green-600 dark:bg-green-300 dark:text-slate-800 text-slate-100 font-thin rounded-full border-white border">
            <div className="mr-4"><FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'solid'})} /></div>
            <div>Your Cart</div>
          </button>
        </div>
        <div className=" bg-slate-100 dark:bg-slate-800 pb-14 w-full flex flex-col items-center justify-center">
          <div className="flex items-center mb-16 gap-4"><div className=" font-bold text-sm sm:text-md md:text-xl">Continue where you left off!</div><FontAwesomeIcon icon={icon({name: 'arrow-right', style: 'solid'})} /></div>
        <CarouselDashboard {...{"listOfImages": carouselArray}} />
        </div>
      </div>

      <Snacc {...{"message": snackBarMessage}} />
      <Loading {...{"isLoading": isLoading}} />
    </div>
    )
  } else {
    return < Forbidden />
  }
}

export default Dashboard;