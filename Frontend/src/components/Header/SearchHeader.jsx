import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

function SearchHeader(props) {
  const [isPersonIconClicked, setIsPersonIconClicked] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handlePersonClick = () => {
    if (isPersonIconClicked) {
      document.getElementById("personIconDetail").classList.remove("hidden");
      document.getElementById("arrowIcon").classList.add("rotate-180");
    } else {
      document.getElementById("personIconDetail").classList.add("hidden");
      document.getElementById("arrowIcon").classList.remove("rotate-180");
    }
    setIsPersonIconClicked(!isPersonIconClicked);
  };

  return (
    <div
      id="search-header"
      className="py-4 grid grid-cols-12 items-center gap-4"
    >
      <div
        id="select"
        className="flex items-center justify-between col-span-3 p-2 border-[1px] border-gray-300 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path d="M512 85.33c211.75 0 384 172.27 384 384 0 200.58-214.8 392.34-312.66 469.34H440.68C342.83 861.67 128 669.9 128 469.33c0-211.73 172.27-384 384-384zm0 85.34c-164.67 0-298.67 133.97-298.67 298.66 0 160.02 196.89 340.53 298.46 416.6 74.81-56.72 298.88-241.32 298.88-416.6 0-164.69-133.98-298.66-298.67-298.66zm0 127.99c94.1 0 170.67 76.56 170.67 170.67s-76.56 170.66-170.66 170.66-170.67-76.56-170.67-170.66S417.9 298.66 512 298.66zm0 85.33c-47.06 0-85.33 38.28-85.33 85.34s38.27 85.33 85.34 85.33 85.33-38.27 85.33-85.33-38.27-85.34-85.33-85.34z"></path>
        </svg>
        <select name="location" id="location">
          <option value="Pakistan">Pakistan</option>
        </select>
      </div>
      <div id="search" className="flex items-center justify-between col-span-7">
        <div className="w-full  p-2 border-[1px] border-gray-300">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
            value={props.search && props.search}
            onChange={(e) =>
              props.handleSearch && props.handleSearch(e.target.value)
            }
          />
        </div>
        <button
          className="p-2 bg-black border-[1px] border-black"
          onClick={() => props.handleClick && props.handleClick()}
        >
          <svg
            className="fill-white bg-black"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 1024 1024"
          >
            <path d="M448 725.33c-152.92 0-277.33-124.41-277.33-277.33S295.08 170.67 448 170.67 725.33 295.08 725.33 448 600.92 725.33 448 725.33zm436.44 98.78v.02L732.52 672.19c48.77-61.78 78.15-139.54 78.15-224.19 0-199.98-162.7-362.67-362.67-362.67S85.33 248.03 85.33 448c0 199.98 162.69 362.67 362.67 362.67 84.63 0 162.41-29.38 224.17-78.15l206.14 206.15h60.36v-60.33l-54.23-54.23z"></path>
          </svg>
        </button>
      </div>
      {!localStorage.getItem("token") ? (
        <Link
          to="/login"
          className="col-span-1 text-center font-bold underline hover:no-underline"
        >
          <p>Login</p>
        </Link>
      ) : (
        <div>
          <div
            className="flex items-center justify-center cursor-pointer relative"
            onClick={handlePersonClick}
          >
            <img src="/olx-person.png" className="w-10" alt="img" />
            <IoIosArrowDown size={18} id="arrowIcon" />
          </div>
          {/* section below will open onClick of person icon */}
          <div
            id="personIconDetail"
            className="hidden bg-white right-36 mt-2 border-[1px] border-gray-300 absolute"
          >
            <div className="px-4 pt-4 ">
              <div className="flex items-center justify-start gap-4 mb-4">
                <img src="/olx-person.png" className="w-16" alt="img" />
                <div>
                  <p>Hello,</p>
                  <h2 className="text-xl font-bold">Dear User</h2>
                </div>
              </div>
              <div className="font-bold  py-2 px-8 rounded-md border-2 border-gray-500 hover:border-black cursor-pointer mb-4">
                <button className="hover:underline">
                  view and edit your profile
                </button>
              </div>
            </div>
            <hr />
            <div>
              <div className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23px"
                  height="23px"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M349.46 85.333h487.619l40.635 40.635v609.524l-40.635 40.635h-487.619l-40.635-40.635v-609.524l40.635-40.635zM390.095 694.857h406.35v-528.254h-406.35v528.254zM146.286 247.873l40.635-40.635 40.635 40.635v609.524h528.254l40.635 40.635-40.635 40.635h-568.889l-40.635-40.635v-650.159zM512 329.143h162.54l40.635 40.635-40.635 40.635h-162.54l-40.635-40.635 40.635-40.635zM512 491.683h81.27l40.635 40.635-40.635 40.635h-81.27l-40.635-40.635 40.635-40.635z"></path>
                </svg>
                <h3 className="text-lg">My ads</h3>
              </div>
              <Link to="/liked-products" className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  fill="none"
                  viewBox="0 0 22 20"
                >
                  <path
                    fill="#23262A"
                    fillRule="evenodd"
                    d="M19.22 8.37L11 18.42 2.8 8.4A3.96 3.96 0 0 1 2 6a4 4 0 0 1 4-4 4 4 0 0 1 3.87 3h2.26A4 4 0 0 1 16 2a4 4 0 0 1 3.22 6.37zM16 0a6 6 0 0 0-5 2.69A6 6 0 0 0 6 0a6 6 0 0 0-6 6 5.97 5.97 0 0 0 1.23 3.63L9.71 20h2.58l8.5-10.4A5.94 5.94 0 0 0 22 6a6 6 0 0 0-6-6z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-lg">Favourites & Saved searches</h3>
              </Link>
              <div className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23px"
                  height="23px"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"></path>
                </svg>
                <h3 className="text-lg" onClick={handleLogout}>
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <Link to="/add-product" className="col-span-1 flex items-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="104"
          height="48"
          viewBox="0 0 1603 768"
          className="_3V9PS"
        >
          <path
            className="_2bClX _12yOz"
            d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058S231.721 16.943 434.442 16.943z"
            fill="#fff"
          />
          <path
            className="_2bClX _YBz-"
            d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-.016-.014C139.407 542.352 99.766 464.914 99.766 383.997c0-41.07 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845C18.8 280.243 6.201 331.224 6.201 383.997c0 104.027 50.962 203.61 139.799 273.175h.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783H427.237z"
            fill="#ffce32"
          />
          <path
            className="_2bClX _3uYj7"
            d="M1318.522 38.596c-45.72-14.369-93.752-21.658-142.762-21.658H427.249c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829 44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.01-97.197-67.703-154.957-85.852z"
            fill="#23e5db"
          />
          <path
            className="_2bClX BfroU"
            d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88a251.85 251.85 0 01-11.214 74.363c-38.348 124.311-168.398 211.129-316.262 211.129H726.949l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498a323.69 323.69 0 0014.423-95.559c0-98.044-43.805-190.216-123.317-259.551z"
            fill="#3a77ff"
          />
        </svg>
        <div className="absolute flex items-center justify-center gap-2 font-bold w-full h-full">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              width="16"
              height="16"
              viewBox="0 0 1024 1024"
              fill="#002f34"
            >
              <path d="M414.898 123.739v291.218H123.68l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16V123.739l-97.073-97.073z" />
            </svg>
          </span>
          <p className="text-sm">SELL</p>
        </div>
      </Link>
    </div>
  );
}

export default SearchHeader;
