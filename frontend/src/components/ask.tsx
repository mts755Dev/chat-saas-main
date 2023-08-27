import React from "react";
import Image from "next/image";

interface AskProps {
  q: string;
}

const Ask: React.FC<AskProps> = ({ q }) => {
  return (
    <div className="grid grid-cols-12 bg-gray-700 rounded-full">
      <div className="icon col-span-1 bg-indigo-500 mr-auto rounded-full p-2">
        <Image src="/man.png" width={50} height={50} alt="profile" />
      </div>
      <div className="question col-span-11 px-4 flex flex-col justify-center">
        <span className="text-lg">{q}</span>
      </div>
    </div>
  );
};

export default Ask;
