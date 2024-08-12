/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { generateClient } from "aws-amplify/api";
import { updateKatschingTable } from "../graphql/mutations";
import { getOverrideProps } from "./utils";
import { Flex, Icon, Text } from "@aws-amplify/ui-react";
const client = generateClient();
export default function KatschingRows(props) {
  const { katschingTable, overrides, ...rest } = props;
  const iconOnClick = async () => {
    await client.graphql({
      query: updateKatschingTable.replaceAll("__typename", ""),
      variables: {
        input: {
          id: katschingTable?.Katschings,
        },
      },
    });
  };
  return (
    <Flex
      gap="8px"
      direction="row"
      width="1000px"
      height="126px"
      justifyContent="flex-start"
      alignItems="center"
      overflow="hidden"
      position="relative"
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
      padding="0px 10px 0px 10px"
      backgroundColor="rgba(239,240,240,1)"
      {...getOverrideProps(overrides, "KatschingRows")}
      {...rest}
    >
      <Flex
        gap="-4px"
        direction="row"
        width="122px"
        height="unset"
        justifyContent="space-between"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Player")}
      >
        <Flex
          gap="30px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          padding="29px 29px 29px 29px"
          {...getOverrideProps(overrides, "PlayerName")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            color="rgba(13,26,38,1)"
            lineHeight="24px"
            textAlign="left"
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
            children="Player 🤓"
            {...getOverrideProps(overrides, "Player \uD83E\uDD13")}
          ></Text>
        </Flex>
      </Flex>
      <Flex
        gap="26px"
        direction="row"
        width="196px"
        height="100px"
        justifyContent="space-between"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="29px 29px 29px 25px"
        {...getOverrideProps(overrides, "LastKatsching")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="600"
          color="rgba(13,26,38,1)"
          lineHeight="24px"
          textAlign="left"
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
          children="Letzter Katsching"
          {...getOverrideProps(overrides, "Letzter Katsching")}
        ></Text>
      </Flex>
      <Flex
        gap="-26px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        borderRadius="20px"
        padding="28px 20px 28px 16px"
        {...getOverrideProps(overrides, "Padding")}
      ></Flex>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="5px 12px 5px 12px"
        {...getOverrideProps(overrides, "Arrow up-circle")}
      >
        <Icon
          width="45px"
          height="45px"
          viewBox={{ minX: 0, minY: 0, width: 45, height: 45 }}
          paths={[
            {
              d: "M30.0858 23.9142C30.8668 24.6953 32.1332 24.6953 32.9142 23.9142C33.6953 23.1332 33.6953 21.8668 32.9142 21.0858L30.0858 23.9142ZM22.5 13.5L23.9142 12.0858C23.1332 11.3047 21.8668 11.3047 21.0858 12.0858L22.5 13.5ZM12.0858 21.0858C11.3047 21.8668 11.3047 23.1332 12.0858 23.9142C12.8668 24.6953 14.1332 24.6953 14.9142 23.9142L12.0858 21.0858ZM20.5 31.5C20.5 32.6046 21.3954 33.5 22.5 33.5C23.6046 33.5 24.5 32.6046 24.5 31.5L20.5 31.5ZM43 22.5C43 33.8218 33.8218 43 22.5 43L22.5 47C36.031 47 47 36.031 47 22.5L43 22.5ZM22.5 43C11.1782 43 2 33.8218 2 22.5L-2 22.5C-2 36.031 8.96902 47 22.5 47L22.5 43ZM2 22.5C2 11.1782 11.1782 2 22.5 2L22.5 -2C8.96902 -2 -2 8.96902 -2 22.5L2 22.5ZM22.5 2C33.8218 2 43 11.1782 43 22.5L47 22.5C47 8.96902 36.031 -2 22.5 -2L22.5 2ZM32.9142 21.0858L23.9142 12.0858L21.0858 14.9142L30.0858 23.9142L32.9142 21.0858ZM21.0858 12.0858L12.0858 21.0858L14.9142 23.9142L23.9142 14.9142L21.0858 12.0858ZM24.5 31.5L24.5 13.5L20.5 13.5L20.5 31.5L24.5 31.5Z",
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
          shrink="0"
          position="relative"
          onClick={() => {
            iconOnClick();
          }}
          {...getOverrideProps(overrides, "Icon")}
        ></Icon>
      </Flex>
      <Flex
        gap="-43px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        shrink="0"
        position="relative"
        boxShadow="0px 3px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="7px"
        padding="0px 9px 0px 9px"
        backgroundColor="rgba(220,222,224,1)"
        {...getOverrideProps(overrides, "Katsching Counter")}
      >
        <Text
          fontFamily="Inter"
          fontSize="34px"
          fontWeight="600"
          color="rgba(13,26,38,1)"
          lineHeight="51px"
          textAlign="left"
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
          children="23"
          {...getOverrideProps(overrides, "23")}
        ></Text>
      </Flex>
    </Flex>
  );
}
