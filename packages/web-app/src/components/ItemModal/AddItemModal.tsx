import { Item } from '@zaino/shared/';
import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Categories from '../../constants/Categories';
import { history } from '../../routers/AppRouter';
import { addItem } from '../../state/slices/items';
import { Button } from '../misc/Button';
import { CloseButton } from '../misc/CloseButton';
import ItemForm from './ItemForm';

export const AddItemModal = () => {
  const dispatch = useDispatch();

  const newItem: Item = {
    id: uuid(),
    name: '',
    categoryName: Categories[0].name,
    weight: '',
    quantity: 1,
    packQuantity: 0,
    addedAt: '',
  };

  const title = 'Add item';
  document.title = `${title} | Zaino`;
  Modal.setAppElement('#app');
  const closeModal = () => history.push('/dashboard');

  return (
    <Modal isOpen closeTimeoutMS={500} onRequestClose={closeModal} contentLabel={title}>
      <h2>
        {title}
        <CloseButton onClick={closeModal} />
      </h2>
      <ItemForm
        item={newItem}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(addItem(item));
        }}
      >
        <Button submit>Create item</Button>
      </ItemForm>
    </Modal>
  );
};

export default AddItemModal;
