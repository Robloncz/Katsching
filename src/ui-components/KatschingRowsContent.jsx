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
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
const client = generateClient();
export default function KatschingRowsContent(props) {
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
      gap="20px"
      direction="row"
      width="501px"
      height="54px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
      padding="3px 0px 3px 22px"
      backgroundColor="rgba(239,240,240,1)"
      {...getOverrideProps(overrides, "KatschingRowsContent")}
      {...rest}
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
        padding="29px 0px 29px 0px"
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
      <Flex
        gap="26px"
        direction="row"
        width="186px"
        height="100px"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="29px 0px 29px 0px"
        {...getOverrideProps(overrides, "LastKatsching")}
      >
        <Text
          fontFamily="Inter"
          fontSize="12px"
          fontWeight="500"
          color="rgba(13,26,38,1)"
          lineHeight="18px"
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
        gap="6px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 8px"
        {...getOverrideProps(overrides, "Frame 15700")}
      >
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          boxShadow="0px 3px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="7px"
          padding="0px 2px 0px 2px"
          backgroundColor="rgba(220,222,224,1)"
          {...getOverrideProps(overrides, "Katsching Counter")}
        >
          <Text
            fontFamily="Inter"
            fontSize="20px"
            fontWeight="600"
            color="rgba(13,26,38,1)"
            lineHeight="30px"
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
        <View
          width="50px"
          height="49px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Arrow up-circle")}
        >
          <Icon
            width="30px"
            height="30px"
            viewBox={{ minX: 0, minY: 0, width: 30, height: 30 }}
            paths={[
              {
                d: "M20.2929 15.7071C20.6834 16.0976 21.3166 16.0976 21.7071 15.7071C22.0976 15.3166 22.0976 14.6834 21.7071 14.2929L20.2929 15.7071ZM15 9L15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L15 9ZM8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L8.29289 14.2929ZM14 21C14 21.5523 14.4477 22 15 22C15.5523 22 16 21.5523 16 21L14 21ZM29 15C29 22.732 22.732 29 15 29L15 31C23.8366 31 31 23.8366 31 15L29 15ZM15 29C7.26801 29 1 22.732 1 15L-1 15C-1 23.8366 6.16344 31 15 31L15 29ZM1 15C1 7.26801 7.26801 1 15 1L15 -1C6.16344 -1 -1 6.16344 -1 15L1 15ZM15 1C22.732 1 29 7.26801 29 15L31 15C31 6.16344 23.8366 -1 15 -1L15 1ZM21.7071 14.2929L15.7071 8.29289L14.2929 9.70711L20.2929 15.7071L21.7071 14.2929ZM14.2929 8.29289L8.29289 14.2929L9.70711 15.7071L15.7071 9.70711L14.2929 8.29289ZM16 21L16 9L14 9L14 21L16 21Z",
                stroke: "rgba(137,148,159,1)",
                fillRule: "nonzero",
                strokeLinejoin: "round",
                strokeWidth: 2,
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="21.43%"
            bottom="17.35%"
            left="4%"
            right="36%"
            onClick={() => {
              iconOnClick();
            }}
            {...getOverrideProps(overrides, "Icon")}
          ></Icon>
        </View>
      </Flex>
    </Flex>
  );
}
