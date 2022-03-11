import { Category, Restaurant } from '../Types/ApiData';

/**
 * This function is used to create the URL of retaurant photos base on suffix and prefix
 *
 * @params prefix: prefix string
 * @params suffix: suffix string
 *
 * @returns url of hotsted photo
 */
export function getphotoUrl(prefix?: string, suffix?: string) {
  return prefix && suffix ? `${prefix}original${suffix}` : '';
}

/**
 * This function is used to get random restarant from list of restaurants
 *
 * @params restaurants: List of restaurants
 *
 * @returns random restuarant
 */
export function getRecommendedRestaurant(restaurants: Restaurant[]) {
  const date = new Date();

  // NOTE: Using this formula based on date so that we get one single recommendation per day.
  return restaurants[
    (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) % restaurants.length
  ];
}

/**
 * This function resturans all valid categories of restaurants
 *
 * @param - list of restaurants
 *
 * @returns - all valid categories
 */
export function getValidTags(restaurants: Restaurant[]) {
  const tags: string[] = [];

  restaurants.forEach((restaurant) =>
    restaurant.categories.forEach((category: Category) => {
      if (!tags.includes(category.name)) {
        tags.push(category.name);
      }
    })
  );
  return tags;
}
