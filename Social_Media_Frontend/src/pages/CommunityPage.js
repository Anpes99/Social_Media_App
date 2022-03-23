import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import { setCurrentCommunity } from "../slices/appSlice";
import { useDispatch } from "react-redux";

const CommunityPage = () => {
  console.log("gfiuadsfhbg");
  const dispatch = useDispatch();
  const communityName = useParams().communityName;

  const [communityId, setCommunityId] = useState(null);
  useEffect(async () => {
    const res = await axios.get("/api/communities?name=" + communityName);
    setCommunityId(res.data[0].id);
    console.log(res);
    dispatch(setCurrentCommunity(res.data[0]));
  }, [communityName]);

  return (
    <div className="bg-green-600 min-h-screen">
      <Header />
      <div>
        <div className="bg-white h-[6rem] flex flex-col">
          <div className="max-w-screen-lg m-auto flex space-x-4">
            <div className="flex flex-col items-start space-y-1 py-2">
              <h2 className="font-bold text-2xl underline">{communityName}</h2>
            </div>
            <button className="join-btn self-center">Join</button>
          </div>
        </div>
      </div>
      <main className="max-w-screen-lg m-auto p-5">
        {communityId && (
          <div>
            <PostFeed communityId={communityId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunityPage;
