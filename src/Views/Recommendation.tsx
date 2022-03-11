import { useState } from 'react';
import styled from 'styled-components';
import { RecommendedItem } from '../Components/RecommendedItem';
import { RestaurantSearch } from '../Components/RestaurantSearch';
import { Box, Link } from '@mui/material';
import { useRestaurantRecommendation } from '../Hooks/useRestaurantRecommendation';
import { Loading } from '../Components/Loading';
import { Error } from '../Components/Error';

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render recommended restaurant and restaurant search area
 *
 */
export function Recommendation() {
  const { recommended, loading, error } = useRestaurantRecommendation();
  const [showSearch, setShowSearch] = useState(false);

  function toggleShowSearch() {
    setShowSearch(!showSearch);
  }

  if (loading) {
    return <Loading />;
  }

  if (error.length > 0) {
    return <Error msg={error} />;
  }

  return (
    <S.Div>
      <RecommendedItem item={recommended} />
      <Box m={2}>
        {showSearch ? (
          <Link onClick={toggleShowSearch}>Hide Search</Link>
        ) : (
          <Link onClick={toggleShowSearch}>Click Here to Search all Restaurants</Link>
        )}
      </Box>
      {showSearch && <RestaurantSearch />}
    </S.Div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Styles                                         */
/* -------------------------------------------------------------------------- */

export const S = {
  Div: styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Tags: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
  `
};
