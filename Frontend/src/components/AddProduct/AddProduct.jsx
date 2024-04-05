import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <div className="h-screen px-8 text-center">Welcome to AddProduct page</div>;
}

export default AddProduct;
