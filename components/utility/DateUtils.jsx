// // Format: "August 8, 2025"
// export const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

// // Format: "today", "yesterday", "5 days ago", or full date if older than 30 days
// export const formatDaysAgo = (dateString) => {
//   if (!dateString) return "N/A";
//   const createdDate = new Date(dateString);
//   const today = new Date();

//   // Remove time to avoid partial day differences
//   createdDate.setHours(0, 0, 0, 0);
//   today.setHours(0, 0, 0, 0);

//   const diffTime = today - createdDate;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays === 0) return "today";
//   if (diffDays === 1) return "yesterday";
//   if (diffDays < 30) return `${diffDays} days ago`;

//   return formatDate(dateString);
// };


export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDaysAgo = (dateString) => {
  if (!dateString) return "N/A";
  const createdDate = new Date(dateString);
  const today = new Date();

  // Clear the time part for both
  createdDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today - createdDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if(diffDays <30 )
  return ` ${diffDays} days ago`;
  else return ` ${formatDate(dateString)}`;
};


