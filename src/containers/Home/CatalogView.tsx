import React, { useEffect } from 'react';
import { HStack, FlatList } from 'native-base';
import { useBreakpointValue } from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useCurrentLocation } from '../../utilities/hooks';
import { useAllOffersQuery } from './queries';
import TrendCard from './components/Cards/TrendCard';

const CatalogView = ({
  route: {
    params: { title },
  },
}) => {
  const noColumn = useBreakpointValue({
    base: 2,
    lg: 4,
    md: 3,
    xl: 5,
  });

  const { pos } = useCurrentLocation();

  const allOffersQuery = useAllOffersQuery(pos?.coords);

  useEffect(() => {
    if (pos) {
      allOffersQuery.refetch();
    }
  }, [pos]);

  return (
    <>
      <DashboardLayout title={title} scrollable={false}>
        <FlatList
          numColumns={noColumn}
          data={allOffersQuery.data}
          contentContainerStyle={{ padding: 4 }}
          renderItem={({ item }) => (
            <HStack mx="1" mt="2">
              <TrendCard item={item} />
            </HStack>
          )}
          key={noColumn}
          keyExtractor={(item, index) => 'key' + index}
        />
      </DashboardLayout>
    </>
  );
};

export default CatalogView;
