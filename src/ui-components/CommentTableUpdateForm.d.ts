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
export declare type CommentTableUpdateFormInputValues = {
    Commenter?: string;
    Comment?: string;
};
export declare type CommentTableUpdateFormValidationValues = {
    Commenter?: ValidationFunction<string>;
    Comment?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentTableUpdateFormOverridesProps = {
    CommentTableUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Commenter?: PrimitiveOverrideProps<TextFieldProps>;
    Comment?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommentTableUpdateFormProps = React.PropsWithChildren<{
    overrides?: CommentTableUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    commentTable?: any;
    onSubmit?: (fields: CommentTableUpdateFormInputValues) => CommentTableUpdateFormInputValues;
    onSuccess?: (fields: CommentTableUpdateFormInputValues) => void;
    onError?: (fields: CommentTableUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommentTableUpdateFormInputValues) => CommentTableUpdateFormInputValues;
    onValidate?: CommentTableUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CommentTableUpdateForm(props: CommentTableUpdateFormProps): React.ReactElement;
