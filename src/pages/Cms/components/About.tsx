import React from "react";
import missionImg from "../../../assets/images/img01.png";
import visionImg from "../../../assets/images/img01.png";
import { useAppDispatch } from "../../../store";
import { setClickedKey, setShowModal } from "../../../store/slices/pagesSlice";

export const About = ({ handleClickEditIcon, comp, contentData, textEditHandler, setItem }) => {
  const dispatch = useAppDispatch();

  const handleChange = (index, key, e, id) => {
    const newValue = e.target.innerText;

    const updated = [...contentData];
    updated[index] = {
      ...updated[index],
      [key]: newValue,
    };
    textEditHandler(comp, id, key)(e);

  };

  const handleBlur = (index, key, id) => (e) => {

    handleChange(index, key, e, id);
  };



  const growth = contentData?.find((item) => item.id === "growth");
  const mission = contentData?.find((item) => item.id === "mission");
  const vision = contentData?.find((item) => item.id === "vision");

  if (!growth || !mission || !vision) {
    return <div className="text-red-500">Missing content data</div>;
  }

  return (
    <section
      id="about"
      className="w-full mx-auto flex flex-col items-stretcht-[83px] mt-[83px] max-md:mt-10"
    >
      <div className="mt-10 flex flex-col md:flex-row gap-5">
        {/* Left Card - Growth & Leadership */}
        <div className="relative flex-1 rounded-xl overflow-hidden">
          <img
            src={growth.logo}
            alt={growth.title}
            className="w-full h-full object-cover aspect-[1.2] rounded-xl"
          />
          <button
            onClick={() => {
              handleClickEditIcon(growth)
              dispatch(setClickedKey('logo'))


            }}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
            title="Edit Image"
          >
            ✏️
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(204,31,65,1)] p-6 text-white rounded-t-xl">
            <h3
              className="text-xl font-bold mb-3 outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={handleBlur(0, "title", growth.id)}
            >
              {growth.title}
            </h3>
            <p
              className="text-sm leading-relaxed outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={handleBlur(0, "description", growth.id)}
            >
              {growth.description}
            </p>
          </div>
        </div>

        {/* Right Cards - Mission & Vision */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Mission */}
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <img
              src={mission.logo}
              alt={mission.title}
              className="absolute w-full h-full object-cover inset-0 rounded-xl"
            />
            <button
              onClick={() => {
                handleClickEditIcon(mission)
                dispatch(setClickedKey('logo'))

              }}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-20"
              title="Edit Image"
            >
              ✏️
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-[rgba(204,31,65,1)] text-white px-6 py-5 rounded-t-xl z-10">
              <h3
                className="text-lg font-bold outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(1, "title", mission.id)}
              >
                {mission.title}
              </h3>
              <p
                className="text-sm mt-3 leading-relaxed outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(1, "description", mission.id)}
              >
                {mission.description}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <img
              src={vision.logo}
              alt={vision.title}
              className="absolute w-full h-full object-cover inset-0 rounded-xl"
            />
            <button
              onClick={() => {handleClickEditIcon(vision)

                dispatch(setClickedKey('logo'))

              }}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-20"
              title="Edit Image"
            >
              ✏️
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-[rgba(204,31,65,1)] text-white px-6 py-5 rounded-t-xl z-10">
              <h3
                className="text-lg font-bold outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(2, "title", vision.id)}
              >
                {vision.title}
              </h3>
              <p
                className="text-sm mt-3 leading-relaxed outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(2, "description", vision.id)}
              >
                {vision.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
