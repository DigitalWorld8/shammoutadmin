import Select, { StylesConfig } from 'react-select';

export interface selectOption {
    label: string;
    value: string;
}

// 🎨 Semantic color variables
const colorPrimary = '#1E395E'; // Accent / Primary
const colorNeutral = '#706E6E'; // Neutral grey
const colorMuted = '#C0C0C0'; // Lighter grey for placeholder
const colorTagBg = '#F5E3B3'; // Softer background for tags
const colorWhite = '#FFFFFF';
const colorFocusShadow = 'rgba(70, 152, 222, 0.3)'; // Subtle blue focus glow

export const customStyles: StylesConfig<selectOption, true> = {
control: (base, state) => ({
    ...base,
    minHeight: '42px',
    borderRadius: '10px',
    borderColor: state.isFocused ? colorPrimary : base.borderColor,
    transition: 'all 0.2s ease',
    '&:hover': {
        borderColor: colorPrimary,
    },
}),

    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? colorPrimary : state.isFocused ? '#E6F1FB' : colorWhite,
        color: state.isSelected ? colorWhite : colorNeutral,
        padding: '10px 14px',
        fontWeight: state.isSelected ? 600 : 400,
        cursor: 'pointer',
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: colorTagBg,
        borderRadius: '6px',
        padding: '3px 6px',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: colorPrimary,
        fontWeight: 500,
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: colorPrimary,
        ':hover': {
            backgroundColor: colorPrimary,
            color: colorWhite,
        },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '10px',
        marginTop: 6,
        zIndex: 9999,
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999, // Ensure it appears above the modal
    }),
    placeholder: (base) => ({
        ...base,
        color: colorMuted,
    }),
};
