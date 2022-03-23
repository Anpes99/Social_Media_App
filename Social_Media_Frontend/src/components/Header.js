import { PlusIcon, SearchIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/outline";
import {
  HomeIcon,
  ChevronDownIcon,
  UploadIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import {
  setHeaderDropDownVisible,
  setUser,
  setLoginVisible,
  setSignUpVisible,
} from "../slices/appSlice";
import Login from "./Login";
import SignUp from "./SignUp";
import { Tooltip } from "@mui/material";

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import f1 from "../fake data/defaultPersonImg.png";

import ClickAwayListener from "@mui/material/ClickAwayListener";

const UserCommunitiesDropDown = ({}) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.app.user);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="relative">
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <div className="flex space-x-1 items-center text-black">
                <MenuIcon className="text-black h-8" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </div>
            </ListItemIcon>
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  MY COMMUNITIES
                </ListSubheader>
              }
              component="div"
              disablePadding
              sx={{ position: "absolute", bgcolor: "background.paper" }}
            >
              {user?.communities.map((community) => (
                <ListItemButton
                  onClick={() => {
                    window.location.href = `/community/${community.name}`;
                  }}
                  key={community.name}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <div className="rounded-full w-6 h-6 overflow-hidden">
                      <img src={f1} alt="" />
                    </div>
                  </ListItemIcon>
                  <ListItemText primary={"community/" + community.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </ClickAwayListener>
  );
};

const Header = () => {
  const dropDownVisible = useSelector(
    (state) => state.app.headerDropDownVisible
  );
  const currentCommunity = useSelector((state) => state.app.currentCommunity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerDropDownVisible = useSelector(
    (state) => state.app.headerDropDownVisible
  );

  const loginVisible = useSelector((state) => state.app.loginVisible);
  const signUpVisible = useSelector((state) => state.app.signUpVisible);

  const user = useSelector((state) => state.app.user);
  console.log("loggedn in user", user);

  return (
    <>
      <div
        onClick={() => {
          if (dropDownVisible) {
            dispatch(setHeaderDropDownVisible(false));
          }
        }}
        className="relative pb-2 sm:pb-0 flex flex-col sm:flex-row min-h-12 bg-white  items-center justify-between z-[90] pl-0 sm:pl-2 sm:space-x-2"
      >
        <div
          onClick={() => (window.location.href = "/")}
          className=" h-full flex items-center space-x-1 cursor-pointer"
        >
          <h1 className="text-lg tracking-widest font-semibold p-1">
            SOCIAL MEDIA
          </h1>
        </div>
        <div className="hidden sm:block">
          {user && <UserCommunitiesDropDown />}
        </div>
        <div
          className={`w-full sm:w-auto flex items-center  border  rounded-sm relative bg-gray-100 flex-grow ${
            user ? "" : "sm:max-w-3xl"
          }`}
        >
          <input
            className="flex flex-grow bg-gray-100 p-2 text-gray-700  hover:bg-white focus:bg-white "
            placeholder="Search communities"
            type="text"
          />
        </div>
        <div className="flex items-center space-x-3 p-4">
          {currentCommunity && (
            <Tooltip title="Submit a new post">
              <button
                onClick={
                  user
                    ? () =>
                        navigate(`/community/${currentCommunity.name}/submit`)
                    : () => dispatch(setLoginVisible(true))
                }
                className="h-7 w-7 text-gray-400 hover:bg-gray-300"
              >
                <UploadIcon />
              </button>
            </Tooltip>
          )}
          {
            <button
              onClick={() => {
                if (signUpVisible) dispatch(setSignUpVisible(false));
                dispatch(setLoginVisible(true));
              }}
              className={`  ${
                user ? "" : "sm:inline-block"
              } btn hover:bg-green-400 text-white bg-green-500`}
            >
              Log In
            </button>
          }
          {user && (
            <button
              onClick={() => {
                localStorage.removeItem("loggedInSocialMediaAppUser");
                dispatch(setUser(null));
              }}
              className={` ${
                user ? "sm:inline-block" : ""
              } btn hover:bg-green-400 text-white border-green-500 flex-shrink-0 bg-green-500`}
            >
              Log Out
            </button>
          )}
          {!user && (
            <button
              onClick={() => {
                if (loginVisible) dispatch(setLoginVisible(true));
                dispatch(setSignUpVisible(true));
              }}
              className={` ${
                user ? "" : "sm:inline-block"
              }  btn bg-green-500 text-white  hover:bg-green-400 `}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
      {loginVisible && (
        <div
          className={`${
            loginVisible ? "block" : "hidden"
          } fixed top-0 left-0 w-full h-full m-0 p-0 z-[1000]`}
        >
          <Login />
        </div>
      )}
      {signUpVisible && (
        <div
          className={`${
            signUpVisible ? "block" : "hidden"
          }  fixed top-0 left-0 w-full h-full m-0 p-0 z-[1000]`}
        >
          <SignUp />
        </div>
      )}
    </>
  );
};

export default Header;
