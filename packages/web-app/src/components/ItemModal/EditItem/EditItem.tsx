import { Item } from '@zaino/shared/';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useToggle from '../../../hooks/useToggle';
import { deleteItem, updateItem } from '../../../state/slices/items';
import { closeModal } from '../../../utils/closeModal';
import { Button } from '../../Controls/Button';
import { CloseButton } from '../../Controls/CloseButton';
import { Corkscrew } from '../../Misc/Corkscrew';
import { Popover } from '../../Misc/Popover';
import { SectionHeader } from '../../Misc/SectionHeader';
import { ItemForm } from '../ItemForm/';
import { Modal } from '../Modal';
import './style.scss';

export const EditItem = ({ item }: { item: Item }) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, togglePopover] = useToggle();
  const [title, setTitle] = useState(item.name);

  document.title = `${title ? title : 'No name'} | Zaino`;

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel={title}>
      {/* header */}
      <SectionHeader>
        <SectionHeader.Title className={title.trim() ? '' : 'edit-item__header--grey'}>
          {!title.trim() ? 'No name' : title === 'CORKSCREW' ? <Corkscrew /> : title}
        </SectionHeader.Title>
        <CloseButton className="close-button--large" onClick={closeModal} />
      </SectionHeader>
      {/* item form */}
      <ItemForm
        item={item}
        onSubmit={(item: Item) => {
          closeModal();
          dispatch(updateItem({ ...item }));
        }}
        setTitle={setTitle}
      >
        {/* delete button with popover */}
        <Popover
          isOpen={isPopoverOpen}
          onClickOutside={togglePopover}
          className="popover--wide"
          align="center"
          content={
            <>
              <Popover.Header>
                <Popover.Title>Delete item?</Popover.Title>
                <CloseButton onClick={togglePopover} />
              </Popover.Header>
              <Popover.Content>
                <Popover.Text>
                  The item will be deleted from inventory
                  {item.packQuantity > 0 ? ' and pack' : ''}. There is no undo.
                </Popover.Text>
                <Button
                  className="button--red"
                  onClick={() => {
                    closeModal();
                    dispatch(deleteItem(item));
                  }}
                >
                  Delete
                </Button>
              </Popover.Content>
            </>
          }
        >
          <Button
            className="button--red item-form__half-width edit-item__button-left"
            onClick={togglePopover}
          >
            Delete
          </Button>
        </Popover>
        {/* Save/submit button */}
        <Button className="button--green item-form__half-width edit-item__button-right" submit>
          Save changes
        </Button>
      </ItemForm>
    </Modal>
  );
};
