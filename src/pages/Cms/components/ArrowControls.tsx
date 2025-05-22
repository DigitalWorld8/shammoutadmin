import { useTranslation } from "react-i18next";

const ArrowControls = ({ handlePrevSlide, handleNextSlide }: { handlePrevSlide: () => void, handleNextSlide: () => void }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Adjust arrow direction based on language
  const prevArrow =
    lang === "ar"
      ? "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/2faa3e89cea05748189aced0ebf3c3d4a7c092f2" // right arrow
      : "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/be11292f7d98de4592b2d5784401fa31ac6b349f"; // left arrow

  const nextArrow =
    lang === "ar"
      ? "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/be11292f7d98de4592b2d5784401fa31ac6b349f" // left arrow
      : "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/2faa3e89cea05748189aced0ebf3c3d4a7c092f2"; // right arrow

  return (
    <div style={{ direction: 'ltr' }} className="relative flex justify-end items-stretch gap-1.5 z-10 cursor-pointer">
      <img
        src={prevArrow}
        alt="Previous slide"
        className="aspect-[1] object-contain w-7 hover:opacity-80 transition-opacity"
        onClick={handlePrevSlide}
      />
      <img
        src={nextArrow}
        alt="Next slide"
        className="aspect-[1] object-contain w-7 hover:opacity-80 transition-opacity"
        onClick={handleNextSlide}
      />
    </div>
  );
};

export default ArrowControls;
