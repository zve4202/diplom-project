import { object } from "prop-types";
import React from "react";

// export interface IPropsGroupValue: React.
export interface IPropsGroup {
  name: string;
  value: [object, string];
}

export interface IPaymentValue {
  value: string;
  label: string;
}

export interface IPayments {
  cashInHand: IPaymentValue;
  payOnDelivery: IPaymentValue;
  sberbankReceipt: IPaymentValue;
  acquiring: IPaymentValue;
}

export const payments: IPayments = {
  cashInHand: { value: "Cash In Hand", label: "Наличными представителю" },
  payOnDelivery: { value: "Pay On Delivery", label: "Наложенный платеж" },
  sberbankReceipt: {
    value: "Sberbank Receipt",
    label: "Квитанция СБЕРБАНКа",
  },
  acquiring: { value: "Acquiring", label: "Банковской картой" },
};

export interface IDeliveryValue {
  value: string;
  label: string;
  payment: object;
}

export interface IDeliveries {
  byRussianPost: IDeliveryValue;
  byCompanySDEK: IDeliveryValue;
  byCourier: IDeliveryValue;
  onPickupPoint: IDeliveryValue;
}

export const deliveries: IDeliveries = {
  byRussianPost: {
    value: "Russian Post",
    label: "Посылка через (ПОЧТА РОССИИ)",
    payment: payments.payOnDelivery,
  },
  byCompanySDEK: {
    value: "Company SDEK",
    label: "Посылка через (СДЭК)",
    payment: payments.sberbankReceipt,
  },
  byCourier: {
    value: "By Courier",
    label: "Курьером по городу",
    payment: payments.cashInHand,
  },
  onPickupPoint: {
    value: "Pickup Point",
    label: "Пункт самовывоза",
    payment: payments.cashInHand,
  },
};

export const isRequired = "isRequired";
export const isEmail = "isEmail";
export const isCapitalSymbol = "isCapitalSymbol";
export const isContainDigit = "isContainDigit";
export const isLessThan = "min";
export const requiredIF = "requiredIF";

export enum ValidateMethod {
  isRequired,
  isEmail,
  isCapitalSymbol,
  isContainDigit,
  isLessThan,
  requiredIF,
}

export interface IDataField {
  title: string;
  value: string;
  component: () => {};
  placeholder: string;
  required: () => {};
  group: string;
  size: number;
}

export interface IData<IDataField> {
  [index: string]: IDataField;
}

export interface IMethodField {
  message: string;
  value?: number;
  inField?: string;
  values?: [];
}

export interface IConfigField<IMethodField> {
  [index: string]: IMethodField;
}

export interface IConfig<IConfigField> {
  [index: string]: IConfigField;
}

// export function validator(testData: IData<IDataField>, config: IConfig<IConfigField<IMethodField>>): object {
//     const errors = {};
//     console.log("needValidate validateMethod config, data:", config, testData);

//     function validate(
//         validateMethod: ValidateMethod,
//         data: string | number | boolean,
//         config: IConfigField<IMethodField>
//     ) {
//         let needValidate = false;
//         switch (validateMethod) {
//             case ValidateMethod.requiredIF: {
//                 if (Array.isArray(config.values)) {
//                     if (config.values.includes(testData[config.inField])) {
//                         if (typeof data === "boolean") {
//                             needValidate = !Boolean(data);
//                         } else {
//                             needValidate = String(data).trim() === "";
//                         }
//                     }
//                 }
//                 console.log(
//                     "needValidate validateMethod config, data:",
//                     needValidate,
//                     validateMethod,
//                     config,
//                     data
//                 );
//                 break;
//             }
//             case ValidateMethod.isRequired: {
//                 if (typeof data === "boolean") {
//                     needValidate = !Boolean(data);
//                 } else {
//                     needValidate = String(data).trim() === "";
//                 }

//                 break;
//             }
//             case ValidateMethod.isEmail: {
//                 const emailRegExp =
//                     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
//                 needValidate = !emailRegExp.test(String(data));
//                 break;
//             }
//             case ValidateMethod.isCapitalSymbol: {
//                 const capitalRegExp = /[A-ZА-Я]+/g;
//                 needValidate = !capitalRegExp.test(String(data));
//                 break;
//             }
//             case ValidateMethod.isContainDigit: {
//                 const digitRegExp = /\d+/g;
//                 needValidate = !digitRegExp.test(String(data));
//                 break;
//             }
//             case ValidateMethod.isLessThan: {
//                 needValidate = String(data).length < (config.value || 0);
//                 break;
//             }
//             default:
//                 break;
//         }
//         if (needValidate) return config.message;
//     }

//     for (const fieldName in testData) {
//         for (const validateMethod in config.(fieldName)) {
//             const error = validate(
//                 validateMethod,
//                 testData[fieldName],
//                 config[fieldName][validateMethod]
//             );
//             if (error && !errors[fieldName]) {
//                 errors[fieldName] = error;
//             }
//         }
//     }

//     return errors;
// }
