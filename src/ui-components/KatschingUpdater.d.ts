/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
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
export declare type KatschingUpdaterInputValues = {};
export declare type KatschingUpdaterValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KatschingUpdaterOverridesProps = {
    KatschingUpdaterGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type KatschingUpdaterProps = React.PropsWithChildren<{
    overrides?: KatschingUpdaterOverridesProps | undefined | null;
} & {
    id?: string;
    katschingTable?: any;
    onSubmit?: (fields: KatschingUpdaterInputValues) => KatschingUpdaterInputValues;
    onSuccess?: (fields: KatschingUpdaterInputValues) => void;
    onError?: (fields: KatschingUpdaterInputValues, errorMessage: string) => void;
    onChange?: (fields: KatschingUpdaterInputValues) => KatschingUpdaterInputValues;
    onValidate?: KatschingUpdaterValidationValues;
} & React.CSSProperties>;
export default function KatschingUpdater(props: KatschingUpdaterProps): React.ReactElement;
