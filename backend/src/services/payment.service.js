import prisma from "../db/prisma.js";


export const completePaymentService = async ({orderId,userId}) => {

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  const updatedOrder = await prisma.order.update({

    where: {
      id: orderId,
    },

    data: {
      status: "PAID",
    },
  });

  return updatedOrder;
};

export const cancelPaymentService = async ({orderId,userId}) => {

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  const updatedOrder = await prisma.order.update({

    where: { id: orderId},

    data: {
      status: "CANCELLED",
    },
  });

  return updatedOrder;
};