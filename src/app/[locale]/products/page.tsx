/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ProductsResponse } from "@/api/interfaces/Products";
import { AdsResponse, Member, TeamsResponse } from "@/api/interfaces/Teams";
import { adsDelete, getAds } from "@/api/queries/ads.query";
import { getProducts, productDelete } from "@/api/queries/product.query";
import { getSections, sectionDelete } from "@/api/queries/sections.queries";
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
    const headers = ["id", "name", 'main_image', 'quantity', 'price'];

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

    const [body, setBody] = useState<any>()
    const [deleteId, setDeleteId] = useState<number>();

    const { data, refetch, isLoading } = useQuery<ProductsResponse>({
        queryKey: [API_ENDPOINTS.PRODUCTS, page, per_page, handle],
        queryFn: () => getProducts(per_page, page, handle),
    });

    const deleteProduct = useMutation({
        mutationFn: () => productDelete(deleteId!),
        onSuccess: () => {
            setDeleteId(undefined);
            refetch();
            if (showModal) closeModal();
        },
    });

    useEffect(() => {
        if (deleteId) {
            deleteProduct.mutate();
        }
    }, [deleteId]);
    useEffect(() => {
        if (data) {
            setBody(getCells(data.data, headers))
            setLastPage(data.meta.last_page);
        }
    }, [data]);




    const handleSearch = (e: any) => {
        e.preventDefault();
        setPage(1);
        setHandle(e.target.value);
        setBody('')
    };

    return (
        <>
            <main className="flex flex-col gap-5 justify-center items-center px-[5px] py-10 w-full">
                <Head content={t("products.head")} />
                <div className="flex flex-row justify-between w-full">
                    <Search className="" onChange={handleSearch}></Search>
                    <MainLink href="/products/create" className="p-2 rounded-lg">
                        {t("add")}
                        <IoMdAdd />
                    </MainLink>
                </div>
                <Table
                    headers={headers}
                    body={body}
                    tKey="products"
                    onDelete={setDeleteId}
                    onEdit={true}
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

        </>
    );
}
