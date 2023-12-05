import { camelPad } from "../camel-pad";
const imageKeys = ["Photo", "Image", "Img", "Picture", "Avatar", 'Logo', "Main_image"];
export default function getCells(data: any[], headers: string[]) {
  const body = data.map((row: any) => {
    return headers.map((head: string) => {
      const prefix = imageKeys.some((key) => camelPad(head).includes(key))
        ? "image-"
        : "";
      if (head.includes(".")) {
        const keys = head.split(".");
        return prefix + row[keys[0]][keys[1]];
      }
      return prefix + row[head];
    });
  });

  return body;
}
