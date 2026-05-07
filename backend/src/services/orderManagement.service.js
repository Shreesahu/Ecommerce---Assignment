import prisma from "../db/prisma.js";

export const createOrderService = async ({ userId, items, paymentMode }) => {

  let totalAmount = 0;

  const productIds = items.map(item => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds }
    }
  });

  const productMap = {};

  products.forEach(product => {
    productMap[product.id] = product;
  });

  const orderItemsData = items.map(item => {

    const product = productMap[item.productId];

    if (!product) {
      throw new Error("INVALID_PRODUCT");
    }

    const quantity = item.quantity || 1;

    const itemTotal = Number(product.price) * quantity;

    totalAmount += itemTotal;

    return {
      productId: product.id,
      quantity,
      price: product.price,
    };
  });

  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      paymentMode,
      status: "PENDING",

      OrderItem: {
        create: orderItemsData,
      },
    },

    include: {
      OrderItem: true,
    },
  });

  return order;
};

export const getOrderByIdService = async ({ orderId, userId }) => {

  const order = await prisma.order.findUnique({
    where: { id: orderId },

    include: {
      OrderItem: {
        include: {
          Product: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  return order;
};

export const cancelOrderService = async ({ orderId, userId }) => {

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  if (order.status === "CANCELLED") {
    return order;
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },

    data: {
      status: "CANCELLED",
    },
  });

  return updatedOrder;
};


export const getAllOrdersService = async (userId) => {

    const orders =
      await prisma.order.findMany({

        where: {userId,},

        include: {

          OrderItem: {

            include: {
              Product: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return orders;
};

