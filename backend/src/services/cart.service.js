import prisma from "../db/prisma.js";

export const addToCartService = async ({ userId, productId, quantity = 1 }) => {

  // 1. Find or create cart
  let cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId }
    });
  }

  // 2. Check if item already exists
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    }
  });

  // 3. Update or create
  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity
      }
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity
      }
    });
  }

  return { message: "Item added to cart" };
};

export const getUserCartService = async ({ userId }) => {

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      CartItem: {
        include: {
          Product: true
        }
      }
    }
  });

  if (!cart) return { items: [] };

  return { items: cart.CartItem };
};

export const updateCartItemService = async ({ userId, productId, quantity }) => {

  const cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) throw new Error("CART_NOT_FOUND");

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    }
  });

  if (!item) throw new Error("ITEM_NOT_FOUND");

  const updatedItem = await prisma.cartItem.update({
    where: { id: item.id },
    data: { quantity }
  });

  return {
  message: "Cart updated",
  item: updatedItem,
};
};

export const removeFromCartService = async ({ userId, productId }) => {

  const cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) throw new Error("CART_NOT_FOUND");

  const items = await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    }
  });

  return { message: "Item removed" , items };
};

export const clearCartService = async (userId) => {

  const cart = await prisma.cart.findUnique({

    where: {userId,},
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({

    where: {cartId: cart.id,},
  });
};