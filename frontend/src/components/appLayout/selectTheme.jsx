const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--background)',
        color: 'var(--text)',
        borderColor: state.isFocused ? '#35424d' : 'var(--border-color)',
        boxShadow: state.isFocused ? '0 0 0 1px #35424d' : provided.boxShadow,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--text)',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--text)',
    }),
    input: (provided) => ({
        ...provided,
        color: 'var(--text)',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'var(--background)',
        color: 'var(--text)',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--background)' : 'var(--backgroound)',
        color: 'var(--text)',
        '&:hover': {
            backgroundColor: 'var(--select)',
            color: 'var(--text)',
        },
    }),
};

export default customStyles