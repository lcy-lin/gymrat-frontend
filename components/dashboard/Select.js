import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'legs', label: 'Legs' },
  { value: 'arms', label: 'Arms' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'others', label: 'Others' },
];

const MultiSelect = ({ setTags }) => {
  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setTags(selectedValues);
  };

  return (
    <div className="mb-2">
        <Select
            isMulti
            options={options}
            placeholder="Choose tags for this workout"
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            onChange={handleChange}
        />
    </div>
    
  );
};

export default MultiSelect;
