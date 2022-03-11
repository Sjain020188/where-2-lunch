import { Photo, RestaurantAPI, Tip } from '../Types/ApiData';
import axios from 'axios';

type Details = { data: { results: RestaurantAPI[] } };

const LATITUDE = '35.6646782%2C139.7378198';
const RADIUS = 1000;
const CATEGORIES = 13000;
const options = {
  headers: {
    Accept: 'application/json',
    Authorization: process.env.REACT_APP_FOURSQUARE_API_KEY || ''
  }
};

/**
 * This function is used to get list of restaurants with 1km radius of given longitude and latitude.
 *
 */
export function getRestaurantDetails(
  lat = LATITUDE,
  radius = RADIUS,
  categories = CATEGORIES
): Promise<Details> {
  return axios
    .get(
      `https://api.foursquare.com/v3/places/search?ll=${lat}&radius=${radius}&categories=${categories}`,
      options
    )
    .catch(() => {
      throw new Error('Error loading Details');
    });
}

/* -------------------------------------------------------------------------- */
/*                              Hook                                          */
/* -------------------------------------------------------------------------- */

/**
 * This function is used to get photos of given place.
 *
 */
export function getRestaurantPhotos(restaurantId: string): Promise<{ data: Photo[] }> {
  return axios
    .get(`https://api.foursquare.com/v3/places/${restaurantId}/photos`, options)
    .catch(() => {
      throw new Error('Error loading Photos');
    });
}

/**
 * This function is used to get tips of given place.
 *
 */
export function getRestaurantTips(restaurantId: string): Promise<{ data: Tip[] }> {
  return axios
    .get(`https://api.foursquare.com/v3/places/${restaurantId}/tips`, options)
    .catch(() => {
      throw new Error('Error loading Tips');
    });
}
