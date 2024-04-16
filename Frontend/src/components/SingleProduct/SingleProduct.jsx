import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleProduct() {
  const params = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const url = "http://localhost:3000/get-product/" + params.productId;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-8 py-4 grid grid-cols-12 gap-4">
      {/* <h1>Products Details</h1> */}
      {product && (
        <>
          <div className="col-span-8">
            <img
              className="h-[500px] w-full object-contain bg-black"
              src={"http://localhost:3000/" + product.pimage}
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
            <h2 className="text-2xl font-bold">User Details</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleProduct;
