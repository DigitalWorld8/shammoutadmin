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
    phone?: string;
    email?: string;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ phone, email }) => {



    const { t, i18n } = useTranslation("");
    const isEn = i18n.language === "en"



    const services = [
        {
            columnWidth: "w-[28%]",
            items: [
                { id: "automotive", label: t("Automotive") },
                { id: "steelMetals", label: t("Steel & Metals") },
                { id: "aviation", label: t("Aviation") },
            ],
        },
        {
            columnWidth: "w-[34%] ml-5",
            items: [
                { id: "vehicleInspection", label: t("Vehicle Inspection") },
                { id: "realEstate", label: t("Real Estate") },
            ],
        },
        {
            columnWidth: "w-[38%] ml-5",
            items: [
                { id: "alternativeEnergy", label: t("Alternative Energy") },
                { id: "foodManufacturing", label: t("Food Manufacturing") },
            ],
        },
    ];


    return (

            <form className="w-full">
                <div className="flex items-stretch gap-1 mt-[71px] max-md:mt-10">
                    <div className="bg-[rgba(204,31,65,1)] flex w-[79px] shrink-0 h-[3px] rounded-[20px]" />
                    <div className="bg-[rgba(204,31,65,1)] flex w-[22px] shrink-0 h-[3px] rounded-[20px]" />
                </div>
                {/* <SectionHeader
                    title={t("partnerForm.title")}
                    description={t("partnerForm.description")}
                /> */}
                <div className="self-stretch mr-2.5 mt-12 max-md:max-w-full max-md:mt-10">
                    <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {t("name")}
                            </label>
                            <input
                                type="text"
                                name="name"

                                placeholder={t("partnerForm.namePlaceholder")}
                                className="items-center shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white flex w-full gap-[11px] overflow-hidden text-[22px] text-[#667085] font-normal mt-2 px-[22px] py-4 rounded-[10.813px] max-md:max-w-full max-md:px-5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="self-center mt-8 max-md:max-w-full w-full">
                    <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {t("partnerForm.email")}
                            </label>
                            <input
                                type="email"
                                name="email"

                                placeholder={t("partnerForm.email")}

                                className="items-center shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white flex w-full gap-[11px] overflow-hidden text-[22px] text-[#667085] font-normal mt-2 px-[22px] py-4 rounded-[10.813px] max-md:max-w-full max-md:px-5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 max-md:max-w-full w-full">
                    <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {t("partnerForm.phone")}

                            </label>
                            <div className="items-stretch shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white flex w-full overflow-hidden text-[22px] font-normal flex-wrap mt-2 rounded-[10.813px] max-md:max-w-full border border-gray-200">
                                <div className="w-[200px] border-r border-gray-200">
                                </div>
                                <input
                                    name="phone"

                                    style={{
                                        direction: isEn ? 'ltr' : "rtl"
                                    }}
                                    className="flex-1 shrink basis-4 min-w-60 gap-[11px] text-[#667085] pr-[22px] py-4 max-md:max-w-full focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-h-52 mt-8 max-md:max-w-full w-full">
                    <div className="w-full flex-1 max-md:max-w-full">
                        <div className="w-full flex-1 max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {t("partnerForm.businessDescription")}

                            </label>
                            <textarea
                                name="businessDescription"

                                placeholder={t("partnerForm.businessDescriptionPlaceholder")}

                                className="flex-1 shrink basis-[0%] shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white w-full gap-[11px] overflow-hidden text-[22px] text-[#667085] font-normal leading-8 h-40 mt-2 px-[19px] py-3.5 rounded-[10.813px] max-md:max-w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none mt-[33px]">
                    {t("partnerForm.services")}
                </div>

                <div className="w-full max-w-[997px] mt-[22px] max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        {services.map((column, index) => (
                            <div
                                key={index}
                                className={`${column.columnWidth} max-md:w-full max-md:ml-0`}
                            >
                                <div className="w-full max-md:mt-10">
                                    {column.items.map((item, i) => (
                                        <div key={item.id} className={i !== 0 ? "mt-[22px]" : ""}>
                                            <div className="flex items-center space-x-2 gap-1">
                                                <Checkbox
                                                    id={item.id}
                                                // onCheckedChange={(checked) =>
                                                //     formik.setFieldValue(`services.${item.id}`, checked === true)
                                                // }
                                                />
                                                <label
                                                    htmlFor={item.id}
                                                    className="text-[rgba(30,57,94,1)] text-[22px] font-medium "
                                                >
                                                    {item.label}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="self-stretch w-full text-[22px] text-white font-bold mt-[67px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
                    <button
                        type="button"
                        className="self-stretch bg-[rgba(204,31,65,1)] shadow-[0px_1px_3px_rgba(16,24,40,0.05)] border min-w-60 w-full gap-[11px] overflow-hidden flex-1 shrink basis-[0%] px-[27px] py-4 rounded-[11px] border-[rgba(204,31,65,1)] border-solid max-md:max-w-full max-md:px-5 hover:bg-[rgba(184,28,59,1)] transition-colors"
                    >
                        {t("partnerForm.getStarted")}

                    </button>
                </div>
            </form>

    );
};

export default PartnerForm;