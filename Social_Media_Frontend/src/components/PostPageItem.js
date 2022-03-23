import { ChatIcon } from "@heroicons/react/outline";
import moment from "moment";
import socket from "../websockets/posts";

import { useDispatch, useSelector } from "react-redux";
import { setLoginVisible } from "../slices/appSlice";
import { useEffect, useState } from "react";
import { handleDislikePost, handleLikePost } from "../utils/utils";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";

const PostLikes = ({ post, className }) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(post.upVotes - post.downVotes);
  }, [post]);

  socket.on("post_received_likes", (postId, pointsToAdd) => {
    if (postId === post.id) {
      setLikes(likes + pointsToAdd);
    }
  });
  socket.on("post_received_dislikes", (postId, pointsToAdd) => {
    if (postId === post.id) {
      setLikes(likes + pointsToAdd);
    }
  });

  return <p className={className}>{likes}</p>;
};

export const Voting = ({ post, numberColor, arrowsColor }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const index = user?.ratedPosts?.findIndex((p) => p.id === post?.id);
    if (index === -1) {
      setUserRating(null);
    } else {
      if (user) {
        setUserRating(user?.ratedPosts?.[index]?.rating);
      }
    }
  }, [user]);

  return (
    <>
      <ThumbUpIcon
        onClick={async () => {
          console.log(loading);

          if (user) {
            if (loading) {
              return;
            }
            setLoading(true);
            await handleLikePost(post, user, dispatch);
            setLoading(false);
          } else {
            dispatch(setLoginVisible(true));
          }
        }}
        className={`h-7 ${arrowsColor ? arrowsColor : "text-gray-400"} ${
          userRating === 1 && "text-black"
        } hover:text-black cursor-pointer`}
      />
      <PostLikes
        className={`px-1 font-bold text-sm ${
          numberColor ? numberColor : "text-black"
        }`}
        post={post}
      />
      <ThumbDownIcon
        onClick={async () => {
          console.log(loading);
          if (user) {
            if (loading) {
              return;
            }
            setLoading(true);
            await handleDislikePost(post, user, dispatch);
            setLoading(false);
          } else {
            dispatch(setLoginVisible(true));
          }
        }}
        className={`h-7 ${
          arrowsColor ? arrowsColor : "text-gray-400"
        } hover:text-black cursor-pointer ${
          userRating === -1 && "text-black"
        }   `}
      />
    </>
  );
};

const PostPageItem = ({ post, totalComments }) => {
  console.log(post);
  console.log(post.createdAt);
  const date = new Date(post?.createdAt);
  console.log(post);

  return (
    <div className="flex flex-col sm:flex-row max-w-[40rem]  bg-white  mb-4">
      <div className=" flex flex-col justify-center pr-2 items-center  w-25">
        <Voting post={post} />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col p-2">
          <div className="flex items-center space-x-2 ">
            <p
              onClick={() =>
                (window.location.href = `/community/${post.community.name}`)
              }
              className="inline mr-2 font-bold text-xs cursor-pointer underline"
            >
              {post?.community?.name || "noName"}
            </p>
            <p className="inline text-xs text-gray-800">
              posted by {post?.user?.username || "noName"}{" "}
              {moment(date.getTime()).fromNow()}
            </p>
          </div>
          <div className="mt-2 font-semibold text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </div>
        </div>
        <div className="flex items-center w-full overflow-hidden self-stretch">
          <img
            alt="post img"
            className="block max-w-40rem w-full object-contain"
            src={post.imageUrl || null}
          />
        </div>
        <div className="flex text-gray-400 items-center text-xs space-x-1 p-1">
          <p className="hover:bg-gray-200 p-2 py-3">
            <ChatIcon className="w-6 h-6 inline mr-0.5 " /> {totalComments}{" "}
            Comments
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostPageItem;
