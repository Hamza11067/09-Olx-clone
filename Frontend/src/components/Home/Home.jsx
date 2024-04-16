import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchHeader from "../Header/SearchHeader";
import Categories from "../Categories/Categories";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cproducts, setcProducts] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    const url = "http://localhost:3000/get-products";
    axios
      .get(url)
      .then((res) => {
        if ((res.data, products)) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {

    // const url = "http://localhost:3000/search?query=" + search;

    // let filteredProducts = products.filter((item) => {
    //   if (
    //     item.pname.toLowerCase().includes(search.toLowerCase()) ||
    //     item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
    //     item.pcategory.toLowerCase().includes(search.toLowerCase())
    //   ) {
    //     return item;
    //   }
    // });
    // setcProducts(filteredProducts);
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item) => {
      console.log(value, item);
      if (item.pcategory.toLowerCase() == value.toLowerCase()) {
        return item;
      }
    });
    setcProducts(filteredProducts);
  };

  // heart icon functioonality
  // const [likedProducts, setLikedProducts] = useState({}); // State to store liked products
  const likedProducts = {};

  const handleIconClick = (productId) => {
    // Toggle like status for the clicked product
    //  setLikedProducts((prevLikedProducts) => ({
    //   ...prevLikedProducts,
    //   [productId]: !prevLikedProducts[productId],
    // }));

    let userId = localStorage.getItem("userId");
    // console.log("productId", productId, "userId", userId);

    const data = { userId, productId };
    const url = "http://localhost:3000/like-product";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const  goToSingleProduct = (id) => {
    navigate("/product/" + id)
  }

  return (
    <>
      <div className="px-8">
        <SearchHeader
          search={search}
          handleSearch={handleSearch}
          handleClick={handleClick}
        />
        <Categories handleCategory={handleCategory} />

        <h3 className=" font-medium uppercase">Search Results</h3>
        <div className="products flex flex-wrap gap-6 py-4">
          {cproducts &&
            products.length > 0 &&
            cproducts.map((item) => (
              <div
                key={item._id}
                className="product-card w-[300px]  border-[1px] border-gray-300"
              >
                <img
                  className="inline-block w-full h-[200px] object-cover"
                  src={"http://localhost:3000/" + item.pimage}
                  alt="img"
                />
                <div className="text-left p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold pb-2">
                      Rs {item.price}
                    </h2>
                    <div onClick={handleIconClick} className="cursor-pointer ">
                      {/* {likedProducts[item._id] ? ( */}
                      <IoMdHeartEmpty
                        size={24}
                        className="hover:fill-red-500"
                      />
                      {/* // ) : ( */}
                      {/* <IoMdHeart size={24} /> */}
                      {/* )} */}
                    </div>
                  </div>
                  <h2 className="text-lg">
                    {item.pname} | {item.pcategory}
                  </h2>
                  <p className="text-sm text-gray-500 pt-1">{item.pdesc}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-between font-medium uppercase">
          <h3>All Products</h3>
          <button className="px-4 py-2 text-lg font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700">
            <Link to="/liked-products">Liked Products</Link>
          </button>
        </div>
        <div className="products flex flex-wrap gap-6 py-4">
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <div
                onClick={() => goToSingleProduct(item._id)}
                key={item._id}
                className="product-card w-[300px]  border-[1px] border-gray-300"
              >
                <img
                  className="inline-block w-full h-[200px] object-cover"
                  src={"http://localhost:3000/" + item.pimage}
                  alt="img"
                />
                <div className="text-left p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold pb-2">
                      Rs {item.price}
                    </h2>
                    <div
                      onClick={() => handleIconClick(item._id)}
                      className="cursor-pointer"
                    >
                      {likedProducts[item._id] ? (
                        <IoMdHeart size={24} />
                      ) : (
                        <IoMdHeartEmpty
                          size={24}
                          className="hover:fill-red-500"
                        />
                      )}
                    </div>
                  </div>
                  <h2 className="text-lg">
                    {item.pname} | {item.pcategory}
                  </h2>
                  <p className="text-sm text-gray-500 pt-1">{item.pdesc}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
