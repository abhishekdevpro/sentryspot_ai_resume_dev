import React from 'react';
import { Check, X, AlertTriangle, CheckCircleIcon, XCircleIcon } from 'lucide-react';

const StatusIcon = ({ status, type = "check" }) => {
  if (type === "warning") {
    return <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />;
  }
  
  return status === true ? (
    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />
  ) : (
    <XCircleIcon className="w-5 h-5 text-red-500 mt-0.5" />
  );
};

export default StatusIcon;