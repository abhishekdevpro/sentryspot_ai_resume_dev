import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";

const AbroadiumCommunity = () => {
  return (
    <div className="app-card-bg border border-gray-200 rounded-lg p-4 md:p-6 mb-6 w-full">
      <div className="flex flex-col gap-2">
        {/* Community Section */}
        <div className="p-2 flex flex-1 flex-col md:flex-row gap-2 justify-between items-center rounded-lg shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            <h3 className="text-h2 text-brand">
              Join the SentrySpotCommunity!
            </h3>
          </div>

          <Button
            onClick={() =>
              window.open("https://sentryspot.co.uk/community", "_blank")
            }
            variant="outline"
            size="sm"
          >
            I m In!
          </Button>
        </div>
        {/* Community Description */}
        <div className="flex-1">
          <p className="text-p text-brand">
            Connect with professionals, industry experts, and like-minded peers
            in our vibrant discussion space. Share ideas, ask questions, and
            explore career insights—all while staying anonymous if you prefer.
            Coming soon to help you grow and thrive!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AbroadiumCommunity;
