import React from 'react';

import Swiper from 'react-native-swiper';

const CustomSwiper = ({renderItems, ...props}) => {
  return <Swiper {...props}>{renderItems()}</Swiper>;
};

export default CustomSwiper;
