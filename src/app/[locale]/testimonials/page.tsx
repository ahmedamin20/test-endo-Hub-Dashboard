/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Testimonials,
  TestimonialsResponse,
} from "@/api/interfaces/Testimonials";
import {
  deleteTestimonial,
  getTestimonials,
} from "@/api/queries/testimonials.queries";
import Head from "@/components/Head";
import Search from "@/components/Search";
import Table from "@/components/Table/Table";
import TablePaginationFooter from "@/components/Table/TablePaginationFooter";
import useTablePagination from "@/hooks/table/usePagination";
import getCells from "@/utilities/table/cells";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Home() {
  const headers = ["id", "name", "avatar", "content"];

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

  const [deleteId, setDeleteId] = useState<number>();
  const [testimonials, setTestimonials] = useState<Testimonials[]>();
  const [body, setBody] = useState<any>()

  const { data, refetch, isLoading } = useQuery<TestimonialsResponse>({
    queryKey: ["testimonials", page, per_page, handle],
    queryFn: () => getTestimonials(page, per_page, handle),
  });

  const deletedTestimonials = useMutation({
    mutationFn: () => deleteTestimonial(deleteId!),
    onSuccess: () => {
      setDeleteId(undefined);
      refetch();
    },
  });

  useEffect(() => {
    if (deleteId) deletedTestimonials.mutate();
  }, [deleteId]);
  useEffect(() => {
    if (data) {
      setTestimonials(data.data);
      setLastPage(data.meta.last_page);
    }
  }, [data]);
  useEffect(() => {
    if (testimonials) {
      setBody(getCells(testimonials, headers))
    }
  }, [testimonials])


  const handleSearch = (e: any) => {
    e.preventDefault();
    setPage(1);
    setHandle(e.target.value);

  };

  return (
    <main className="flex flex-col gap-5 justify-center items-center px-[5px] py-10 w-full">
      <Head content={t("testimonials.head")} />
      <div>
        <Search className="" onChange={handleSearch}></Search>
      </div>
      <Table
        headers={headers}
        body={body}
        tKey="testimonials"
        onDelete={setDeleteId}
        isLoading={isLoading || !body}
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
