import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { restaurantValidationSchema } from 'validationSchema/restaurants';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getRestaurants();
    case 'POST':
      return createRestaurant();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRestaurants() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.restaurant
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'restaurant'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createRestaurant() {
    await restaurantValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.delivery_order?.length > 0) {
      const create_delivery_order = body.delivery_order;
      body.delivery_order = {
        create: create_delivery_order,
      };
    } else {
      delete body.delivery_order;
    }
    if (body?.menu_item?.length > 0) {
      const create_menu_item = body.menu_item;
      body.menu_item = {
        create: create_menu_item,
      };
    } else {
      delete body.menu_item;
    }
    const data = await prisma.restaurant.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
