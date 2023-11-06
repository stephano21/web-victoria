import React, { useState, useEffect } from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectSearchProps {
    options: Option[] | undefined;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    bclass?: string;
}

export const SelectSearch = ({
    options,
    value,
    onChange,
    placeholder,
    bclass,
}: SelectSearchProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<string | undefined>(""); // Estado para mostrar el label

    useEffect(() => {
        if (!value) {
            setSelectedLabel(""); // Restablecer el label cuando no hay valor seleccionado
        }
    }, [value]);

    const filteredOptions = options
        ? options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setIsDropdownVisible(true);
    };

    const handleOptionClick = (selectedValue: string) => {
        if (selectedValue !== undefined) {
            setSelectedLabel(
                options ? options.find((option) => option.value === selectedValue)?.label : ""
            );
            onChange(selectedValue);
            setSearchTerm(selectedValue);
            setIsDropdownVisible(false);
        }
    };

    const handleInputFocus = () => {
        setIsDropdownVisible(true);
        setHasFocus(true);
    };

    const handleInputBlur = () => {
        setHasFocus(false);
        // Cerrar la lista desplegable al perder el foco solo si no hay una selección
        if (!value) {
            setIsDropdownVisible(false);
        }
    };

    return (
        <div className="row">
            <div className="mt-10">
                <input
                    className={`form-control ${bclass}`}
                    type="text"
                    placeholder={placeholder || "Seleccione"}
                    value={hasFocus ? searchTerm : selectedLabel || value} // Mostrar el label o el valor
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
                {isDropdownVisible && (
                    <div className="dropdown">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className="dropdown-item"
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};
