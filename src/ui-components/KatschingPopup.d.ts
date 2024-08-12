/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type KatschingPopupOverridesProps = {
    "2"?: PrimitiveOverrideProps<TextProps>;
    KatschingPopup?: PrimitiveOverrideProps<FlexProps>;
    KatschingDescription?: PrimitiveOverrideProps<TextProps>;
    KatschingChanger?: PrimitiveOverrideProps<FlexProps>;
    "Minus circle"?: PrimitiveOverrideProps<ViewProps>;
    Icon3851353?: PrimitiveOverrideProps<IconProps>;
    AddCounter?: PrimitiveOverrideProps<FlexProps>;
    "Plus circle"?: PrimitiveOverrideProps<ViewProps>;
    Icon3851355?: PrimitiveOverrideProps<IconProps>;
    "Frame 15697"?: PrimitiveOverrideProps<FlexProps>;
    "|"?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type KatschingPopupProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: KatschingPopupOverridesProps | undefined | null;
}>;
export default function KatschingPopup(props: KatschingPopupProps): React.ReactElement;
