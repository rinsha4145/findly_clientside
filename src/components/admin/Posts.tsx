"use client";

import { fetchAllPosts, fetchAllPostsAdmin } from "@/lib/store/features/actions/postActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import handleAsync from "@/utils/handleAsync";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Posts = () => {

  const dispatch=useAppDispatch()

  const posts  = useAppSelector((state) => state.post.postsAdmin);

  console.log("first")

  useEffect(()=>{
     dispatch(fetchAllPostsAdmin())
  },[])
 
  
const router =useRouter()
  return (
    <div className="flex flex-col p-4">
  <div className="overflow-x-auto pb-4">
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden border rounded-lg border-gray-300">
        {Array.isArray(posts) && posts.length === 0 ? (
          <p className="text-center p-4 text-gray-500">No posts available</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Post ID
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Owner Name & Email
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Description
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Media
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Likes
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Comments
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Reports
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {Array.isArray(posts) && posts.map((post,index) => (
                <tr key={`${post._id}-${index}`} className="hover:bg-gray-50" onClick={()=>router.push(`/admin/posts/${post._id}`)}>
                  
                  <td className="p-3 text-xs sm:text-sm text-gray-900">{post._id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Image
                        src={post.owner?.profileImage || "https://via.placeholder.com/40"}
                        alt={post.owner?.firstName || "Unknown"}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium text-xs sm:text-sm">{post.owner?.firstName} {post.owner?.lastName || "Unknown"}</p>
                        <p className="text-gray-500 text-xs">{post.owner?.email || "N/A"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-gray-900">
                    {post.description || "No description"}
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-gray-900">
                    <div className="flex gap-2">
                    {post.images?.slice(0, 2).map((image, index) => (
  <Image
    key={index}
    className="rounded-md max-h-16 object-cover"
    src={image}
    alt={`Post Image ${index + 1}`}
    width={50}
    height={50}
  />
))}

                      {post.video && (
                        <video className="rounded-md max-h-16 object-cover" controls width={50} height={50}>
                          <source src={post.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-gray-900">
                    {post.likedBy?.length || 0}
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-gray-900">
                    {post.comments?.length || 0}
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-gray-900">
                    {post.reports?.length || 0}
                  </td>
                  <td className="p-3 flex gap-2">
                    
                    <button className="p-2 bg-red-600 text-white rounded text-xs sm:text-sm" onClick={handleAsync}>
                      Delete
                    </button>
                    <button className="p-2 bg-gray-800 text-white rounded text-xs sm:text-sm">
                      More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Posts;
