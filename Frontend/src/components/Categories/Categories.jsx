import { IoIosArrowDown } from "react-icons/io";
// import { Link } from "react-router-dom";
import categories from "./CategoryList";
import { useNavigate } from "react-router-dom";


function Categories() {
  const navigate = useNavigate();
 

  return (
    <div className="py-2 border-t-[1px] border-gray-300 flex items-center justify-between">
      <span className="flex items-center gap-1 font-medium cursor-pointer mr-2 uppercase">
        <p>All Categories </p>
        <IoIosArrowDown className="-mb-1 size-6" />
      </span>
      <div>
        {categories.map((item, index) => (
          <span
            key={index}
            onClick={() => navigate("/category/" + item)}
            className="ml-4 cursor-pointer text-gray-600 hover:text-blue-500"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Categories;
