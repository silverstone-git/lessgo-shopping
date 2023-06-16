import { useEffect, useState } from "react";
import Forbidden from "../Forbidden";
import { Item, initCategoryCarousels } from "../models/models";
import DashboardVendor from "./DashboardVendor";
import * as authRepo from '../common/scripts/auth_repository';
import * as vendorRepo from '../common/scripts/vendor_repository';
import * as snacc from '../common/scripts/snacc';
import DashboardCustomer from "./DasbhboardCustomer";
import { carouselItemsByCategory } from "../common/scripts/items_repository";

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
  const initCarouselArray: Array<Array<string>> = [];
  const [carouselArray, setCarouselArray]= useState(initCarouselArray);
  const [categoriesCarousels, setCategoriesCarousels] = useState(initCategoryCarousels);


  async function dashboardSetup(jwtToken: string) {
    await authRepo.checkJWTFromStorage(setLoggedIN, setJwtToken);
    const tempIsVendor = (await authRepo.checkLoggedIn(jwtToken, setLoggedIN, setUsername, setIsVendor, setSnackBarMessage)).isVendor;
    if(tempIsVendor) {
      setListedItems(await vendorRepo.getListedItems(jwtToken, setIsLoading, setNoOfItems, snacc.showSnackBar, setSnackBarMessage));
      setIsVendor(true);
    } else {
      if(localStorage.carouselArray) {
        setCarouselArray(JSON.parse(localStorage.carouselArray));
      } else {
        //
        // TODO: get hot items if you dont have local items already
        //
        setCarouselArray([
          ["https://picsum.photos/200/300", "Ah hell naw", "535754102"],
          ["https://picsum.photos/200/300", "Ah hell naw", "535754102"],
          ["https://picsum.photos/200", "Ah hell naw", "535754102"],
          ["https://picsum.photos/200", "Ah hell naw", "535754102"],
        ]);

      }
      setCategoriesCarousels({
        ...categoriesCarousels,
        fmcg: await carouselItemsByCategory("fmcg", jwtToken),
        veh: await carouselItemsByCategory("veh", jwtToken),
        elec: await carouselItemsByCategory("elec", jwtToken),
        mat: await carouselItemsByCategory("mat", jwtToken),
      })
    }
  }
  useEffect(() => {
    dashboardSetup(jwtToken);
    // eslint-disable-next-line
  }, [jwtToken])

  if(isVendor) {
    // rendering the vendor dashboard if the user is a vendor
    return (
      <DashboardVendor {...{noOfItems: noOfItems, soldItems: soldItems, setIsLoading: setIsLoading, username: username, jwtToken: jwtToken, snackBarMessage: snackBarMessage, setSnackBarMessage: setSnackBarMessage, setListedItems: setListedItems}} />
    )
  }
  else if((typeof loggedIn === 'string' && loggedIn === 'true') || (typeof loggedIn === 'boolean' && loggedIn)) {
    // const carouselArray1 = [
    //   ["https://picsum.photos/200/300", "Ah hell naw", "535754102"],
    //   ["https://picsum.photos/200/300", "Ah hell naw", "535754102"],
    //   ["https://picsum.photos/200", "Ah hell naw", "535754102"],
    //   ["https://picsum.photos/200", "Ah hell naw", "535754102"],
    // ];
    return(
      <DashboardCustomer {...{carouselArray: carouselArray,
        electronicsCarousel: categoriesCarousels.elec,
        fmcgCarousel: categoriesCarousels.fmcg,
        vehiclesCarousel: categoriesCarousels.veh,
        materialCarousel: categoriesCarousels.mat,
        snackBarMessage: snackBarMessage,
        isLoading: isLoading,
        username: username,
        jwt: jwtToken,
      }}/>
    )
  } else {
    return < Forbidden />
  }
}

export default Dashboard;