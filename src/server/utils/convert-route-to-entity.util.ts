const mapping: Record<string, string> = {
  'delivery-orders': 'delivery_order',
  'menu-items': 'menu_item',
  restaurants: 'restaurant',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
