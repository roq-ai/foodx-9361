import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { deliveryOrderValidationSchema } from 'validationSchema/delivery-orders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.delivery_order
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDeliveryOrderById();
    case 'PUT':
      return updateDeliveryOrderById();
    case 'DELETE':
      return deleteDeliveryOrderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDeliveryOrderById() {
    const data = await prisma.delivery_order.findFirst(convertQueryToPrismaUtil(req.query, 'delivery_order'));
    return res.status(200).json(data);
  }

  async function updateDeliveryOrderById() {
    await deliveryOrderValidationSchema.validate(req.body);
    const data = await prisma.delivery_order.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDeliveryOrderById() {
    const data = await prisma.delivery_order.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
