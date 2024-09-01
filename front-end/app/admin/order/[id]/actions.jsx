import { OrderAPI } from "@/apis"
import { useMutation } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Actions({ order, status, setStatus }) {

  const cancelMutation = useMutation({
    mutationFn: () => {
      if (confirm("Cancel order")) return OrderAPI.cancelById(order)
    },
    onSuccess: () => setStatus("Canceled")
  })

  return <div className="flex flex-col gap-5">
    {
      status === "Created" && <div className="w-max m-auto flex flex-col gap-5">
        <button onClick={cancelMutation.mutate} className={`bg-red-1 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${cancelMutation.isPending ? ' pointer-events-none' : ''}`}>
          {cancelMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "CANCEL ORDER"}
        </button>
        {cancelMutation.isError && <div className="text-xss text-center text-red-1">{cancelMutation.error.message}</div>}
      </div>
    }
  </div>
}