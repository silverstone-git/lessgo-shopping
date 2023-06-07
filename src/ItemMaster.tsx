import { useEffect, useState } from "react";
import { Category, Item } from "./models/models";


function ItemMaster(props: any) {
  const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
	const [isVendor, setIsVendor] = useState(false);
  const [item, setItem] = useState( Item.toMap('', '', Category.other, true, 0, new Date(), new Blob(), new Blob()));


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

  function addItem(item: Object) {
    fetch("http://localhost:8000/api/items/add/", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "Authorization": jwtToken,
        "item": item
      })
    })
  }


  function CategoryOptions() {
    let categories = Category;
    let category: keyof typeof categories;
    let optionsList: Array<React.JSX.Element> = [];
    for(category in categories) {
      optionsList.push(<option value={categories[category]}>{categories[category]}</option>)
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
         name="itemCategory" id="itemCategorySelection" className="item-master-input p-3 rounded">
        {optionsList}
      </select>
    )
  }




  if(isVendor) {
    return(
    <div id='item-master'>

      <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
      h-screen w-full'>
        <div className="flex-col text-slate-800 dark:text-slate-300 h-[70vh] w-full">
          <div className="w-full flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800">
              <div className=" text-lg text-green-600 dark:text-green-300">
                Add your Item to list on Lessgo
              </div>
              <div className=" flex flex-col gap-8 mt-6 w-1/2">
                <div>
                  <label htmlFor="itemName">Enter Item Name to be displayed</label>
                  <input onChange={(e) => {setItem({ ...item, "itemName": e.target.value })}} name="itemName" type="text" className="w-full item-master-input" maxLength={100} minLength={3} />
                </div>
                <div className="">
                  <label htmlFor="itemDesc">Describe the item in short</label>
                  <textarea onChange={(e) => {setItem({ ...item, "description": e.target.value })}} name="itemDesc" id="description" className="w-full h-24 item-master-input" maxLength={3000} minLength={10}></textarea>
                </div>
                <div>
                  <label htmlFor="itemPrice">Price (INR)</label>
                  <input onChange={(e) => {setItem({ ...item, "priceRs": Number(e.target.value) })}} name="itemPrice" type="number" className="w-full item-master-input" max={1000000000} min={0.1} step="any" />
                </div>
                <div className=" flex">
                  <label htmlFor="itemCategory" className="mr-12">Category</label>
                  <CategoryOptions />
                </div>
                <div>
                  <label htmlFor="itemImage">Display Image of the product</label>
                  <input onChange={(e) => {setItem({ ...item, "image": new Blob([`${e.target.value}`]) })}} name="itemImage" type="file" className=" w-full item-master-input" />
                </div>
                <div>
                  <label htmlFor="itemVideo">Video demonstrating the product</label>
                  <input onChange={(e) => {setItem({ ...item, "video": new Blob([`${e.target.value}`]) })}} name="itemVideo" type="file" className="w-full item-master-input" />
                </div>
                <button onClick={() => {
                  addItem(item);
                  clearAllFields();
                }} className="bg-green-600 dark:bg-green-300 hover:bg-green-900 hover:dark:bg-green-100  rounded-md mt-4 p-3 text-lg text-slate-100 dark:text-slate-700 mb-12 ">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  } else if(loggedIn) {
    return <div>
      <h1>You have to create a new vendor account to complete this action :)</h1>
    </div>
  } else {
    return null
  }
}
export default ItemMaster;