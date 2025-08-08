// import React from "react";
// import { Trash, AlertTriangle } from "lucide-react";
// import Modal from "./Modal";
// import { Button } from "./Button";

// const ConfirmationModal = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title = "Confirm Action",
//   message = "Are you sure you want to proceed?",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   type = "danger", // danger, warning, info
//   icon: CustomIcon,
//   isLoading = false
// }) => {
//   const getTypeStyles = () => {
//     switch (type) {
//       case "danger":
//         return {
//           iconBg: "bg-red-100",
//           iconColor: "text-red-600",
//           confirmBtn: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
//           defaultIcon: Trash
//         };
//       case "warning":
//         return {
//           iconBg: "bg-yellow-100",
//           iconColor: "text-yellow-600",
//           confirmBtn: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
//           defaultIcon: AlertTriangle
//         };
//       default:
//         return {
//           iconBg: "bg-blue-100",
//           iconColor: "text-blue-600",
//           confirmBtn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
//           defaultIcon: AlertTriangle
//         };
//     }
//   };

//   const styles = getTypeStyles();
//   const IconComponent = CustomIcon || styles.defaultIcon;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={title} showCloseButton={false}>
//       <div className="text-center">
//         <div className={`flex items-center justify-center w-12 h-12 mx-auto ${styles.iconBg} rounded-full mb-4`}>
//           <IconComponent className={`w-6 h-6 ${styles.iconColor}`} />
//         </div>
        
//         <p className="text-gray-600 mb-6">
//           {message}
//         </p>
        
//         <div className="flex space-x-3">
//           <Button
//             onClick={onClose}
//             disabled={isLoading}
//             className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors disabled:opacity-50"
//           >
//             {cancelText}
//           </Button>
//           <Button
//             onClick={onConfirm}
//             disabled={isLoading}
//             className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${styles.confirmBtn}`}
//           >
//             {isLoading ? "Processing..." : confirmText}
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ConfirmationModal;


import React from "react";
import { Trash, AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import { Button } from "./Button";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // danger, warning, info
  icon: CustomIcon,
  isLoading = false
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return { variant: "danger", defaultIcon: Trash };
      case "warning":
        return { variant: "outline", defaultIcon: AlertTriangle };
      default:
        return { variant: "primary", defaultIcon: AlertTriangle };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = CustomIcon || styles.defaultIcon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} showCloseButton={false}>
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 bg-gray-100">
          <IconComponent className="w-6 h-6 text-gray-600" />
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant={styles.variant}
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
