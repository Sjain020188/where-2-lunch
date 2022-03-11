import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRestaurantTips } from '../Services/Remote';
import { Tip } from '../Types/ApiData';
import { useRestaurants } from './useRestaurants';

type State = {
  tips: Tip[];
  loading: boolean;
  error: string;
};

/* -------------------------------------------------------------------------- */
/*                              Hook                                          */
/* -------------------------------------------------------------------------- */

/**
 * This custom hook is used to get list of restaurants within 1km radius.
 *
 */
export function useRestaurantTips(id?: string) {
  const [data, setData] = useState<State>({ tips: [], loading: true, error: '' });
  const dispatch = useDispatch();
  const { restaurants } = useRestaurants();
  useEffect(() => {
    // NOTE:
    // If state already has restaurant tips data do not call the API again.
    // This is used for caching purpose to prevent unnecessary API calls.
    // We might want to reconsider this in actual app because we want updated data from API but its done here because Forusquare provides only limited free usage.
    if (id) {
      const restaurantToBeUpdated = restaurants.find((restaurant) => restaurant.fsq_id === id);
      if (restaurantToBeUpdated) {
        if (!restaurantToBeUpdated.tips) {
          getRestaurantTips(id)
            .then((tips) => {
              dispatch({
                type: 'ADD_TIP',
                payload: {
                  id,
                  tips: tips.data
                }
              });
              setData({ ...data, tips: data.tips, loading: false });
            })
            .catch(() => {
              setData({ ...data, loading: false, error: 'Error Fetching Tips Data' });
            });
        } else {
          setData({ ...data, tips: restaurantToBeUpdated.tips, loading: false });
        }
      } else {
        setData({ ...data, loading: false, error: 'Could not find restaurant' });
      }
    }
  }, [id, data.tips, data.loading]);

  return data;
}
