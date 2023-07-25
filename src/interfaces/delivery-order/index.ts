import { RestaurantInterface } from 'interfaces/restaurant';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DeliveryOrderInterface {
  id?: string;
  order_status: string;
  restaurant_id?: string;
  manager_id?: string;
  created_at?: any;
  updated_at?: any;

  restaurant?: RestaurantInterface;
  user?: UserInterface;
  _count?: {};
}

export interface DeliveryOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_status?: string;
  restaurant_id?: string;
  manager_id?: string;
}
