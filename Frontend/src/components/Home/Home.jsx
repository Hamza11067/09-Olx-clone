import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchHeader from "../Header/SearchHeader";
import Categories from "../Categories/Categories";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cproducts, setcProducts] = useState([]);
  const [search, setSearch] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);
  console.log(likedProducts);

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

    let data = { userId: localStorage.getItem("userId") };
    const url2 = "http://localhost:3000/liked-products";
    axios
      .post(url2, data)
      .then((res) => {
        if ((res.data, products)) {
          setLikedProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isRefreshed]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {
    const url = "http://localhost:3000/search?search=" + search;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setcProducts(res.data.products);
        setIsSearched(true);
      })
      .catch((err) => {
        console.log("Server Error:", err);
      });

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

  const handleLike = (productId, e) => {
    e.stopPropagation();

    let userId = localStorage.getItem("userId");
    const data = { userId, productId };
    const url = "http://localhost:3000/like-product";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.message);
        setIsRefreshed(!isRefreshed);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDislike = (productId, e) => {
    e.stopPropagation();

    let userId = localStorage.getItem("userId");
    const data = { userId, productId };
    const url = "http://localhost:3000/dislike-product";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.message);
        setIsRefreshed(!isRefreshed);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToSingleProduct = (id) => {
    navigate("/product/" + id);
  };

  const clearSearchResults = () => {
    setIsSearched(false);
    setSearch("");
  };

  return (
    <>
      <div className="px-8">
        <SearchHeader
          search={search}
          handleSearch={handleSearch}
          handleClick={handleClick}
        />
        <Categories handleCategory={handleCategory} />

        {isSearched && cproducts && (
          <>
            <h3 className=" font-medium uppercase">Search Results</h3>
            <button
              className="font-bold underline hover:no-underline"
              onClick={() => clearSearchResults()}
            >
              Clear Results
            </button>
          </>
        )}
        {isSearched && cproducts && cproducts.length < 1 && (
          <h3 className=" font-medium uppercase">No Results Found</h3>
        )}
        {isSearched && (
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
                      <div
                        onClick={handleIconClick}
                        className="cursor-pointer "
                      >
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
        )}

        {!isSearched && (
          <div className="products flex flex-wrap gap-6 py-4">
            {products &&
              products.length > 0 &&
              products.map((item) => (
                <div
                  onClick={() => goToSingleProduct(item._id)}
                  key={item._id}
                  className="product-card w-[300px]  border-[1px] border-gray-300 cursor-pointer"
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
                      <div>
                        {likedProducts.find(
                          (likedItem) => likedItem._id == item._id
                        ) ? (
                          <IoMdHeart
                            size={24}
                            onClick={(e) => handleDislike(item._id, e)}
                          />
                        ) : (
                          <IoMdHeartEmpty
                            size={24}
                            className="hover:fill-gray-500"
                            onClick={(e) => handleLike(item._id, e)}
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
        )}
      </div>
    </>
  );
}

export default Home;
