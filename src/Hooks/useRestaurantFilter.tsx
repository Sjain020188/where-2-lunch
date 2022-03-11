import { useState } from 'react';
import { getValidTags } from '../Services/utils';
import { Restaurant } from '../Types/ApiData';
import { useRestaurants } from './useRestaurants';

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

type Query = { name: string; categories: string[] };

/* -------------------------------------------------------------------------- */
/*                              Hook                                          */
/* -------------------------------------------------------------------------- */

/**
 * This custom hook is used to filter restaurants based on search criteria (name and category)
 *
 */
export function useRestaurantFilter() {
  const [query, setQuery] = useState<Query>({
    name: '',
    categories: []
  });
  const { restaurants, loading, error } = useRestaurants();

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery({ ...query, name: event.target.value });
  }

  function handleTagSelect(tag: string) {
    if (query.categories.includes(tag)) {
      const newQueryCategories = query.categories.filter((item) => item !== tag);
      setQuery({ ...query, categories: [...newQueryCategories] });
    } else {
      setQuery({ ...query, categories: [...query.categories, tag] });
    }
  }

  return {
    filteredRestaurants: getFilteredList(restaurants, query),
    query,
    handleSearchInputChange,
    handleTagSelect,
    validTags: getValidTags(querByName(restaurants, query.name)),
    loading,
    error
  };
}

/* -------------------------------------------------------------------------- */
/*                              Utility                                       */
/* -------------------------------------------------------------------------- */

/**
 * This function is used to get filtered list of restaurants based on name and categories in query.
 *
 * @params restaurants - List of restaurants
 * @params query - Query to be used for filtering
 *
 * @returns Filtered list.
 */
function getFilteredList(restaurants: Restaurant[], query: Query) {
  const byName = querByName(restaurants, query.name);
  const byCategory = queryByCategory(restaurants, query.categories);
  return byName.filter((o1) => byCategory?.some((o2) => o1.fsq_id === o2.fsq_id));
}

/**
 * This function is used to get filtered list of restaurants based on name.
 *
 * @params restaurants - List of restaurants
 * @parmas name - Name to be used for filtering
 *
 * @returns Filtered list.
 */
function querByName(restaurants: Restaurant[], name: string) {
  if (name.length === 0) {
    return restaurants;
  }
  return restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(name.toLowerCase())
  );
}

/**
 * This function is used to get filtered list of restaurants based on categories.
 *
 * @params restaurants - List of restaurants
 * @parmas categories - Categories to be used for filtering
 *
 * @returns Filtered list.
 */
function queryByCategory(restaurants: Restaurant[], categories: string[]) {
  if (categories.length === 0) {
    return restaurants;
  }
  return restaurants.filter((restaurant) => {
    const restaurantCategories = restaurant.categories.map((category) => category.name);
    return restaurantCategories.some((category) => categories.includes(category));
  });
}
