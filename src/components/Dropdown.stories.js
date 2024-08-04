import React from 'react';
import Dropdown from './Dropdown';

export default {
    title: 'Dropdown',
    component: Dropdown,
};

const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
];

export const Default = () => <Dropdown options={options} />;
export const Searchable = () => <Dropdown options={options} searchable />;
export const MultipleSelection = () => <Dropdown options={options} multiple />;
export const SearchableMultiple = () => <Dropdown options={options} searchable multiple />;
export const Portal = () => <Dropdown options={options} usePortal />;
export const CustomRender = () => (
    <Dropdown
        options={options}
        customOptionRenderer={(option) => <span style={{ color: 'blue' }}>{option.label}</span>}
    />
);
export const CustomFilter = () => (
    <Dropdown
        options={options}
        filterOptions={(option) => option.label.startsWith('Option 1')}
    />
);
export const ToggleFeatures = () => (
    <Dropdown
        options={options}
        searchable={false}
        multiple={true}
        usePortal={true}
        zIndex={9999}
    />
);
