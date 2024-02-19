import { Box, Grid, Text } from '@radix-ui/themes';
import RecentLocationCard from './RecentLocationCard';
import { Link } from 'react-router-dom';

function RecentSearch() {
  const recentLocationsStr = localStorage.getItem('recentLocation');
  const recentLocations = recentLocationsStr
    ? JSON.parse(recentLocationsStr)
    : [];

  return (
    <Box className="w-[532px]">
      <Text className="text-[12px] uppercase tracking-[.5px] font-medium leading-[1.33em]">
        Recent Locations
      </Text>
      <Grid columns="3" gap="3" width="auto" className="my-4">
        {recentLocations.map((recentLocation) => (
          <Link
            to={`/${recentLocation.cityId}/${recentLocation.cityName}/today-forecast`}
            key={recentLocation.cityId}
          >
            <RecentLocationCard
              id={recentLocation.cityId}
              name={recentLocation.cityName}
            />
          </Link>
        ))}
      </Grid>
    </Box>
  );
}

export default RecentSearch;
