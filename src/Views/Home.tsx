import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../food.jpeg';

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render the home screen
 *
 */
export function Home() {
  return (
    <S.div>
      <Button variant="contained" component={Link} to="/recommendation">
        Where 2 lunch today?
      </Button>
    </S.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Styles                                      */
/* -------------------------------------------------------------------------- */

const S = {
  div: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${img});
    height: 100vh;
    background-repeat: no-repeat;
    background-size: 100vw 100vh;
  `
};
