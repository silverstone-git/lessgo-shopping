import Loading from "../../common/components/Loading";
import SellerItems from "./SellerItems";

import Snacc from "../../common/components/SnackBarComponent";
export default function DashboardVendor(props: any) {
    return(

    <div id='dashboard'>

      <div className='flex flex-col pt-24 items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>

        <div className=" text-green-600 dark:text-green-300 text-3xl mb-6">
          Welcome <div className=" inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{props.username.split(' ')[0]}</div>
        </div>

        <div className="bold text-md">
          {props.noOfItems === 0 ? "" : "Your Listings"}
        </div>
        <SellerItems {...{"soldItems": props.soldItems, "setIsLoading": props.setIsLoading, "setListedItems": props.setListedItems, "jwtToken": props.jwtToken, "setSnackBarMessage": props.setSnackBarMessage}} />
        <Snacc {...{"message": props.snackBarMessage}} />
      </div>
      <Loading {...{"isLoading": props.isLoading}} />
    </div>
    )
}