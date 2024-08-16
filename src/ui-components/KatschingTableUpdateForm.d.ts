/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { KatschingTable } from "../models";
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
export declare type KatschingTableUpdateFormInputValues = {
    Player?: string;
    Emoji?: string;
    Katschings?: number;
};
export declare type KatschingTableUpdateFormValidationValues = {
    Player?: ValidationFunction<string>;
    Emoji?: ValidationFunction<string>;
    Katschings?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KatschingTableUpdateFormOverridesProps = {
    KatschingTableUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Player?: PrimitiveOverrideProps<TextFieldProps>;
    Emoji?: PrimitiveOverrideProps<TextFieldProps>;
    Katschings?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KatschingTableUpdateFormProps = React.PropsWithChildren<{
    overrides?: KatschingTableUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    katschingTable?: KatschingTable;
    onSubmit?: (fields: KatschingTableUpdateFormInputValues) => KatschingTableUpdateFormInputValues;
    onSuccess?: (fields: KatschingTableUpdateFormInputValues) => void;
    onError?: (fields: KatschingTableUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KatschingTableUpdateFormInputValues) => KatschingTableUpdateFormInputValues;
    onValidate?: KatschingTableUpdateFormValidationValues;
} & React.CSSProperties>;
export default function KatschingTableUpdateForm(props: KatschingTableUpdateFormProps): React.ReactElement;
