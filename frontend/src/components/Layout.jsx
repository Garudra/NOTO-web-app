import React, { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { TbPinnedFilled } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import bgImage from "../assets/bgimage.png";
import notoLogo from "../assets/notologo.png";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // ==========================================
  // FETCH CURRENT USER
  // ==========================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/me",
          {
            withCredentials: true,
          }
        );

        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogOut = async () => {
    try {
      setLoggingOut(true);

      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  // ==========================================
  // NAVIGATION STYLE
  // ==========================================

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? "bg-white/10 text-amber-300"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#080808] text-white">

      <div className="h-full flex overflow-hidden">

        {/* ================================================= */}
        {/* SIDEBAR                                           */}
        {/* ================================================= */}

        <aside
          className="
            hidden
            md:flex
            w-[235px]
            h-full
            flex-shrink-0
            flex-col
            bg-black/70
            backdrop-blur-xl
            border-r
            border-white/10
          "
        >

          {/* ================================================= */}
          {/* SIDEBAR NAVIGATION                                */}
          {/* ================================================= */}

          <div className="flex-1 px-3 py-4">

            {/* WORKSPACE */}

            <p className="px-3 mb-3 text-[9px] uppercase tracking-[0.18em] text-gray-600 font-semibold">
              Workspace
            </p>

            <div className="space-y-1">

              <NavLink
                to="/dashboard"
                className={navItemClass}
              >
                <MdSpaceDashboard className="text-[17px]" />

                <span>
                  Dashboard
                </span>
              </NavLink>

              <NavLink
                to="/pinned"
                className={navItemClass}
              >
                <TbPinnedFilled className="text-[17px]" />

                <span>
                  Pinned
                </span>
              </NavLink>

            </div>

            {/* ================================================= */}
            {/* TAGS                                             */}
            {/* ================================================= */}

            <div className="mt-7">

              <p className="px-3 mb-3 text-[9px] uppercase tracking-[0.18em] text-gray-600 font-semibold">
                Tags
              </p>

              <div className="space-y-1">

                {/* PERSONAL */}

                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-gray-400">
                  <GoDotFill className="text-orange-400 text-[10px]" />

                  <span>
                    Personal
                  </span>
                </div>

                {/* COLLEGE */}

                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-gray-400">
                  <GoDotFill className="text-blue-400 text-[10px]" />

                  <span>
                    College
                  </span>
                </div>

                {/* WORK */}

                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-gray-400">
                  <GoDotFill className="text-green-400 text-[10px]" />

                  <span>
                    Work
                  </span>
                </div>

                {/* IDEAS */}

                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-gray-400">
                  <GoDotFill className="text-purple-400 text-[10px]" />

                  <span>
                    Ideas
                  </span>
                </div>

                {/* OTHERS */}

                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-gray-400">
                  <GoDotFill className="text-red-400 text-[10px]" />

                  <span>
                    Others
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="flex-shrink-0 border-t border-white/10 px-4 py-4">

            {/* USER PROFILE */}

            <div className="flex items-center gap-3 mb-3">

              {user?.profilePicture ? (

                <img
                  src={user.profilePicture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="
                    w-8
                    h-8
                    rounded-full
                    object-cover
                    border
                    border-white/10
                    flex-shrink-0
                  "
                />

              ) : (

                <FaUserCircle
                  className="
                    text-[30px]
                    text-gray-500
                    flex-shrink-0
                  "
                />

              )}

              <div className="min-w-0">

                <p className="text-xs font-medium text-white truncate">
                  {user?.name || "User"}
                </p>

                <p className="text-[10px] text-gray-500 truncate">
                  {user?.email || ""}
                </p>

              </div>

            </div>

            {/* LOGOUT BUTTON */}

            <button
              onClick={handleLogOut}
              disabled={loggingOut}
              className="
                w-full
                h-8
                flex
                items-center
                justify-center
                gap-2
                rounded-md
                border
                border-white/10
                text-[11px]
                text-gray-400
                hover:text-red-400
                hover:bg-red-400/5
                hover:border-red-400/20
                transition-all
                duration-200
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              <IoMdLogOut className="text-sm" />

              {loggingOut
                ? "Logging out..."
                : "Logout"}

            </button>

          </div>

        </aside>

        <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">

          <nav
            className="
              h-[72px]
              flex-shrink-0
              flex
              items-center
              justify-between
              px-6
              md:px-8
              bg-black/50
              backdrop-blur-xl
              border-b
              border-white/10
            "
          >

            <div className="flex items-center gap-6">

              <button
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer"
              >

                <img
                  src={notoLogo}
                  alt="Noto"
                  className="w-[82px] h-auto"
                />

              </button>

              <div className="hidden md:block h-7 w-px bg-white/10"></div>

              <div className="hidden md:block">

                <p className="text-[11px] text-gray-500">
                  Your personal workspace
                </p>

                <h1 className="text-base font-semibold text-white">
                  Welcome back 👋
                </h1>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden sm:block text-right">

                <p className="text-xs font-medium text-white">
                  {user?.name || "User"}
                </p>

                <p className="text-[10px] text-gray-500">
                  {user?.email || ""}
                </p>

              </div>

              {/* PROFILE IMAGE */}

              {user?.profilePicture ? (

                <img
                  src={user.profilePicture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="
                    w-9
                    h-9
                    rounded-full
                    object-cover
                    border
                    border-white/10
                  "
                />

              ) : (

                <FaUserCircle
                  className="
                    text-[30px]
                    text-gray-500
                  "
                />

              )}

            </div>

          </nav>

          <main
            className="
              flex-1
              min-h-0
              overflow-hidden
              bg-cover
              bg-center
              bg-no-repeat
            "
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >

            <div
              className="
                h-full
                max-w-7xl
                mx-auto
                px-5
                md:px-8
                py-5
                flex
                flex-col
              "
            >

              <div
                className="
                  flex-shrink-0
                  flex
                  items-center
                  justify-between
                  mb-5
                "
              >

                <p className="text-xs text-gray-500">
                  Start creating and organizing your notes.
                </p>

              </div>

              <div
                className="
                  flex-1
                  min-h-0
                  overflow-y-auto
                  overflow-x-hidden
                  scrollbar-none
                "
              >

                {children}

              </div>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
};

export default Layout;
