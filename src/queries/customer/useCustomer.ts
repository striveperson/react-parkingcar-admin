import qs from 'qs'
import { useMutation, useQuery } from 'react-query';
import { ApartFormData } from '../../components/customer/CustomerRegister';

import { Apart } from '../../models/Apart';
import client from "../client";
import { customerKeys } from '../queryKeys';
import { ParkingCarResp } from './../../models/response/ParkingCarResp';

export type request = {
  page: number;
  count: number;
}

// axios method
const getCustomerList = (req: request): Promise<CustomerListResp> =>
  client.get('/apts', { params: req })
    .then(({ data }) => data);

const getCustomer = (id: number): Promise<CustomerResp> =>
  client.get(`/apt/${id}`)
    .then(({ data }) => data);

const registerCustomer = (apart: ApartFormData): Promise<ParkingCarResp> =>
  client.post('/apt', qs.stringify(apart))
    .then(({ data }) => data);

const updateCustomer = (apart: ApartFormData): Promise<ParkingCarResp> =>
  client.post(`/apt/${apart.aptId}`, qs.stringify(apart))
    .then(({ data }) => data);


// custom hook
export const useCustomerList = (req: request) => useQuery(
  customerKeys.list(req),
  () => getCustomerList(req),
  { onSuccess: (data) => data ?? [], }
);

export const useCustomer = (id: number) => useQuery(
  customerKeys.detail(id),
  () => getCustomer(id),
  {
    onSuccess: (data) => data ?? {},
    enabled: id !== -1
  }
)

export const useRegisterCustomer = () => useMutation(registerCustomer);

export const useUpdateCustomer = () => useMutation(updateCustomer);


// response
export interface CustomerListResp extends ParkingCarResp {
  totalCount: number;
  list: Apart[];
}

export interface CustomerResp extends ParkingCarResp {
  info: Apart;
}