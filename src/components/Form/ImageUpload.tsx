import ImageUploading from "react-images-uploading";

import React from "react";
import Image from "next/image";
import Head from "../Head";

export default function ImageUpload({
  images,
  onChange,
  input,
  canRemoveAll,
}: {
  input: { name: string; content: string };
  images: any;
  onChange: any;
  canRemoveAll?: boolean;
}) {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <label
            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row"
            htmlFor={input.name}
          >
            {input.content}
          </label>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img
                {...dragProps}
                className="cursor-pointer"
                onClick={() => onImageUpdate(index)}
                src={image["data_url"]}
                alt=""
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}
