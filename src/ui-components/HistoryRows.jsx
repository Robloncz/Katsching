/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Icon, Text } from "@aws-amplify/ui-react";
export default function HistoryRows(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="column"
      width="956px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(239,240,240,1)"
      {...getOverrideProps(overrides, "HistoryRows")}
      {...rest}
    >
      <Flex
        gap="0"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="13px 1px 13px 1px"
        {...getOverrideProps(overrides, "Frame 15699")}
      >
        <Flex
          gap="0"
          direction="row"
          width="137px"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Time")}
        >
          <Text
            fontFamily="Inter"
            fontSize="24px"
            fontWeight="600"
            color="rgba(13,26,38,1)"
            lineHeight="36px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="85px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Uhrzeit"
            {...getOverrideProps(overrides, "Uhrzeit")}
          ></Text>
        </Flex>
        <Flex
          gap="6px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          grow="1"
          shrink="1"
          basis="0"
          alignSelf="stretch"
          position="relative"
          padding="15px 0px 15px 0px"
          {...getOverrideProps(overrides, "Text3852168")}
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
            children="Wicht hat von Vollstrecker "
            {...getOverrideProps(overrides, "Text3852169")}
          ></Text>
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
              children="69"
              {...getOverrideProps(overrides, "69")}
            ></Text>
          </Flex>
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
            children=" Katschings erhalten."
            {...getOverrideProps(overrides, "Text3852172")}
          ></Text>
        </Flex>
        <Flex
          gap="1px"
          direction="row"
          width="86px"
          height="unset"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="7px 0px 7px 0px"
          {...getOverrideProps(overrides, "Message circle")}
        >
          <Icon
            width="58.5px"
            height="58px"
            viewBox={{
              minX: 0,
              minY: 0,
              width: 58.500091552734375,
              height: 58,
            }}
            paths={[
              {
                d: "M58.5 27.3889L56.5 27.3889L56.5 27.3942L58.5 27.3889ZM55.575 39.6334L53.7929 38.7255L53.7891 38.7331L55.575 39.6334ZM30.875 54.7778L30.8742 52.7778L30.8698 52.7778L30.875 54.7778ZM18.525 51.8778L19.4205 50.0895C18.9475 49.8526 18.3998 49.8128 17.8974 49.9788L18.525 51.8778ZM0 58L-1.89573 57.3626C-2.13714 58.0807 -1.95214 58.8735 -1.41785 59.4106C-0.883564 59.9476 -0.0917047 60.1367 0.627583 59.899L0 58ZM6.175 39.6334L8.07073 40.2707C8.242 39.7613 8.20103 39.2044 7.95706 38.7255L6.175 39.6334ZM3.25 27.3889L5.25 27.3942L5.25 27.3897L3.25 27.3889ZM18.525 2.90009L19.413 4.69216L19.4205 4.68838L18.525 2.90009ZM30.875 9.17948e-05L30.8698 2.00009L30.875 2.00009L30.875 9.17948e-05ZM32.5 9.17948e-05L32.6092 -1.99692C32.5729 -1.99891 32.5364 -1.99991 32.5 -1.99991L32.5 9.17948e-05ZM58.5 25.7778L60.5 25.7778C60.5 25.7408 60.499 25.7037 60.4969 25.6667L58.5 25.7778ZM56.5 27.3942C56.5104 31.3292 55.5831 35.2116 53.7929 38.7255L57.3571 40.5412C59.4348 36.4628 60.512 31.9545 60.5 27.3837L56.5 27.3942ZM53.7891 38.7331C51.6641 42.9486 48.396 46.4968 44.3488 48.9782L46.4396 52.3883C51.1174 49.5202 54.8998 45.416 57.3609 40.5336L53.7891 38.7331ZM44.3488 48.9782C40.3015 51.4598 35.6357 52.776 30.8742 52.7778L30.8758 56.7778C36.3729 56.7757 41.762 55.2563 46.4396 52.3883L44.3488 48.9782ZM30.8698 52.7778C26.8924 52.7881 22.9694 51.8667 19.4205 50.0895L17.6294 53.6661C21.7384 55.7238 26.2785 56.7897 30.8802 56.7778L30.8698 52.7778ZM17.8974 49.9788L-0.627583 56.101L0.627583 59.899L19.1526 53.7768L17.8974 49.9788ZM1.89573 58.6374L8.07073 40.2707L4.27927 38.996L-1.89573 57.3626L1.89573 58.6374ZM7.95706 38.7255C6.16689 35.2116 5.23965 31.3292 5.24999 27.3942L1.25001 27.3837C1.23799 31.9545 2.31516 36.4628 4.39294 40.5412L7.95706 38.7255ZM5.25 27.3897C5.25184 22.6792 6.57635 18.061 9.07678 14.0523L5.68289 11.9354C2.78763 16.577 1.25213 21.9278 1.25 27.3882L5.25 27.3897ZM9.07678 14.0523C11.5773 10.0435 15.1557 6.80167 19.413 4.69215L17.637 1.10803C12.7179 3.54548 8.57805 7.29385 5.68289 11.9354L9.07678 14.0523ZM19.4205 4.68838C22.9694 2.91119 26.8924 1.9898 30.8698 2.00009L30.8802 -1.9999C26.2785 -2.0118 21.7384 -0.945901 17.6294 1.11179L19.4205 4.68838ZM30.875 2.00009L32.5 2.00009L32.5 -1.99991L30.875 -1.99991L30.875 2.00009ZM32.3908 1.99711C38.6782 2.34102 44.6137 4.9721 49.0616 9.38201L51.8778 6.54146C46.7311 1.43875 39.87 -1.59977 32.6092 -1.99692L32.3908 1.99711ZM49.0616 9.38201C53.5091 13.7915 56.157 19.6693 56.5031 25.8889L60.4969 25.6667C60.0956 18.4539 57.025 11.6446 51.8778 6.54146L49.0616 9.38201ZM56.5 25.7778L56.5 27.3889L60.5 27.3889L60.5 25.7778L56.5 25.7778Z",
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
            {...getOverrideProps(overrides, "Icon")}
          ></Icon>
        </Flex>
      </Flex>
    </Flex>
  );
}
