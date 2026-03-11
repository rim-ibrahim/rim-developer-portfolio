// @flow strict
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {

  return (
    <Link href={`/blog/${blog.slug}`} className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group block"
    >
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg bg-[#0d1224] border-b border-[#1b2c68a0] flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{blog.tags?.[0] || 'Tech'}</h3>
        </div>
      </div>
      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p className='text-sm text-[#16f2b3]'>
            {`${blog.reading_time_minutes} Min Read`}
          </p>
        </div>
        <div className="cursor-pointer">
          <p className='my-2 lg:my-3 text-lg text-white sm:text-xl font-medium group-hover:text-violet-500 transition-colors'>
            {blog.title}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags?.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-[#1a1443] text-[#16f2b3] px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3'>
          {blog.description}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;