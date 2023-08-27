import React from "react";
import Image from "next/image";

interface ResponseProps {
  ans: string;
}

const Response: React.FC<ResponseProps> = ({ ans }) => {
  return (
    <div className="grid grid-cols-12 py-4">
      <div className="icon max-h-16 col-span-1 bg-[#10a37f] mr-auto rounded-full p-2">
        <Image src="/ChatGPT_logo.png" width={50} height={50} alt="profile" />
      </div>
      <div className="answer col-span-11 px-4">
        <p className="text-lg py-4">{ans}</p>
      </div>
    </div>
  );
};

export default Response;
