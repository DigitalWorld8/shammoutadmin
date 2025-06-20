import React, { useEffect, useState } from "react";
import NewsletterFormWithCaptcha from "./NewsletterFormWithCaptcha";
import Tippy from "@tippyjs/react";
import IconFile from "../../../../components/Icon/IconFile";
import Loader from "../../../../utils/Loader";
import { useAppSelector } from "../../../../store";
import { useAppDispatch } from "../../../../store/hooks";
import { editStaticComponentsService } from "../../../../store/services/pagesService";

interface LinkSectionProps {
  titleKey: string;
  linkKeys: string[];
  handleInput: (type: 'title' | 'link', newText: string, sectionIndex: number, linkIndex?: number) => void;
}



const LinkSection: React.FC<LinkSectionProps> = ({ index, titleKey, linkKeys, handleInput }) => {
  return (
    <div className="flex flex-col items-stretch text-xs max-md:mt-10">
      <h3
        contentEditable
        suppressContentEditableWarning
        onBlur={e => handleInput('title', e.currentTarget.textContent || "", index)}
        className="text-white font-bold uppercase cursor-text"
      >
        {titleKey}
      </h3>
      <nav className="text-[rgba(175,175,175,1)] leading-[26px] mt-1.5">
        {linkKeys?.map((lk, linkIdx) => (
          <div
            key={linkIdx}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleInput('link', e.currentTarget.textContent || "", index, linkIdx)
            }
            className="block hover:text-white transition-colors cursor-text"
          >
            {lk}
          </div>
        ))}
      </nav>
    </div>
  );
};



export const Footer: React.FC = ({ footerData, setFooterData, selectedLang, handleClickEditIcon }) => {
  const dispatch = useAppDispatch()

  const { isLoadingUpdateConstComp, staticComp } = useAppSelector(state => state.pages);
  let lang = selectedLang?.value
  const footer = staticComp?.filter((c) => c.language === lang)?.find((c) => c.type === 'footer')

  // const footerData = footer?.content ? JSON.parse(footer.content) : null;
  console.log('footerData', footerData);




  const handleInput = (
    type: 'title' | 'link' | string,
    newText: string,
    sectionIndex?: number,
    linkIndex?: number
  ) => {
    setFooterData(prev => {
      if (!prev) return prev;

      if (type.startsWith("footerContent.")) {
        const cleanedKey = type.replace("footerContent.", "");
        const [section, field] = cleanedKey.split(".");
        return {
          ...prev,
          footerContent: {
            ...prev.footerContent,
            [cleanedKey]: newText,
            [section]: {
              ...(prev.footerContent[section] || {}),
              [field]: newText,
            },
          },
        };
      }

      if (typeof sectionIndex === "number") {
        const updatedSections = [...prev.sections];
        const section = updatedSections[sectionIndex];
        if (!section) return prev;

        if (type === "title") {
          updatedSections[sectionIndex] = {
            ...section,
            titleKey: newText,
          };
        }

        if (type === "link" && typeof linkIndex === "number") {
          const updatedLinks = [...section.linkKeys];
          updatedLinks[linkIndex] = newText;
          updatedSections[sectionIndex] = {
            ...section,
            linkKeys: updatedLinks,
          };
        }

        return {
          ...prev,
          sections: updatedSections,
        };
      }

      return prev;
    });
  };


  // const submitFooterData = () => {
  //   const content = JSON.stringify(footerData)
  //   dispatch(editStaticComponentsService({
  //     data: {
  //       id: footer.id,
  //       type: 'footer',
  //       content
  //     }
  //   }))

  // };

  return (
    <footer id="contact" className="relative bg-[rgba(30,57,94,1)] flex flex-col items-center justify-center mt-[94px] px-[70px] py-[68px] rounded-t-[28px]">
      <div className="w-full max-w-[1103px]">
        <div className="flex gap-5 max-md:flex-col">
          {/* Left Column */}
          <div className="w-1/3 max-md:w-full">
            <div className="relative">

              <img
                src={footerData?.logo}
                alt="Shammout Group Logo"
                className="w-[203px] object-contain"
              />
              <button
                onClick={() => {
                  handleClickEditIcon("footer")
                }}
                className="absolute bottom-10 left-0 bg-white bg-opacity-90 p-1 rounded-full shadow  hover:text-white transition"
                title="Edit Logo URL"
              >
                ✏️
              </button>
            </div>
            {/* <p
              contentEditable
              suppressContentEditableWarning
              onBlur={e => handleInput("footerContent.footer.newsletterDescription", e.currentTarget.textContent || "")}
              className="mt-9 text-[13px] text-white leading-[21px] cursor-text"
            >
              {footerData?.footerContent["footer.newsletterDescription"]}
            </p> */}
            <div className="mt-2 flex items-center gap-5">
              {/* <div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => handleInput("footerContent.footer.phone", e.currentTarget.textContent || "")}
                  className="text-white text-[13px] font-bold cursor-text"
                  style={{ direction: 'ltr' }}
                >
                  {footerData?.footerContent["footer.phone"]}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => handleInput("footerContent.footer.title", e.currentTarget.textContent || "")}
                  className="text-white text-[13px] font-bold cursor-text"
                  style={{ direction: 'ltr' }}
                >
                  {footerData?.footerContent["footer.title"]}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => handleInput("footerContent.footer.email", e.currentTarget.textContent || "")}
                  className="text-white text-[13px] font-bold cursor-text"
                  style={{ direction: 'ltr' }}
                >
                  {footerData?.footerContent["footer.email"]}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => handleInput("footerContent.footer.address", e.currentTarget.textContent || "")}
                  className="mt-1 text-[9px] text-[rgba(175,175,175,1)] cursor-text"
                >
                  {footerData?.footerContent["footer.address"]}
                </div>
              </div> */}
              <div className="flex flex-col gap-5   max-w-sm">
                <div className="self-stretch">
                  <h4
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => handleInput("footerContent.footer.title", e.currentTarget.textContent || "")}
                    className="text-white text-lg font-extrabold leading-tight mb-1"
                  >
                    {footerData?.footerContent?.footer?.title}
                  </h4>

                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => handleInput("footerContent.footer.phone", e.currentTarget.textContent || "")}
                    style={{ direction: "ltr" }}
                    className="text-white text-sm font-semibold leading-snug mb-2"
                  >
                    {footerData?.footerContent?.footer?.phone}
                  </p>

                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => handleInput("footerContent.footer.email", e.currentTarget.textContent || "")}
                    style={{ direction: "ltr" }}
                    className="text-white text-sm font-semibold leading-snug mb-2"
                  >
                    {footerData?.footerContent?.footer?.email}
                  </p>

                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => handleInput("footerContent.footer.address", e.currentTarget.textContent || "")}
                    className="text-gray-400 text-sm font-normal leading-snug mb-1"
                  >
                    {footerData?.footerContent?.footer?.address}
                  </p>


                </div>
              </div>
              {/* <a
                contentEditable
                suppressContentEditableWarning
                onBlur={e => handleInput("footerContent.footer.callUs", e.currentTarget.textContent || "")}
                className="text-white border border-white px-4 py-2 text-[9px] font-bold uppercase hover:bg-white hover:bg-opacity-10 transition-colors rounded cursor-text"
              >
                {footerData?.footerContent["footer.callUs"]}
              </a> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-2/3 max-md:w-full">
            <div className="flex gap-5 max-md:flex-col">
              {footerData?.sections?.map((sec, idx) => (
                <div key={idx} className="w-1/3 max-md:w-full">
                  <LinkSection
                    index={idx}
                    titleKey={sec?.titleKey}
                    linkKeys={sec?.linkKeys}
                    handleInput={handleInput}
                  />
                  {sec.type === 'contact' &&
                    <NewsletterFormWithCaptcha />
                  }
                </div>
              ))}
              {/* <NewsletterFormWithCaptcha /> */}


            </div>

            <div className="my-6 h-px w-full bg-white opacity-50" />

            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={e => handleInput("footerContent.footer.copyright", e.currentTarget.textContent || "")}
              className="mt-4 text-[10px] text-white cursor-text"
            >
              {footerData?.footerContent["footer.copyright"]}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {/* <div className="absolute top-4 right-4">
        {isLoadingUpdateConstComp ? (
          <Loader width={25} height={25} />
        ) : (
          <Tippy content="Save Footer Data">
            <span className="cursor-pointer" onClick={submitFooterData}>
              <IconFile size={18} />
            </span>
          </Tippy>
        )}
      </div> */}
    </footer>
  );
};
