import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useToggle from '../../../hooks/useToggle';
import { sessionHistory } from '../../../routes/AppRouter';
import { logout } from '../../../state/slices/user';
import { RootState } from '../../../state/store';
import { Button } from '../../Controls/Button';
import { CloseButton } from '../../Controls/CloseButton';
import { Popover } from '../../Misc/Popover';
import './style.scss';

export const AccountDetails = () => {
  const { name, email, photoUrl } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());
  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      className="popover--wide"
      align="end"
      content={
        <>
          <Popover.Header>
            <Popover.Title>Account</Popover.Title>
            <CloseButton onClick={togglePopover} />
          </Popover.Header>
          <Popover.Content className="account-details__content">
            <img src={photoUrl} className="account-details__photo" />
            <div className="account-details__name">{name}</div>
            <div className="account-details__email">{email}</div>
            {/* render policy link if enabled in .env */}
            {process.env.PRIVACY_POLICY_ENABLED === 'true' && (
              <Link
                className="account-details__policies"
                to={{ pathname: '/privacy', state: { from: sessionHistory.location.pathname } }}
              >
                Privacy and cookie policy
              </Link>
            )}
            <Button className="button--grey account-details__sign-out" onClick={handleLogout}>
              Sign out
            </Button>
          </Popover.Content>
        </>
      }
    >
      <img
        src={photoUrl}
        onClick={togglePopover}
        className="account-details__photo account-details__photo--toggle"
      />
    </Popover>
  );
};
