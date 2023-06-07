import { useEffect, useState } from "react";

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
		fetch("http://localhost:8000/api/auth/isLoggedIn/",
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
  else if(loggedIn) {

    return(
    <div id='dashboard'>

      <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
      h-screen w-full'>
        <div className='font-bold text-3xl text-green-600 dark:text-green-300'>
        Welcome back <div className=" inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{username}</div>
        </div>
        <div className='text-md text-slate-600 dark:text-slate-200'>
        Your user points are to be fetched from auth repository in this view
        </div>
      </div>
    </div>
    )
  } else {
    return null
  }
}

export default Dashboard;