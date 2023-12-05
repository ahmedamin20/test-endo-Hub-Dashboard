"use client";
import { ContactUs, ContactUsResponse } from "@/api/interfaces/ContactUs";
import { contact, deleteContact, changeStatus } from "@/api/queries/contactUs.queries";
import Head from "@/components/Head";
import Search from "@/components/Search";
import Table from "@/components/Table/Table";
import TablePaginationFooter from "@/components/Table/TablePaginationFooter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number>();
  const [statusId, setStatusId] = useState<number>();
  const [lastPage, setLastPage] = useState(1);
  const [per_page, setPer_page] = useState(5);
  const [handle, setHandle] = useState("");
  const t = useTranslations();

  const [contactUs, setContactUs] = useState<ContactUs[] | any>();

  const headers = ["id", "name", "email", "phone", "message",];
  const { data, isLoading } = useQuery<ContactUsResponse>({
    queryKey: ["contactUs", page, per_page, handle],
    queryFn: () => contact(per_page, page, handle),
  });

  const deletedContact = useMutation({
    mutationFn: () => deleteContact(deleteId!),
  });
  const statusChange = useMutation({
    mutationFn: () => changeStatus(statusId!),
  });
  useEffect(() => {
    if (deleteId) {
      deletedContact.mutate();
      setContactUs(contactUs?.filter((contact: any) => contact.id !== deleteId));
    }
  }, [deleteId]);
  useEffect(() => {
    if (statusId) {
      statusChange.mutate();
      const indexOf = contactUs?.findIndex((contact: any) => contact.id === statusId)
      contactUs[indexOf!].status = !contactUs[indexOf!].status
      setContactUs(contactUs);
    }
  }, [statusId]);
  useEffect(() => {
    if (data) {
      setContactUs(data.data);
      setLastPage(data.meta.last_page);
    }
  }, [data]);
  const [body, setBody] = useState<any>()
  useEffect(() => {
    if (contactUs) {
      setBody(contactUs.map((row: any) => {
        return headers.map((head: any) => {
          return row[head];
        });
      }))
    }
  }, [contactUs])

  const handleSearch = (e: any) => {
    e.preventDefault();
    setPage(1);
    setHandle(e.target.value);
  };

  return (
    <main className="flex flex-col gap-5 justify-center items-center px-[5px] py-10 w-full">
      <Head content={t("contact-us.head")} />
      <div>
        <Search className="" onChange={handleSearch}></Search>
      </div>
      <Table
        headers={headers}
        body={body}
        tKey="contact-us"
        onDelete={setDeleteId}
        isLoading={isLoading || !body}
        onChangeStatus={setStatusId}
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
  );
}
