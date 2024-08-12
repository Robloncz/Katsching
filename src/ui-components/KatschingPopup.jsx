/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function KatschingPopup(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="19px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="29px"
      padding="41px 41px 41px 41px"
      backgroundColor="rgba(188,236,245,1)"
      {...getOverrideProps(overrides, "KatschingPopup")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="700"
        color="rgba(48,64,80,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="278px"
        height="23px"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Gib die Anzahl der Katschings an."
        {...getOverrideProps(overrides, "KatschingDescription")}
      ></Text>
      <Flex
        gap="16px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="11px 8px 11px 8px"
        {...getOverrideProps(overrides, "KatschingChanger")}
      >
        <View
          width="48px"
          height="48px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Minus circle")}
        >
          <Icon
            width="40px"
            height="40px"
            viewBox={{ minX: 0, minY: 0, width: 40, height: 40 }}
            paths={[
              {
                d: "M12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22L12 18ZM28 22C29.1046 22 30 21.1046 30 20C30 18.8954 29.1046 18 28 18L28 22ZM38 20C38 29.9411 29.9411 38 20 38L20 42C32.1503 42 42 32.1503 42 20L38 20ZM20 38C10.0589 38 2 29.9411 2 20L-2 20C-2 32.1503 7.84974 42 20 42L20 38ZM2 20C2 10.0589 10.0589 2 20 2L20 -2C7.84974 -2 -2 7.84974 -2 20L2 20ZM20 2C29.9411 2 38 10.0589 38 20L42 20C42 7.84974 32.1503 -2 20 -2L20 2ZM12 22L28 22L28 18L12 18L12 22Z",
                stroke: "rgba(137,148,159,1)",
                fillRule: "nonzero",
                strokeLinejoin: "round",
                strokeWidth: 4,
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="8.33%"
            bottom="8.33%"
            left="8.33%"
            right="8.33%"
            {...getOverrideProps(overrides, "Icon3851353")}
          ></Icon>
        </View>
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="46px"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          shrink="0"
          position="relative"
          borderRadius="42px"
          padding="11px 37px 11px 37px"
          backgroundColor="rgba(239,240,240,1)"
          {...getOverrideProps(overrides, "AddCounter")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            color="rgba(0,0,0,1)"
            lineHeight="24px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="2"
            {...getOverrideProps(overrides, "2")}
          ></Text>
        </Flex>
        <View
          width="48px"
          height="48px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Plus circle")}
        >
          <Icon
            width="40px"
            height="40px"
            viewBox={{ minX: 0, minY: 0, width: 40, height: 40 }}
            paths={[
              {
                d: "M22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12L22 12ZM18 28C18 29.1046 18.8954 30 20 30C21.1046 30 22 29.1046 22 28L18 28ZM12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22L12 18ZM28 22C29.1046 22 30 21.1046 30 20C30 18.8954 29.1046 18 28 18L28 22ZM38 20C38 29.9411 29.9411 38 20 38L20 42C32.1503 42 42 32.1503 42 20L38 20ZM20 38C10.0589 38 2 29.9411 2 20L-2 20C-2 32.1503 7.84974 42 20 42L20 38ZM2 20C2 10.0589 10.0589 2 20 2L20 -2C7.84974 -2 -2 7.84974 -2 20L2 20ZM20 2C29.9411 2 38 10.0589 38 20L42 20C42 7.84974 32.1503 -2 20 -2L20 2ZM18 12L18 28L22 28L22 12L18 12ZM12 22L28 22L28 18L12 18L12 22Z",
                stroke: "rgba(137,148,159,1)",
                fillRule: "nonzero",
                strokeLinejoin: "round",
                strokeWidth: 4,
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="8.33%"
            bottom="8.33%"
            left="8.33%"
            right="8.33%"
            {...getOverrideProps(overrides, "Icon3851355")}
          ></Icon>
        </View>
      </Flex>
      <Flex
        gap="0"
        direction="row"
        width="248px"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        overflow="hidden"
        shrink="0"
        position="relative"
        borderRadius="5px"
        padding="5px 10px 5px 10px"
        backgroundColor="rgba(250,250,250,1)"
        {...getOverrideProps(overrides, "Frame 15697")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="600"
          color="rgba(0,0,0,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="145px"
          height="20px"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="|"
          {...getOverrideProps(overrides, "|")}
        ></Text>
      </Flex>
      <Button
        width="unset"
        height="unset"
        shrink="0"
        backgroundImage="linear-gradient(0deg, rgba(174,40,40,1), rgba(148,123,35,1), rgba(138,164,33,1), rgba(30,171,53,1), rgba(26,165,90,1), rgba(27,204,182,1), rgba(25,102,192,1), rgba(103,31,175,1), rgba(187,24,141,1), rgba(221,18,79,1), rgba(216,12,12,1))"
        size="default"
        isDisabled={false}
        variation="primary"
        children="Katsching!"
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </Flex>
  );
}
