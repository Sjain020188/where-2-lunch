import { useState, useEffect } from 'react';
import { getRecommendedRestaurant } from '../Services/utils';
import { Restaurant } from '../Types/ApiData';
import { useRestaurants } from './useRestaurants';

/* -------------------------------------------------------------------------- */
/*                              Hook                                          */
/* -------------------------------------------------------------------------- */

/**
 * This custom hook is used to get the recommended restaurant from list of restaurants.
 *
 */
export function useRestaurantRecommendation() {
  const [recommended, setRecommended] = useState<Restaurant>();
  const { restaurants, loading, error } = useRestaurants();

  useEffect(() => {
    if (restaurants.length) {
      setRecommended(getRecommendedRestaurant(restaurants));
    }
  }, [restaurants]);

  return { recommended, loading, error };
}
