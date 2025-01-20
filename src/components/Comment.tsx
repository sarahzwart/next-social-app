'use client';
import moment from 'moment';
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import {
  HiOutlineTrash,
} from "react-icons/hi";
import { useUser } from "@clerk/nextjs";


interface CommentInterface {
  comment: string;
  user: string;
  name: string;
  username: string;
  profileImg: string;
  _id: string;
  createdAt: string;
}

interface PostInterface {
  comments: string[];
  createdAt: string;
  image: string;
  likes: string[];
  name: string;
  profileImg: string;
  text: string;
  updatedAt: string;
  user: string;
  username: string;
  __v: number;
  _id: string;
}

export default function Comment({ comment, key, post} : {comment: CommentInterface, key: string, post: PostInterface}) {
  const { user } = useUser();

  const deleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      if (user && user.publicMetadata.userMongoId === comment.user) {
        console.log(post._id, comment._id)
        const res = await fetch("/api/post/deletec", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: post._id, commentId: comment._id  }),
        });
        if (res.status === 200) {
          location.reload();
        } else {
          alert("Error deleting post");
        }
      }
    }
  }
  return (
    <div className='flex p-3 border-b border-gray-200 w-full hover:bg-gray-50'>
      <Link href={`/users/${comment?.username}`}>
        <img
          src={comment?.profileImg}
          alt='user-img'
          className='h-9 w-9 rounded-full mr-4'
        />
      </Link>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-xs truncate max-w-32'>
              {comment?.name}
            </h4>
            <span className='text-xs truncate max-w-32'>
              @{comment?.username}
            </span>
            <span className='text-xl text-gray-500'>·</span>
            <span className='text-xs text-gray-500 flex-1 truncate max-w-32'>
              {moment(comment?.createdAt).fromNow()}
            </span>
          </div>
          {user && comment.user === user.publicMetadata.userMongoId &&
          <HiOutlineTrash className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' 
          onClick={deleteComment}/>}
        </div>
        <p className='text-gray-800 text-xs my-3'>{comment?.comment}</p>
      </div>
    </div>
  );
}