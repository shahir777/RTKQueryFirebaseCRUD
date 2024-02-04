import { Link } from 'react-router-dom';
import { useDeleteBlogMutation, useFetchBlogsQuery } from '../Services/BlogsApi'

const Home = () => {

  //rtk query hook for fethcing the data
  const { data, isLoading, } = useFetchBlogsQuery({});

  //rtk query hook for deleting the data
  const [deleteBlog]=useDeleteBlogMutation();

  if (isLoading) {
    return "loading"
  }

  const handleDelete= async(id: string)=>{
    await deleteBlog(id);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <img
              src={item.downloadURL}
              alt="Blog Image"
              className="w-full h-32 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-4 flex justify-between items-center">
              
              <Link to={`/update/${item.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </Link>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home
