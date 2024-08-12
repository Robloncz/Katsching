/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCommentTable } from "../graphql/queries";
import { updateCommentTable } from "../graphql/mutations";
const client = generateClient();
export default function CommentTableUpdateForm(props) {
  const {
    id: idProp,
    commentTable: commentTableModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Commenter: "",
    Comment: "",
  };
  const [Commenter, setCommenter] = React.useState(initialValues.Commenter);
  const [Comment, setComment] = React.useState(initialValues.Comment);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = commentTableRecord
      ? { ...initialValues, ...commentTableRecord }
      : initialValues;
    setCommenter(cleanValues.Commenter);
    setComment(cleanValues.Comment);
    setErrors({});
  };
  const [commentTableRecord, setCommentTableRecord] = React.useState(
    commentTableModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCommentTable.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCommentTable
        : commentTableModelProp;
      setCommentTableRecord(record);
    };
    queryData();
  }, [idProp, commentTableModelProp]);
  React.useEffect(resetStateValues, [commentTableRecord]);
  const validations = {
    Commenter: [],
    Comment: [],
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
          Commenter: Commenter ?? null,
          Comment: Comment ?? null,
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
          await client.graphql({
            query: updateCommentTable.replaceAll("__typename", ""),
            variables: {
              input: {
                id: commentTableRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CommentTableUpdateForm")}
      {...rest}
    >
      <TextField
        label="Commenter"
        isRequired={false}
        isReadOnly={false}
        value={Commenter}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Commenter: value,
              Comment,
            };
            const result = onChange(modelFields);
            value = result?.Commenter ?? value;
          }
          if (errors.Commenter?.hasError) {
            runValidationTasks("Commenter", value);
          }
          setCommenter(value);
        }}
        onBlur={() => runValidationTasks("Commenter", Commenter)}
        errorMessage={errors.Commenter?.errorMessage}
        hasError={errors.Commenter?.hasError}
        {...getOverrideProps(overrides, "Commenter")}
      ></TextField>
      <TextField
        label="Comment"
        isRequired={false}
        isReadOnly={false}
        value={Comment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Commenter,
              Comment: value,
            };
            const result = onChange(modelFields);
            value = result?.Comment ?? value;
          }
          if (errors.Comment?.hasError) {
            runValidationTasks("Comment", value);
          }
          setComment(value);
        }}
        onBlur={() => runValidationTasks("Comment", Comment)}
        errorMessage={errors.Comment?.errorMessage}
        hasError={errors.Comment?.hasError}
        {...getOverrideProps(overrides, "Comment")}
      ></TextField>
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
          isDisabled={!(idProp || commentTableModelProp)}
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
              !(idProp || commentTableModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
