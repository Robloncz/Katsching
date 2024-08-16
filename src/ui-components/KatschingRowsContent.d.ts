/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { KatschingTable } from "../models";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KatschingRowsContentOverridesProps = {
    "23"?: PrimitiveOverrideProps<TextProps>;
    KatschingRowsContent?: PrimitiveOverrideProps<FlexProps>;
    PlayerName?: PrimitiveOverrideProps<FlexProps>;
    "Player \uD83E\uDD13"?: PrimitiveOverrideProps<TextProps>;
    LastKatsching?: PrimitiveOverrideProps<FlexProps>;
    "Letzter Katsching"?: PrimitiveOverrideProps<TextProps>;
    "Frame 15700"?: PrimitiveOverrideProps<FlexProps>;
    "Katsching Counter"?: PrimitiveOverrideProps<FlexProps>;
    "Arrow up-circle"?: PrimitiveOverrideProps<ViewProps>;
    Icon?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type KatschingRowsContentProps = React.PropsWithChildren<Partial<FlexProps> & {
    katschingTable?: KatschingTable;
} & {
    overrides?: KatschingRowsContentOverridesProps | undefined | null;
}>;
export default function KatschingRowsContent(props: KatschingRowsContentProps): React.ReactElement;
