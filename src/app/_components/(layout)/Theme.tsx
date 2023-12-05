import React from "react";
import "./theam.css";
import Head from "@/components/Head";
import { cn } from "@/utilities/cn";
import { themes } from "@/utilities/theme";
import { IoSettingsOutline } from "react-icons/io5";
export default function Theme() {
  const [hide, setHide] = React.useState(true);
  const handleTheme = (theme: number) => {

    document.body.classList.forEach((className) => {
      if (className.startsWith("bg-")) {
        document.body.classList.remove(className);
        document.body.style.background = themes[theme].background;
        // background-size: 100% 100%;
        // background-attachment: fixed;
        // background-position: center;
        // background-repeat: no-repeat;
        // document.body.style.height = '100%';
        // document.body.style.backgroundSize = 'auto 100%';
        document.body.style.backgroundAttachment = 'fixed';
      }
    });
    document.body.classList.add(`bg-theme${theme}`);
  };

  return (
    <div

      className={cn(
        "transition-all duration-500 bg-gray-900  ease-in-out flex flex-col gap-5 fixed  h-screen w-[250px] p-10 ltr:right-0 rtl:left-0 z-50",
        { "ltr:-right-[250px] rtl:-left-[250px] ": hide }
      )}
    >
      <span
        onClick={() => setHide(!hide)}
        className="flex cursor-pointer text-bold items-center justify-center bg-black absolute top-1/3 rtl:rounded-r-lg ltr:rounded-l-lg rtl:-right-10 ltr:-left-10 w-10 h-12"
      >
        <IoSettingsOutline className=" animate-spin" size='25px' />
      </span>
      <Head content="Select Theme" className="text-white" />
      <ul className=" gap-5 justify-center w-full overflow-y-scroll overflow-x-hidden h-screen">
        <div className=" grid grid-cols-2 gap-5">
          <li
            onClick={() => handleTheme(0)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            id="theme0"
            style={{ background: themes[0].background }}
          ></li>
          <li
            onClick={() => handleTheme(1)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            id="theme1"
            style={{ background: themes[1].background }}
          ></li>
          <li
            onClick={() => handleTheme(2)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            id="theme2"
            style={{ background: themes[2].background }}
          ></li>
          <li
            onClick={() => handleTheme(3)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            id="theme3"
            style={{ background: themes[3].background }}

          ></li>
          <li
            onClick={() => handleTheme(4)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            id="theme4"
            style={{ background: themes[4].background }}

          ></li>
          <li
            onClick={() => handleTheme(5)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            id="theme5"
            style={{ background: themes[5].background }}

          ></li>
          <li
            onClick={() => handleTheme(6)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            style={{ background: themes[6].background }}

            id="theme6"
          ></li>
          <li
            onClick={() => handleTheme(7)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            style={{ background: themes[7].background }}

            id="theme6"
          ></li>


        </div>
        <p className=" my-5  border-b pb-[10px] w-full text-center text-sm border-gray-600">Gradient Background</p>

        <div className=" grid grid-cols-2 gap-5">
          <li
            onClick={() => handleTheme(8)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            style={{ background: themes[8].background }}

            id="theme6"
          ></li>
          <li
            onClick={() => handleTheme(9)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            style={{ background: themes[9].background }}

            id="theme6"
          ></li>
          <li
            onClick={() => handleTheme(10)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            style={{ background: themes[10].background }}

            id="theme6"
          ></li>
          <li
            onClick={() => handleTheme(11)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            style={{ background: themes[11].background }}

            id="theme6"
          ></li>
          <li
            onClick={() => handleTheme(12)}
            className="w-[65px] h-[65px] rounded-md cursor-pointer"
            style={{ background: themes[12].background }}

            id="theme6"
          ></li>
        </div>
        {/* <li
          onClick={() => handleTheme(8)}
          className="w-[75px] h-[75px] rounded-md cursor-pointer"
          id="theme8"
        ></li>
        <li
          onClick={() => handleTheme(9)}
          className="w-[75px] h-[75px] rounded-md cursor-pointer"
          id="theme9"
        ></li>
        <li
          onClick={() => handleTheme(10)}
          className="w-[75px] h-[75px] rounded-md cursor-pointer"
          id="theme10"
        ></li>
        <li
          onClick={() => handleTheme(11)}
          className="w-[75px] h-[75px] rounded-md cursor-pointer"
          id="theme11"
        ></li>*/}
      </ul>
    </div>
  );
}
