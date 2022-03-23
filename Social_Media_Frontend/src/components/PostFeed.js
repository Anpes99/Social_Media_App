import PostFeedItem from "./PostFeedItem";
import TopCommunities from "./TopCommunities";
import { useCallback, useRef, useState } from "react";
import useGetPosts from "../hooks/useGetPosts";
import { useSearchParams } from "react-router-dom";

const PostFeed = ({ communityId, orderType }) => {
  const [reachedEnd, setReachedEnd] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  orderType = orderType ? orderType : "new";
  const [fetchMorePosts, loading, posts] = useGetPosts(
    sort,
    communityId,
    orderType
  );

  const observer = useRef();
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePosts(orderType);
      }
    });
    if (node) observer.current.observe(node);
  });

  /* const sortByDate = async () => {
    const result = await axios.get(`/api/posts?sortBy=createdAt&order=ASC`);
    setPost(result.data);
  };
^*/

  return (
    <div
      onScroll={() => {
        console.log("scroll");
      }}
      className="flex flex-col  w-full"
    >
      <div className="flex justify-center lg:justify-between w-full">
        <div className="pr-0 lg:pr-7 w-full">
          {posts.map((post, i) => {
            console.log(post.id, "  ", i);
            if (i + 1 === posts.length) {
              return (
                <div key={post.id} ref={lastPostRef}>
                  <PostFeedItem post={post} />
                </div>
              );
            } else return <PostFeedItem post={post} key={post.id} />;
          })}
        </div>
        <div className="hidden lg:block">
          <TopCommunities />
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
