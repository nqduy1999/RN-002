import BuildVersion, {IS} from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting;
import {
  SORT_BY_PRICE_HIGH_TO_LOW,
  SORT_BY_PRICE_LOW_TO_HIGH,
  SORT_BY_NAME_A_Z,
  SORT_BY_NAME_Z_A,
} from '@resources/string/strings';

const data = [
  {
    id: '0',
    sortBy: 'Name',
    sortOrder: 'Asc',
    name: 'SORT_BY_NAME_A_Z',
    isSelected: false,
    text: SORT_BY_NAME_A_Z,
  },
  {
    id: '1',
    sortBy: 'Name',
    sortOrder: 'Desc',
    name: 'SORT_BY_NAME_Z_A',
    isSelected: false,
    text: SORT_BY_NAME_Z_A,
  },
  {
    id: '2',
    sortBy: 'Price',
    sortOrder: 'Asc',
    name: 'SORT_BY_PRICE_LOW_TO_HIGH',
    isSelected: false,
    text: SORT_BY_PRICE_LOW_TO_HIGH,
    component: setting.FlexAUnit,
  },
  {
    id: '3',
    sortBy: 'Price',
    sortOrder: 'Desc',
    name: 'SORT_BY_PRICE_HIGH_TO_LOW',
    isSelected: false,
    text: SORT_BY_PRICE_HIGH_TO_LOW,
    component: setting.FlexAUnit,
  },
];

export default {
  data: data, //!IS.PEPSI ? data : data.filter((x) => x.id !== '0' && x.id !== '1'),
};
