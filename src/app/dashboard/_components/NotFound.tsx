import { MessageCircleWarningIcon } from "lucide-react";
import React from "react"

const NotFound = ({text}: {text:string}) =>
{
    return (
      <div className="p-6 border mt-6 rounded-lg bg-rose-100 flex gap-4 items-center">
        <MessageCircleWarningIcon className="text-rose-600" size={32} />
        <div className="flex flex-col">
          <p className="text-lg text-rose-600 font-semibold">No Data</p>
                <p className="text-rose-500">{ text}</p>
        </div>
      </div>
    );
}

export default React.memo(NotFound)