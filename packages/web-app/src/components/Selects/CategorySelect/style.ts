import { Styles } from 'react-select';
import styles from '../../../styles/base/_export.scss';
import { SelectOption } from '../SelectPopover';

export const categorySelectStyles: Partial<Styles<SelectOption, boolean>> = {
  // setting widths manually is a workaround to prevent control text overflow issues
  control: base => ({
    ...base,
    width: '16.8rem',
  }),
  menu: () => ({
    borderTop: styles.border,
    width: '18rem',
  }),
  input: base => ({
    ...base,
    width: '15rem',
  }),
};
