import { Item } from '@zaino/shared/';
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decrementItemCount, incrementItemCount } from '../../state/slices/labels';
import getArrayDifference from '../../utils/getArrayDifference';
import { Input } from '../Input/';
import { CategoryImage } from '../misc/CategoryImage';
import { TextArea } from '../misc/TextArea';
import { CategorySelect } from '../Selects/CategorySelect/';
import { LabelSelect } from '../Selects/LabelSelect/LabelSelect';

type ItemFormProps = {
  item: Item;
  onSubmit: (item: Item) => void;
  setTitle?: (title: string) => void;
  children: ReactNode;
};

const ItemForm = ({ item, onSubmit, setTitle, children }: ItemFormProps) => {
  const [values, setValues] = useState(item);
  const [errors, setErrors] = useState({ name: '', weight: '', quantity: '' });
  // used in onFormSubmit to set label item counts
  const initialLabelIds = useRef(values.labelIds).current;
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.persist();
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    // set modal title if editing item
    if (propertyName === 'name' && setTitle) setTitle(propertyValue);
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
    if (!values.name) {
      errors.name = 'Please enter a name';
      isFormValid = false;
    }
    if (values.quantity < 1) {
      errors.quantity = 'Please enter a positive quantity';
      isFormValid = false;
    }
    setErrors(errors);

    return isFormValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <>
      <form onSubmit={handleSubmit}>
        <Input
          title="Name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoFocus
        />
        <CategoryImage categoryName={values.categoryName} />
        <Input
          title="Weight (grams)"
          name="weight"
          value={values.weight}
          onChange={e => handleChange(e)}
          error={errors.weight}
        />
        <Input
          title="Quantity"
          value={values.quantity}
          onChange={e => handleChange(e)}
          error={errors.quantity}
        />
        <TextArea title="Notes" name="notes" value={values.notes} onChange={handleChange} />
        <LabelSelect
          labelIds={values.labelIds}
          headerText="Select labels"
          isCreatable
          onChange={labelIds => setValues({ ...values, labelIds })}
        />
        <CategorySelect
          selectedCategoryName={values.categoryName}
          headerText="Select category"
          onChange={categoryName => setValues({ ...values, categoryName })}
        />
        {children}
      </form>
      {/* labels and categories moved outside of form as toggling them was broken inside */}
    </>
  );
};

export default ItemForm;
