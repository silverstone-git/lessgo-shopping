import { Category } from "./models/models";

function CategoryOptions() {
  let categories = Category;
  let category: keyof typeof categories;
  let optionsList: Array<React.JSX.Element> = [];
  console.log("categories enum is:");
  console.log(categories);
  for(category in categories) {
    // console.log("current category and its categories[category] are: ")
    // console.log(category);
    // console.log(categories[category]);
    optionsList.push(<option value={category}>{categories[category]}</option>)
  }

  return (
    <select name="itemCategory" id="itemCategorySelection" className="item-master-input">
      {optionsList}
    </select>
  )
}


function ItemMaster(props: any) {
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
                  <input name="itemName" type="text" className="w-full item-master-input" maxLength={100} minLength={3} />
                </div>
                <div className="">
                  <label htmlFor="itemDesc">Describe the item in short</label>
                  <textarea name="itemDesc" id="description" className="w-full h-24 item-master-input" maxLength={3000} minLength={10}></textarea>
                </div>
                <div>
                  <label htmlFor="itemPrice">Price (INR)</label>
                  <input name="itemPrice" type="number" className="w-full item-master-input" max={1000000000} min={0.1} step="any" />
                </div>
                <div className=" flex">
                  <label htmlFor="itemCategory" className="mr-12">Category</label>
                  <CategoryOptions />
                </div>
                <div>
                  <label htmlFor="itemImage">Display Image of the product</label>
                  <input name="itemImage" type="file" className=" w-full item-master-input" />
                </div>
                <div>
                  <label htmlFor="itemVideo">Video demonstrating the product</label>
                  <input name="itemVideo" type="file" className="w-full item-master-input" />
                </div>
                <button className="bg-green-600 dark:bg-green-300 hover:bg-green-900 hover:dark:bg-green-100  rounded-md mt-4 p-3 text-lg text-slate-100 dark:text-slate-700 mb-12 ">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default ItemMaster;