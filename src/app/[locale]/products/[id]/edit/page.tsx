"use client";
import { Product, ProductResponse } from "@/api/interfaces/Products";
import { Member, MemberResponse } from "@/api/interfaces/Teams";
import { getAllCategoriesSelect, getProductById, updateProduct } from "@/api/queries/product.query";
import { getSections } from "@/api/queries/sections.queries";
import { getMember, updateMember } from "@/api/queries/teams.queries";
import FormSelect from "@/components/Form/FormSelect";
import ImageUpload from "@/components/Form/ImageUpload";
import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { API_ENDPOINTS } from "@/constants/Constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function Page({ params: { id } }: { params: { id: number } }) {
    const [updatedProduct, setUpdatedProduct] = useState<Product>(
        {
            name: "",
            description: "",
            main_image: null,
            price: 0,
            quantity: 0,
            other_images: [],
            category_id: "",
            delete_other_images: []

        }
    );
    const [mainImage, setMainImage] = useState<any>(null)
    const [otherImages, setOtherImages] = useState<any[]>([])
    const [category, setCategory] = useState<any>({
        value: undefined,
        label: undefined,
    });

    const { data, isSuccess: isProductDataSuccess, isLoading: isProductLoading } = useQuery<any>({
        queryKey: [API_ENDPOINTS.PRODUCTS, id],
        queryFn: () => getProductById(id),
    });
    useEffect(() => {
        if (isSuccess && !isProductLoading) {
            setUpdatedProduct({
                name: data?.data.name,
                description: data?.data.description,
                main_image: data?.data?.main_image,
                price: data?.data?.price,
                quantity: data?.data?.quantity,
                other_images: data?.data?.other_images,
                category_id: "",
                delete_other_images: []
            })
        }
    }, [isProductDataSuccess, data, isProductLoading])



    const setCategoryId = (category: any) => {
        setCategory(category);
        setUpdatedProduct({
            ...updatedProduct,
            category_id: category.value
        });
    };

    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateProduct(id, {
            name: updatedProduct.name,
            price: updatedProduct.price,
            quantity: updatedProduct.quantity,
            description: updatedProduct.description,
            main_image: mainImage,
            other_images: otherImages,
            category_id: updatedProduct.category_id,
            delete_other_images: updatedProduct.delete_other_images
        }),
        onSuccess: () => {
            router.push("/products");
        },
    });

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };
    const [categories, setCategorys] = useState<any>([]);
    const [perPage, setPerPage] = useState(10);
    const [lastPage, setLastPage] = useState(1);

    const { data: dataCategories, isLoading, isSuccess } = useQuery<any>({
        queryKey: ["select-categories-all"],
        queryFn: () => getAllCategoriesSelect(),
    });
    useEffect(() => {
        if (dataCategories)
            if (!isLoading) {
                setCategorys(dataCategories?.data);
                setLastPage(dataCategories?.meta?.last_page);
            }
    }, [dataCategories, isLoading]);
    if (!data) return <div>loading...</div>;

    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-10 w-full justify-center "
                onSubmit={handelSubmit}
            >
                <Head content={t("products.edit")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("products.other_images")}
                        </label>
                        <div className="flex items-center gap-[10px]">
                            <input type='file' onChange={(e: any) => {

                                setOtherImages([...otherImages, e.target.files[0]])
                            }} name='image' multiple className='border-gray-300 border w-full p-[5px] rounded-md' />


                        </div>

                    </div>
                    <div className="grid grid-cols-4  items-center gap-[5px]">
                        {otherImages.map((image: any, index: number) => (
                            image && <div key={index} className=" relative">
                                <Image src={image && URL.createObjectURL(image)} alt="" width={100} height={100} />
                                <IoMdCloseCircleOutline onClick={() => {
                                    setOtherImages(otherImages?.filter((img: any) => img != image))
                                }} size={'25px'} className=" absolute top-0 cursor-pointer text-white rounded-md left-0 bg-red-500" />
                            </div>
                        ))}
                        {updatedProduct?.other_images?.map((image: any, index: number) => (
                            image && <div key={index} className=" relative">
                                <Image src={image.url} alt="" width={100} height={100} />
                                <IoMdCloseCircleOutline onClick={() => {
                                    setUpdatedProduct((prev: any) => ({ ...prev, delete_other_images: image.id, other_images: updatedProduct.other_images.filter((img: any) => img.id != image.id) }))
                                }} size={'25px'} className=" absolute top-0 cursor-pointer text-white rounded-md left-0 bg-red-500" />
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("products.main_image")}
                        </label>
                        <input type='file' onChange={(e: any) => setMainImage(e.target.files[0])} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={mainImage ? URL.createObjectURL(mainImage) : data?.data?.main_image ? data?.data?.main_image : ''} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("products.name"),
                            required: true,
                            placeholder: t("products.name"),
                            value: updatedProduct?.name || "",
                            setValue: setUpdatedProduct,
                        }}
                    />
                    <FormSelect
                        input={{
                            name: t("products.category_id"),
                            content: t("products.category_id"),
                            placeholder: t("products.category_id"),
                            value: category,
                            setValue: setCategoryId,
                            defaultValue: t("products.category_id"),
                            options: categories,
                            idKey: "id",
                            contentKey: "name",
                            required: true,
                            onScroll: () => {
                                if (lastPage > 1 && !isLoading) setPerPage(perPage + 10);
                            },
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
                            value: updatedProduct?.quantity || "",
                            setValue: setUpdatedProduct,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "price",
                            type: "text",
                            content: t("products.price"),
                            placeholder: t("products.price"),
                            value: updatedProduct?.price || "",
                            setValue: setUpdatedProduct,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("products.description"),
                            placeholder: t("products.description"),
                            value: updatedProduct?.description || "",
                            setValue: setUpdatedProduct,
                        }}
                    />


                </div>{" "}
                <MainButton disabled={isPending} type="submit" className="form-submit-button ">
                    {t("update")}
                </MainButton>
            </form>
        </main>
    );
}
