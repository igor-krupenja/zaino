import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type FormErrorProps = {
  children?: ReactNode;
  className?: string;
};

export const FormError = ({ className, children }: FormErrorProps) => {
  return <div className={getClassString('form-error', className)}>{children}</div>;
};
