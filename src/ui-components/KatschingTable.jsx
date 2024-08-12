/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Text } from "@aws-amplify/ui-react";
import KatschingRowsContent from "./KatschingRowsContent";
export default function KatschingTable(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="1px"
      direction="column"
      width="509px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      padding="11px 20px 11px 20px"
      backgroundColor="rgba(220,222,224,1)"
      {...getOverrideProps(overrides, "KatschingTable")}
      {...rest}
    >
      <Flex
        gap="27px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 15704")}
      >
        <Flex
          gap="3px"
          direction="row"
          width="96.5px"
          height="unset"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 15px 0px 15px"
          backgroundColor="rgba(220,222,224,1)"
          {...getOverrideProps(overrides, "h-spieler")}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="700"
            color="rgba(13,26,38,1)"
            lineHeight="18px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            textDecoration="underline"
            width="95px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Spieler"
            {...getOverrideProps(overrides, "Spieler")}
          ></Text>
        </Flex>
        <Flex
          gap="1px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          overflow="hidden"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="0px 10px 0px 10px"
          backgroundColor="rgba(220,222,224,1)"
          {...getOverrideProps(overrides, "h-last-katsching")}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="600"
            color="rgba(13,26,38,1)"
            lineHeight="18px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            textDecoration="underline"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Letzter Katsching"
            {...getOverrideProps(overrides, "Letzter Katsching")}
          ></Text>
        </Flex>
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-end"
          alignItems="center"
          overflow="hidden"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="0px 30px 0px 0px"
          backgroundColor="rgba(220,222,224,1)"
          {...getOverrideProps(overrides, "h-counter")}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="600"
            color="rgba(13,26,38,1)"
            lineHeight="18px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            textDecoration="underline"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Katschings"
            {...getOverrideProps(overrides, "Katschings")}
          ></Text>
        </Flex>
      </Flex>
      <KatschingRowsContent
        display="flex"
        gap="20px"
        direction="row"
        width="unset"
        height="45px"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
        padding="3px 0px 3px 22px"
        backgroundColor="rgba(239,240,240,1)"
        {...getOverrideProps(overrides, "KatschingRowsContent3855147")}
      ></KatschingRowsContent>
      <KatschingRowsContent
        display="flex"
        gap="20px"
        direction="row"
        width="unset"
        height="45px"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
        padding="3px 0px 3px 22px"
        backgroundColor="rgba(239,240,240,1)"
        {...getOverrideProps(overrides, "KatschingRowsContent3855774")}
      ></KatschingRowsContent>
    </Flex>
  );
}
