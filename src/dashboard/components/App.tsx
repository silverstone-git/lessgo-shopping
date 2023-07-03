import React, { useEffect, useState } from 'react';
import CarouselDashboard from '../../common/components/Carousel';
import { getFrontendLocation } from '../../common/scripts/urls';
import { getHotCarouselItems } from '../../common/scripts/items_repository';
import ShoppingCart from '../../cart/components/ShoppingCart';

function App() {

  const [loggedIn] = useState(localStorage.loggedIn);
  const [carouselArray, setCarouselArray] = useState([['']]);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState(new Map());

  async function setupApp(loggedIn: string) {
    if(loggedIn === 'true') {
        window.location.href = `${getFrontendLocation()}/home/`;
    } else {
      const tempHotItemsCarouselArray: Array<Array<string>> = await getHotCarouselItems();
      setCarouselArray(tempHotItemsCarouselArray);
    }
    if(localStorage.getItem('anonymousCart') === '') {
      setShowCart(false);
    } else {
      setCart(new Map(Object.entries(JSON.parse(localStorage.getItem('anonymousCart') ?? ''))));
      setShowCart(true);
    }

  }
  useEffect(
    () => {
      setupApp(loggedIn);
    }, [loggedIn]
  )

  return (
    <div id='app'>

    <div className='flex flex-col items-center bg-slate-100 dark:bg-slate-800
    h-screen w-full'>
      <div className='font-bold md:text-3xl text-2xl mt-[15vh] text-green-600 dark:text-green-300'>
      Welcome to Less Go
      </div>
      <div className='md:text-md text-sm text-slate-600 dark:text-slate-200 mb-14'>
      Sign In to enjoy seamless shopping
      </div>
      <div className=' bg-slate-100 dark:bg-slate-800 w-full flex justify-center pb-14 md:pb-0'><CarouselDashboard {...{"listOfImages": carouselArray, "height": 60}} /></div>
      </div>
    {/* <div className='flex justify-center items-center bg-slate-100 dark:bg-slate-800 h-screen w-full'><div className='font-bold text-3xl text-green-600 dark:text-green-300'>Hemlo WOrld</div></div> */}
      <ShoppingCart {...{
        anonymous: true,
        cart: cart,
        showCart: showCart,
      }} />
    </div>
  );
}

export default App;
