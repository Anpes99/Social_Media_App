import axios from "axios";
import { setUser } from "../slices/appSlice";

export const handleJoinCommunity = async (user, post, dispatch) => {
  console.log("post: ", post);
  try {
    const res = await axios.post(
      `/api/communities/${post.communityId}/user`,
      {},
      {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      }
    );

    if (res.status === 200) {
      const updatedUser = {
        id: user.id,
        communities: [...user.communities, post.community],
        token: user.token,
        username: user.username,
      };

      dispatch(setUser(updatedUser));
      localStorage.setItem(
        "loggedInSocialMediaAppUser",
        JSON.stringify(updatedUser)
      );
    }

    console.log("joined community");
  } catch (e) {
    console.log(e.response);
  }
};

export const handleLeaveCommunity = async (user, communityId, dispatch) => {
  console.log(user);
  try {
    const res = await axios.delete(`/api/communities/${communityId}/user`, {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    });
    if (res.status === 204) {
      const updatedUser = {
        id: user.id,
        communities: user.communities.filter(
          (community) => community.id !== communityId
        ),
        token: user.token,
        username: user.username,
      };
      localStorage.setItem(
        "loggedInSocialMediaAppUser",
        JSON.stringify(updatedUser)
      );
      dispatch(setUser(updatedUser));
    }
  } catch (e) {
    console.log(e);
  }
};
