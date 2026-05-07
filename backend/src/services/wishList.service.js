import prisma from "../db/prisma.js";


export const getWishlistService = async ({ userId }) => {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: true
    }
  });
};

export const addToWishlistService = async ({ userId, productId }) => {
  return await prisma.wishlist.create({
    data: { userId, productId }
  });
};

export const removeFromWishlistService = async ({ userId, productId }) => {
  return await prisma.wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId
      }
    }
  });
};