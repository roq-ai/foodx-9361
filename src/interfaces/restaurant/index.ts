import { DeliveryOrderInterface } from 'interfaces/delivery-order';
import { MenuItemInterface } from 'interfaces/menu-item';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  delivery_order?: DeliveryOrderInterface[];
  menu_item?: MenuItemInterface[];
  user?: UserInterface;
  _count?: {
    delivery_order?: number;
    menu_item?: number;
  };
}

export interface RestaurantGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
