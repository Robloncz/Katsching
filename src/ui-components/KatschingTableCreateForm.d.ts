/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type KatschingTableCreateFormInputValues = {
    Player?: string;
    Emoji?: string;
    Katschings?: number;
};
export declare type KatschingTableCreateFormValidationValues = {
    Player?: ValidationFunction<string>;
    Emoji?: ValidationFunction<string>;
    Katschings?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KatschingTableCreateFormOverridesProps = {
    KatschingTableCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Player?: PrimitiveOverrideProps<TextFieldProps>;
    Emoji?: PrimitiveOverrideProps<TextFieldProps>;
    Katschings?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KatschingTableCreateFormProps = React.PropsWithChildren<{
    overrides?: KatschingTableCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: KatschingTableCreateFormInputValues) => KatschingTableCreateFormInputValues;
    onSuccess?: (fields: KatschingTableCreateFormInputValues) => void;
    onError?: (fields: KatschingTableCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KatschingTableCreateFormInputValues) => KatschingTableCreateFormInputValues;
    onValidate?: KatschingTableCreateFormValidationValues;
} & React.CSSProperties>;
export default function KatschingTableCreateForm(props: KatschingTableCreateFormProps): React.ReactElement;
