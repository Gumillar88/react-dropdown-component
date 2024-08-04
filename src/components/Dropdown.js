import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Dropdown.css';

function Dropdown({
    options,
    searchable,
    multiple,
    usePortal,
    customOptionRenderer,
    filterOptions,
    toggleFeatures,
    zIndex,
}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
        if (multiple) {
            setSelectedOptions((prev) =>
                prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
            );
        } else {
            setSelectedOptions([option]);
            setIsOpen(false);
        }
    };

    const handleRemoveClick = (option) => {
        setSelectedOptions((prev) => prev.filter((o) => o !== option));
    };

    const defaultFilterOptions = (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase());

    const filteredOptions = filterOptions
        ? options.filter(filterOptions)
        : options.filter(defaultFilterOptions);

    const renderOptions = useCallback(
        (opts) =>
            opts.map((option) => {
                const isSelected = selectedOptions.includes(option);
                const optionContent = customOptionRenderer
                    ? customOptionRenderer(option)
                    : option.label;

                return (
                    <div
                        key={option.value}
                        className={`dropdown-option ${
                            isSelected ? 'selected' : ''
                        }`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {searchable ? highlightText(optionContent) : optionContent}
                    </div>
                );
            }),
        [selectedOptions, searchTerm, customOptionRenderer, filterOptions]
    );

    const highlightText = (text) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <span key={index} className="highlight">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    const dropdownMenu = (
        <div className="dropdown-menu" style={{ zIndex: zIndex || 1000 }}>
            {searchable && (
                <input
                    type="text"
                    className="dropdown-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            )}
            {renderOptions(filteredOptions)}
        </div>
    );

    const selectedLabels = selectedOptions.map((o) => (
        <span key={o.value} className="selected-item">
            {o.label}
            <button
                className="remove-btn"
                onClick={() => handleRemoveClick(o)}
            >
                &times;
            </button>
        </span>
    ));

    return (
        <div className="dropdown">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="dropdown-toggle"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {selectedLabels.length ? selectedLabels : 'Select...'}
            </button>
            {usePortal
                ? ReactDOM.createPortal(dropdownMenu, document.body)
                : isOpen && dropdownMenu}
        </div>
    );
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    searchable: PropTypes.bool,
    multiple: PropTypes.bool,
    usePortal: PropTypes.bool,
    customOptionRenderer: PropTypes.func,
    filterOptions: PropTypes.func,
    toggleFeatures: PropTypes.object,
    zIndex: PropTypes.number,
};

Dropdown.defaultProps = {
    searchable: false,
    multiple: false,
    usePortal: false,
    customOptionRenderer: null,
    filterOptions: null,
    toggleFeatures: {},
    zIndex: 1000,
};

export default Dropdown;
