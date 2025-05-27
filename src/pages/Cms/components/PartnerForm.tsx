import React, { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Container } from "lucide-react";
import { Checkbox } from "@mantine/core";


interface FormValues {
    name: string;
    email: string;
    phone: string;
    country: string;
    businessDescription: string;
    services: {
        automotive: boolean;
        steelMetals: boolean;
        aviation: boolean;
        vehicleInspection: boolean;
        realEstate: boolean;
        alternativeEnergy: boolean;
        foodManufacturing: boolean;
    };
}




interface PartnerFormProps {
    textEditHandler: (comp: any, itemId: string, key: string) => (e: React.FormEvent) => void;
    contentData: any[];
    comp: any;
}

const PartnerForm: React.FC<PartnerFormProps> = ({segmentProp, servicesTextHandler, textEditHandler, contentData, comp }) => {
    if (!contentData || contentData.length === 0) return null;

    const [partner] = contentData;
    const { id, name, email, phoneNumber, descripe, btn, ServicesLabel, services: servicesArray } = partner;

    const { t, i18n } = useTranslation();
    const isEn = i18n.language === "en";

    const columnSizes = ["w-[28%]", "w-[34%] ml-5", "w-[38%] ml-5"];
    const columnCount = columnSizes.length;

    const services = Array.from({ length: columnCount }, (_, i) => ({
        columnWidth: columnSizes[i],
        items: servicesArray
            .filter((_, idx) => idx % columnCount === i)
            .map(item => ({ id: item.id, title: item.title })),
    }));

    const handleBlur = (key: string, itemId: string) => (e: React.FormEvent) => {
        textEditHandler(comp, itemId, key)(e);
    };



    return (
        <form className="w-full">
            {/* Name */}
            <div className="self-stretch max-md:max-w-full max-md:mt-10">
                <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                        <label
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleBlur("name", id)}
                            className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none focus:outline-none"
                        >
                            {name}
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder={t("Your name")}
                            className="items-center shadow bg-white flex w-full text-[22px] text-[#667085] font-normal mt-2 px-[22px] py-4 rounded-[10.813px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Email */}
            <div className="self-center mt-8 max-md:max-w-full w-full">
                <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                        <label
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleBlur("email", id)}
                            className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none focus:outline-none"
                        >
                            {email}
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="items-center shadow bg-white flex w-full text-[22px] text-[#667085] font-normal mt-2 px-[22px] py-4 rounded-[10.813px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Phone Number */}
            <div className="mt-8 max-md:max-w-full w-full">
                <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                        <label
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleBlur("phoneNumber", id)}
                            className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none focus:outline-none"
                        >
                            {phoneNumber}
                        </label>
                        <div className="shadow bg-white flex w-full text-[22px] font-normal mt-2 rounded-[10.813px] border border-gray-200">
                            <div className="w-[200px] border-r border-gray-200"></div>
                            <input
                                name="phone"
                                placeholder="+963 000-000"
                                style={{ direction: isEn ? "ltr" : "rtl" }}
                                className="flex-1 pr-[22px] py-4 text-[#667085] focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="min-h-52 mt-8 max-md:max-w-full w-full">
                <div className="w-full">
                    <div className="w-full">
                        <label
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleBlur("descripe", id)}
                            className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none focus:outline-none"
                        >
                            {descripe}
                        </label>
                        <textarea
                            name="businessDescription"
                            placeholder="Tell us a little bit about the business"
                            className="shadow bg-white w-full text-[22px] text-[#667085] font-normal h-40 mt-2 px-[19px] py-3.5 rounded-[10.813px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Services */}
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur("ServicesLabel", id)}
                className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none mt-[33px] focus:outline-none"
            >
                {ServicesLabel}
            </div>

            <div className="w-full max-w-[997px] mt-[22px] max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                    {services.map((column, index) => (
                        <div key={index} className={`${column.columnWidth} max-md:w-full max-md:ml-0`}>
                            <div className="w-full max-md:mt-10">
                                {column.items.map((item, i) => (
                                    <div key={item.id} className={i !== 0 ? "mt-[22px]" : ""}>
                                        <div className="flex items-center space-x-2 gap-1">
                                            <Checkbox id={item.id} disabled />
                                            <label
                                                htmlFor={item.id}
                                                className="text-[rgba(30,57,94,1)] text-[22px] font-medium"
                                            >
                                                <span
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    onBlur={servicesTextHandler(comp, segmentProp, item.id, "title")}
                                                    className="focus:outline-none"
                                                >
                                                    {item.title}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Button */}
            <div className="w-full text-[22px] text-white font-bold mt-[67px] max-md:mt-10">
                <button
                    type="button"
                    className="w-full bg-[rgba(204,31,65,1)] shadow border px-[27px] py-4 rounded-[11px] border-[rgba(204,31,65,1)] hover:bg-[rgba(184,28,59,1)] transition-colors"
                >
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleBlur("btn", id)}
                        className="focus:outline-none"
                    >
                        {btn}
                    </span>
                </button>
            </div>
        </form>
    );
};

export default PartnerForm;

