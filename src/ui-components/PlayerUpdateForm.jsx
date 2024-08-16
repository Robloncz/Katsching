/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Player } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function PlayerUpdateForm(props) {
  const {
    id: idProp,
    player: playerModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    emoji: "",
    katschings: "",
    lastKatsching: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [emoji, setEmoji] = React.useState(initialValues.emoji);
  const [katschings, setKatschings] = React.useState(initialValues.katschings);
  const [lastKatsching, setLastKatsching] = React.useState(
    initialValues.lastKatsching
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = playerRecord
      ? { ...initialValues, ...playerRecord }
      : initialValues;
    setName(cleanValues.name);
    setEmoji(cleanValues.emoji);
    setKatschings(cleanValues.katschings);
    setLastKatsching(cleanValues.lastKatsching);
    setErrors({});
  };
  const [playerRecord, setPlayerRecord] = React.useState(playerModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Player, idProp)
        : playerModelProp;
      setPlayerRecord(record);
    };
    queryData();
  }, [idProp, playerModelProp]);
  React.useEffect(resetStateValues, [playerRecord]);
  const validations = {
    name: [{ type: "Required" }],
    emoji: [],
    katschings: [{ type: "Required" }],
    lastKatsching: [{ type: "Required" }],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          name,
          emoji,
          katschings,
          lastKatsching,
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
            Player.copyOf(playerRecord, (updated) => {
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
      {...getOverrideProps(overrides, "PlayerUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              emoji,
              katschings,
              lastKatsching,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Emoji"
        isRequired={false}
        isReadOnly={false}
        value={emoji}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              emoji: value,
              katschings,
              lastKatsching,
            };
            const result = onChange(modelFields);
            value = result?.emoji ?? value;
          }
          if (errors.emoji?.hasError) {
            runValidationTasks("emoji", value);
          }
          setEmoji(value);
        }}
        onBlur={() => runValidationTasks("emoji", emoji)}
        errorMessage={errors.emoji?.errorMessage}
        hasError={errors.emoji?.hasError}
        {...getOverrideProps(overrides, "emoji")}
      ></TextField>
      <TextField
        label="Katschings"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={katschings}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              emoji,
              katschings: value,
              lastKatsching,
            };
            const result = onChange(modelFields);
            value = result?.katschings ?? value;
          }
          if (errors.katschings?.hasError) {
            runValidationTasks("katschings", value);
          }
          setKatschings(value);
        }}
        onBlur={() => runValidationTasks("katschings", katschings)}
        errorMessage={errors.katschings?.errorMessage}
        hasError={errors.katschings?.hasError}
        {...getOverrideProps(overrides, "katschings")}
      ></TextField>
      <TextField
        label="Last katsching"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={lastKatsching && convertToLocal(new Date(lastKatsching))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              emoji,
              katschings,
              lastKatsching: value,
            };
            const result = onChange(modelFields);
            value = result?.lastKatsching ?? value;
          }
          if (errors.lastKatsching?.hasError) {
            runValidationTasks("lastKatsching", value);
          }
          setLastKatsching(value);
        }}
        onBlur={() => runValidationTasks("lastKatsching", lastKatsching)}
        errorMessage={errors.lastKatsching?.errorMessage}
        hasError={errors.lastKatsching?.hasError}
        {...getOverrideProps(overrides, "lastKatsching")}
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
          isDisabled={!(idProp || playerModelProp)}
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
              !(idProp || playerModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
