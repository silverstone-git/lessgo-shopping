import React, { useEffect, useState } from 'react';
import CarouselDashboard from '../../common/components/Carousel';
import { getFrontendLocation } from '../../common/scripts/urls';
import { carouselItemsByCategory, getHotCarouselItems } from '../../common/scripts/items_repository';
import ShoppingCart from '../../cart/components/ShoppingCart';
import OffersWrap from './OffersWrap';
import { initCategoryCarousels } from '../../models/models';

function App() {

  const [loggedIn] = useState(localStorage.loggedIn);
  const [carouselArray, setCarouselArray] = useState([['']]);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState(new Map());
  const [categoriesCarousels, setCategoriesCarousels] = useState(initCategoryCarousels);

  async function setupApp(loggedIn: string) {
    const jwtToken = '';
    if(loggedIn === 'true') {
        window.location.href = `${getFrontendLocation()}/home/`;
    } else {
      const tempHotItemsCarouselArray: Array<Array<string>> = await getHotCarouselItems();
      setCarouselArray(tempHotItemsCarouselArray);
    }
    if(localStorage.getItem('anonymousCart') === '') {
      setShowCart(false);
    } else {
      setCart(new Map(Object.entries(JSON.parse(localStorage.getItem('anonymousCart') ?? '{}'))));
      setShowCart(true);
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
  useEffect(
    () => {
      setupApp(loggedIn);
      // eslint-disable-next-line
    }, [loggedIn]
  )

  return (
    <div id='app'>

    <div className='flex flex-col items-center bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200
    h-screen w-full pt-14'>
      <div className="mt-14 md:mt-0 pb-4">
        <div className=" flex flex-col text-4xl">Shop Easy, <div className=' mt-2 text-slate-200 px-2 py-1 from-pink-500 to-blue-600 bg-gradient-to-r w-56'>Live More</div></div>
      </div>
      <div className='md:text-md text-sm  mb-14 text-slate-600 dark:text-slate-400'>
      Sign In to enjoy seamless shopping
      </div>
      <div className=' bg-slate-100 dark:bg-slate-800 w-full flex justify-center pb-14 md:pb-0'>
        <CarouselDashboard {...{"listOfImages": carouselArray, "height": 60}} />
      </div>
      <OffersWrap {...{
        electronicsCarousel: categoriesCarousels.elec,
        pkdCarousel: categoriesCarousels.pkd,
        vehiclesCarousel: categoriesCarousels.veh,
        materialCarousel: categoriesCarousels.mat,
        laptopCarousel: categoriesCarousels.laptop,
        groceryCarousel: categoriesCarousels.groc,
      }} />
    </div>
      <ShoppingCart {...{
        anonymous: true,
        cart: cart,
        showCart: showCart,
      }} />
    </div>
  );
}

export default App;
