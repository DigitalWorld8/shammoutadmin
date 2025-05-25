import React, { useState } from "react";
import MessageIcon from "../../../assets/icons/MessageIcon";
import AddressIcon from "../../../assets/icons/AddressIcon";
import { Pencil } from "lucide-react";
import EditImageModal from "./EditImageModal";
import { useAppDispatch } from "../../../store";
import { setClickedKey, setShowModal } from "../../../store/slices/pagesSlice";
import CardButtonEditor from "./CardButtonEditor";

interface ContactInfo {
  phone?: string;
  email?: string;
  addresses: string[];
  website?: string;
}

interface ContactCardProps {
  logo: string;
  contactInfo: ContactInfo;
  index: number;
  contentData: { logo: string; contactInfo: ContactInfo }[];
  setContentData: (data: { logo: string; contactInfo: ContactInfo }[]) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  comp,
  card,
  index,
  textEditHandler, setItem, handleClickEditIcon, setPageData, seg, setSeg
}) => {
  const dispatch = useAppDispatch();
  const { id, logo, phone, email, website, addresses = [] } = card;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [btnLabel, setBtnLabel] = useState(card?.btnLabel || "");
  const [btnLink, setBtnLink] = useState(card?.btnLink || "");

  const onUpdate = (updatedBtnInfo) => {
    console.log('card', card.id);
    console.log('seg', seg.id);

    setPageData((prevData) => {
      if (!Array.isArray(prevData?.segments)) return prevData;

      const updatedSegments = prevData.segments.map((segment) => {
        if (segment.id !== seg?.id) return segment;

        // update components inside this segment
        const updatedComponents = segment.components.map((component) => {
          if (component.id !== comp.id) return component;

          // update parsedContent (cards) inside this component
          const updatedParsedContent = component.parsedContent.map((cardItem) => {
            if (cardItem.id !== card.id) return cardItem;

            // Replace btnInfo with the updated one
            return {
              ...cardItem,
              btnInfo: { ...updatedBtnInfo },
            };
          });

          return {
            ...component,
            parsedContent: updatedParsedContent,
          };
        });

        return {
          ...segment,
          components: updatedComponents,
        };
      });
      console.log('updatedSegments', updatedSegments);

      return {
        ...prevData,
        segments: updatedSegments,
      };
    });
  };


  return (
    <div className=" h-[350px] bg-white shadow-[0px_10px_31px_rgba(215,228,249,0.25)] border  w-full flex flex-col justify-between text-sm text-[rgba(30,57,94,1)] font-normal tracking-[-0.43px] leading-loose mx-auto p-[30px] rounded-[17px] border-[rgba(17,17,17,0.1)] border-solid h-full">
      <div className="flex flex-col text-center justify-center">

        <div className="flex justify-center items-center">
          <div className="relative inline-block">
            <img
              src={logo}
              alt="Company Logo"
              className="object-contain max-w-full h-[50px]"
            />
            <button
              onClick={() => {
                handleClickEditIcon(card)

                dispatch(setClickedKey('logo'))

              }}
              className="absolute top-0 right-0 bg-white p-1 rounded-full shadow"
              title="Edit Image"
            >
              ✏️
            </button>
          </div>
        </div>

        {phone && (
          <div className=" flex items-stretch gap-[7px] mt-[12px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/969682b1c5884bffda18ae450c3e18e55de1163f?placeholderIfAbsent=true"
              alt="Phone"
              className="aspect-[0.93] object-contain w-3.5 shrink-0 mt-1"
            />

            <span
              className="hover:text-[rgba(204,31,65,1)] transition-colors outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={textEditHandler(comp, id, "phone")}
            >
              {phone}
            </span>
          </div>
        )}

        {email && (
          <div className="flex items-center gap-[7px] mt-[12px]">
            <MessageIcon />
            <span
              className="hover:text-[rgba(204,31,65,1)] transition-colors outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={textEditHandler(comp, id, "email")}
            >
              {email}
            </span>
          </div>
        )}

        {addresses.map((address, addrIndex) => (
          <div
            key={addrIndex}
            className={`flex gap-[7px] mt-[12px] ${addrIndex === 0 ? "mt-3" : "mt-5"} ml-${addrIndex === 0 ? "0" : "8"}`}
          >
            <AddressIcon />
            <span
              className="outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={textEditHandler(comp, id, `addresses.${addrIndex}`)}
            >
              {address}
            </span>
          </div>
        ))}

        {website && (
          <div className="flex items-stretch gap-[9px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/8b20239210904ec93de7e5b9dbb999b49e8b935a?placeholderIfAbsent=true"
              alt="Website"
              className="aspect-[1] object-contain w-3.5 shrink-0 mt-[7px]"
            />
            <span
              className="hover:text-[rgba(204,31,65,1)] transition-colors outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={textEditHandler(comp, id, "website")}
            >
              {website}
            </span>
          </div>
        )}
      </div>
      {comp.type === 'Reach Us Section with cta' &&
        <CardButtonEditor
          card={card}
          textEditHandler={textEditHandler}
          onUpdate={onUpdate}
          setSeg={setSeg}
          seg={seg}
        />
      }
    </div>
  );
};


export default ContactCard;
