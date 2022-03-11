import { Divider } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRestaurantTips } from '../Hooks/useRestaurantTips';
import { Error } from './Error';
import { Loading } from './Loading';

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render rsetaurant reviews
 *
 */
export function RestaurantTipList() {
  const params = useParams();
  const { tips, loading, error } = useRestaurantTips(params.id);

  if (loading) {
    return <Loading />;
  }

  if (error.length > 0) {
    return <Error msg={error} />;
  }

  if (!tips) {
    return <p>No Reviews</p>;
  }

  return (
    <React.Fragment>
      {tips.map((tip) => (
        <React.Fragment key={tip.id}>
          <p>{tip.text}</p>
          <S.P>Created at: {tip.created_at}</S.P>
          <Divider />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const S = {
  P: styled.p`
    font-size: 12px;
    font-style: italic;
  `
};
