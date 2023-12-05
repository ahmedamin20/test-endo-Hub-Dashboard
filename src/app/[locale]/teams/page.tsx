/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Member, TeamsResponse } from "@/api/interfaces/Teams";
import { deleteMember, getMembers } from "@/api/queries/teams.queries";
import DetailsModal from "@/app/_components/(teams)/DetailsModal";
import Head from "@/components/Head";
import MainLink from "@/components/MainLink";
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
import { IoMdAdd } from "react-icons/io";

export default function Home() {
  const headers = ["id", "teamMemberPhoto", "name", "section.title"];

  const [openModal, closeModal, showModal, setShowModal] = useModal();
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
  const t = useTranslations();

  const [detailsId, setDetailsId] = useState<number | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<number>();
  const [teams, setTeams] = useState<Member[]>();
  const [body, setBody] = useState<any>()
  const { data, refetch, isLoading } = useQuery<TeamsResponse>({
    queryKey: ["teams", page, per_page, handle],
    queryFn: () => getMembers(per_page, page, handle),
  });

  const deletedMember = useMutation({
    mutationFn: () => deleteMember(deleteId!),
    onSuccess: () => {
      setDeleteId(undefined);
      refetch();
      if (showModal) closeModal();
    },
  });

  useEffect(() => {
    if (deleteId) {
      deletedMember.mutate();
    }
  }, [deleteId]);
  useEffect(() => {
    if (data) {
      setTeams(data.data);
      setLastPage(data.meta.last_page);
    }
  }, [data]);
  useEffect(() => {
    if (teams) {
      setBody(getCells(teams, headers))
    }
  }, [teams])


  const handleSearch = (e: any) => {
    e.preventDefault();
    setPage(1);
    setHandle(e.target.value);
  };

  return (
    <>
      <main className="flex flex-col gap-5 justify-center items-center px-[5px] py-10  w-full">
        <Head content={t("teams.head")} />
        <div className="flex flex-row justify-between w-full">
          <Search className="" onChange={handleSearch}></Search>
          <MainLink href="/teams/create" className="p-2 rounded-lg">
            {t("add")}
            <IoMdAdd />
          </MainLink>
        </div>
        <Table
          headers={headers}
          body={body}
          tKey="teams"
          onDelete={setDeleteId}
          isLoading={isLoading || !body}
          // onInfo={(id: number) => {
          //   setDetailsId(id);
          //   setShowModal(true);
          // }}
          onEdit={true}
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
          closeModal={closeModal}
          onDelete={setDeleteId}
          id={detailsId!}
        />
      </Modal>
    </>
  );
}
