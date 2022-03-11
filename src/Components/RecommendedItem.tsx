import React from 'react';
import { getphotoUrl } from '../Services/utils';
import { Restaurant } from '../Types/ApiData';
import RestaurantCard from './RestaurantCard';

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

type Props = {
  item?: Restaurant;
};

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render restaurant card for recommended restaurant
 *
 */
export function RecommendedItem({ item }: Props) {
  return (
    <React.Fragment>
      <h3>Here is the lunch recommendation for today</h3>
      {item ? (
        <RestaurantCard
          imgSrc={getphotoUrl(
            item.photos ? item.photos[0].prefix : undefined,
            item.photos ? item?.photos[0]?.suffix : undefined
          )}
          name={item.name}
          desc={item.location.formatted_address}
          id={item.fsq_id}
        />
      ) : (
        <p>No Recommendation for you</p>
      )}
    </React.Fragment>
  );
}
