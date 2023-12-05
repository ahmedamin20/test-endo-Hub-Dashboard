"use client";
import { Product } from "@/api/interfaces/Products";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
import { getAllCategoriesSelect, postProduct } from "@/api/queries/product.query";
import { getSections, getSelectSections } from "@/api/queries/sections.queries";
import { addMember } from "@/api/queries/teams.queries";
import FormSelect from "@/components/Form/FormSelect";
import ImageUpload from "@/components/Form/ImageUpload";
import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function Page() {
    const [createdProduct, setCreatedProduct] = useState<Product>(
        {
            name: "",
            description: "",
            main_image: null,
            price: 0,
            quantity: 0,
            other_images: [''],
            category_id: "",

        }
    );
    const { data: CategoriesData, isLoading, isSuccess } = useQuery<any>({
        queryKey: ["select-categories-all"],
        queryFn: () => getAllCategoriesSelect(),
    });
    const [categorySelect, setCategorySelect] = useState<any>()
    const setCategory = (category: any) => {
        setCategorySelect(category)
        setCreatedProduct({
            ...createdProduct,
            category_id: category.value,
        })
    }

    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => postProduct(createdProduct!),
        onSuccess: () => {
            router.push("/products");
        },
    });

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };


    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-3 w-full justify-center"
                onSubmit={handelSubmit}
            >
                <Head content={t("products.create")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("products.other_images")}
                        </label>
                        <div className="flex items-center gap-[10px]">
                            <input type='file' onChange={(e: any) => {

                                setCreatedProduct((prev: any) => ({ ...prev, other_images: [...createdProduct.other_images, e.target.files[0]] }))
                            }} name='image' multiple required className='border-gray-300 border w-full p-[5px] rounded-md' />


                        </div>

                    </div>
                    <div className="grid grid-cols-4  items-center gap-[5px]">
                        {createdProduct?.other_images.map((image: any, index: number) => (
                            image && <Image key={index} src={URL.createObjectURL(image)} alt="" width={100} height={100} />
                        ))}
                    </div>
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("products.main_image")}
                        </label>
                        <input type='file' onChange={(e: any) => setCreatedProduct((prev: any) => ({ ...prev, main_image: e.target.files[0] }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    {createdProduct?.main_image && <Image src={URL.createObjectURL(createdProduct?.main_image)} alt="" width={100} height={100} />}



                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("products.name"),
                            required: true,
                            placeholder: t("products.name"),
                            value: createdProduct?.name || "",
                            setValue: setCreatedProduct,
                        }}
                    />
                    <FormSelect
                        input={{
                            name: t("products.service"),
                            content: t("products.service"),
                            placeholder: t("products.service"),
                            value: categorySelect,
                            setValue: setCategory,
                            defaultValue: t("products.service"),
                            options: CategoriesData?.data,
                            idKey: "id",
                            contentKey: "name",
                            required: true,
                            //   onScroll: () => {
                            //     if (lastPage > 1 && !isLoading) setPerPage(perPage + 10);
                            //   },
                            isLoading,
                        }}
                    />


                    <FormInput
                        className=""
                        input={{
                            name: "quantity",
                            type: "text",
                            content: t("products.quantity"),
                            placeholder: t("products.quantity"),
                            value: createdProduct?.quantity || "",
                            setValue: setCreatedProduct,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "price",
                            type: "text",
                            content: t("products.price"),
                            placeholder: t("products.price"),
                            value: createdProduct?.price || "",
                            setValue: setCreatedProduct,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("products.description"),
                            placeholder: t("products.description"),
                            value: createdProduct?.description || "",
                            setValue: setCreatedProduct,
                        }}
                    />


                </div>
                <MainButton disabled={isPending} type="submit" className="form-submit-button">
                    {t("create")}
                </MainButton>
            </form>
        </main>
    );
}
