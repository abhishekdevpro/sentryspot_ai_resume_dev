import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Bell, LayoutDashboard, LogOut, User } from "lucide-react";
import axios from "axios";
import AbroadiumId from "./AbroadiumId";
import { BsDash } from "react-icons/bs";
import logo from './company_logo.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Create axios instance with interceptor
const axiosInstance = axios.create();

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState();

  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/logout",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.removeItem("token");
      router.push("https://sentryspotfe.vercel.app/");
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
      toast.error("Error during logout. Redirecting...", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Wait for 10 seconds before redirecting
      setTimeout(() => {
        localStorage.removeItem("token");
        router.push("https://sentryspotfe.vercel.app/");
      }, 10000);
    }
  };

  // Setup axios interceptor
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          toast.error("Session expired. Redirecting to login...", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          // Wait for 10 seconds before redirecting
          setTimeout(() => {
            handleLogout();
          }, 10000);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      const checkApiSuccess = async () => {
        try {
          const response = await axiosInstance.get(
            "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          
          if (response.data.status === "success") {
            setIsApiSuccess(true);
            setUser(response.data.data.personal_details);
          } else {
            setIsApiSuccess(false);
            toast.error("Failed to fetch user profile. Redirecting...", {
              position: "top-center",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            
            setTimeout(() => {
              handleLogout();
            }, 10000);
          }
        } catch (error) {
          setIsApiSuccess(false);
          console.error("Error fetching user profile:", error);
          toast.error("Error fetching user profile. Redirecting...", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          setTimeout(() => {
            handleLogout();
          }, 10000);
        }
      };

      checkApiSuccess();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  const handleLinkClick = () => setIsMenuOpen(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <ToastContainer />
      <nav className="bg-white border-b border-gray-200" >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img
                  src="https://sentryspotfe.vercel.app/assets/company_logo-ca3adfde.png"
                  alt="logo"
                  className="h-10 w-40"
                />
              </Link>
            </div>
            <div className="hidden md:flex justify-center items-center space-x-4">
              <Link href="/dashboard" className="text-black px-3 py-2 rounded-md text-lg font-semibold">
                Dashboard
              </Link>
              <Link href="/dashboard/resumelist" className="text-black px-3 py-2 rounded-md text-lg font-semibold">
                My Resumes
              </Link>
              <Link href="/dashboard/cvletterlist" className="text-black px-3 py-2 rounded-md text-lg font-semibold">
                CoverLetter
              </Link>
              <Link href="/dashboard/joblist" className="text-black px-3 py-2 rounded-md text-lg font-semibold">
                Jobs
              </Link>
              <Link
                href=""
                onClick={handleOpenPopup}
                className="text-white px-3 py-2 rounded-md text-lg font-semibold"
              >
                Abroadium ID
              </Link>
              <AbroadiumId isOpen={isPopupOpen} onClose={handleClosePopup} />
            </div>
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 text-md font-semibold border-2 rounded-xl hover:bg-blue-900 transition duration-300 z-50"
                  >
                    <User />
                    <span className="ml-2">
                      {user ? user.first_name : "profile"}
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard className="mr-3 w-5 h-5 text-gray-500 group-hover:text-orange-500" />
                        <span className="text-gray-800 group-hover:text-orange-500">
                          Dashboard
                        </span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
                      >
                        <LogOut className="mr-3 w-5 h-5 text-gray-500 group-hover:text-red-600" />
                        <span className="text-gray-800 group-hover:text-red-600">
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login2" className="text-white px-4 py-2 text-md font-semibold border-2 rounded-xl">
                    Log in
                  </Link>
                  <Link href="/signup" className="text-white px-4 py-2 text-md font-semibold border-2 rounded-xl">
                    Sign up
                  </Link>
                </>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={handleMenuClick}
                className="text-white hover:text-gray-700 focus:outline-none px-3 py-2 rounded-md text-sm font-medium"
              >
                <User />
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/dashboard/aibuilder"
                  className="text-white block px-3 py-2 rounded-md text-base font-semibold"
                  onClick={handleLinkClick}
                >
                  AI Resume Builder
                </Link>
                <Link
                  href="/dashboard/resumelist"
                  className="text-white block px-3 py-2 rounded-md text-base font-semibold"
                  onClick={handleLinkClick}
                >
                  My Resumes
                </Link>
                <Link
                  href=""
                  className="text-white block px-3 py-2 rounded-md text-base font-semibold"
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
                <Link
                  href=""
                  className="text-white block px-3 py-2 rounded-md text-base font-semibold"
                  onClick={handleLinkClick}
                >
                  Blog
                </Link>

                {isLoggedIn ? (
                  <Link
                    href="/"
                    className="text-white block px-3 py-2 rounded-md text-base font-semibold"
                    onClick={() => {
                      handleLogout();
                      handleLinkClick();
                    }}
                  >
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login2"
                      className="text-white block px-3 py-2 rounded-md text-base font-semibold"
                      onClick={handleLinkClick}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="text-white block px-3 py-2 rounded-md text-base font-semibold"
                      onClick={handleLinkClick}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;