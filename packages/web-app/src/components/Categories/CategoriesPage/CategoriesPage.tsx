import React from 'react';
import { useSelector } from 'react-redux';
import selectFilteredCategories, { selectCategoryCount } from '../../../state/selectors/categories';
import {
  resetCategoryFilters,
  setCategoryTextFilter,
  sortCategoriesBy,
} from '../../../state/slices/categoriesFilters';
import { RootState } from '../../../state/store';
import { CollectionFilters } from '../../Common/Filters/CollectionFilters';
import { Loader } from '../../Common/Misc/Loader';
import { ScrollablePage } from '../../Common/Misc/ScrollablePage';
import { SectionHeader } from '../../Common/Misc/SectionHeader';
import { Column } from '../../Common/Wrappers/Column';
import { List } from '../../Labels/List/List';

export const CategoriesPage = () => {
  document.title = 'Categories | Zaino';
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);
  const categories = useSelector((state: RootState) => selectFilteredCategories(state));
  const categoryCount = categories.length;
  const totalCategoryCount = useSelector((state: RootState) => selectCategoryCount(state));

  return (
    <ScrollablePage>
      <CollectionFilters
        setTextFilter={setCategoryTextFilter}
        sort={sortCategoriesBy}
        resetFilters={resetCategoryFilters}
        textFilterPlaceholder="Search categories"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <List>
          {/* header with name, count and New category button */}
          <SectionHeader className="section-header--large-margin">
            <Column>
              <SectionHeader.Title>Categories</SectionHeader.Title>
              <SectionHeader.Content>
                {categoryCount} categor{categoryCount === 1 ? 'y' : 'ies'}
              </SectionHeader.Content>
            </Column>
            {/* todo btn */}
            {/* <Button
              className="button--green labels-page__new-label"
              disabled={isFormOpen}
              onClick={toggleForm}
            >
              New category
            </Button> */}
          </SectionHeader>
          {/* new label form */}
          {/* todo new cat form */}
          {/* {isFormOpen && <NewLabel toggleForm={toggleForm} />} */}
          {/* list proper */}
          {categoryCount > 0 ? (
            // todo proper list
            categories.map(category => (
              <div key={category.id}>
                {category.name} -- {category.itemTotalCount} total -- {category.itemUniqueCount}{' '}
                unique
              </div>
            ))
          ) : (
            // todo empty list
            // <List.Empty className={isFormOpen ? 'list--empty--border' : ''}>{`No${
            //   labelCount === totalLabelCount ? '' : ' matching'
            // } labels`}</List.Empty>
            <div>No categories</div>
          )}
        </List>
      )}
    </ScrollablePage>
  );
};
