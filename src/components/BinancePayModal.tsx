import React from 'react';
import { PaymentMethodModal, PaymentMethodModalProps } from './PaymentMethodModal';

export type BinancePayModalProps = PaymentMethodModalProps;

export const BinancePayModal: React.FC<BinancePayModalProps> = (props) => {
  return <PaymentMethodModal initialTab="binance_pay" {...props} />;
};

export { PaymentMethodModal };
