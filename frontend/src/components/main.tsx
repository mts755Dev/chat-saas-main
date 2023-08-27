import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getMessages, sendMessage } from "../libs/request";
import Loading from "./loading";
import { BiNavigation } from "react-icons/bi";
import Ask from "./ask";
import Response from "./response";

interface Message {
  question: string;
  answer: string;
}

interface MessagesProps {
  roomid: string;
}

const Main: React.FC<MessagesProps> = ({ roomid }) => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, isError, data: messages, error } = useQuery<Message[], Error>(
    ["messages", roomid],
    () => getMessages(roomid)
  );

  const mutation = useMutation<any, any, { roomid: string; message: string }>(
    (args) => {
      return sendMessage(args);
    },
    {
      onMutate: (newMessage) => {
        queryClient.setQueryData<Message[] | undefined>(["messages", roomid], (prevData) => {
          return prevData ? [...prevData, { question: newMessage.message, answer: "" }] : [];
        });

        return { prevMessages: messages };
      },
      onError: (err, newMessage, context) => {
        queryClient.setQueryData<Message[] | undefined>(["messages", roomid], context.prevMessages);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("messages");
      },
    }
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (search.trim() === "") return;

    mutation.mutate({ roomid, message: search });
    setSearch("");
  }

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-center">Error: {error?.message}</div>;

  return (
    <main className="container mx-auto w-3/5 py-5">
      {messages?.map((message, index) => (
        <div key={index}>
          {/* Ask Component */}
          <div>
            <Ask q={message.question} />
          </div>
          {/* Response */}
          {message.answer ? (
            <div>
              <Response ans={message.answer} />
            </div>
          ) : (
            <div className="text-center text-gray-50">Loading...</div>
          )}
        </div>
      ))}
      <div className="fixed bottom-0 left-0 w-full z-0 h-40 text-gray-50 bg-gradient-to-t from-gray-800">
        <div className="grid grid-cols-6 absolute bottom-10 w-full">
          <div className="col-start-2 col-span-6 flex justify-center items-center w-full">
            <div className="w-2/3 px-5 bg-gray-800 border border-gray-700 rounded-lg flex items-center">
              <form className="flex w-full shadow-2xl" onSubmit={onSubmit}>
                <input
                  type="text"
                  className="w-full py-3 bg-transparent focus:outline-none text-lg"
                  autoFocus={true}
                  placeholder="What are you looking for?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button type="submit">
                    <BiNavigation className="text-2xl hover:text-[#10a37f]" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
