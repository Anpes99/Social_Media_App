import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import HomePage from "./pages/Homepage";
import PostPage from "./pages/PostPage";
import { useEffect } from "react";
import { setUser } from "./slices/appSlice";
import SubmitNewPostPage from "./pages/SubmitNewPostPage";
import CommunityPage from "./pages/CommunityPage";

const App = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInSocialMediaAppUser"));
    console.log(user);
    if (user) store.dispatch(setUser(user));
  }, []);

  return (
    <div className=" bg-green-600">
      <Router>
        <Provider store={store}>
          <Routes>
            <Route
              path="/community/:communityName/submit"
              element={<SubmitNewPostPage />}
            />
            <Route
              path="/community/:communityName/comments/:postId/:postTitle"
              element={<PostPage />}
            />
            <Route
              path="/community/:communityName"
              element={<CommunityPage />}
            />
            <Route path="/top" element={<HomePage orderType={"top"} />} />
            <Route path="/" element={<HomePage />} />
          </Routes>{" "}
        </Provider>
      </Router>
    </div>
  );
};

export default App;
