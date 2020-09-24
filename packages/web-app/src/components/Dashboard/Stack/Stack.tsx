import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type StackProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Component used to apply styles.
 */
export const Stack = ({ children, className }: StackProps) => {
  return (
    <div className={`stack__wrapper${getClassString(className)}`}>
      <section className="stack">{children}</section>
    </div>
  );
};
