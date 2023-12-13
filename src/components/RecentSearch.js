import React from 'react';
import { Box, Grid, Text } from '@radix-ui/themes';
import RecentLocationCard from './RecentLocationCard';

function RecentSearch() {
  return (
    <Box className="w-[532px]">
      <Text className="text-[12px] uppercase tracking-wide leading-snug font-[Solis]">
        Recent Locations
      </Text>
      <Grid columns="3" gap="3" width="auto" className="my-4">
        <RecentLocationCard city={'Yerevan'} country={'Armenia'} />
      </Grid>
    </Box>
  );
}

export default RecentSearch;
