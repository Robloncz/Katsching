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
export declare type KatschingRowsOverridesProps = {
    "23"?: PrimitiveOverrideProps<TextProps>;
    KatschingRows?: PrimitiveOverrideProps<FlexProps>;
    Player?: PrimitiveOverrideProps<FlexProps>;
    PlayerName?: PrimitiveOverrideProps<FlexProps>;
    "Player \uD83E\uDD13"?: PrimitiveOverrideProps<TextProps>;
    LastKatsching?: PrimitiveOverrideProps<FlexProps>;
    "Letzter Katsching"?: PrimitiveOverrideProps<TextProps>;
    Padding?: PrimitiveOverrideProps<FlexProps>;
    "Arrow up-circle"?: PrimitiveOverrideProps<FlexProps>;
    Icon?: PrimitiveOverrideProps<IconProps>;
    "Katsching Counter"?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type KatschingRowsProps = React.PropsWithChildren<Partial<FlexProps> & {
    katschingTable?: any;
} & {
    overrides?: KatschingRowsOverridesProps | undefined | null;
}>;
export default function KatschingRows(props: KatschingRowsProps): React.ReactElement;
