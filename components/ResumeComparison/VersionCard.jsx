import React from 'react';
import { Download, Eye } from 'lucide-react';
// import Button from '../buttonUIComponent';
import CircularGauge from './CircularGauge';
import ProgressBar from './ProgressBar';
// import { Button } from '../ui/Button';
// import Button from '../../buttonUIComponent';
// import CircularGauge from './CircularGauge';
// import ProgressBar from './ProgressBar';

const VersionCard = ({
  title,
  version = "current",
  matchRate,
  sections,
  onDownload,
  onView,
  isDownloading = false,
  canDownload = true,
  canView = true,
  children
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="w-full text-2xl font-bold text-gray-900 text-center mb-6">
          {title}
        </h2>
        <div className="flex justify-start items-start gap-2">
          {canDownload && onDownload && (
            <div>
              <button
                className="bg-secondaryYellow text-white"
                onClick={onDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Downloading...</span>
                  </div>
                ) : (
                  <Download className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
          {/* {canView && onView && (
            <div>
              <Button
                className="bg-darkBlue text-white"
                onClick={onView}
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          )} */}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-4 space-y-6">
        {/* Match Rate Circular Gauge */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Match Rate
          </h3>
          <div className="flex justify-center">
            <CircularGauge
              percent={matchRate}
              size={120}
              stroke={10}
              version={version}
            />
          </div>
        </div>

        {/* Progress bars with issue counts */}
        <div className="space-y-4">
          {sections.map((section) => (
            <ProgressBar
              key={section.key}
              label={section.label}
              issues={section.issues}
              progress={section.progress}
              color={version === "current" ? "teal" : "blue"}
            />
          ))}
        </div>
      </div>

      {/* Analysis Sections */}
      {children}
    </div>
  );
};

export default VersionCard;
