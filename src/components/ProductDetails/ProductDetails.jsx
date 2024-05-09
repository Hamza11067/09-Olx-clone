import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../constants.js";


function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const url = API_URL + "/get-product/" + params.productId;
    axios
      .get(url)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleContact = (addedBy) => {
    const url = API_URL + "/get-user/" + addedBy;
    axios
      .get(url)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-8 py-4 grid grid-cols-12 gap-4">
      {/* <h1>Products Details</h1> */}
      {product && (
        <>
          <div className="col-span-8">
            <img
              className="h-[500px] w-full object-contain bg-black"
              src={ API_URL + "/" + product.pimage}
              alt="image"
            />
            <div className="p-4 my-4 text-gray-800 border-[1px] border-gray-300 rounded-md">
              <h2 className="py-2 text-4xl font-bold">Rs {product.price}</h2>
              <h2 className="text-2xl font-bold">{product.pname}</h2>
            </div>
            <div className="p-4 my-4 text-gray-800 border-[1px] border-gray-300 rounded-md">
              <h2 className="text-2xl font-bold">Description</h2>
              <p>{product.pdesc}</p>
            </div>
          </div>
          <div className="col-span-4">
            {product.addedBy && (
              <button
                className="text-2xl font-bold"
                onClick={() => handleContact(product.addedBy)}
              >
                Show Contact Details
              </button>
            )}
            {user && user.username && <h3>{user.username}</h3>}
            {user && user.mobile && <h3>{user.mobile}</h3>}
            {user && user.email && <h3>{user.email}</h3>}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
