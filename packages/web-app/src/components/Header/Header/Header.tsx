import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import DashboardIcon from '../../../images/icons/dashboard.svg';
import LabelIcon from '../../../images/icons/label.svg';
import { history } from '../../../routes/AppRouter';
import { setIsLoading } from '../../../state/slices/dataLoader';
import { LabelSortOption, sortLabelsBy } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { AccountDetails } from '../AccountDetails';
import { DemoData } from '../DemoData';
import './style.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  const labelSortOption = useSelector((state: RootState) => state.labelsFilters.sortBy);

  return (
    // container div to properly style header
    <div className="header__container">
      <header className="header">
        <h1>
          <Link to="/dashboard" className="header__title">
            Zaino
          </Link>
        </h1>
        <nav className="header__nav">
          <div
            // to="/dashboard"
            className="button button--underline header__nav__link"
            // activeClassName="button--underline--active"
            onClick={() => {
              dispatch(setIsLoading(true));
              console.log('set is loading');
              setTimeout(() => history.push('/dashboard'), 10);
              console.log('switch page');
              // dispatch(setIsLoading(true));
            }}
          >
            <DashboardIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Dashboard</span>
          </div>
          <NavLink
            to="/labels"
            // re-sort labels by name after in-place edit and switching back to Labels page
            // see slices/labels for more details
            onClick={() =>
              labelSortOption === LabelSortOption.lastSortOrder &&
              dispatch(sortLabelsBy(LabelSortOption.name))
            }
            className="button button--underline header__nav__link"
            activeClassName="button--underline--active"
          >
            <LabelIcon className="header__nav__link__icon" />
            <span className="header__nav__link__text">Labels</span>
          </NavLink>
        </nav>
        <DemoData />
        <AccountDetails />
      </header>
    </div>
  );
};
