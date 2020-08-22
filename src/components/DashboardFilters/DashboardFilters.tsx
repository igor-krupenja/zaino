import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setItemsCategoryFilter,
  setItemsLabelsFilter,
  setItemsTextFilter,
  sortItemsBy,
} from '../../state/slices/itemsFilters';
import { RootState } from '../../state/store';
import { Category, ItemSortOption } from '../../types/items';
import { LabelOption } from '../../types/labels';
import LabelSelect from '../common/LabelSelect';
import SortBySelect from '../common/SortBySelect';
import TextFilterInput from '../common/TextFilterInput';

const DashboardFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.itemsFilters));

  const allCategoryText = 'All';

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    // set filter to undefined to show all items if All option is chosen
    const category = e.target.value === allCategoryText ? undefined : (e.target.value as Category);
    setFilters({ ...filters, category });
    dispatch(setItemsCategoryFilter(category));
  };

  return (
    <section className="list-filters">
      <TextFilterInput
        onTextChange={text => {
          setFilters({ ...filters, text });
          dispatch(setItemsTextFilter(text));
        }}
        text={filters.text}
      />
      <label>
        Category
        <select name="category" value={filters.category} onChange={onCategoryChange}>
          <option value={allCategoryText}>{allCategoryText}</option>
          {Object.values(Category).map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <SortBySelect
        options={ItemSortOption}
        onSortChange={value => {
          const sortBy = value as ItemSortOption;
          setFilters({ ...filters, sortBy });
          dispatch(sortItemsBy(sortBy));
        }}
        sortBy={filters.sortBy}
      />
      <LabelSelect
        labelIds={filters.labels}
        onChange={newValues => {
          // set labels filter based on new values received from LabelSelect
          dispatch(
            setItemsLabelsFilter(
              newValues ? newValues.map((label: LabelOption) => label.value) : []
            )
          );
        }}
        isClearable
      />
    </section>
  );
};

export default DashboardFilters;