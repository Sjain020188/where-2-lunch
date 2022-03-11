import { Chip, Grid, TextField } from '@mui/material';
import React from 'react';

import { Restaurant } from '../Types/ApiData';
import RestaurantCard from './RestaurantCard';
import styled from 'styled-components';
import { getphotoUrl } from '../Services/utils';
import { useRestaurantFilter } from '../Hooks/useRestaurantFilter';
import { Loading } from './Loading';
import { Error } from './Error';

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render restaurant search area
 *
 */
export function RestaurantSearch() {
  const {
    query,
    filteredRestaurants,
    handleSearchInputChange,
    handleTagSelect,
    validTags,
    loading,
    error
  } = useRestaurantFilter();

  if (loading) {
    return <Loading />;
  }

  if (error.length > 0) {
    return <Error msg={error} />;
  }

  return (
    <React.Fragment>
      {/* NOTE: Currently it search only the name of restaurant. It would be nice to search other fields as well. */}
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={handleSearchInputChange}
      />
      {/* NOTE: tags are much more user friendly */}
      <S.Div>
        {validTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagSelect(tag)}
            variant={query.categories.includes(tag) ? 'filled' : 'outlined'}
            color={'primary'}
            sx={{ m: 1 }}
          />
        ))}
      </S.Div>
      <Grid container spacing={4}>
        {filteredRestaurants.length ? (
          filteredRestaurants.map((item: Restaurant, index: number) => {
            return (
              <RestaurantCard
                key={index}
                imgSrc={getphotoUrl(
                  item.photos ? item.photos[0].prefix : undefined,
                  item.photos ? item.photos[0].suffix : undefined
                )}
                name={item.name}
                desc={item.location.formatted_address}
                id={item.fsq_id}
              />
            );
          })
        ) : (
          <p>No Restaurant match the search criteria.</p>
        )}
      </Grid>
    </React.Fragment>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

export const S = {
  Div: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px;
  `
};
