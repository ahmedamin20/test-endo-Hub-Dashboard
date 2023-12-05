import { useTranslations } from "next-intl";
import Image from "next/image";
import TableActions from "./TableActions";
import { useParams } from "next/navigation";

export default function Table({
  headers,
  body,
  tKey,
  onDelete,
  onInfo,
  onEdit,
  isLoading,
  onChangeStatus
}: {
  headers: string[];
  body: any[] | undefined;
  tKey: string;
  onDelete?: React.Dispatch<React.SetStateAction<number | undefined>>;
  onInfo?: any;
  onEdit?: any;
  isLoading?: boolean;
  onChangeStatus?: any
}) {
  const imageKey = "image-";
  const actionsCondition = onDelete || onInfo || onEdit || onChangeStatus;
  const t = useTranslations();
  const { locale } = useParams()

  return (
    <div className="flex p-4 bg-primary rounded-lg w-full">
      <div className="w-full max-h-[calc(100vh-300px)] overflow-auto  ">
        <table
          className="table-fit border-collapse text-center text-['#ffffff']	w-full p-2"
          dir={locale == 'ar' ? 'rtl' : 'ltr'}
        >
          <thead>
            <tr className=" sticky top-0  z-10 bg-black ">

              {headers.map((head, index) => (
                <th className="p-5 capitalize" key={index}>
                  {t(`${tKey}.${head}`)}
                </th>
              ))}
              {onDelete && <th className="p-5 capitalize">{t("actions")}</th>}
            </tr>
          </thead>

          <tbody className=" items-center h-full ">
            {!isLoading && body?.map((row, index) => {
              return (
                <tr className={`border-y-2  odd:bg-third `} key={index}>

                  {row.map((cell: any, index: any) => (
                    <td className="justify-center py-[10px] items-center" key={index}>
                      {typeof cell === "string" ? (
                        cell?.includes(imageKey) ? (
                          <div className="flex w-full items-center justify-center">
                            <Image
                              className=""
                              src={cell?.replace(/^(image-)/, "")}
                              width={80}
                              height={80}
                              alt="Image"
                              unoptimized
                            />
                          </div>
                        ) : (
                          cell
                        )
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                  {actionsCondition && (
                    <td className="text-2xl space-x-3 capitalize">
                      <TableActions
                        className="flex flex-row gap-2 justify-center"
                        id={row[0]}
                        tkey={tKey}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onInfo={onInfo}
                        onChangeStatus={onChangeStatus}
                        status={row.status}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {   /*     {body?.length === 0 && (
          <div className="flex w-full items-center justify-center p-4">
            No data
          </div>
)}*/}
        {isLoading && <div>Loading...</div>}

      </div>
    </div>
  );
}
