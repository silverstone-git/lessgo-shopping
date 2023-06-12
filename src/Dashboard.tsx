import { useEffect, useState } from "react";
import Forbidden from "./Forbidden";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Dashboard() {
  const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
	const [username, setUsername] = useState("");
	const [isVendor, setIsVendor] = useState(false);


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
      setUsername(val.username);
      setIsVendor(val.isVendor);
      // setUsername(val.username);
		});
	};

  useEffect(() => {
    checkJWTFromStorage();
    checkLoggedIn(jwtToken);
    // setTimeout(() => {
    //   console.log("checking logged in after the delay...")
    //   checkLoggedIn(jwtToken);
    // }, 3000);

  }, [jwtToken])


  if(isVendor) {
    // rendering the vendor dashboard if the user is a vendor
    return (

    <div id='dashboard'>

      <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
      h-screen w-fulltext-md text-slate-600 dark:text-slate-200'>

        <div className=" text-green-600 dark:text-green-300 text-3xl mb-6">
          Welcome <div className=" inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{username}</div>
        </div>

        <div>
          This is your seller dashboard
        </div>
        <div>The items you have sold are: </div>
      </div>
    </div>
    )
  }
  else if((typeof loggedIn === 'string' && loggedIn === 'true') || (typeof loggedIn === 'boolean' && loggedIn)) {

    return(
    <div id='dashboard'>

      <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
      h-screen w-full'>
        <div className='font-bold text-xl md:text-3xl text-green-600 dark:text-green-300'>
        Welcome back <div className=" inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{username}</div>
        </div>
        <div className=' text-xl md:text-2xl text-slate-600 dark:text-slate-200'>
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
      </div>

    </div>
    )
  } else {
    return < Forbidden />
  }
}

export default Dashboard;