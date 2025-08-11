// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import logo from "../Navbar/logo.jpg";
// import Image from "next/image";
// import { Bell, LayoutDashboard, LogOut, User } from "lucide-react";
// import axios from "axios";
// import AbroadiumId from "./AbroadiumId";
// import { BsDash } from "react-icons/bs";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isApiSuccess, setIsApiSuccess] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleOpenPopup = () => setIsPopupOpen(true);
//   const handleClosePopup = () => setIsPopupOpen(false);
//   const [user, setUser] = useState();

//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Access localStorage here

//     if (token) {
//       setIsLoggedIn(true);

//       // Check API success
//       // const checkApiSuccess = async () => {
//       //   try {
//       //     const response = await fetch('https://api.sentryspot.co.uk/api/jobseeker/user-profile', {
//       //       headers: {
//       //         'Authorization': ` ${token}`,
//       //       },
//       //     });
//       //     if (response.ok) {
//       //       setIsApiSuccess(true);
//       //       setUser(response.data.data.personal_details)
//       //     } else {
//       //       setIsApiSuccess(false);
//       //     }
//       //   } catch (error) {
//       //     setIsApiSuccess(false);
//       //   }
//       // };
//       const checkApiSuccess = async () => {
//         try {
//           const response = await axios.get(
//             "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
//             {
//               headers: {
//                 Authorization: `${token}`, // Ensure the token format is correct (added "Bearer" as an example)
//               },
//             }
//           );
//           // console.log(response,"lllll");
//           if (response.data.status === "success") {
//             setIsApiSuccess(true);
//             setUser(response.data.data.personal_details);
//           } else {
//             setIsApiSuccess(false);
//           }
//         } catch (error) {
//           setIsApiSuccess(false);
//           console.error("Error fetching user profile:", error); // Optional for debugging
//         }
//       };

//       checkApiSuccess();
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []); // Dependency array should be empty to run only once after the first render

//   const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

//   const handleLinkClick = () => setIsMenuOpen(false);

//   const handleMouseEnter = () => setIsHovering(true);

//   const handleMouseLeave = () => setIsHovering(false);

//   // const handleLogout = () => {
//   //   localStorage.removeItem("token");
//   //   setIsLoggedIn(false);
//   //   // router.push("");
//   //   window.open("https://airesume.abroadium.com/login");
//   // };

//   const handleLogout = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       // Make the API call to log out
//       await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/logout",
//         { token },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       localStorage.removeItem("token");
//       router.push("https://airesume.abroadium.com/login");
//     } catch (error) {
//       console.error("Error during logout:", error.response?.data || error.message);
//     }
//   };

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//   return (
//     <nav
//       className="bg-black border-b border-gray-200
//     "
//       style={{ backgroundColor: "#4C3957" }}
//     >
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/">
//               <img
//                 src="https://abroadiumlandingemployee.vercel.app/assets/logo-c5bcd0df.png"
//                 alt="logo"
//                 className="h-10 w-40"
//               />
//             </Link>
//           </div>
//           <div className="hidden md:flex justify-center items-center space-x-4">
//             <Link
//               href="/dashboard"
//               className="text-white px-3 py-2 rounded-md text-lg font-semibold"
//             >
//               Dashboard
//             </Link>
//             {/* <Link href="/dashboard/aibuilder" className="text-white px-3 py-2 rounded-md text-lg font-semibold">AI Resume Builder</Link> */}
//             <Link
//               href="/dashboard/resumelist"
//               className="text-white px-3 py-2 rounded-md text-lg font-semibold"
//             >
//               My Resumes
//             </Link>
//             <Link
//               href="/dashboard/cvletterlist"
//               className="text-white px-3 py-2 rounded-md text-lg font-semibold"
//             >
//               CoverLetter
//             </Link>
//             <Link
//               href="https://abroadium-arbuild-fe.vercel.app/job-list"
//               className="text-white px-3 py-2 rounded-md text-lg font-semibold"
//             >
//               Jobs
//             </Link>
//             {/* <Link href="" className="text-white px-3 py-2 rounded-md text-lg font-semibold">Cover Letter</Link> */}

//             <Link
//               href=""
//               // href="https://abroadium-arbuild-fe.vercel.app/dashboard"
//               onClick={handleOpenPopup}
//               className="text-white px-3 py-2 rounded-md text-lg font-semibold"
//             >
//               SentrySpotID
//             </Link>
//             <AbroadiumId isOpen={isPopupOpen} onClose={handleClosePopup} />
//             {/* <Link
//               href="https://abroadium-arbuild-fe.vercel.app/skilltest"
//               className="text-white px-3 py-2 rounded-md text-lg font-semibold"
//             >
//               Skill Test
//             </Link> */}
//             {/* <Link
//               href="https://abroadium-arbuild-fe.vercel.app/skill-test-history"
//               className="text-white px-3 py-2 rounded-md text-lg font-semibold"
//             >
//               Skill Test History
//             </Link> */}
//             {/* <Link href="/adminlogin" className="text-white px-3 py-2 rounded-md text-lg font-semibold">
//               <span className="mr-2">🛡️</span>
//               <span>Admin</span>
//             </Link> */}
//             {/* <Link href="" className="text-white px-3 py-2 rounded-md text-lg font-semibold">About Us</Link> */}
//             {/* <a href="#phone" className="text-white px-3 py-2 rounded-md text-lg font-semibold">📞  Contact us  </a> */}
//           </div>
//           <div className="hidden md:flex items-center gap-4">
//             {isLoggedIn ? (
//               <div className="relative">
//                 {/* <button className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition duration-300">
//                   <Bell className="w-6 h-6" />
//                 </button> */}

//                 <button
//                   onClick={toggleDropdown}
//                   className="flex items-center bg-orange-500 text-white px-4 py-2 text-md font-semibold border-2 border-orange-500 rounded-xl hover:bg-orange-600 transition duration-300 z-50"
//                 >
//                   {/* Add the User component */}
//                   <User />
//                   <span className="ml-2">
//                     {user ? user.first_name : "profile"}
//                   </span>
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black">
//                     {/* <Link
//                       href="/"
//                       className="block px-4 py-2 hover:bg-gray-200"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       Home
//                     </Link> */}
//                     {/* <Link
//                       href="/dashboard"
//                       className="block px-4 py-2 hover:bg-gray-200"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       Dashboard
//                     </Link> */}
//                     <Link
//                       href="/dashboard"
//                       className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       <LayoutDashboard className="mr-3 w-5 h-5 text-gray-500 group-hover:text-orange-500" />
//                       <span className="text-gray-800 group-hover:text-orange-500">
//                         Dashboard
//                       </span>
//                     </Link>
//                     {/* <button
//                       onClick={() => {
//                         handleLogout();
//                         setIsDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-200"
//                     >
//                       Logout
//                     </button> */}
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setIsDropdownOpen(false);
//                       }}
//                       className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 group"
//                     >
//                       <LogOut className="mr-3 w-5 h-5 text-gray-500 group-hover:text-red-600" />
//                       <span className="text-gray-800 group-hover:text-red-600">
//                         Logout
//                       </span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link
//                   href="/login2"
//                   className="text-white px-4 py-2 text-md font-semibold border-2 rounded-xl"
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   href="/signup"
//                   className="text-white px-4 py-2 text-md font-semibold border-2 rounded-xl"
//                 >
//                   Sign up
//                 </Link>
//               </>
//             )}
//           </div>
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={handleMenuClick}
//               className="text-white hover:text-gray-700 focus:outline-none px-3 py-2 rounded-md text-sm font-medium"
//             >
//               <User />
//             </button>
//           </div>
//         </div>
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 href="/dashboard/aibuilder"
//                 className="text-white block px-3 py-2 rounded-md text-base font-semibold"
//                 onClick={handleLinkClick}
//               >
//                 AI Resume Builder
//               </Link>
//               <Link
//                 href="/dashboard/resumelist"
//                 className="text-white block px-3 py-2 rounded-md text-base font-semibold"
//                 onClick={handleLinkClick}
//               >
//                 My Resumes
//               </Link>
//               <Link
//                 href=""
//                 className="text-white block px-3 py-2 rounded-md text-base font-semibold"
//                 onClick={handleLinkClick}
//               >
//                 About Us
//               </Link>
//               <Link
//                 href=""
//                 className="text-white block px-3 py-2 rounded-md text-base font-semibold"
//                 onClick={handleLinkClick}
//               >
//                 Blog
//               </Link>

//               {isLoggedIn ? (
//                 <Link
//                   href="/"
//                   className="text-white block px-3 py-2 rounded-md text-base font-semibold"
//                   onClick={() => {
//                     handleLogout();
//                     handleLinkClick();
//                   }}
//                 >
//                   Logout
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     href="/login2"
//                     className="text-white block px-3 py-2 rounded-md text-base font-semibold"
//                     onClick={handleLinkClick}
//                   >
//                     Log in
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="text-white block px-3 py-2 rounded-md text-base font-semibold"
//                     onClick={handleLinkClick}
//                   >
//                     Sign up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Bell, LayoutDashboard, LogOut, User } from "lucide-react";
import axios from "axios";
import AbroadiumId from "./AbroadiumId";
import { BsDash } from "react-icons/bs";
import logo from "./company_logo.png";
import Image from "next/image";
import { Button } from "../../components/ui/Button";
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
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
      // Still remove token and redirect even if logout API fails
      localStorage.removeItem("token");
      router.push("https://sentryspotfe.vercel.app/");
    }
  };

  // Setup axios interceptor
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
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
          }
        } catch (error) {
          setIsApiSuccess(false);
          console.error("Error fetching user profile:", error);
          // The 401 error will be handled by the interceptor
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
    <nav className="app-card-bg border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="https://sentryspot.co.uk/">
              <Image src={logo} alt="logo" className="h-10 w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-black px-3 py-2 rounded-md text-lg font-semibold"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/resumelist"
              className="text-black px-3 py-2 rounded-md text-lg font-semibold"
            >
              My Resumes
            </Link>
            <Link
              href="/dashboard/cvletterlist"
              className="text-black px-3 py-2 rounded-md text-lg font-semibold"
            >
              CoverLetter
            </Link>
            <Link
              href="https://sentryspot.co.uk/job-list-v3"
              className="text-black px-3 py-2 rounded-md text-lg font-semibold"
            >
              Jobs
            </Link>
            {/* <Link
              href=""
              onClick={handleOpenPopup}
              className="text-white px-3 py-2 rounded-md text-lg font-semibold"
            >
              SentrySpotID
            </Link> */}
            {/* <AbroadiumId isOpen={isPopupOpen} onClose={handleClosePopup} /> */}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <Button
                  onClick={toggleDropdown}
                  icon={User}
                  // className="flex items-center bg-blue-600 text-white px-4 py-2 text-md font-semibold border-2 rounded-xl hover:bg-blue-900 transition duration-300 z-50"
                >
                  {/* <User /> */}
                  <span className="ml-2">
                    {user ? user.first_name : "profile"}
                  </span>
                </Button>

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
                <Link
                  href="/login2"
                  className="text-gray-800 px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-800 px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMenuClick}
              className="text-black hover:text-gray-700 focus:outline-none px-3 py-2 rounded-md text-sm font-medium"
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
                className="text-black block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                AI Resume Builder
              </Link>
              <Link
                href="/dashboard/resumelist"
                className="text-black block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                My Resumes
              </Link>
              <Link
                href=""
                className="text-black block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                About Us
              </Link>
              <Link
                href=""
                className="text-black block px-3 py-2 rounded-md text-base font-semibold"
                onClick={handleLinkClick}
              >
                Blog
              </Link>

              {isLoggedIn ? (
                <Button
                  // href="/"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    handleLinkClick();
                  }}
                >
                  Logout
                </Button>
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
  );
};

export default Navbar;
