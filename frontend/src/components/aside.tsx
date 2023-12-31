import { BiPlus, BiComment, BiTrashAlt, BiLogOut } from "react-icons/bi";
import { useMutation, useQueryClient } from 'react-query';
import { createRoom, deleteRoom } from '../libs/request';
import { useLogoutMutation } from "@/redux/slices/auth/UsersAPISlice";
import { logout } from "@/redux/slices/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface Room {
    _id: string;
    name: string;
    messages: []
    // Add other properties as needed
}

interface SidebarProps {
    getRooms: Room[];
    handler: (roomId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ getRooms, handler }) => {

    const queryClient = useQueryClient();

    /** create new room */
    const createMutation = useMutation(createRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries('rooms')
        }
    })

    /** delete room */
    const deleteMutation = useMutation(deleteRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries('rooms')
        }
    })
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutHandler = async () => {
      try {
        await logoutApiCall({}).unwrap();
        dispatch(logout({}));
        router.push("/login");
      } catch (err) {
        console.error(err);
      }
    };
    return (
        <aside className="fixed left-0 w-80 h-screen bg-gray-900">
            <div className="text-gray-50 flex flex-col items-center py-3 gap-5">
            <button onClick={logoutHandler}>
        <BiLogOut className="text-2xl hover:text-[#10a37f]" />
      </button>
                <button className="border rounded-md border-gray-600 w-4/5 hover:bg-indigo-600" onClick={() => {
                    createMutation.mutate();
                }}>
                    <span className="block py-3"><BiPlus className="inline" size={20} /> New Chat</span>
                </button>

                <div className="chat_list w-full flex flex-col gap-4 px-3">
                    {
                        getRooms.map((chat, index) => {
                            return (
                                <div key={index} className="w-full border-0 rounded-md bg-gray-800 py-1 px-3 flex justify-center items-center">
                                    <button className="text-left truncate w-full active:bg-violet-700" onClick={() => handler(chat._id)}>
                                        <span className="block py-3 text-gray-50">
                                            <BiComment className="inline mx-2" size={20}></BiComment>
                                            {chat.name || 'Chat Name Here'}
                                        </span>
                                    </button>
                                    <button onClick={() => deleteMutation.mutate(chat._id)} className=" bg-gradient-to-l from-gray-800 py-4 px-3 hover:text-indigo-400">
                                        <BiTrashAlt />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;
