import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  const [pname, setPname] = useState();
  const [pdesc, setPdesc] = useState();
  const [price, setPrice] = useState();
  const [pcategory, setPcategory] = useState("Bikes");
  const [pimage, setPimage] = useState(null);

  const handleApi = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pname", pname);
    formData.append("pdesc", pdesc);
    formData.append("price", price);
    formData.append("pcategory", pcategory);
    formData.append("pimage", pimage);

    const url = "http://localhost:3000/add-product";
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Product added successfuly");

    // // clearing form data
    // setPname("");
    // setPdesc("");
    // setPrice("");
    // setPimage(null);
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 z-10 px-8 flex justify-center bg-white">
      <form className="w-full" onSubmit={handleApi}>
        <h1 className="text-center text-3xl font-semibold py-2">ADD PRODUCT</h1>
        <label htmlFor="pname" className="text-xl font-medium">
          Product Name
        </label>
        <br />
        <input
          type="text"
          id="pname"
          className="w-full p-1 mb-2 border-[1px] border-black"
          value={pname}
          onChange={(e) => {
            setPname(e.target.value);
          }}
          required
        />
        <label htmlFor="pdesc" className="text-xl font-medium">
          Product Description
        </label>
        <br />
        <textarea
          rows={6}
          type="text"
          id="pdesc"
          className="w-full p-1 mb-2 border-[1px] border-black"
          value={pdesc}
          onChange={(e) => {
            setPdesc(e.target.value);
          }}
          required
        />
        <label htmlFor="price" className="text-xl font-medium">
          Product Price
        </label>
        <br />
        <input
          type="number"
          id="price"
          className="w-full p-1 mb-2 border-[1px] border-black"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required
        />
        <label
          htmlFor="pcategory"
          className="flex items-center justify-between text-xl font-medium"
        >
          <h2 className="mb-2">Product Category</h2>
          <select
            name=""
            id="pcategory"
            className="p-1 border-[1px] border-black cursor-pointer"
            value={pcategory}
            onChange={(e) => {
              setPcategory(e.target.value);
            }}
          >
            <option value="bikes">Bikes</option>
            <option value="mobiles">Mobiles</option>
            <option value="clothes">Clothes</option>
          </select>
        </label>
        <label htmlFor="pimage" className="text-xl font-medium">
          Product Image
        </label>
        <br />
        <input
          type="file"
          id="pimage"
          className="w-full p-1 my-2  border-[1px] border-black cursor-pointer"
          onChange={(e) => {
            setPimage(e.target.files[0]);
          }}
          required
        />
        {/* Displaying the name of the selected file */}
        {pimage && <p></p>}
        <button
          type="submit"
          className="my-2 px-4 py-2 text-lg font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
