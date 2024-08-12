/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type HistoryTableCreateFormInputValues = {
    wicht?: string;
    vollstrecker?: string;
    numKatsching?: string;
    isCommented?: boolean;
    comments?: string[];
};
export declare type HistoryTableCreateFormValidationValues = {
    wicht?: ValidationFunction<string>;
    vollstrecker?: ValidationFunction<string>;
    numKatsching?: ValidationFunction<string>;
    isCommented?: ValidationFunction<boolean>;
    comments?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HistoryTableCreateFormOverridesProps = {
    HistoryTableCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    wicht?: PrimitiveOverrideProps<TextFieldProps>;
    vollstrecker?: PrimitiveOverrideProps<TextFieldProps>;
    numKatsching?: PrimitiveOverrideProps<TextFieldProps>;
    isCommented?: PrimitiveOverrideProps<SwitchFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HistoryTableCreateFormProps = React.PropsWithChildren<{
    overrides?: HistoryTableCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HistoryTableCreateFormInputValues) => HistoryTableCreateFormInputValues;
    onSuccess?: (fields: HistoryTableCreateFormInputValues) => void;
    onError?: (fields: HistoryTableCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HistoryTableCreateFormInputValues) => HistoryTableCreateFormInputValues;
    onValidate?: HistoryTableCreateFormValidationValues;
} & React.CSSProperties>;
export default function HistoryTableCreateForm(props: HistoryTableCreateFormProps): React.ReactElement;
