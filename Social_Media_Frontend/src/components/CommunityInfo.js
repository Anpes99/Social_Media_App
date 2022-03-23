import { setLoginVisible, setCurrentCommunity } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  handleJoinCommunity,
  handleLeaveCommunity,
} from "../utils/communityActions";
import f1 from "../fake data/defaultPersonImg.png";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";

const CommunityInfo = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const currentCommunity = useSelector((state) => state.app.currentCommunity);

  const communityName = useParams().communityName;

  useEffect(async () => {
    const res = await axios.get("/api/communities?name=" + communityName);
    dispatch(setCurrentCommunity(res.data[0]));
  }, [communityName]);

  return (
    <div className="p-2 flex flex-col space-y-3">
      <div
        onClick={() =>
          (window.location.href = `/community/${currentCommunity?.name}`)
        }
        className=" font-bold flex space-x-5 items-center self-start cursor-pointer"
      >
        <div className="rounded-full overflow-hidden h-[3rem] w-[3rem]">
          <img src={f1} />
        </div>
        <p className="text-lg font-semibold">
          community/{currentCommunity?.name}
        </p>{" "}
      </div>
      <p className="max-w-xs text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="flex space-x-20 border-b pb-5">
        <div className="">
          <p className="font-bold">100k</p>
          <p className="font-medium text-xs text-gray-800">Members</p>
        </div>
        <div className="">
          <p className="font-bold">2k</p>
          <p className="font-medium text-xs text-gray-800">Online</p>
        </div>
      </div>
      <div className="text-base font-normal">created aug 27 2008</div>
      {!user?.communities?.map((s) => s.id).includes(currentCommunity?.Id) && (
        <button
          onClick={() => {
            if (user) {
              handleJoinCommunity(user, post, dispatch);
            } else {
              dispatch(setLoginVisible(true));
            }
          }}
          className="btn2"
        >
          Join
        </button>
      )}
      {user?.communities?.map((s) => s.id).includes(currentCommunity?.Id) && (
        <button
          onClick={() => {
            if (user) {
              handleLeaveCommunity(user, currentCommunity?.Id, dispatch);
            } else {
              dispatch(setLoginVisible(true));
            }
          }}
          className={`btn2 after:content-['Joined'] hover:after:content-['Leave'] bg-blue-500 hover:bg-blue-400`}
        ></button>
      )}
    </div>
  );
};

export default CommunityInfo;
