import {
  ETransactionPaymentType,
  ETransactionSourceType,
  ETransactionStatus,
} from '@common';

export interface TransactionProps {
  _id: string;
  billIdentityCode: string;
  idDotThu: null;
  userSsoId: string;
  userFullname: string;
  userCode: string;
  userAddress: null;
  userEmail: string;
  userDOB: null;
  userPhone: null;
  userMetadata: null;
  identityCode: string;
  fromAccount: string;
  toAccount: ETransactionSourceType;
  type: string;
  paymentType: ETransactionPaymentType;
  status: ETransactionStatus;
  amount: number;
  amountDiscount: number;
  amountPaid: null;
  transactionId: null;
  transactionDate: null;
  requestId: null;
  requestData: null;
  responseData: null;
  identityCodeIn: null;
  manualUserCode: null;
  manualUserSsoId: null;
  manualUserFullname: null;
  manualUserPhone: null;
  manualUserEmail: null;
  fullBill: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillItemProps {
  _id: string;
  ten: string;
  tenKhoanThu: string;
  heSo: number;
  unitAmount: number;
  unitLabel: string;
  quantity: number;
  amountDiscount: number;
  amountDue: number;
  amountPaid: number;
  amountRemaining: number;
  status: string;
  callbackUrl: null;
  externalId: null;
  createdAt: Date;
  updatedAt: Date;
  billIdentityCode: string;
  maNguonThu: string;
  maKhoanThu: string;
  maMucthu: null;
}
