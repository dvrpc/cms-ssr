import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import InfoIcon from '../../components/forms/InfoIcon.js'; 


const ReusableForm = ({ formConfig}) => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('');
  const [currentSection, setCurrentSection] = useState(0); 
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [helperText, setHelperText] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    formConfig.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.fetchOptions) {
          fetchOptions(field);
        }
      });
    });
  }, [formConfig]);

  const getFieldFromDotNotation = (obj, dotNotation) => {
    return dotNotation.split('.').reduce((acc, key) => acc[key], obj);
  };

  const assembleLabel = (option, labelFieldAssembly, separator = ' ') => {
    return labelFieldAssembly.map(field => getFieldFromDotNotation(option, field)).join(separator);
  };

  const fetchOptions = async (field) => {
    try {
      const response = await fetch(field.fetchOptions.url, {
        method: field.fetchOptions.method
      });
      const data = await response.json();

      const options = data[field.fetchOptions.target].map(option => ({
        value: getFieldFromDotNotation(option, field.fetchOptions.valueField),
        label: assembleLabel(option, field.fetchOptions.labelField, field.fetchOptions.labelSeparator)
      }));
      setDynamicOptions(prevOptions => ({
        ...prevOptions,
        [field.name]: options
      }));
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prevData => ({
        ...prevData,
        [name]: prevData[name] ? [...prevData[name], ...fileArray] : fileArray
      }));
      setSelectedFiles(prevFiles => ({
        ...prevFiles,
        [name]: prevFiles[name] ? [...prevFiles[name], ...fileArray] : fileArray
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData({
      ...formData,
      [name]: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  const validateField = (name, value) => {
    const field = formConfig.sections[currentSection].fields.find(f => f.name === name);
    if (field && field.validationPattern) {
      const regex = new RegExp(field.validationPattern);
      if (!regex.test(value)) {
        return field.validationWarning || "Invalid input.";
      }
    }
    return null;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const validateFormData = () => {
    let errors = {};
    formConfig.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.validationPattern && formData[field.name]) {
          const regex = new RegExp(field.validationPattern);
          if (!regex.test(formData[field.name])) {
            errors[field.name] = field.validationWarning || "Invalid input.";
          }
        }
      });
    });
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateFormData();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }

    try {
      const response = await fetch(formConfig.endpoint, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('Form submitted successfully!');
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const isFieldVisible = (field) => {
    if (!field.condition) return true;
    const { field: conditionField, value } = field.condition;
    return formData[conditionField] === value;
  };

  const nextSection = () => {
    if (currentSection < formConfig.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const toggleHelperText = (text) => {
    setHelperText(helperText === text ? null : text);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">{formConfig.sections[currentSection].title}</h2>
      {formConfig.sections[currentSection].fields.map(field => (
        isFieldVisible(field) && (
          <div key={field.name} className="flex flex-col">
            <label className="mb-2 font-semibold flex items-center">
              {field.label}
              {field.helperText && (
                <div onClick={() => toggleHelperText(field.helperText)}>
                  <InfoIcon />
                </div>
              )}
            </label>
            {helperText === field.helperText && (
              <p className="mb-2 text-sm text-gray-600"> <div dangerouslySetInnerHTML={{__html: field.helperText}}/></p>
            )}
            {validationErrors[field.name] && (
              <p className="mb-2 text-sm text-red-600">{validationErrors[field.name]}</p>
            )}
            {field.type === 'select' ? (
              field.fetchOptions ? (
                <Select
                  name={field.name}
                  value={formData[field.name] ? formData[field.name].map(option => ({ value: option, label: option })) : []}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, field.name)}
                  options={dynamicOptions[field.name]}
                  isMulti
                  className={`w-full ${validationErrors[field.name] ? 'border-red-600' : 'border-gray-300'}`}
                />
              ) : (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={field.required}
                  className={`p-2 border rounded ${validationErrors[field.name] ? 'border-red-600' : 'border-gray-300'}`}
                >
                  <option value="">Select...</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )
            ): field.type === 'multiselect' ? (
              field.fetchOptions ? (
                <Select
                  name={field.name}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, field.name)}
                  options={dynamicOptions[field.name]}
                  isMulti
                  required={field.required}
                  className="w-full"
                />
              ) : (
                <Select
                  name={field.name}
                  value={formData[field.name] ? formData[field.name].map(option => ({ value: option, label: option })) : []}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, field.name)}
                  options={field.options.map(option => ({ value: option, label: option }))}
                  isMulti
                  required={field.required}
                  className="w-full"
                />
              )
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                required={field.required}
                placeholder={field.placeholder}
                rows={field.rows}
                className={`p-2 border rounded ${validationErrors[field.name] ? 'border-red-600' : 'border-gray-300'}`}
              ></textarea>
            ) : field.type === 'file' ? (
              <>
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  multiple={field.allowMultiple}
                  className="p-2 border rounded"
                />
                {selectedFiles[field.name] && (
                  <ul className="mt-2">
                    {selectedFiles[field.name].map((file, index) => (
                      <li key={index} className="text-sm text-gray-700">{file.name}</li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                required={field.required}
                className={`p-2 border rounded ${validationErrors[field.name] ? 'border-red-600' : 'border-gray-300'}`}
              />
            )}
          </div>
        )
      ))}
      <div className="flex justify-between mt-4">
        {currentSection > 0 && (
          <button
            type="button"
            onClick={prevSection}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Previous
          </button>
        )}
        {currentSection < formConfig.sections.length - 1 ? (
          <button
            type="button"
            onClick={nextSection}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
      {status && <p className="mt-4">{status}</p>}
    </form>
  );
};

export default ReusableForm;
