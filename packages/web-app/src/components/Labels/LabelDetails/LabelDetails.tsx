import { Label } from '@zaino/shared/';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useToggle from '../../../hooks/useToggle';
import { sessionHistory } from '../../../routes/AppRouter';
import { resetItemFilters } from '../../../state/slices/itemsFilters';
import { deleteLabel, updateLabel } from '../../../state/slices/labels';
import { Button } from '../../Controls/Button';
import { CloseButton } from '../../Controls/CloseButton';
import { LabelBadge } from '../../LabelBadge/LabelBadge';
import { Popover } from '../../Misc/Popover';
import { RowWrapper } from '../../Wrappers/RowWrapper';
import { LabelForm } from '../LabelForm';
import './style.scss';

export const LabelDetails = (label: Label) => {
  const dispatch = useDispatch();
  const [isFormOpen, toggleForm] = useToggle();
  const [name, setName] = useState(label.name);
  const [colorName, setColorName] = useState(label.colorName);
  const itemTotalCount = label.itemTotalCount;
  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <article className="label-details" key={label.id}>
      <RowWrapper className="label-details__main">
        <div className="label-details__badge__container">
          <LabelBadge
            className="label-details__badge"
            // disable actions on label badge click if form is open
            disabled={isFormOpen}
            colorName={colorName}
            label={label}
            onClick={() => {
              dispatch(resetItemFilters());
              sessionHistory.push('./dashboard');
            }}
            // show live label name preview (as user is typing) if form is open
          >
            {isFormOpen ? (name.trim() ? name : 'Label preview') : undefined}
          </LabelBadge>
        </div>
        {/* item count */}
        {itemTotalCount ? (
          <div
            className={`label-details__count${
              isFormOpen ? ' label-details__count--form-open' : ''
            }`}
          >
            {itemTotalCount} item{itemTotalCount > 1 && 's'} ({label.itemUniqueCount} unique)
          </div>
        ) : null}
        {!isFormOpen && (
          <Button className="button--white label-details__edit" onClick={toggleForm}>
            Edit
          </Button>
        )}
      </RowWrapper>
      {isFormOpen && (
        <LabelForm
          label={label}
          onSubmit={label => dispatch(updateLabel(label))}
          toggleForm={toggleForm}
          setLabelBadgeText={setName}
          setLabelBadgeColor={setColorName}
        >
          {/* delete button with popover */}
          <Popover
            isOpen={isPopoverOpen}
            onClickOutside={togglePopover}
            className="popover--wide"
            content={
              <>
                <Popover.Header>
                  <Popover.Title>Delete label?</Popover.Title>
                  <CloseButton onClick={togglePopover} />
                </Popover.Header>
                <Popover.Content>
                  <Popover.Text>
                    Deleting a label will remove it from all items. There is no undo.
                  </Popover.Text>
                  <Button
                    className="button--red"
                    onClick={() => label && dispatch(deleteLabel(label.id))}
                  >
                    Delete
                  </Button>
                </Popover.Content>
              </>
            }
          >
            <Button className="button--red label-details__delete" onClick={togglePopover}>
              Delete
            </Button>
          </Popover>
          {/* save changes button */}
          <Button submit className="button--green label-details__save">
            Save changes
          </Button>
        </LabelForm>
      )}
    </article>
  );
};
