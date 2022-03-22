import React, { useState } from 'react';

import {
  Carousel,
  Colors,
  Image,
  TabController,
  Text,
  View,
} from 'react-native-ui-lib';
import MapView, { Marker } from 'react-native-maps';

const images = [
  'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
  'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3572&q=80',
];

const ProductTab = () => (
  <View>
    <View paddingH-10>
      <View row centerV>
        <Text text40M marginT-s4>
          White bread
        </Text>
      </View>
      <Text text80 grey40 marginV-s1>
        Walmart
      </Text>
      <Text text50L marginV-s2>
        $0.01
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Text text50M marginT-10 marginB-10>
        Pickup location
      </Text>
    </View>
    <MapView
      style={{ height: 200 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ longitude: -122.43, latitude: 37.78 }}
        title="Test"
        description="Testing"
      />
    </MapView>
  </View>
);

const ProductDetailsView = () => {
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Carousel
        containerStyle={{ height: 220 }}
        pageControlProps={{
          size: 6,
          limitShownPages: true,
          color: Colors.white,
          inactiveColor: Colors.grey50,
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        {images.map((image, i) => {
          return (
            <View flex centerV key={i}>
              <Image
                overlayType={Image.overlayTypes.BOTTOM}
                style={{ flex: 1 }}
                source={{ uri: image }}
              />
            </View>
          );
        })}
      </Carousel>
      <TabController
        items={[{ label: 'Product' }, { label: 'Shop' }]}
        initialIndex={index}
        asCarousel
        onChangeIndex={setIndex}
      >
        <TabController.TabBar />
        <TabController.PageCarousel style={{ height: '100%' }}>
          <TabController.TabPage index={0} key="Product">
            <ProductTab />
          </TabController.TabPage>
          <TabController.TabPage index={1} key="Shop">
            <View flex>
              <Text>here</Text>
            </View>
          </TabController.TabPage>
        </TabController.PageCarousel>
      </TabController>
    </View>
  );
};

export default ProductDetailsView;
