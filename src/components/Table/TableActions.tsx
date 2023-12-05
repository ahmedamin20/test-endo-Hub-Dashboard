import React, { useState } from "react";
import { BiEdit, BiSolidInfoCircle } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Link from "next-intl/link";
import { cn } from "@/utilities/cn";
import DeletePopupConfirmation from "../Modal/DeletePopupConfirmation";
import ToggleSwitch from "./ToggleSwitch";

export default function TableActions({
  onInfo,
  onEdit,
  onDelete,
  id,
  className,
  tkey,
  onChangeStatus,
  status
}: {
  onInfo?: any;
  onEdit?: any;
  onDelete?: any;
  id: any;
  tkey: any;
  onChangeStatus?: any
  status?: boolean
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  return (
    <div className={cn("", className)}>
      {onChangeStatus && (
        <div onClick={() => onChangeStatus(id)}><ToggleSwitch checked={status} /></div>
      )}
      {onInfo && (
        <button
          onClick={() => onInfo(id)}
          className="bg-green-500 p-2 rounded-lg text-white"
        >
          <BiSolidInfoCircle />
        </button>
      )}
      {onEdit && (
        <Link
          href={`/${tkey}/${id}/edit`}
          className="bg-update text-white font-bold p-2 rounded-lg"
        >
          <BiEdit />
        </Link>
      )}
      {onDelete && (
        <button
          onClick={() => setShowDeletePopup(true)}
          className="bg-delete p-2 rounded-lg text-white"
        >
          <MdDelete />
        </button>
      )}

      {showDeletePopup && <DeletePopupConfirmation setShowDeletePopup={setShowDeletePopup} id={id} deleteFunction={onDelete} />}
    </div>
  );
}
