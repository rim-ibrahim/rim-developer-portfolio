// @flow strict

import { blogData } from "@/utils/data/blog-data";
import { notFound } from "next/navigation";
import { BsCalendarDate } from "react-icons/bs";
import { FaClock } from "react-icons/fa";

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.slug,
  }));
}

async function BlogDetails({ params }) {
  const { slug } = await params;
  const blog = blogData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="flex justify-center">
        <div className="max-w-4xl w-full">
          {/* Blog Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center text-[#16f2b3] mb-6">
              <div className="flex items-center gap-2">
                <BsCalendarDate />
                <span>{new Date(blog.published_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{blog.reading_time_minutes} Min Read</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags?.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-sm bg-gradient-to-r from-pink-500 to-violet-600 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              {blog.description}
            </p>
          </div>

          {/* Blog Content */}
          <div className="bg-[#1b203e] rounded-lg p-6 md:p-8 border border-[#1d293a]">
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-[#16f2b3] hover:text-violet-500 transition-colors"
            >
              <span>←</span>
              <span>Back to All Blogs</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
