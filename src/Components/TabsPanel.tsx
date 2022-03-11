import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from './TabPanel';

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

type Props = {
  tabsInfo: { index: number; value: string; children: JSX.Element }[];
};

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render tabs
 *
 */
export function TabsPanel({ tabsInfo }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabsInfo.map((info) => (
            <Tab key={info.value} label={info.value} />
          ))}
        </Tabs>
      </Box>
      {tabsInfo.map((info) => (
        <TabPanel key={info.value} value={value} index={info.index}>
          {info.children}
        </TabPanel>
      ))}
    </Box>
  );
}
