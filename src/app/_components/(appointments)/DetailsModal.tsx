import { Appointment } from "@/api/interfaces/Appointment";
import Head from "@/components/Head";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { Dispatch, SetStateAction, useState } from "react";
import Header from "../(layout)/Header";
import DeletePopupConfirmation from "@/components/Modal/DeletePopupConfirmation";

export default function DetailsModal({
  id,
  closeModal,
  onDelete,
  appointment,
}: {
  id: number;
  closeModal: any;
  appointment?: Appointment;
  onDelete?: Dispatch<SetStateAction<number | undefined>>;
}) {
  const t = useTranslations();
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  if (!appointment) return <div className="modal-content ">notFound</div>;
  return (
    <div className="modal-content  text-black">
      <Head content={t("appointment.card")} />
      <div className="flex flex-row-reverse gap-2 justify-around w-full items-center h-full">
        <div className="flex flex-row gap-3 ">
          <div className="flex flex-col gap-4 w-[60%]">
            <Head content={t("appointment.message")} />

            <div>
              <div>
                <span className="font-bold">{t("appointment.id")} : </span>
                {appointment.id}
              </div>
              <div>
                <span className="font-bold">{t("appointment.name")} : </span>
                {appointment.name}
              </div>
              <div>
                <span className="font-bold">{t("appointment.email")} : </span>
                {appointment.email}
              </div>
              <div>
                <span className="font-bold">{t("appointment.date")} : </span>
                {appointment.date}
              </div>
              <div>
                <span className="font-bold">{t("appointment.message")} : </span>
                {appointment.message}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-[35%]">
            <Head content={t("appointment.product.details")} />
            <div>
              <div>
                <span className="font-bold">
                  {t("appointment.product.id")} :{" "}
                </span>
                {appointment.product.id}
              </div>
              <div>
                <span className="font-bold">
                  {t("appointment.product.name")} :{" "}
                </span>
                {appointment.product.name}
              </div>
              <div>
                <span className="font-bold">
                  {t("appointment.product.quantity")} :{" "}
                </span>
                {appointment.product.quantity}
              </div>
              <div>
                <span className="font-bold">
                  {t("appointment.product.price")} :{" "}
                </span>
                {appointment.product.price}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {onDelete && (
          <button
            onClick={() => setShowDeletePopup(true)}
            className="bg-delete text-white font-bold p-2 rounded-lg"
          >
            {t("delete")}
          </button>
        )}{" "}
      </div>
      <button
        onClick={closeModal}
        className="absolute right-3 top-3  bg-delete text-white font-bold p-2 px-4 rounded-full"
      >
        X
      </button>
      {showDeletePopup && <DeletePopupConfirmation setShowDeletePopup={setShowDeletePopup} id={id} deleteFunction={onDelete} />}
    </div>
  );
}
