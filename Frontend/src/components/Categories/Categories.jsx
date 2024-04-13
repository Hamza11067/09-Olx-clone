import { IoIosArrowDown } from "react-icons/io";

function Categories() {
  const categories = [
    "Mobile Phones",
    "Clothes",
    "Cars",
    "Motorcycles",
    "Houses",
    "Video-Audios",
    "Tablets",
    "Land & Plots",
  ];
  return (
    <div className="py-2 border-t-[1px] border-gray-300 flex items-center">
        <span className="flex items-center gap-1 font-medium cursor-pointer mr-2 uppercase">
            <p>All Categories </p>
            <IoIosArrowDown className="-mb-1 size-6"/>
        </span>
      {categories.map((item, index) => (
        <span key={index} className="ml-4 cursor-pointer text-gray-600 hover:text-blue-500">{item}</span>
      ))}
    </div>
  );
}

export default Categories;
