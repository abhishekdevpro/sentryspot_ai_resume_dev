"use client";

import { useRouter } from "next/router";
import ResumeScan from "./index";
import Navbar from "../../Navbar/Navbar";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Navbar />
      <ResumeScan scanId={id} />
    </>
  );
};

export default Page;
