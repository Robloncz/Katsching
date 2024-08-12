/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
import { KatschingRowsContentProps } from "./KatschingRowsContent";
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
export declare type KatschingTableOverridesProps = {
    KatschingTable?: PrimitiveOverrideProps<FlexProps>;
    "Frame 15704"?: PrimitiveOverrideProps<FlexProps>;
    "h-spieler"?: PrimitiveOverrideProps<FlexProps>;
    Spieler?: PrimitiveOverrideProps<TextProps>;
    "h-last-katsching"?: PrimitiveOverrideProps<FlexProps>;
    "Letzter Katsching"?: PrimitiveOverrideProps<TextProps>;
    "h-counter"?: PrimitiveOverrideProps<FlexProps>;
    Katschings?: PrimitiveOverrideProps<TextProps>;
    KatschingRowsContent3855147?: KatschingRowsContentProps;
    KatschingRowsContent3855774?: KatschingRowsContentProps;
} & EscapeHatchProps;
export declare type KatschingTableProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: KatschingTableOverridesProps | undefined | null;
}>;
export default function KatschingTable(props: KatschingTableProps): React.ReactElement;
