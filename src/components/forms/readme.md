# ReusableForm Component Documentation

## Overview

The `ReusableForm` component is a flexible form builder that allows you to create and manage forms using a `json` configuration object. The form structure and fields are defined by a configuration object that can be declared in the script or as a `json` file. This document describes the configuration options available for each form element and their properties.

## Form Configuration

The `formConfig` object consists of several sections, each containing a set of fields. Below is the structure and options for the configuration.

Sure, here are the options for `formConfig`, `section`, and `field` as tables in markdown:

### FormConfig

| Option                  | Type   | Description                                                              |
| ----------------------- | ------ | ------------------------------------------------------------------------ |
| `endpoint`              | string | The URL where the form data will be submitted.                           |
| `showProgressIndicator` | string | The type of progress indicator to show (`"vertical"` or `"horizontal"`). |
| `sectionHighlightColor` | string | The highlight color for the current section in the progress bar.         |
| `sections`              | array  | An array of section objects.                                             |

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

#### FetchOptions

| Option           | Type   | Description                                                          |
| ---------------- | ------ | -------------------------------------------------------------------- |
| `url`            | string | The URL to fetch options from.                                       |
| `method`         | string | The HTTP method to use for fetching options (`"GET"` or `"POST"`).   |
| `target`         | string | The key in the response data that contains the options.              |
| `valueField`     | string | The field in the response data to use as the option value.           |
| `labelField`     | array  | An array of fields in the response data to use for the option label. |
| `labelSeparator` | string | The separator to use between label fields (optional).                |

#### Condition

| Option     | Type    | Description                                                              |
| ---------- | ------- | ------------------------------------------------------------------------ |
| `field`    | string  | The field name to check.                                                 |
| `value`    | string  | The value to compare.                                                    |
| `values`   | array   | An array of values to compare.                                           |
| `notEmpty` | boolean | Whether the field should be visible if the condition field is not empty. |

## Examples

### Example Configuration

Here is an example of a simple form configuration:

```json
{
  "endpoint": "https://example.com/submit",
  "showProgressIndicator": "horizontal",
  "sectionHighlightColor": "#4caf50",
  "sections": [
    {
      "title": "Personal Information",
      "fields": [
        {
          "name": "firstName",
          "label": "First Name",
          "type": "text",
          "required": true,
          "placeholder": "Enter your first name"
        },
        {
          "name": "lastName",
          "label": "Last Name",
          "type": "text",
          "required": true,
          "placeholder": "Enter your last name"
        },
        {
          "name": "gender",
          "label": "Gender",
          "type": "select",
          "required": true,
          "options": ["Male", "Female", "Other"]
        },
        {
          "name": "bio",
          "label": "Bio",
          "type": "textarea",
          "rows": 5,
          "placeholder": "Tell us about yourself"
        }
      ]
    },
    {
      "title": "Account Details",
      "fields": [
        {
          "name": "email",
          "label": "Email",
          "type": "text",
          "required": true,
          "placeholder": "Enter your email",
          "validationPattern": "^\\S+@\\S+\\.\\S+$",
          "validationWarning": "Please enter a valid email address"
        },
        {
          "name": "password",
          "label": "Password",
          "type": "password",
          "required": true,
          "placeholder": "Enter your password"
        }
      ]
    }
  ]
}
```

This configuration will create a form with two sections, "Personal Information" and "Account Details," each containing several fields.

## Custom Fetch Options

Fields can dynamically fetch options from an API using the `fetchOptions` property. Here is an example of a field with fetch options:

```json
{
  "name": "country",
  "label": "Country",
  "type": "select",
  "required": true,
  "fetchOptions": {
    "url": "https://example.com/countries",
    "method": "GET",
    "target": "countries",
    "valueField": "id",
    "labelField": ["name"],
    "labelSeparator": ", "
  }
}
```

In this example, the field will fetch options from the specified URL and use the `id` field as the value and the `name` field as the label for each option.
