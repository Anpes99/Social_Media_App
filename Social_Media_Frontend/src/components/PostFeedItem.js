import moment from "moment";
import { useNavigate } from "react-router";
import socket from "../websockets/posts";
import { useState } from "react";
import { Voting } from "./PostPageItem";

const PostFeedItem = ({ post }) => {
  const [likes, setLikes] = useState(post?.upVotes - post?.downVotes);

  const date = new Date(post.createdAt);

  const navigate = useNavigate();

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

  return (
    <div className=" flex flex-col sm:flex-row w-full    sm:h-min-content bg-white border mb-3  border-gray-300 p-0.5 ">
      <div
        onClick={() => {
          console.log(post);
          navigate(
            `/community/${post?.community?.name || "noName"}/comments/${
              post.id
            }/${post?.title.replaceAll(" ", "_") || "noTitle"}`
          );
        }}
        className="flex flex-col cursor-pointer w-full"
      >
        <div className="flex flex-col p-2">
          <div className="flex items-center space-x-2 justify-center mb-1">
            <p className="inline mr-2 font-bold text-sm underline cursor-pointer">
              {post?.community?.name || "noName"}
            </p>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <p className="inline text-xs text-gray-900">
              posted by {post?.user?.username || "noName"}{" "}
              {moment(date.getTime()).fromNow()}
            </p>
          </div>
          <div className="mt-2 font-semibold text-lg line-clamp-5 flex text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </div>
        </div>

        <img
          className="block max-w-[40rem]  overflow-hidden  object-contain w-full m-auto border-2 "
          src={post?.imageUrl || null}
        />
      </div>
      <div className="flex  p-2 items-center">
        <Voting post={post} />
      </div>
    </div>
  );
};

export default PostFeedItem;
