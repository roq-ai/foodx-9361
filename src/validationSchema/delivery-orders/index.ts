import * as yup from 'yup';

export const deliveryOrderValidationSchema = yup.object().shape({
  order_status: yup.string().required(),
  restaurant_id: yup.string().nullable(),
  manager_id: yup.string().nullable(),
});
