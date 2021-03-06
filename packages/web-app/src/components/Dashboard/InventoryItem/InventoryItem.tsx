import { Item } from '@zaino/shared/';
import React from 'react';
import { useDispatch } from 'react-redux';
import BackpackIcon from '../../../images/icons/backpack.svg';
import { updateItem } from '../../../state/slices/items';
import { Button } from '../../Controls/Button';
import { ItemDetails } from '../ItemDetails/';
import './style.scss';

export const InventoryItem = (item: Item) => {
  const dispatch = useDispatch();

  const isInPack = item.packQuantity > 0;

  return (
    <ItemDetails item={item} quantity={item.quantity > 1 && <span>Quantity: {item.quantity}</span>}>
      <Button
        className="button--grey button--medium"
        disabled={isInPack}
        onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 1 }))}
      >
        <BackpackIcon
          className={`inventory-item__button-icon${
            isInPack ? ' inventory-item__button-icon__disabled' : ''
          }`}
        />
        {isInPack ? 'Already in pack' : 'Add to pack'}
      </Button>
    </ItemDetails>
  );
};
