import axios from 'axios';
import queryString from 'query-string';
import { DeliveryOrderInterface, DeliveryOrderGetQueryInterface } from 'interfaces/delivery-order';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDeliveryOrders = async (
  query?: DeliveryOrderGetQueryInterface,
): Promise<PaginatedInterface<DeliveryOrderInterface>> => {
  const response = await axios.get('/api/delivery-orders', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDeliveryOrder = async (deliveryOrder: DeliveryOrderInterface) => {
  const response = await axios.post('/api/delivery-orders', deliveryOrder);
  return response.data;
};

export const updateDeliveryOrderById = async (id: string, deliveryOrder: DeliveryOrderInterface) => {
  const response = await axios.put(`/api/delivery-orders/${id}`, deliveryOrder);
  return response.data;
};

export const getDeliveryOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/delivery-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDeliveryOrderById = async (id: string) => {
  const response = await axios.delete(`/api/delivery-orders/${id}`);
  return response.data;
};
