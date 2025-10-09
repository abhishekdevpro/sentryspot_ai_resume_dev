"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";
import { BarChart3, ArrowRight, Calendar, Info } from "lucide-react";
import { useRouter } from "next/navigation";
// import Button from "../ui/Button";
// import CircularGauge from "../ResumeComparison/CircularGauge";
// import ErrorPopup from "../utility/ErrorPopUp";
import { Button } from "../../components/ui/Button";
import CircularGauge from "../../components/ResumeComparison/CircularGauge";

const StatusDot = ({ status = "pending" }) => {
    const colors = {
        success: "bg-green-500",
        pending: "bg-gray-400",
        warning: "bg-yellow-500",
    };

    return (
        <div
            className={`w-2 h-2 rounded-full ${colors[status] || colors.pending}`}
        ></div>
    );
};

// === DashboardCards ===
const DashboardCards = ({ strength }) => {
    // console.log(strength,"strength in dashboard card")
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const router = useRouter();

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.get(
                    "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (response.data.status === "success") {
                    setUser(response.data.data.personal_details);
                }
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchResumeData = async () => {
            try {
                const response = await axios.get(
                    `https://api.sentryspot.co.uk/api/jobseeker/resume-list/0?is_resume_analysis=true`,
                    { headers: { Authorization: token } }
                );
                if (response.data?.data) {
                    setResumeData(response.data.data);
                }
            } catch (err) {
                console.error("Error fetching resume data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResumeData();
        fetchUserProfile();
    }, []);

    const handleViewResume = (resumeId) => {
        // console.log("user", user, resumeId)
        // if (user?.plan_id !== 4) {
        //     setShowUpgradeModal(true);
        //     return;
        // }
        router.push(`/match-report/${resumeId}`);
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <p className="text-center text-brand-900">Loading...</p>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <p className="text-center text-brand-900">No resume data found.</p>
            </div>
        );
    }

    const matchScore = resumeData?.resume_analysis_details?.match_score?.percentage || 0;
    const jobTitle = resumeData?.job_title || "Job Title";
    return (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 container mx-auto max-w-7xl my-4">
            {/* === Resume Scan Card === */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-brand-900">
                        Latest Resume Scan
                    </h3>
                    <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleViewResume(resumeData?.id)}
                    >
                        <ArrowRight size={20} />
                    </Button>
                </div>

                <div className="flex items-start gap-4 mb-4">
                    <CircularGauge percent={matchScore} />
                    <p className="text-lg font-bold text-brand-900">{jobTitle}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <StatusDot status="success" />
                        <span className="text-sm text-brand-900">Searchability</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusDot status="warning" />
                        <span className="text-sm text-brand-900">Formatting</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusDot status="pending" />
                        <span className="text-sm text-brand-900">Skills Match</span>
                    </div>
                </div>
            </div>

            {/* === Job Tracker Card === */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm border border-gray-200 opacity-60 relative cursor-not-allowed">
                {/* Info Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 text-gray-500 text-xs">
                    <Info size={14} />
                    <span>Coming Soon</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <BarChart3 size={20} className="text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-500">Job Tracker</h3>
                    </div>
                    <ArrowRight size={20} className="text-gray-400" />
                </div>

                <div className="mb-4">
                    <h4 className="text-md font-medium text-gray-500 mb-3">
                        Next Interview
                    </h4>
                    <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-300 text-gray-600 cursor-not-allowed"
                    >
                        <Calendar size={16} />
                        Add interview time
                    </button>
                </div>

                <div className="text-sm text-gray-500">{jobTitle}</div>
            </div>
            {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-brand-900" />
            <h3 className="text-lg font-semibold text-brand-900">
              Job Tracker
            </h3>
          </div>
          <ArrowRight size={20} className="text-gray-400" />
        </div>

        <div className="mb-4">
          <h4 className="text-md font-medium text-brand-900 mb-3">
            Next Interview
          </h4>
          <Button startIcon={<Calendar size={16} />} className="w-full">
            Add interview time
          </Button>
        </div>

        <div className="text-sm text-brand-900">{jobTitle}</div>
      </div> */}

            {/* Upgrade Plan Modal */}
            {/* {showUpgradeModal && (
                <ErrorPopup
                    onClose={() => setShowUpgradeModal(false)}
                    message="Match Report is only available for Resume Analysis plan. Upgrade your plan to access this premium feature."
                    title="Upgrade Required"
                    isUpgrade={true}
                />
            )} */}
        </div>
    );
};

export default DashboardCards;
