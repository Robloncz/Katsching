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
import { getKatschingTable } from "../graphql/queries";
import { updateKatschingTable } from "../graphql/mutations";
const client = generateClient();
export default function KatschingTableUpdateForm(props) {
  const {
    id: idProp,
    katschingTable: katschingTableModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Player: "",
    Emoji: "",
    Katschings: "",
  };
  const [Player, setPlayer] = React.useState(initialValues.Player);
  const [Emoji, setEmoji] = React.useState(initialValues.Emoji);
  const [Katschings, setKatschings] = React.useState(initialValues.Katschings);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = katschingTableRecord
      ? { ...initialValues, ...katschingTableRecord }
      : initialValues;
    setPlayer(cleanValues.Player);
    setEmoji(cleanValues.Emoji);
    setKatschings(cleanValues.Katschings);
    setErrors({});
  };
  const [katschingTableRecord, setKatschingTableRecord] = React.useState(
    katschingTableModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getKatschingTable.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getKatschingTable
        : katschingTableModelProp;
      setKatschingTableRecord(record);
    };
    queryData();
  }, [idProp, katschingTableModelProp]);
  React.useEffect(resetStateValues, [katschingTableRecord]);
  const validations = {
    Player: [],
    Emoji: [],
    Katschings: [],
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
          Player: Player ?? null,
          Emoji: Emoji ?? null,
          Katschings: Katschings ?? null,
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
            query: updateKatschingTable.replaceAll("__typename", ""),
            variables: {
              input: {
                id: katschingTableRecord.id,
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
      {...getOverrideProps(overrides, "KatschingTableUpdateForm")}
      {...rest}
    >
      <TextField
        label="Player"
        isRequired={false}
        isReadOnly={false}
        value={Player}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player: value,
              Emoji,
              Katschings,
            };
            const result = onChange(modelFields);
            value = result?.Player ?? value;
          }
          if (errors.Player?.hasError) {
            runValidationTasks("Player", value);
          }
          setPlayer(value);
        }}
        onBlur={() => runValidationTasks("Player", Player)}
        errorMessage={errors.Player?.errorMessage}
        hasError={errors.Player?.hasError}
        {...getOverrideProps(overrides, "Player")}
      ></TextField>
      <TextField
        label="Emoji"
        isRequired={false}
        isReadOnly={false}
        value={Emoji}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player,
              Emoji: value,
              Katschings,
            };
            const result = onChange(modelFields);
            value = result?.Emoji ?? value;
          }
          if (errors.Emoji?.hasError) {
            runValidationTasks("Emoji", value);
          }
          setEmoji(value);
        }}
        onBlur={() => runValidationTasks("Emoji", Emoji)}
        errorMessage={errors.Emoji?.errorMessage}
        hasError={errors.Emoji?.hasError}
        {...getOverrideProps(overrides, "Emoji")}
      ></TextField>
      <TextField
        label="Katschings"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Katschings}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Player,
              Emoji,
              Katschings: value,
            };
            const result = onChange(modelFields);
            value = result?.Katschings ?? value;
          }
          if (errors.Katschings?.hasError) {
            runValidationTasks("Katschings", value);
          }
          setKatschings(value);
        }}
        onBlur={() => runValidationTasks("Katschings", Katschings)}
        errorMessage={errors.Katschings?.errorMessage}
        hasError={errors.Katschings?.hasError}
        {...getOverrideProps(overrides, "Katschings")}
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
          isDisabled={!(idProp || katschingTableModelProp)}
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
              !(idProp || katschingTableModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
