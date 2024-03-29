import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="bg-[#f7f8f9]" id="sub-footer">
        <div className="px-8 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-4">
            <img
              src="https://www.olx.com.pk/assets/olxMobileApp.f5579f77e849b600ad60857e46165516.webp"
              alt="img"
            />
          </div>
          <div className="col-span-4 flex flex-col justify-center border-r-2 border-gray-400">
            <h1 className="text-3xl font-bold py-4">TRY THE OLX APP</h1>
            <p className="text-lg font-regular">
              Buy, sell and find just about anything using the app on your
              mobile.
            </p>
          </div>
          <div className="col-span-3 flex flex-col justify-center">
            <h3 className="font-bold text-sm py-4">GET YOUR APP TODAY</h3>
            <div id="links" className="grid grid-cols-3 gap-2">
              <Link
                to="https://apps.apple.com/pk/app/olx-pakistan-online-shopping/"
                className="col-span-1"
                target="_blank"
              >
                <img
                  src="https://www.olx.com.pk/assets/iconAppStoreEN_noinline.a731d99c8218d6faa0e83a6d038d08e8.svg"
                  alt="App Store"
                />
              </Link>
              <Link
                to="https://play.google.com/store/apps/details?id=com.olx.pk"
                className="col-span-1"
                target="_blank"
              >
                <img
                  src="https://www.olx.com.pk/assets/iconGooglePlayEN_noinline.9892833785b26dd5896b7c70b089f684.svg"
                  alt="Google play"
                />
              </Link>
              <Link
                to="https://appgallery.huawei.com/#/app/"
                className="col-span-1"
                target="_blank"
              >
                <img
                  src="	https://www.olx.com.pk/assets/iconAppGallery_noinline.6092a9d739c77147c884f1f7ab3f1771.svg"
                  alt="App Gallery"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="main-footer" className="bg-[#ebeeef]">
        <div className="px-8 grid grid-cols-11 gap-12 pt-4 pb-8">
          <div className="col-span-2">
            <h2 className="text-sm font-bold"> POPULAR CATEGORIES</h2>
            <ul className="text-xs mt-2 text-gray-500 ">
              <li className="cursor-pointer hover:text-gray-900 pb-1">Cars</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Flats for rent</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Mobile phones</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Jobs</li>
            </ul>
          </div>
          <div className="col-span-2">
            <h2 className="text-sm font-bold">TRENDING SEARCHES</h2>
            <ul className="text-xs mt-2 text-gray-500 ">
              <li className="cursor-pointer hover:text-gray-900 pb-1">Bikes</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Watches</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Books</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Dogs</li>
            </ul>
          </div>
          <div className="col-span-2">
            <h2 className="text-sm font-bold">ABOUT US</h2>
            <ul className="text-xs mt-2 text-gray-500 ">
              <li className="cursor-pointer hover:text-gray-900 pb-1">About Dubizzle Group</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Olx Blog</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Contact Us</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Olx for Businesses</li>
            </ul>
          </div>
          <div className="col-span-2">
            <h2 className="text-sm font-bold">OLX</h2>
            <ul className="text-xs mt-2 text-gray-500 ">
              <li className="cursor-pointer hover:text-gray-900 pb-1">Help</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Sitemap</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Terms of Use</li>
              <li className="cursor-pointer hover:text-gray-900 pb-1">Privacy Policy</li>
            </ul>
          </div>
          <div className="col-span-3">
            <h2 className="text-sm font-bold">FOLLOW US</h2>

          </div>
        </div>
      </div>
      <div id="mini-footer" className="bg-[#002F34] px-8 py-4 flex items-end justify-end text-gray-100">
        <h4 className="text-xs font-bold">Free Classifieds in Pakistan &nbsp; .</h4>
        <p className="text-xs">© 2006-2024 OLX</p>
      </div>
    </footer>
  );
}

export default Footer;
