/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Appointment, AppointmentResponse } from "@/api/interfaces/Appointment";
import {
  deleteAppointment,
  getAppointment,
} from "@/api/queries/appointment.queries";
import DetailsModal from "@/app/_components/(appointments)/DetailsModal";
import Head from "@/components/Head";
import Modal from "@/components/Modal/Modal";
import Search from "@/components/Search";
import Table from "@/components/Table/Table";
import TablePaginationFooter from "@/components/Table/TablePaginationFooter";
import useModal from "@/hooks/modal/useModal";
import useTablePagination from "@/hooks/table/usePagination";
import getCells from "@/utilities/table/cells";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Home() {
  const headers = ["id", "name", "email", "date", "message", "product.name"];

  const {
    page,
    lastPage,
    per_page,
    handle,
    setPage,
    setLastPage,
    setPer_page,
    setHandle,
  } = useTablePagination();
  const [openModal, closeModal, showModal, setShowModal] = useModal();
  const t = useTranslations();

  const [deleteId, setDeleteId] = useState<number>();
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [detailsId, setDetailsId] = useState<number>();
  const [body, setBody] = useState<any>()
  const { data, refetch, isLoading } = useQuery<AppointmentResponse>({
    queryKey: ["appointment", page, per_page, handle],
    queryFn: () => getAppointment(per_page, page, handle),
  });

  const deletedAppointment = useMutation({
    mutationFn: () => deleteAppointment(deleteId!),
    onSuccess: () => {
      setDeleteId(undefined);
      if (showModal) closeModal();
      refetch();
    },
  });
  useEffect(() => {
    if (deleteId) deletedAppointment.mutate();
  }, [deleteId]);
  useEffect(() => {
    if (data) {
      setAppointments(data.data);
      setLastPage(data.meta.last_page);
    }
  }, [data]);
  useEffect(() => {
    if (appointments) {
      setBody(getCells(appointments, headers))
    }
  }, [appointments])



  const handleSearch = (e: any) => {
    e.preventDefault();
    setPage(1);
    setHandle(e.target.value);
  };
  return (
    <>
      <main className="flex flex-col gap-5 justify-center items-center px-[5px] py-10 w-full">
        <Head content={t("appointment.head")} />
        <div>
          <Search className="" onChange={handleSearch}></Search>
        </div>
        <Table
          headers={headers}
          body={body}
          tKey="appointment"
          onDelete={setDeleteId}
          isLoading={!body || isLoading}
          onInfo={(id: number) => {
            setDetailsId(id);
            setShowModal(true);
          }}
        />
        <TablePaginationFooter
          perPage={per_page}
          setPerPage={setPer_page}
          lastPage={lastPage}
          nextFunction={() => setPage(page + 1)}
          page={page}
          prevFunction={() => setPage(page - 1)}
        />
      </main>
      <Modal
        closeModal={closeModal}
        openModal={openModal}
        flag={showModal}
        className="flex primary-bg-gradient-50 justify-center items-center overflow-auto "
        activeSectionClassName="w-2/3 h-2/3"
      >
        <DetailsModal
          id={detailsId!}
          closeModal={closeModal}
          onDelete={setDeleteId}
          appointment={appointments?.find(
            (appointment) => appointment.id == detailsId!
          )}
        />
      </Modal>
    </>
  );
}
