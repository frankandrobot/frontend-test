import React, { createContext, Component } from 'react';
import gql from 'graphql-tag';

export const SuperContext = createContext();

export class SuperProvider extends Component {
  state = {
    businessPerLoad: 20,
    onlyShowOpen: false,
    isPriceExpanded: false,
    isCategoryExpanded: false,
    queryOffset: 0,
    isPriceFiltered: () => this.state.priceFilters.some((price) => price.isFilter && price.label !== 'All'),
    isCategoryFiltered: () => this.state.categoryFilters.some((category) => category.isFilter && category.name !== 'All'),
    categoryFilterValue: () =>
      this.state.isCategoryFiltered()
        ? this.state.categoryFilters
            .filter((category) => category.isFilter && category.name !== 'All')
            .map((category) => category.alias)
            .join(',')
        : this.state.categoryFilters
            .filter((category) => category.name != 'All')
            .map((category) => category.alias)
            .join(','),
    priceFilterValue: () =>
      this.state.isPriceFiltered()
        ? this.state.priceFilters
            .filter((price) => price.isFilter && price.value !== '')
            .map((price) => price.value)
            .join(',')
        : '',
    // #region 'State update functions'
    // ! Since the spread operator is not a deep clone all updates need to map arrays back into the correct value
    // * Any update that modifies the GraphQL query also resets the query offset!
    updateShowOpen: () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          queryOffset: 0,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => ({ ...price })),
          onlyShowOpen: !prevState.onlyShowOpen,
        };
      });
    },
    updateIsPriceExpanded: ({ targetVal }) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => ({ ...price })),
          isPriceExpanded: typeof targetVal === 'undefined' ? !prevState.isPriceExpanded : targetVal,
        };
      });
    },
    updateIsCategoryExpanded: ({ targetVal }) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => ({ ...price })),
          isCategoryExpanded: typeof targetVal === 'undefined' ? !prevState.isCategoryExpanded : targetVal,
        };
      });
    },
    setQueryOffset: (shouldAdd = false) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => ({ ...price })),
          queryOffset: shouldAdd
            ? this.state.queryOffset + this.state.businessPerLoad
            : this.state.queryOffset - this.state.businessPerLoad,
        };
      });
    },
    toggleCategoryFilter: (filter) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          queryOffset: 0,
          priceFilters: prevState.priceFilters.map((price) => ({ ...price })),
          categoryFilters: prevState.categoryFilters.map((category) => {
            return filter.alias === category.alias ? { ...filter, isFilter: !filter.isFilter } : { ...category };
          }),
        };
      });
    },
    togglePriceFilter: (filter) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          queryOffset: 0,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => {
            return filter.value === price.value ? { ...filter, isFilter: !filter.isFilter } : { ...price };
          }),
        };
      });
    },
    clearFilters: () => {
      this.state.resetPriceFilters();
      this.state.resetCategoryFilters();
      this.setState((prevState) => {
        return {
          ...prevState,
          onlyShowOpen: false,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => ({ ...price })),
        };
      });
    },
    resetPriceFilters: () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          queryOffset: 0,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => {
            return { ...price, isFilter: false };
          }),
        };
      });
    },
    resetCategoryFilters: () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          queryOffset: 0,
          categoryFilters: prevState.categoryFilters.map((category) => ({ ...category })),
          priceFilters: prevState.priceFilters.map((price) => ({ ...price })),
          // * Rebuild the filter array by removing the updated filter and then toggling the `isFilter`. Then spread the filters into an updated array.
          // * Lots of spread operators, but the language/api handles most of the work.
          categoryFilters: prevState.categoryFilters.map((category) => {
            return { ...category, isFilter: false };
          }),
        };
      });
    },
    // #endregion 'State update functions'
    categoryFilters: [
      { alias: '', name: 'All', isFilter: false },
      { alias: 'tradamerican,newamerican', name: 'America', isFilter: false },
      { alias: 'italian', name: 'Italian', isFilter: false },
      { alias: 'seafood', name: 'Seafood', isFilter: false },
      { alias: 'steak', name: 'Steak', isFilter: false },
      { alias: 'japanese', name: 'Japanese', isFilter: false },
      { alias: 'mexican', name: 'Mexican', isFilter: false },
      { alias: 'thai', name: 'Thai', isFilter: false },
    ],
    priceFilters: [
      {
        value: '',
        label: 'All',
        isFilter: false,
      },
      {
        value: '1',
        label: '$',
        isFilter: false,
      },
      {
        value: '2',
        label: '$$',
        isFilter: false,
      },
      {
        value: '3',
        label: '$$$',
        isFilter: false,
      },
      {
        value: '4',
        label: '$$$$',
        isFilter: false,
      },
    ],
    // #region 'GraphQL Queries'
    // * Add the graphql queries used to clean up the views
    CATEGORY_QUERY: gql`
      query restaurantList($price: String!, $categories: String!, $openNow: Boolean, $limit: Int!, $offset: Int!) {
        search(
          location: "Las Vegas"
          categories: $categories
          price: $price
          open_now: $openNow
          limit: $limit
          offset: $offset
        ) {
          total
          business {
            id
            alias
            name
            rating
            price
            photos
            hours {
              is_open_now
            }
            categories {
              alias
              title
            }
          }
        }
      }
    `,
    DETAIL_QUERY: gql`
      query restaurantDetail($id: String!) {
        business(id: $id) {
          name
          rating
          categories {
            title
            alias
          }
          price
          hours {
            is_open_now
          }
          location {
            address1
            address2
            address3
            city
            state
            postal_code
            formatted_address
          }
          coordinates {
            latitude
            longitude
          }
          photos
          review_count
          reviews(limit: 3, offset: 0) {
            id
            rating
            text
            time_created
            url
            user {
              id
              image_url
              name
            }
          }
        }
      }
    `,
    // #endregion 'GraphQL Queries'
  };

  render() {
    return <SuperContext.Provider value={this.state}>{this.props.children}</SuperContext.Provider>;
  }
}

SuperProvider.Context = SuperContext;

export default SuperProvider;
