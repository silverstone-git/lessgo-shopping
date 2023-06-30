import { useEffect, useState } from "react";
import Forbidden from "../../Forbidden";
import { Item, initCategoryCarousels } from "../../models/models";
import DashboardVendor from "./DashboardVendor";
import * as authRepo from '../../common/scripts/auth_repository';
import * as vendorRepo from '../../common/scripts/vendor_repository';
import DashboardCustomer from "./DasbhboardCustomer";
import { carouselItemsByCategory, getHotCarouselItems } from "../../common/scripts/items_repository";

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
  const [ newUser, setNewUser ] = useState(true);
  const [carouselArray, setCarouselArray]= useState(initCarouselArray);
  const [categoriesCarousels, setCategoriesCarousels] = useState(initCategoryCarousels);
  const [itemPriceEditMode, setItemPriceEditMode] = useState(0);


  async function dashboardSetup(jwtToken: string) {
    await authRepo.checkJWTFromStorage(setLoggedIN, setJwtToken);
    const tempIsVendor = (await authRepo.checkLoggedIn(jwtToken, setLoggedIN, setUsername, setIsVendor, setSnackBarMessage)).isVendor;
    if(tempIsVendor) {
      setListedItems(await vendorRepo.getListedItems(jwtToken, setIsLoading, setNoOfItems, setSnackBarMessage));
      setIsVendor(true);
    } else {
      if(localStorage.carouselArray) {
        setNewUser(false);
        setCarouselArray(JSON.parse(localStorage.carouselArray));
      } else {
        setNewUser(true);
        const tempHotItemsCarouselArray: Array<Array<string>> = await getHotCarouselItems();
        setCarouselArray(tempHotItemsCarouselArray);
      }
      setCategoriesCarousels({
        ...categoriesCarousels,
        pkd: await carouselItemsByCategory("pkd", jwtToken),
        veh: await carouselItemsByCategory("veh", jwtToken),
        elec: await carouselItemsByCategory("elec", jwtToken),
        mat: await carouselItemsByCategory("mat", jwtToken),
        laptop: await carouselItemsByCategory("laptop", jwtToken),
        groc: await carouselItemsByCategory("groc", jwtToken),
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
      <DashboardVendor {...{noOfItems: noOfItems, soldItems: soldItems, setIsLoading: setIsLoading, username: username, jwtToken: jwtToken, snackBarMessage: snackBarMessage, setSnackBarMessage: setSnackBarMessage, setListedItems: setListedItems, itemPriceEditMode: itemPriceEditMode, setItemPriceEditMode}} />
    )
  }
  else if((typeof loggedIn === 'string' && loggedIn === 'true') || (typeof loggedIn === 'boolean' && loggedIn)) {
    return(
      <DashboardCustomer {...{carouselArray: carouselArray,
        electronicsCarousel: categoriesCarousels.elec,
        pkdCarousel: categoriesCarousels.pkd,
        vehiclesCarousel: categoriesCarousels.veh,
        materialCarousel: categoriesCarousels.mat,
        groceryCarousel: categoriesCarousels.groc,
        laptopCarousel: categoriesCarousels.laptop,
        snackBarMessage: snackBarMessage,
        isLoading: isLoading,
        username: username,
        jwt: jwtToken,
        isVendor: isVendor,
        newUser: newUser,
      }}/>
    )
  } else {
    return < Forbidden />
  }
}

export default Dashboard;