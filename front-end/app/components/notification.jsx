
import { RiNotification4Line } from "react-icons/ri";
import { useMetaData } from "../hooks";
import { useQuery } from "@tanstack/react-query";

function List({ user }) {
  return <div></div>
}


export default function Notification() {
  const { user, isLoading } = useMetaData()

  return <div className="relative">
    <RiNotification4Line className=" w-10 h-10 p-2 hover:text-red-1" />
    {user && <List user={user._id} />}
  </div>
}