import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

type Props = {
  index: number;
  value: number;
  children?: React.ReactNode;
};

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render content of selected tab
 *
 */
export function TabPanel(props: Props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <S.Div>{children}</S.Div>
        </Box>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Styles                                         */
/* -------------------------------------------------------------------------- */

const S = {
  Div: styled.div`
    text-align: left;
  `
};
