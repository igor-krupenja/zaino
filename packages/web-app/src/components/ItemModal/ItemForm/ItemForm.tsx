import { Item } from '@zaino/shared/';
import React, { ChangeEvent, FormEvent, ReactNode, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decrementItemCount, incrementItemCount } from '../../../state/slices/labels';
import { getArrayDifference } from '../../../utils/getArrayDifference';
import { ExpandingInput } from '../../Controls/ExpandingInput';
import { FormError } from '../../Controls/FormError';
import { FormLabel } from '../../Controls/FormLabel';
import { Input } from '../../Controls/Input';
import { TextArea } from '../../Controls/TextArea';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { CategoryPicker } from '../CategoryPicker';
import { LabelPicker } from '../LabelPicker';
import './style.scss';

type ItemFormProps = {
  item: Item;
  onSubmit: (item: Item) => void;
  setTitle?: (title: string) => void;
  children: ReactNode;
};

export const ItemForm = ({ item, onSubmit, setTitle, children }: ItemFormProps) => {
  const [values, setValues] = useState(item);
  const [errors, setErrors] = useState({ name: '', weight: '', quantity: '' });
  // used in onFormSubmit to set label item counts
  const initialLabelIds = useRef(values.labelIds).current;
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    // set modal title if editing item
    if (setTitle && propertyName === 'name') setTitle(propertyValue);
    // only allow numbers or empty string
    if (
      (propertyName === 'quantity' || propertyName === 'weight') &&
      !propertyValue.match(/^[0-9]+$|^$/g)
    ) {
      return;
    }
    setValues({ ...values, [propertyName]: propertyValue });
  };

  const validateForm = () => {
    let isFormValid = true;
    const errors = { name: '', weight: '', quantity: '' };
    if (!values.name.trim()) {
      errors.name = 'Name cannot be blank';
      isFormValid = false;
    }
    if (values.quantity < 1) {
      errors.quantity = 'Quantity cannot be zero';
      isFormValid = false;
    }
    // note that 0g weight is allowed to account for items <0.5g (e.g. micro SD cards)
    setErrors(errors);

    return isFormValid;
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();

    if (validateForm()) {
      // update item counts for labels
      const newLabelIds = values.labelIds;
      const addedLabelIds = getArrayDifference(newLabelIds, initialLabelIds);
      addedLabelIds?.forEach(label =>
        dispatch(incrementItemCount({ labelId: label, itemQuantity: values.quantity }))
      );
      const removedLabelIds = getArrayDifference(initialLabelIds, newLabelIds);
      removedLabelIds?.forEach(label =>
        dispatch(decrementItemCount({ labelId: label, itemQuantity: values.quantity }))
      );

      onSubmit({
        ...values,
        // preserve empty string for weight
        weight: values.weight === '' ? '' : Number(values.weight),
        // do not overwrite addedAt when editing item
        addedAt: values.addedAt || new Date().toISOString(),
        // convert to number
        quantity: Number(values.quantity),
        // lower pack quantity if it exceeds new quantity
        packQuantity: values.packQuantity > values.quantity ? values.quantity : values.packQuantity,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      {/* Name */}
      <ColumnWrapper className="item-form__full-width">
        <FormLabel htmlFor="name">Name</FormLabel>
        <ExpandingInput
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          onSubmit={handleSubmit}
          clearError={() => setErrors({ ...errors, name: '' })}
        />
        {errors.name && <FormError>{errors.name}</FormError>}
      </ColumnWrapper>
      {/* Quantity */}
      <ColumnWrapper>
        <FormLabel htmlFor="quantity">Quantity</FormLabel>
        <Input
          name="quantity"
          value={values.quantity}
          onChange={e => handleChange(e)}
          error={errors.quantity}
          maxLength={3}
          clearError={e => {
            // clear error only if user enters positive quantity (not '', '0' or e.g. '000')
            Number(e?.target.value) > 0 && setErrors({ ...errors, quantity: '' });
          }}
        />
        {errors.quantity && <FormError>{errors.quantity}</FormError>}
      </ColumnWrapper>
      {/* Weight */}
      <ColumnWrapper>
        <FormLabel htmlFor="weight">Weight (grams)</FormLabel>
        <Input
          name="weight"
          value={values.weight}
          onChange={e => handleChange(e)}
          error={errors.weight}
          maxLength={5}
        />
      </ColumnWrapper>
      {/* Category */}
      <CategoryPicker
        categoryName={values.categoryName}
        onChange={categoryName => setValues({ ...values, categoryName })}
      />
      {/* Labels */}
      <LabelPicker
        labelIds={values.labelIds}
        onChange={labelIds => setValues({ ...values, labelIds })}
      />
      {/* Notes */}
      <ColumnWrapper className="item-form__full-width item-form__notes">
        <FormLabel htmlFor="notes">Notes</FormLabel>
        <TextArea name="notes" value={values.notes} onChange={handleChange} />
      </ColumnWrapper>
      {/* Buttons */}
      {children}
    </form>
  );
};
