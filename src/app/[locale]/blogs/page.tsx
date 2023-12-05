/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Blogs, BlogsResponse } from "@/api/interfaces/Blogs";
import { Member, TeamsResponse } from "@/api/interfaces/Teams";
import { blogDelete, getBlogs } from "@/api/queries/blogs.query";
import { deleteMember, getMembers } from "@/api/queries/teams.queries";
import DetailsModal from "@/app/_components/(teams)/DetailsModal";
import Head from "@/components/Head";
import MainLink from "@/components/MainLink";
import Modal from "@/components/Modal/Modal";
import Search from "@/components/Search";
import Table from "@/components/Table/Table";
import TablePaginationFooter from "@/components/Table/TablePaginationFooter";
import { API_ENDPOINTS } from "@/constants/Constants";
import useModal from "@/hooks/modal/useModal";
import useTablePagination from "@/hooks/table/usePagination";
import getCells from "@/utilities/table/cells";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function Home() {
    const headers = ["id", "blogImage", "title", "description"];

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

    const [deleteId, setDeleteId] = useState<number>();
    const [blogs, setBlogs] = useState<Blogs[]>();
    const [body, setBody] = useState<any>()
    const { data, refetch, isLoading } = useQuery<BlogsResponse>({
        queryKey: [API_ENDPOINTS.BLOGS, page, per_page, handle],
        queryFn: () => getBlogs(per_page, page, handle),
    });

    const deleteBlog = useMutation({
        mutationFn: () => blogDelete(deleteId!),
        onSuccess: () => {
            setDeleteId(undefined);
            refetch();
            if (showModal) closeModal();
        },
    });

    useEffect(() => {
        if (deleteId) {
            deleteBlog.mutate();
        }
    }, [deleteId]);
    useEffect(() => {
        if (data) {
            setBlogs(data.data);
            setLastPage(data.meta.last_page);
        }
    }, [data]);
    useEffect(() => {
        if (blogs) {
            setBody(getCells(blogs, headers))
        }
    }, [blogs])


    const handleSearch = (e: any) => {
        e.preventDefault();
        setPage(1);
        setHandle(e.target.value);
    };

    return (
        <>
            <main className="flex flex-col gap-5 justify-center items-center px-[5px] py-10  w-full">
                <Head content={t("blogs.head")} />
                <div className="flex flex-row justify-between w-full">
                    <Search className="" onChange={handleSearch}></Search>
                    <MainLink href="/blogs/create" className="p-2 rounded-lg">
                        {t("add")}
                        <IoMdAdd />
                    </MainLink>
                </div>
                <Table
                    headers={headers}
                    body={body}
                    tKey="blogs"
                    onDelete={setDeleteId}
                    isLoading={isLoading || !body}
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

        </>
    );
}
