import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import TrendingFeed from "../components/TrendingFeed";

import { useDispatch } from "react-redux";
import {
  setHeaderDropDownVisible,
  setCurrentCommunity,
} from "../slices/appSlice";

const HomePage = ({ orderType }) => {
  const dispatch = useDispatch();

  dispatch(setCurrentCommunity(null));

  return (
    <>
      <Header />
      <div className="flex">
        <div
          onClick={() => {
            dispatch(setHeaderDropDownVisible(false));
          }}
          className="flex-grow flex-shrink"
        ></div>
        <main
          onClick={() => {
            dispatch(setHeaderDropDownVisible(false));
          }}
          className="max-w-screen-lg mx-auto md:p-5
    pt-3"
        >
          <div>
            <PostFeed orderType={orderType} />
          </div>
        </main>
        <div
          onClick={() => {
            dispatch(setHeaderDropDownVisible(false));
          }}
          className="flex-grow flex-shrink"
        ></div>
      </div>
    </>
  );
};

export default HomePage;
