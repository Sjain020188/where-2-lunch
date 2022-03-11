import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { getRestaurantDetails, getRestaurantPhotos } from '../Services/Remote';

/* -------------------------------------------------------------------------- */
/*                              Hook                                          */
/* -------------------------------------------------------------------------- */

/**
 * This custom hook is used to get list of restaurants within 1km radius.
 *
 */
export function useRestaurants() {
  const [fetchState, setFetchState] = useState({ loading: true, error: '' });
  const dispatch = useDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurants);
  useEffect(() => {
    // NOTE:
    // If state already has restaurants data do not call the API again.
    // This is used for caching purpose to prevent unnecessary API calls.
    // We might want to reconsider this in actual app because we want updated data from API but its done here because Forusquare provides only limited free usage.
    if (!restaurants.length) {
      getRestaurantData()
        .then((data) => {
          dispatch({ type: 'ADD_RESTAURANTS', payload: data });
          setFetchState({ ...fetchState, loading: false });
        })
        .catch(() => {
          setFetchState({ loading: false, error: 'Error fetching Restaurants Data' });
        });
    } else {
      setFetchState({ ...fetchState, loading: false });
    }
  }, [restaurants]);

  return { ...fetchState, restaurants };
}

/* -------------------------------------------------------------------------- */
/*                              Utility functions                             */
/* -------------------------------------------------------------------------- */

export async function getRestaurantData() {
  const { data } = await getRestaurantDetails();
  const restaurantsData = [];
  for (const detail of data.results) {
    const photosData = await getRestaurantPhotos(detail.fsq_id);

    restaurantsData.push({ ...detail, photos: photosData.data });
  }

  return restaurantsData;
}
