import { Link, useNavigate } from "react-router-dom";

function SearchHeader(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      id="search-header"
      className="py-2 grid grid-cols-12 items-center gap-4"
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
          <option value="India">India</option>
          <option value="Germany">Germany</option>
          <option value="UAE">UAE</option>
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
        <button
          className="col-span-1 text-center font-bold underline hover:no-underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
      <Link
        to="/add-product"
        className="col-span-1  font-bold flex items-center px-2  rounded-full border-4 border-blue-400"
      >
        <span className="text-2xl -mt-[6px]">&nbsp;+&nbsp;</span>
        <p className="text-sm">SELL</p>
      </Link>
    </div>
  );
}

export default SearchHeader;
