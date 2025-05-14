// // // import '/styles/globals.css'
// // // // In your component or _app.js
// // // import 'slick-carousel/slick/slick.css';
// // // import 'slick-carousel/slick/slick-theme.css';

// // // export default function App({ Component, pageProps }) {
// // //   return <Component {...pageProps} />
// // // }
// // import "/styles/globals.css"; // Global CSS
// // import "slick-carousel/slick/slick.css"; // Slick carousel styles
// // import "slick-carousel/slick/slick-theme.css";
// // import "react-toastify/dist/ReactToastify.css"; // Toastify styles
// // import Head from "next/head";
// // import { ToastContainer } from "react-toastify"; // Import Toastify container
// // import { ResumeProvider } from "../components/context/ResumeContext";
// // import { CoverLetterProvider } from "../components/context/CoverLetterContext";

// // export default function App({ Component, pageProps }) {
// //   return (
// //     <>
// //       <Head>
// //         <script
// //           dangerouslySetInnerHTML={{
// //             __html: `
// //               window.chtlConfig = { chatbotId: "1256619196" };
// //             `,
// //           }}
// //         />
// //         <script
// //           async
// //           data-id="1256619196"
// //           id="chatling-embed-script"
// //           type="text/javascript"
// //           src="https://chatling.ai/js/embed.js"
// //         ></script>
// //       </Head>
// //       {/* Render your component */}
// //       <ResumeProvider>
// //         <CoverLetterProvider>
// //           <Component {...pageProps} />
// //           <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
// //         </CoverLetterProvider>
// //       </ResumeProvider>
// //     </>
// //   );
// // }


import "/styles/globals.css"; // Global CSS
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import Head from "next/head";
import Script from "next/script";
import { ToastContainer } from "react-toastify"; // Import Toastify container
import { ResumeProvider } from "../components/context/ResumeContext";
import { CoverLetterProvider } from "../components/context/CoverLetterContext";
import { useRouter } from "next/router"; // Import useRouter

// // export default function App({ Component, pageProps }) {
// //   const router = useRouter();
// //   const excludedRoutes = [ "/dashboard/resume-builder","/dashboard/cv-builder"]; // Pages where chatbot should not appear

// //   const showChatbot = !excludedRoutes.includes(router.pathname);

// //   return (
// //     <>
// //       <Head>
// //         {showChatbot && (
// //           <>
// //             <script
// //               dangerouslySetInnerHTML={{
// //                 __html: `
// //                   window.chtlConfig = { chatbotId: "1256619196" };
// //                 `,
// //               }}
// //             />
// //             <script
// //               async
// //               data-id="1256619196"
// //               id="chatling-embed-script"
// //               type="text/javascript"
// //               src="https://chatling.ai/js/embed.js"
// //             ></script>
// //           </>
// //         )}
// //       </Head>
// //       <ResumeProvider>
// //         <CoverLetterProvider>
// //           <Component {...pageProps} />
// //           <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
// //         </CoverLetterProvider>
// //       </ResumeProvider>
// //     </>
// //   );
// // }


// export default function App({ Component, pageProps }) {
//   const router = useRouter();

//   // Static excluded routes
//   const excludedRoutes = ["/dashboard/resume-builder","/dashboard/cv-builder"];

//   // Dynamic excluded patterns (for routes like `/dashboard/resume-builder/[id]`)
//   const dynamicExcludedPatterns = [
//     /^\/dashboard\/resume-builder\/\d+$/,
//     /^\/dashboard\/cv-builder\/\d+$/,
//     /^\/dashboard\/aibuilder\/\d+$/,
//     /^\/dashboard\/cvaibuilder\/\d+$/,
//   ];

//   // Check if the current route is excluded
//   const isExcluded =
//     excludedRoutes.includes(router.pathname) || // Static routes
//     dynamicExcludedPatterns.some((pattern) => pattern.test(router.asPath)); // Dynamic routes

//   return (
//     <>
//       {/* If the current route is excluded, hide the chatbot */}
//       {isExcluded ? null : (
//         <Head>
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `
//                 window.chtlConfig = { chatbotId: "1256619196" };
//               `,
//             }}
//           />
//           <script
//             async
//             data-id="1256619196"
//             id="chatling-embed-script"
//             type="text/javascript"
//             src="https://chatling.ai/js/embed.js"
//           ></script>
//         </Head>
//       )}
//       <ResumeProvider>
//         <CoverLetterProvider>
//           <Component {...pageProps} />
//           <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
//         </CoverLetterProvider>
//       </ResumeProvider>
//     </>
//   );
// }


export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Static excluded routes
  const excludedRoutes = [
    "/dashboard/resume-builder",
    "/dashboard/cv-builder",
    "/dashboard/aibuilder",
    "/dashboard/cvaibuilder"
  ];

  // Dynamic excluded patterns
  const dynamicExcludedPatterns = [
    /^\/dashboard\/resume-builder\/.*$/,  // Matches any path after resume-builder/
    /^\/dashboard\/cv-builder\/.*$/,      // Matches any path after cv-builder/
    /^\/dashboard\/aibuilder\/.*$/,       // Matches any path after aibuilder/
    /^\/dashboard\/cvaibuilder\/.*$/      // Matches any path after cvaibuilder/
  ];

  // Check if the current route is excluded
  const isExcluded = 
    excludedRoutes.includes(router.pathname) ||
    dynamicExcludedPatterns.some(pattern => pattern.test(router.asPath));

  return (
    <>
      {!isExcluded && (
        <>
          <Script
            id="chatling-config"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.chtlConfig = { chatbotId: "3759359252" };`
            }}
          />
          <Script
            id="chatling-embed"
            strategy="afterInteractive"
            src="https://chatling.ai/js/embed.js"
            data-id="3759359252"
          />
        </>
      )}

      <ResumeProvider>
        <CoverLetterProvider>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
        </CoverLetterProvider>
      </ResumeProvider>
    </>
  );
}
