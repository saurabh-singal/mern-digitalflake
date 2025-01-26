import { LiaHomeSolid } from "react-icons/lia";
import { TbCategory2 } from "react-icons/tb";
import { AiOutlineBars } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <nav className="bg-gray-100 w-48 md:w-64 flex-shrink-0 h-full overflow-y-auto">
      <ul className="space-y-4 p-4">
        <li className="rounded hover:shadow hover:bg-yellow-100 py-2">
          <Link to="/dashboard" className="flex items-center font-bold px-3">
            <LiaHomeSolid className="w-6 h-6 mr-4" />
            Home
          </Link>
        </li>
        <li className="rounded hover:shadow hover:bg-yellow-100 py-2">
          <Link
            to="/dashboard/category"
            className="flex items-center font-bold px-3"
          >
            <TbCategory2 className="w-6 h-6 mr-4" />
            Category
          </Link>
        </li>
        <li className="rounded hover:shadow hover:bg-yellow-100 py-2">
          <Link
            to="/dashboard/subcategory"
            className="flex items-center font-bold px-3"
          >
            <AiOutlineBars className="w-6 h-6 mr-4" />
            Subcategory
          </Link>
        </li>
        <li className="rounded hover:shadow hover:bg-yellow-100 py-2">
          <Link
            to="/dashboard/products"
            className="flex items-center font-bold px-3"
          >
            <BsBoxSeam className="w-6 h-6 mr-4" />
            Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
