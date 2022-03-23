import { useDispatch, useSelector } from "react-redux";
import { setLoginVisible } from "../slices/appSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const TopCommunities = () => {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const [communities, setCommunities] = useState(null);
  const navigate = useNavigate();

  const JoinButton = () => {
    return (
      <button
        onClick={() => {
          if (user) {
            /////////   join community
          } else {
            dispatch(setLoginVisible(true));
          }
        }}
        className="join-btn"
      >
        Join
      </button>
    );
  };

  useEffect(async () => {
    const res = await axios.get("/api/communities");

    console.log(res);
    setCommunities(res.data);
  }, []);

  return (
    <div className="w-80 bg-white rounded-t-sm relative border border-gray-300 h-full ">
      <div className="font-medium flex justify-center p-3 border-b">
        <h3 className="underline">Top Communities</h3>
      </div>
      <div>
        {communities?.map((community, i) => {
          return (
            <div
              onClick={() =>
                (window.location.href = `/community/${community.name}`)
              }
              key={community.name}
              className=" border-b border-green-300 flex justify-between space-x-3 pr-3 items-center py-3   font-semibold text-lg text-black"
            >
              <div className="flex items-center space-x-3  "></div>
              <p
                onClick={() =>
                  (window.location.href = `/community/${community.name}`)
                }
                className="text-lg underline w-1/2 truncate cursor-pointer "
              >
                {community.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCommunities;
