// @flow strict

import { blogData } from "@/utils/data/blog-data";
import BlogCard from "../components/homepage/blog/blog-card";

function page() {
  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></span>
          <span className="bg-gradient-to-r from-pink-500 to-violet-600 w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-r from-violet-600 via-pink-500 to-transparent"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogData.map((blog, i) => (
            <BlogCard blog={blog} key={i} />
          ))
        }
      </div>
    </div>
  );
};

export default page;