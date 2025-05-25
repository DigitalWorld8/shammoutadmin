import Select from 'react-select';
import { customStyles } from '../../utils/selectStyle';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { toggleLocale } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';

type OptionType = {
  value: string;
  label: string;
};

interface PageFilterProps {
  selectedPos: OptionType | null;
  setSelectedPos: (value: OptionType | null) => void;
  posOptions: OptionType[];

  selectedLang: OptionType | null;
  setSelectedLang: (value: OptionType | null) => void;
  langOptions: OptionType[];
}

const PageFilter = ({
  selectedPos,
  setSelectedPos,
  posOptions,
  selectedLang,
  setSelectedLang,
  langOptions,
}: PageFilterProps) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation()
  // Assuming selectedOption is an object like { value: 'english' } or { value: 'arabic' }
  const handleChangeLanguage = (selectedOption: { value: string }) => {
    let langCode = 'en';
    if (selectedOption.value === 'arabic') {
      langCode = 'ae';
    } else if (selectedOption.value === 'english') {
      langCode = 'en';
    }

    i18n.changeLanguage(langCode)

    setSelectedLang(selectedOption);
  };
  return (
    <div className="mb-5 flex items-center justify-between">
      <h5 className="text-lg font-semibold dark:text-white-light"></h5>
      <div className="flex gap-1">
        <Select
          id="pos"
          name="pos"
          options={posOptions}
          value={selectedPos}
          onChange={setSelectedPos}
          placeholder="Select Pos"
          className="py-1"
          styles={customStyles}
        />

        <Select
          id="lang"
          name="lang"
          options={langOptions}
          value={selectedLang}
          onChange={(selectedOption) => {
            handleChangeLanguage(selectedOption)
          }}
          placeholder="Select Language"
          className="py-1"
          styles={customStyles}

        />
      </div>
    </div>
  );
};

export default PageFilter;
