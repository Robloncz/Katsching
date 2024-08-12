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
export declare type CommentTableCreateFormInputValues = {
    Commenter?: string;
    Comment?: string;
};
export declare type CommentTableCreateFormValidationValues = {
    Commenter?: ValidationFunction<string>;
    Comment?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentTableCreateFormOverridesProps = {
    CommentTableCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Commenter?: PrimitiveOverrideProps<TextFieldProps>;
    Comment?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommentTableCreateFormProps = React.PropsWithChildren<{
    overrides?: CommentTableCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CommentTableCreateFormInputValues) => CommentTableCreateFormInputValues;
    onSuccess?: (fields: CommentTableCreateFormInputValues) => void;
    onError?: (fields: CommentTableCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommentTableCreateFormInputValues) => CommentTableCreateFormInputValues;
    onValidate?: CommentTableCreateFormValidationValues;
} & React.CSSProperties>;
export default function CommentTableCreateForm(props: CommentTableCreateFormProps): React.ReactElement;
