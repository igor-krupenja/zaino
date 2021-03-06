import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import { isFirefox } from '../../../utils/isFirefox';
import { isMacOs } from '../../../utils/isMacOs';
import './style.scss';

type StackProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Compound component used to display stacks on the dashboard.
 * Consists of a stack wrapper component abd a list subcomponent.
 * Currently used by Inventory and Pack.
 */
export const Stack = ({ children, className }: StackProps) => {
  return (
    // wrapper div is used in order to achieve flexible list height
    <div className={getClassString('stack__wrapper', className)}>
      <section className="stack">{children}</section>
    </div>
  );
};

type ListProps = {
  children: ReactNode;
  isEmpty?: boolean;
};

/**
 * Component displaying actual item list with fancy scrollbar.
 * Used as a subcomponent along with Stack.
 */
const List = ({ children, isEmpty }: ListProps) => {
  return (
    <div
      className={
        'stack__list' +
        (isFirefox() && isMacOs() ? ' stack__list--firefox-mac' : '') +
        (isEmpty ? ' stack__list--empty' : '')
      }
    >
      {children}
    </div>
  );
};

Stack.List = List;
