
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import { Button } from "../../../components/ui/Button";
import { Plus } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCvLetter = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace this with your actual token
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/coverletter",
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      // Assuming the response contains the ID
      console.log(response);
      const { id } = response.data.data;

      // Navigate to the dynamic route
      router.push(`/dashboard/cv-builder/${id}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      setError("Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
      <main className="min-h-screen flex items-center justify-center">
      <div className="app-card-bg rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Cover Letter Builder
        </h1>
        <p className="mb-6 text-gray-600">
          Click the button below to create your cover letter.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Button
          onClick={handleCreateCvLetter}
          icon={Plus}
          // className={`px-6 py-3 text-white font-semibold rounded-lg ${
          //   loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          // }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Your Cover Letter"}
        </Button>
      </div>
    </main>
    </>
  );
}
