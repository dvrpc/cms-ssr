import React, { useState, useEffect } from "react";
import Select from "react-select";
import InfoIcon from "../../components/forms/InfoIcon.js";
import SectionProgressIndicator from "./SectionProgressIndicator";
import HorizontalProgressBar from "./HorizontalProgressBar.js";
import MultiTextInput from "./MultiTextInput";

const FilePill = ({ file, onRemove }) => (
  <div className="mr-2 mb-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
    <span className="mr-2">{file.name}</span>
    <button
      type="button"
      className="focus:outline-none"
      onClick={() => onRemove(file)}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </div>
);

const ReusableForm = ({ formConfig }) => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [helperText, setHelperText] = useState(null);
  const [tableSums, setTableSums] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [transactionComplete, setTransactionComplete] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = window.localStorage.getItem("formData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("formData", JSON.stringify(formData));
      } catch (error) {
        console.log(error);
      }
    }
  }, [formData]);

  useEffect(() => {
    formConfig.sections[currentSectionIndex].fields.forEach((field) => {
      if (field.fetchOptions) {
        fetchOptions(field);
      }
    });
    const updateTableSums = () => {
      const newTableSums = {};
      formConfig.sections.forEach((section) => {
        section.fields.forEach((field) => {
          if (field.type === "table") {
            const relatedFields = section.fields.filter(
              (f) => f.table === field.name && isFieldVisible(f)
            );
            newTableSums[field.name] = calculateTableSum(relatedFields);
          }
        });
      });
      setTableSums(newTableSums);
    };

    updateTableSums();
  }, [formData, formConfig, currentSectionIndex]);

  const getFieldFromDotNotation = (obj, dotNotation) => {
    return dotNotation.split(".").reduce((acc, key) => acc[key], obj);
  };

  const assembleLabel = (option, labelFieldAssembly, separator = " ") => {
    return labelFieldAssembly
      .map((field) => getFieldFromDotNotation(option, field))
      .join(separator);
  };

  const fetchOptions = async (field) => {
    try {
      const response = await fetch(field.fetchOptions.url, {
        method: field.fetchOptions.method,
      });
      const data = await response.json();

      const options = data[field.fetchOptions.target].map((option) => ({
        value: getFieldFromDotNotation(option, field.fetchOptions.valueField),
        label: assembleLabel(
          option,
          field.fetchOptions.labelField,
          field.fetchOptions.labelSeparator
        ),
      }));
      setDynamicOptions((prevOptions) => ({
        ...prevOptions,
        [field.name]: options,
      }));
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      const fileArray = Array.from(files);
      const fieldConfig = formConfig.sections[currentSectionIndex].fields.find(
        (f) => f.name === name
      );

      // Validate file size and type
      const invalidFiles = fileArray.filter(
        (file) =>
          (fieldConfig.maxSize && file.size > fieldConfig.maxSize) ||
          (fieldConfig.allowedTypes &&
            !fieldConfig.allowedTypes.includes(file.type))
      );

      if (invalidFiles.length > 0) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Some files are too large or of invalid type. Max size: ${
            fieldConfig.maxSize / (1024 * 1024)
          }MB, allowed types: ${fieldConfig.allowedTypes.join(", ")}`,
        }));
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: prevData[name] ? [...prevData[name], ...fileArray] : fileArray,
      }));
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [name]: prevFiles[name]
          ? [...prevFiles[name], ...fileArray]
          : fileArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveFile = (file, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((f) => f !== file),
    }));
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [name]: prevFiles[name].filter((f) => f !== file),
    }));
  };

  const handleMultiSelectChange = (selectedOptions, name, type) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "multi"
          ? selectedOptions.map((option) => option.value)
          : selectedOptions.value,
    }));
  };

  const validateField = (name, value) => {
    const field = formConfig.sections[currentSectionIndex].fields.find(
      (f) => f.name === name
    );
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
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateSectionFields = () => {
    let errors = {};

    formConfig.sections[currentSectionIndex].fields.forEach((field) => {
      if (isFieldVisible(field)) {
        if (field.required && !formData[field.name]) {
          errors[field.name] = `This field is required.`;
        }
        if (field.validationPattern && formData[field.name]) {
          const regex = new RegExp(field.validationPattern);
          if (!regex.test(formData[field.name])) {
            errors[field.name] = field.validationWarning || "Invalid input.";
          }
        }
        if (field.type === "table" && field.validSum) {
          const relatedFields = formConfig.sections[
            currentSectionIndex
          ].fields.filter((f) => f.table === field.name && isFieldVisible(f));
          const tableSum = calculateTableSum(relatedFields);

          if (field.validSum !== tableSum) {
            errors[
              field.name
            ] = `Inputs add up to ${field.validSum}. Current total: ${tableSum}`;
          }
        }
      }
    });
    setValidationErrors(errors);
    return errors;
  };

  const validateFormData = () => {
    let errors = {};
    formConfig.sections.forEach((section) => {
      section.fields.forEach((field) => {
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
    setIsSubmitting(true);
    setSubmitResult(null);

    const errors = validateFormData();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    let data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        if (selectedFiles[key] && selectedFiles[key].length > 0) {
          // Handle file uploads
          formData[key].forEach((file) => {
            if (file instanceof File) {
              data.append(key, file);
            } else {
              data.append(key, file);
            }
          });
        } else {
          // Handle multiselect fields
          const valueString = formData[key].join(";");
          data.append(key, valueString);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(formConfig.endpoint, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Form submitted successfully!");
        setSubmitResult({ success: true, data: result });
      } else {
        setSubmitResult({ success: false, message: result.message });
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setSubmitResult({ success: false, message: error.message });
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTableSum = (fields) => {
    return fields.reduce((sum, field) => {
      const value = parseFloat(formData[field.name]) || 0;
      return sum + value;
    }, 0);
  };

  const isFieldVisible = (field) => {
    if (!field.condition) return true;
    const { field: conditionField, value, values, notEmpty } = field.condition;
    if (notEmpty) {
      return (
        formData[conditionField] &&
        formData[conditionField] !== "" &&
        formData[conditionField].length > 0
      );
    }
    if (Array.isArray(formData[conditionField])) {
      if (values) {
        return values.some((v) => formData[conditionField].includes(v));
      }
      return formData[conditionField].includes(value);
    }
    if (values) {
      return values.includes(formData[conditionField]);
    }
    return formData[conditionField] === value;
  };

  const handleNextSection = (event) => {
    event.preventDefault();
    // const errors = 0
    const errors = validateSectionFields();
    if (Object.keys(errors).length === 0) {
      if (currentSectionIndex < formConfig.sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
      }
    }
  };

  const handlePrevSection = (event) => {
    event.preventDefault();
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const toggleHelperText = (text) => {
    setHelperText(helperText === text ? null : text);
  };

  const handleReview = () => {
    setIsReviewMode(true);
  };

  const handleEdit = () => {
    setIsReviewMode(false);
  };

  const handleClearData = () => {
    localStorage.removeItem("formData");
    setFormData({});
    setIsReviewMode(false);
    setTransactionComplete(false);
    setCurrentSectionIndex(0);
  };

  const handleSaveToFile = () => {
    const dataStr = JSON.stringify(formData);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "formData.json";

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleLoadFromFile = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const loadedData = JSON.parse(e.target.result);
      setFormData(loadedData);
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const renderReview = () => {
    return (
      <div className="space-y-4 rounded-lg bg-gray-100 p-4">
        <h2 className="text-xl font-bold">Review Your {transactionComplete ? "Submission" : "Form" }</h2>
        {formConfig.sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            {section.fields.map((field) => (
              <>
                {isFieldVisible(field) &&
                  field.type !== "description" &&
                  field.type !== "table" && (
                    <div key={field.name} className="mb-4">
                      <label className="block font-semibold">
                        {field.label}
                      </label>
                      <div>
                        {field.type === "file" && selectedFiles[field.name] ? (
                          selectedFiles[field.name].map((file, index) => (
                            <FilePill
                              key={index}
                              file={file}
                              onRemove={() =>
                                handleRemoveFile(file, field.name)
                              }
                            />
                          ))
                        ) : (
                          <span>{formData[field.name]}</span>
                        )}
                      </div>
                    </div>
                  )}
              </>
            ))}
          </div>
        ))}
        {transactionComplete ? (
          <>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handleClearData}
              className="rounded bg-gray-600 px-4 py-2 text-white"
            >
              Create New Submission
            </button>
          </div>
          </>
        ): (
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handleEdit}
              className="rounded bg-gray-600 px-4 py-2 text-white"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded bg-green-600 px-4 py-2 text-white"
            >
              Submit
            </button>
          </div>        
        )}
      </div>
    );
  };

  
  const renderSubmissionDialog = () => {
    if (isSubmitting) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Submitting...</p>
          </div>
        </div>
      );
    }

    if (submitResult) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {submitResult.success ? (
              <div>
                <h2 className="text-xl font-bold">Success</h2>
                <p>Your form was submitted successfully!</p>
                <button
                  type="button"
                  onClick={() => {setSubmitResult(null); setTransactionComplete(true)}}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                  OK
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-red-600">Error</h2>
                <p>{submitResult.message}</p>
                <button
                  type="button"
                  onClick={() => setSubmitResult(null)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };
  

  return (
    <div className="flex grid sm:grid-cols-1 md:grid-cols-3">
      {formConfig.showProgressIndicator === "vertical" && (
        <div className="m-4 md:col-span-1 md:col-start-1 md:row-start-2">
          <SectionProgressIndicator
            sections={formConfig.sections}
            currentSectionIndex={currentSectionIndex}
          />
        </div>
      )}
      {formConfig.showProgressIndicator === "horizontal" && (
        <div className="my-4 md:col-span-3 md:col-start-1 md:row-start-1">
          <HorizontalProgressBar
            sections={formConfig.sections}
            currentSectionIndex={currentSectionIndex}
            highlightColor={formConfig.sectionHighlightColor}
          />
        </div>
      )}
      <div
        className={
          formConfig.showProgressIndicator === "vertical" ||
          !formConfig.showProgressIndicator
            ? "m-4 md:col-span-2 md:col-start-2 md:row-start-2"
            : "mt-4 md:col-span-3 md:col-start-1 md:row-start-2"
        }
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg bg-gray-100 p-4"
        >
          {isReviewMode || transactionComplete ? (
            renderReview()
          ) : (
            <>
              <h2 className="flex items-center justify-between text-xl font-bold">
                {formConfig.sections[currentSectionIndex].title}
                <button
                  onClick={handleClearData}
                  className="text-sm font-light text-rose-800 hover:text-rose-600"
                >
                  Reset Form
                </button>
              </h2>
              {formConfig.sections[currentSectionIndex].fields.map(
                (field) =>
                  isFieldVisible(field) && (
                    <div
                      key={field.name}
                      className={`${!field.table ? "flex flex-col" : ""}`}
                    >
                      {field.type !== "description" && !field.table ? (
                        <label className="mt-2 mb-2 flex items-center font-semibold">
                          {field.label}
                          {field.helperText && (
                            <div
                              onClick={() => toggleHelperText(field.helperText)}
                            >
                              <InfoIcon />
                            </div>
                          )}
                        </label>
                      ) : (
                        <></>
                      )}
                      {helperText === field.helperText && (
                        <p className="mb-2 text-sm text-gray-600">
                          {" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: field.helperText,
                            }}
                          />
                        </p>
                      )}
                      {validationErrors[field.name] && (
                        <p className="mb-2 text-sm text-red-600">
                          {validationErrors[field.name]}
                        </p>
                      )}
                      {field.type === "table" ? (
                        <table className="table-auto">
                          <thead>
                            <tr>
                              <th className="text-left">{field.labelName}</th>
                              <th className="text-right">{field.valueName}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formConfig.sections
                              .flatMap((section) => section.fields)
                              .filter(
                                (f) =>
                                  f.table === field.name && isFieldVisible(f)
                              )
                              .map((rowField, index) => (
                                <tr
                                  key={index}
                                  className="border-b dark:border-gray-700 dark:bg-gray-800"
                                >
                                  <td className="py-4">{rowField.label}</td>
                                  <td className="py-4 text-right">
                                    {<b>{field.units}</b> || ""}
                                    <input
                                      type="number"
                                      name={rowField.name}
                                      value={formData[rowField.name]}
                                      onChange={handleChange}
                                      className={`rounded border p-2 text-right ${
                                        validationErrors[field.name]
                                          ? "border-red-600"
                                          : "border-gray-300"
                                      }`}
                                    />
                                  </td>
                                </tr>
                              ))}
                            <tr className="border-b dark:border-gray-700 dark:bg-gray-800">
                              <td className="py-4">
                                <b>{field.summary}</b>
                              </td>
                              <td className="py-4 pr-4 text-right">
                                {<b>{field.units}</b> || ""}
                                {tableSums[field.name] || 0}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        !field.table && (
                          <>
                            {field.type === "select" ? (
                              field.fetchOptions ? (
                                <Select
                                  name={field.name}
                                  onChange={(selectedOptions) =>
                                    handleMultiSelectChange(
                                      selectedOptions,
                                      field.name,
                                      "select"
                                    )
                                  }
                                  options={dynamicOptions[field.name]}
                                  className={`w-full ${
                                    validationErrors[field.name]
                                      ? "border-red-600"
                                      : "border-gray-300"
                                  }`}
                                />
                              ) : (
                                <Select
                                  name={field.name}
                                  value={
                                    formData[field.name]
                                      ? {
                                          value: formData[field.name],
                                          label: formData[field.name],
                                        }
                                      : ""
                                  }
                                  onChange={(selectedOptions) =>
                                    handleMultiSelectChange(
                                      selectedOptions,
                                      field.name,
                                      "select"
                                    )
                                  }
                                  required={field.required}
                                  options={field.options.map((option) => ({
                                    value: option,
                                    label: option,
                                  }))}
                                  className={`w-full ${
                                    validationErrors[field.name]
                                      ? "border-red-600"
                                      : "border-gray-300"
                                  }`}
                                />
                              )
                            ) : field.type === "multiselect" ? (
                              field.fetchOptions ? (
                                <Select
                                  name={field.name}
                                  onChange={(selectedOptions) =>
                                    handleMultiSelectChange(
                                      selectedOptions,
                                      field.name,
                                      "multi"
                                    )
                                  }
                                  options={dynamicOptions[field.name]}
                                  onBlur={handleBlur}
                                  isMulti
                                  required={field.required}
                                  className="w-full"
                                />
                              ) : (
                                <Select
                                  name={field.name}
                                  value={
                                    formData[field.name]
                                      ? formData[field.name].map((option) => ({
                                          value: option,
                                          label: option,
                                        }))
                                      : []
                                  }
                                  onChange={(selectedOptions) =>
                                    handleMultiSelectChange(
                                      selectedOptions,
                                      field.name,
                                      "multi"
                                    )
                                  }
                                  options={field.options.map((option) => ({
                                    value: option,
                                    label: option,
                                  }))}
                                  onBlur={handleBlur}
                                  isMulti
                                  required={field.required}
                                  className="w-full"
                                />
                              )
                            ) : field.type === "textarea" ? (
                              <textarea
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={field.required}
                                placeholder={field.placeholder}
                                rows={field.rows}
                                className={`rounded border p-2 ${
                                  validationErrors[field.name]
                                    ? "border-red-600"
                                    : "border-gray-300"
                                }`}
                              ></textarea>
                            ) : field.type === "file" ? (
                              <>
                                <input
                                  type="file"
                                  name={field.name}
                                  onChange={handleChange}
                                  multiple={field.allowMultiple}
                                  className="rounded border p-2"
                                />
                                {field.fileHelper && (
                                  <p className="text-sm text-gray-600">
                                    {field.helperText}
                                  </p>
                                )}
                                {selectedFiles[field.name] && (
                                  <div className="mt-2 flex flex-wrap">
                                    {selectedFiles[field.name].map(
                                      (file, index) => (
                                        <FilePill
                                          key={index}
                                          file={file}
                                          onRemove={() =>
                                            handleRemoveFile(file, field.name)
                                          }
                                        />
                                      )
                                    )}
                                  </div>
                                )}
                              </>
                            ) : field.type === "description" ? (
                              <p>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: field.text,
                                  }}
                                />
                              </p>
                            ) : field.type === "multitext" ? (
                              <MultiTextInput
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={field.required || false}
                                placeholder={
                                  field.placeholder || "Type and press enter"
                                }
                                className={`w-full rounded border p-2 ${
                                  validationErrors[field.name]
                                    ? "border-red-600"
                                    : "border-gray-300"
                                }`}
                              />
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={field.placeholder}
                                required={field.required}
                                className={`rounded border p-2 ${
                                  validationErrors[field.name]
                                    ? "border-red-600"
                                    : "border-gray-300"
                                }`}
                              />
                            )}
                          </>
                        )
                      )}
                    </div>
                  )
              )}
              <div className="mt-4 flex justify-between">
                {currentSectionIndex > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevSection}
                    className="rounded bg-gray-600 px-4 py-2 text-white"
                  >
                    Previous
                  </button>
                )}
                {currentSectionIndex < formConfig.sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                  >
                    Next
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleReview}
                      className="rounded bg-yellow-600 px-4 py-2 text-white"
                    >
                      Review
                    </button>
                    <button
                      type="submit"
                      className="rounded bg-green-600 px-4 py-2 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Submit'}
                    </button>
                  </>
                )}
              </div>
              {/* <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handleSaveToFile}
                  className="rounded text-sm bg-gray-300 px-4 py-2 text-white"
                >
                  Save Form Data
                </button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleLoadFromFile}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="text-sm text-green-500 hover:text-green-700 cursor-pointer"
                >
                  Load from File
                </label>
              </div>
              {status && <p className="mt-4">{status}</p>} */}
            </>
          )}
        </form>
        {renderSubmissionDialog()}
      </div>
    </div>
  );
};

export default ReusableForm;
