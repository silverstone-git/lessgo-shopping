import { useEffect, useState } from "react";
import { Category, Item } from "./models/models";
import Forbidden from "./Forbidden";
import Snacc from "./Snacc";
import Loading from "./Loading";


function ItemMaster(props: any) {
  const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
  const [snackBarMessage, setSnackBarMessage] = useState("");
	const [isVendor, setIsVendor] = useState(false);

  const newItem: any = Item.toMap(new Item('', '', Category.other, true, 0, new Date(), '', '', undefined));
  newItem.image = new Blob([]);
  newItem.video = new Blob([]);
  const [item, setItem] = useState(newItem);
  const [isLoading, setIsLoading] = useState(false);


  function showSnackBar(message: string) {
      setSnackBarMessage(message);
      setTimeout(() => {
          setSnackBarMessage("");
      }, 3000)
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
      setIsVendor(val.isVendor);
      // setUsername(val.username);
		});
	};

  useEffect(() => {
    checkJWTFromStorage();
    checkLoggedIn(jwtToken);

  }, [jwtToken])
  function clearAllFields() {
    // pass till you figure out refs
  }

  async function addItem(item: any) {
    setIsLoading(true);
    console.log("image before: ");
    console.log(item.image);
    
    function blobToBase64(blob: Blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }

    item.image = await blobToBase64( item.image);
    item.video = await blobToBase64( item.video);
    
    //
    
    // item.image = JSON.stringify(item.image);
    // item.video = JSON.stringify(item.video);

    // console.log("sending image: ");
    // console.log(item.image);

    let fetchLocation: string | undefined;
    if(window.location.href.search('localhost') === -1) {
      fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
    } else {
      fetchLocation = process.env.REACT_APP_CUR_SERVER;
    }
    clearAllFields();
    const res = await fetch(`${fetchLocation}:8000/api/items/add-item/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "Authorization": jwtToken,
        "item": item
      })
    });
    const resJ = await res.json();
    setIsLoading(false)

    if(resJ.succ) {
      showSnackBar("Your Item has been added!");
    } else {
      showSnackBar(resJ.message)
    }


  }


  function CategoryOptions() {
    let categories = Category;
    let category: keyof typeof categories;
    let optionsList: Array<React.JSX.Element> = [];
    for(category in categories) {
      optionsList.push(<option key={category} value={categories[category]}>{categories[category]}</option>)
    }
    function categoryStringToCategory(catString: string) {
      
      for(category in categories) {
        if(catString === categories[category]) {
          return categories[category];
        }
      }
      return Category.other;
    }
    return (
      <select onChange={(e) => {
        setItem({ ...item, "category": categoryStringToCategory(e.target.value) });
        }}
        value={item.category}
        name="itemCategory" id="itemCategorySelection" className="item-master-input p-3 rounded"
        required
         >
        {optionsList}
      </select>
    )
  }

  if(isVendor) {
    return(
    <div id='item-master'>

      <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
      h-screen w-full '>
        <div className="flex-col text-slate-800 dark:text-slate-300 h-[70vh] w-full">
          <div className="w-full flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800 pb-14 ">
              <div className=" text-lg text-green-600 dark:text-green-300">
                Add your Item to list on Lessgo
              </div>
                <form className=" flex justify-center w-full" action="" method="POST" onSubmit={async (e) => {
                  e.preventDefault();
                  await addItem(item);
                }}>
              <div className=" flex flex-col gap-8 mt-6 md:w-1/2 w-10/12">
                <div>
                  <label htmlFor="itemName">Enter Item Name to be displayed</label>
                  <input onChange={(e) => {setItem({ ...item, "item_name": e.target.value })}} name="itemName" type="text" className="w-full item-master-input" maxLength={100} minLength={3} required />
                </div>
                <div className="">
                  <label htmlFor="itemDesc">Describe the item in short</label>
                  <textarea onChange={(e) => {setItem({ ...item, "description": e.target.value })}} name="itemDesc" id="description" className="w-full h-24 item-master-input" maxLength={3000} minLength={10} required></textarea>
                </div>
                <div>
                  <label htmlFor="itemPrice">Price (₹)</label>
                  <input onChange={(e) => {setItem({ ...item, "price_rs": Number(e.target.value) })}} name="itemPrice" type="number" className="w-full item-master-input" max={1000000000} min={0.1} step="any" required />
                </div>
                <div className=" flex md:flex-row flex-col ">
                  <label htmlFor="itemCategory" className="mr-12">Category</label>
                  <CategoryOptions />
                </div>
                <div>
                  <label htmlFor="itemImage">Display Image of the product</label>
                  <input onChange={(e) => {setItem({ ...item, "image": new Blob([e.target.files != null ? e.target.files[0] : ''], {type: 'image/*'})})}} name="itemImage" type="file" className=" w-full item-master-input" required />
                </div>
                <div>
                  <label htmlFor="itemVideo">Video demonstrating the product</label>
                  <input onChange={(e) => {setItem({ ...item, "video": new Blob([e.target.files != null ? e.target.files[0] : ''], {type: 'video/*'})})}} name="itemVideo" type="file" className="w-full item-master-input" required />
                </div>
                <button className="bg-green-600 dark:bg-green-300 hover:bg-green-900 hover:dark:bg-green-100  rounded-md mt-4 p-3 text-lg text-slate-100 dark:text-slate-700 mb-12 ">Submit</button>
            </div>
                </form>
          </div>
        </div>
        <div className="fixed bottom-5 w-full flex justify-center">
          <Snacc {...{"message": snackBarMessage}} />
        </div>
      </div>

      <Loading {...{"isLoading": isLoading}} />
    </div>
    )
  } else if((typeof loggedIn === 'string' && loggedIn === 'true') || (typeof loggedIn === 'boolean' && loggedIn)) {
    return(

      <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
      h-screen w-full text-slate-600 dark:text-slate-200'>
        <div>
          <h1>You have to create a new vendor account to complete this action :)</h1>
        </div>
      </div>
    )
  } else {
    return <Forbidden />
  }
}
export default ItemMaster;