# ReusableForm Component Documentation

## Overview

The `ReusableForm` component is a flexible form builder that allows you to create and manage forms using a `json` configuration object. The form structure and fields are defined by a configuration object that can be declared in the script or as a `json` file. This document describes the configuration options available for each form element and their properties.

## Form Configuration

The `formConfig` object consists of several sections, each containing a set of fields. Below is the structure and options for the configuration.

### FormConfig

| Option                  | Type   | Description                                                                                           |
| ----------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `endpoint`              | string | The URL where the form data will be submitted.                                                        |
| `showProgressIndicator` | string | The type of progress indicator to show (`"vertical"` or `"horizontal"`).                              |
| `sectionHighlightColor` | string | The highlight color for the current section in the progress bar.                                      |
| `submissionMessages`    | object | Optional custom messages for submission success and error dialogs. See table below for configuration. |
| `sections`              | array  | An array of section objects.                                                                          |

#### SubmissionMessages

Defines optional custom text shown when a form is submitted successfully or fails.

| Option           | Type   | Default Value                                                                                                                  | Description                                              |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `successTitle`   | string | `"Success"`                                                                                                                    | Title text displayed when the form is successfully sent. |
| `successMessage` | string | `"Your application was submitted successfully!"`                                                                               | Message body shown on success.                           |
| `errorTitle`     | string | `"Error"`                                                                                                                      | Title text displayed when submission fails.              |
| `errorMessage`   | string | `"There was an issue submitting your application. Please try again. If this issue persists, please contact data@dvrpc.org..."` | Message body shown on error or failed submission.        |

**Example:**

```json
"submissionMessages": {
  "successTitle": "Thank You!",
  "successMessage": "Your submission has been received. You’ll receive a confirmation email shortly.",
  "errorTitle": "Submission Failed",
  "errorMessage": "We couldn’t process your submission at this time. Please try again later."
}
```

### Section

| Option   | Type   | Description                |
| -------- | ------ | -------------------------- |
| `title`  | string | The title of the section.  |
| `fields` | array  | An array of field objects. |

### Field

| Option              | Type    | Description                                                                                                            | Field Usage                          |
| ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `name`              | string  | The unique name of the field.                                                                                          | All fields                           |
| `label`             | string  | The label text for the field.                                                                                          | All fields                           |
| `type`              | string  | The type of the field (e.g., `"text"`, `"select"`, `"textarea"`, `"file"`, `"multitext"`, `"table"`, `"description"`). | All fields                           |
| `required`          | boolean | Whether the field is required.                                                                                         | All fields except `"description"`    |
| `placeholder`       | string  | The placeholder text for the field (optional).                                                                         | `"text"`, `"textarea"`, `"password"` |
| `helperText`        | string  | Additional helper text for the field (optional).                                                                       | All fields                           |
| `validationPattern` | string  | The regex pattern for validating the field input (optional).                                                           | `"text"`, `"textarea"`, `"password"` |
| `validationWarning` | string  | The warning message to display if validation fails (optional).                                                         | `"text"`, `"textarea"`, `"password"` |
| `options`           | array   | An array of options for select fields (optional).                                                                      | `"select"`, `"multiselect"`          |
| `fetchOptions`      | object  | Configuration for dynamically fetching options (optional).                                                             | `"select"`, `"multiselect"`          |
| `allowMultiple`     | boolean | Whether multiple files can be selected (for file fields).                                                              | `"file"`                             |
| `maxSize`           | number  | The maximum file size allowed (for file fields).                                                                       | `"file"`                             |
| `allowedTypes`      | array   | An array of allowed file types (for file fields).                                                                      | `"file"`                             |
| `table`             | string  | The name of the table this field is part of (for table fields).                                                        | `"table"`                            |
| `labelName`         | string  | The label name for table headers.                                                                                      | `"table"`                            |
| `valueName`         | string  | The value name for table headers.                                                                                      | `"table"`                            |
| `units`             | string  | The units for table values.                                                                                            | `"table"`                            |
| `summary`           | string  | The summary text for table totals.                                                                                     | `"table"`                            |
| `rows`              | number  | The number of rows for textarea fields.                                                                                | `"textarea"`                         |
| `condition`         | object  | Condition to determine if the field should be visible (optional).                                                      | All fields                           |

### FetchOptions

Supports both simple and advanced label/value assembly.

| Option           | Type          | Description                                                                                      |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| `url`            | string        | The URL to fetch options from.                                                                   |
| `method`         | string        | The HTTP method to use for fetching options (`"GET"` or `"POST"`).                               |
| `target`         | string        | The key in the response data that contains the array of option objects.                          |
| `valueField`     | string/object | The field(s) or configuration used to assemble the option value. See **Assembly Options** below. |
| `labelField`     | string/object | The field(s) or configuration used to assemble the option label. See **Assembly Options** below. |
| `valueSeparator` | string        | Separator for legacy multi-field `valueField` arrays (optional, backward-compatible).            |
| `labelSeparator` | string        | Separator for legacy multi-field `labelField` arrays (optional, backward-compatible).            |

#### Assembly Options (Advanced Form)

For both `labelField` and `valueField`, you can now provide either:

- a single string (simple field reference)
- an array of field names (legacy form)
- or an **object** with detailed assembly rules:

| Property    | Type   | Description                                           |
| ----------- | ------ | ----------------------------------------------------- |
| `fields`    | array  | Array of field names to combine.                      |
| `separator` | string | Separator between fields (default: `" "`).            |
| `prefix`    | string | Optional text prepended to the assembled label/value. |
| `suffix`    | string | Optional text appended to the assembled label/value.  |

**Example:**

```json
"fetchOptions": {
  "url": "https://example.com/api/items",
  "method": "GET",
  "target": "data",
  "labelField": {
    "fields": ["first_name", "last_name"],
    "separator": " ",
    "prefix": "Name: "
  },
  "valueField": {
    "fields": ["id", "region_code"],
    "separator": "-",
    "suffix": "_val"
  }
}
```

### Condition

| Option     | Type    | Description                                                              |
| ---------- | ------- | ------------------------------------------------------------------------ |
| `field`    | string  | The field name to check.                                                 |
| `value`    | string  | The value to compare.                                                    |
| `values`   | array   | An array of values to compare.                                           |
| `notEmpty` | boolean | Whether the field should be visible if the condition field is not empty. |

## Examples

### Example Configuration (with submission messages)

```json
{
  "endpoint": "https://example.com/submit",
  "showProgressIndicator": "horizontal",
  "sectionHighlightColor": "#4caf50",
  "submissionMessages": {
    "successTitle": "Thank You!",
    "successMessage": "We’ve received your registration. You will get a confirmation shortly.",
    "errorTitle": "Submission Error",
    "errorMessage": "Something went wrong while submitting. Please try again later."
  },
  "sections": [
    {
      "title": "Personal Information",
      "fields": [
        {
          "name": "firstName",
          "label": "First Name",
          "type": "text",
          "required": true
        },
        {
          "name": "country",
          "label": "Country",
          "type": "select",
          "fetchOptions": {
            "url": "https://example.com/countries",
            "method": "GET",
            "target": "results",
            "valueField": "id",
            "labelField": {
              "fields": ["name", "iso_code"],
              "separator": " (",
              "suffix": ")"
            }
          }
        }
      ]
    }
  ]
}
```

## Change History

| Version  | Date       | Description                                                                                      |
| -------- | ---------- | ------------------------------------------------------------------------------------------------ |
| **v1.0** | 2024-07-01 | Initial version documenting core configuration and field types.                                  |
| **v1.1** | 2024-08-15 | Added dynamic `fetchOptions` section and improved `condition` visibility rules.                  |
| **v1.2** | 2024-10-01 | Added progress indicators and table field summary support.                                       |
| **v1.3** | 2025-11-07 | Added `submissionMessages` configuration and enhanced `fetchOptions` with prefix/suffix support. |
