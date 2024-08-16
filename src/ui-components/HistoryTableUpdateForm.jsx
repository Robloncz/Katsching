/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { HistoryTable } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function HistoryTableUpdateForm(props) {
  const {
    id: idProp,
    historyTable: historyTableModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    wicht: "",
    vollstrecker: "",
    numKatsching: "",
    isCommented: false,
    comments: [],
  };
  const [wicht, setWicht] = React.useState(initialValues.wicht);
  const [vollstrecker, setVollstrecker] = React.useState(
    initialValues.vollstrecker
  );
  const [numKatsching, setNumKatsching] = React.useState(
    initialValues.numKatsching
  );
  const [isCommented, setIsCommented] = React.useState(
    initialValues.isCommented
  );
  const [comments, setComments] = React.useState(initialValues.comments);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = historyTableRecord
      ? { ...initialValues, ...historyTableRecord }
      : initialValues;
    setWicht(cleanValues.wicht);
    setVollstrecker(cleanValues.vollstrecker);
    setNumKatsching(cleanValues.numKatsching);
    setIsCommented(cleanValues.isCommented);
    setComments(cleanValues.comments ?? []);
    setCurrentCommentsValue("");
    setErrors({});
  };
  const [historyTableRecord, setHistoryTableRecord] = React.useState(
    historyTableModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(HistoryTable, idProp)
        : historyTableModelProp;
      setHistoryTableRecord(record);
    };
    queryData();
  }, [idProp, historyTableModelProp]);
  React.useEffect(resetStateValues, [historyTableRecord]);
  const [currentCommentsValue, setCurrentCommentsValue] = React.useState("");
  const commentsRef = React.createRef();
  const validations = {
    wicht: [],
    vollstrecker: [],
    numKatsching: [],
    isCommented: [],
    comments: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          wicht,
          vollstrecker,
          numKatsching,
          isCommented,
          comments,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            HistoryTable.copyOf(historyTableRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "HistoryTableUpdateForm")}
      {...rest}
    >
      <TextField
        label="Wicht"
        isRequired={false}
        isReadOnly={false}
        value={wicht}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wicht: value,
              vollstrecker,
              numKatsching,
              isCommented,
              comments,
            };
            const result = onChange(modelFields);
            value = result?.wicht ?? value;
          }
          if (errors.wicht?.hasError) {
            runValidationTasks("wicht", value);
          }
          setWicht(value);
        }}
        onBlur={() => runValidationTasks("wicht", wicht)}
        errorMessage={errors.wicht?.errorMessage}
        hasError={errors.wicht?.hasError}
        {...getOverrideProps(overrides, "wicht")}
      ></TextField>
      <TextField
        label="Vollstrecker"
        isRequired={false}
        isReadOnly={false}
        value={vollstrecker}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wicht,
              vollstrecker: value,
              numKatsching,
              isCommented,
              comments,
            };
            const result = onChange(modelFields);
            value = result?.vollstrecker ?? value;
          }
          if (errors.vollstrecker?.hasError) {
            runValidationTasks("vollstrecker", value);
          }
          setVollstrecker(value);
        }}
        onBlur={() => runValidationTasks("vollstrecker", vollstrecker)}
        errorMessage={errors.vollstrecker?.errorMessage}
        hasError={errors.vollstrecker?.hasError}
        {...getOverrideProps(overrides, "vollstrecker")}
      ></TextField>
      <TextField
        label="Num katsching"
        isRequired={false}
        isReadOnly={false}
        value={numKatsching}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wicht,
              vollstrecker,
              numKatsching: value,
              isCommented,
              comments,
            };
            const result = onChange(modelFields);
            value = result?.numKatsching ?? value;
          }
          if (errors.numKatsching?.hasError) {
            runValidationTasks("numKatsching", value);
          }
          setNumKatsching(value);
        }}
        onBlur={() => runValidationTasks("numKatsching", numKatsching)}
        errorMessage={errors.numKatsching?.errorMessage}
        hasError={errors.numKatsching?.hasError}
        {...getOverrideProps(overrides, "numKatsching")}
      ></TextField>
      <SwitchField
        label="Is commented"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isCommented}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              wicht,
              vollstrecker,
              numKatsching,
              isCommented: value,
              comments,
            };
            const result = onChange(modelFields);
            value = result?.isCommented ?? value;
          }
          if (errors.isCommented?.hasError) {
            runValidationTasks("isCommented", value);
          }
          setIsCommented(value);
        }}
        onBlur={() => runValidationTasks("isCommented", isCommented)}
        errorMessage={errors.isCommented?.errorMessage}
        hasError={errors.isCommented?.hasError}
        {...getOverrideProps(overrides, "isCommented")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              wicht,
              vollstrecker,
              numKatsching,
              isCommented,
              comments: values,
            };
            const result = onChange(modelFields);
            values = result?.comments ?? values;
          }
          setComments(values);
          setCurrentCommentsValue("");
        }}
        currentFieldValue={currentCommentsValue}
        label={"Comments"}
        items={comments}
        hasError={errors?.comments?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("comments", currentCommentsValue)
        }
        errorMessage={errors?.comments?.errorMessage}
        setFieldValue={setCurrentCommentsValue}
        inputFieldRef={commentsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Comments"
          isRequired={false}
          isReadOnly={false}
          value={currentCommentsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.comments?.hasError) {
              runValidationTasks("comments", value);
            }
            setCurrentCommentsValue(value);
          }}
          onBlur={() => runValidationTasks("comments", currentCommentsValue)}
          errorMessage={errors.comments?.errorMessage}
          hasError={errors.comments?.hasError}
          ref={commentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "comments")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || historyTableModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || historyTableModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
