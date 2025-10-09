import StatusIcon from "./StatusIcon";

export default function TipsList({ title, tips = [], tipsStatus = [] }) {
  return (
    <div className="flex items-start border-t first:border-t-0">
      {/* Left Title */}
      <div className="w-1/3 px-4 py-3 font-semibold text-gray-800">{title}</div>

      {/* Divider */}
      <div className="w-px bg-gray-200"></div>

      {/* Right Content */}
      <div className="flex-1 px-4 py-3 space-y-2">
        {/* {tips?.length === 0 ? (
          <p className="text-gray-500 italic">No tips found</p>
        ) : (
          tips?.map((tip, index) => {
            const status = tipsStatus?.[index];
            // console.log(status, "status for tip list");
            return (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <StatusIcon status={status} />
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            );
          })
        )} */}
        {tips?.filter(Boolean)?.length === 0 ? (
          <p className="text-gray-500 italic">No tips found</p>
        ) : (
          tips
            ?.map((tip, index) => ({ tip, index }))
            ?.filter(({ tip }) => tip) // remove empty strings
            ?.map(({ tip, index }) => {
              const status = tipsStatus?.[index];
              return (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <StatusIcon status={status} />
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
