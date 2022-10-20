import { useQuery } from 'react-query';
import { ParkingCarResp } from './../models/response/ParkingCarResp';
import client from "./client";
import { addressKeys } from "./queryKeys";

import Address from '../models/Address';

const getAddressList = (searchKey: string) => client.get<AddressListResp>('/apt/juso', { params: { searchKey } }).then(({ data }) => data);

export const useAddressList = (searchKey: string) => useQuery(
  addressKeys.list(searchKey),
  () => getAddressList(searchKey),
  {
    onSuccess: (data) => {
      return data;
    },
    enabled: false,
  }
)

export interface AddressListResp extends ParkingCarResp {
  list: Address[];
}