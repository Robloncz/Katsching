/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, IconProps, TextProps } from "@aws-amplify/ui-react";
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
export declare type HistoryRowsOverridesProps = {
    "69"?: PrimitiveOverrideProps<TextProps>;
    HistoryRows?: PrimitiveOverrideProps<FlexProps>;
    "Frame 15699"?: PrimitiveOverrideProps<FlexProps>;
    Time?: PrimitiveOverrideProps<FlexProps>;
    Uhrzeit?: PrimitiveOverrideProps<TextProps>;
    Text3852168?: PrimitiveOverrideProps<FlexProps>;
    Text3852169?: PrimitiveOverrideProps<TextProps>;
    "Katsching Counter"?: PrimitiveOverrideProps<FlexProps>;
    Text3852172?: PrimitiveOverrideProps<TextProps>;
    "Message circle"?: PrimitiveOverrideProps<FlexProps>;
    Icon?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type HistoryRowsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: HistoryRowsOverridesProps | undefined | null;
}>;
export default function HistoryRows(props: HistoryRowsProps): React.ReactElement;
