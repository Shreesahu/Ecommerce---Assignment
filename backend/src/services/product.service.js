import prisma from "../db/prisma.js";


export const getAllProductService = async({cursor , limit})=>{

    const queryWithPaginationLogic = {
        take:limit,
        orderBy:{
            id: "desc",
        }
    };

    if(cursor){
       queryWithPaginationLogic.cursor = {
            id: parseInt(cursor)
        };
        queryWithPaginationLogic.skip = 1;//this one to remove 1st duplicate product like cursor value is 57 then from db it gonna give us product from 57 to next 10 product so we will have to skip 57 as it was the last product id.
    }

    const getProductFromDB = await prisma.product.findMany(queryWithPaginationLogic);

    console.log(getProductFromDB , "getProductFromDB");

    const nextProductCursor = getProductFromDB.length===limit?getProductFromDB[getProductFromDB.length - 1].id:null;

    console.log(nextProductCursor , "nextProductCursor");

    return{
        getProductFromDB,
        nextProductCursor
    };

}

export const getProductByTitleService = async ({ title, cursor, limit = 10 }) =>{

  const query = {
    where: {
      title: {
        contains: title,
        mode: "insensitive"
      }
    },
    orderBy: {
      id: "desc"
    },
    take: limit
  };

  // Here we will be using cursor for pagination 
  if (cursor) {
    query.cursor = { id: parseInt(cursor) };
    query.skip = 1;
  }

  const products = await prisma.product.findMany(query);

  const nextCursor =
    products.length === limit
      ? products[products.length - 1].id
      : null;

  return {
    products,
    nextCursor
  };
};

export const getProductByIDService = async({productId})=>{
    
    const getProductByID = await prisma.product.findUnique({
        where:{id :productId}
    });

    if (!getProductByID) {
        throw new Error("PRODUCT_NOT_FOUND");
    }

    return {
        productDetails:  getProductByID
    }

};

export const getAllProductsByFilterService = async ({
  cursor,
  limit,
  category,
  minPrice,
  maxPrice,
  isSold,
}) => {

  const where = {};

  if (category && category.trim() !== "") {
    where.category = category;
  }

  if (isSold === "true" || isSold === "false") {
    where.isSold = isSold === "true";
  }

  if (
    (minPrice !== undefined && minPrice !== "") ||
    (maxPrice !== undefined && maxPrice !== "")
  ) {
    where.price = {};

    if (minPrice !== undefined && minPrice !== "") {
      where.price.gte = Number(minPrice);
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      where.price.lte = Number(maxPrice);
    }
  }

  const query = {
    where,
    take: limit,
    orderBy: {
      id: "desc",
    },
  };

  if (cursor) {
    query.cursor = { id: parseInt(cursor) };
    query.skip = 1;
  }

  const products = await prisma.product.findMany(query);

  const nextCursor =
    products.length === limit
      ? products[products.length - 1].id
      : null;

  return {
    products,
    nextCursor,
  };
};


export const getMostBoughtProductsService = async (limit = 5) => {
  // Step 1: Group by productId and sum quantity
  const groupedData = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: limit,
  });

  // Step 2: Extract productIds
  const productIds = groupedData.map(item => item.productId);

  // Step 3: Fetch product details
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  // Step 4: Create map for quick lookup
  const productMap = {};
  products.forEach(product => {
    productMap[product.id] = product;
  });

  // Step 5: Merge data
  const result = groupedData.map(item => ({
    productId: item.productId,
    totalSold: item._sum.quantity,
    product: productMap[item.productId],
  }));

  return result;
};