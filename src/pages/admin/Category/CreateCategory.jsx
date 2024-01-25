import { useState } from "react";
import CategoryForm from "../../../components/admin/Category/CategoryForm";
import {
  createCategoryData,
  getAllCategoriesData,
  removeCategoryData,
} from "../../../api/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaDeleteLeft } from "react-icons/fa6";
import LocalSearch from "../../../utils/LocalSearch";

const CreateCategory = () => {
  const { token } = useSelector(state => state.user.userinfo);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getAllCategoriesData();
      return res.data;
    },
  });
  //   console.log(categories);

  const handleSearched = keyword => cat =>
    cat.name.toLowerCase().includes(keyword);

  const onSubmit = async (data, resetForm) => {
    setLoading(true);
    const name = data.category;
    // console.log(name);
    try {
      const response = await createCategoryData({ name }, token);
      if (response.status == "200") {
        setLoading(false);
        refetch();
        toast.success(`Category ${name} is created`);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      resetForm();
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleCategoryDelete = async slug => {
    // console.log(slug);
    toast.info(
      <>
        <p>{`Are you sure to delete category ${slug} ?`}</p>
        <div className='flex gap-x-5 mt-5'>
          <button
            className='px-2 py-1 bg-red-500 text-white font-semibold'
            onClick={() => confirmCategoryDelete(slug)}
          >
            Yes
          </button>
          <button
            className='px-2 py-1 bg-emerald-500 text-white font-semibold'
            onClick={toast.dismiss}
          >
            No
          </button>
        </div>
      </>,
      { autoClose: false }
    );
  };
  const confirmCategoryDelete = async slug => {
    try {
      setLoading(true);
      const response = await removeCategoryData(slug, token);
      if (response.status == "200") {
        setLoading(false);
        toast.dismiss();
        toast.success(`Category ${slug} deleted successfully`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Error deleting category");
    }
  };
  // console.log("Keyword:", keyword);
  // console.log(
  //   "Filtered Categories:",
  //   categories.filter(handleSearched(keyword))
  // );

  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        {loading ? (
          <p className='text-red-500'>Loading</p>
        ) : (
          <p>Create Category</p>
        )}
      </div>
      <CategoryForm onSubmit={onSubmit} />

      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <hr />
      <div className='w-full container mx-auto'>
        {categories.filter(handleSearched(keyword)).map((cat, idx) => (
          <div
            key={cat._id}
            className='bg-gray-200/100 mb-4 flex items-center justify-between'
          >
            <h3 className=' text-xl font-medium px-3 w-full'>
              {idx + 1}. {cat.name}
            </h3>
            <div className='flex gap-x-5 text-3xl'>
              <Link
                to={`/admin/category/${cat.slug}`}
                className='hover:bg-emerald-400 rounded-full px-4 py-4'
              >
                <AiFillEdit color='#008000' />
              </Link>
              <Link
                onClick={() => handleCategoryDelete(cat.slug)}
                className='hover:bg-red-400 rounded-full px-4 py-4'
              >
                <FaDeleteLeft className='text-red-500 hover:text-red-800' />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCategory;
