import { createOrderService, getOrderByIdService, cancelOrderService, getAllOrdersService } from "../services/orderManagement.service.js";

export const createOrderController = async (req, res) => {
  try {

    const userId = req.dbUser.id;

    const { items, paymentMode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    if (!paymentMode) {
      return res.status(400).json({ message: "Payment mode required" });
    }

    const order = await createOrderService({
      userId,
      items,
      paymentMode,
    });

    return res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {

    if (error.message === "INVALID_PRODUCT") {
      return res.status(400).json({ message: "Invalid product" });
    }

    console.error(error);

    return res.status(500).json({
      message: "Failed to create order",
    });
  }
};

export const getOrderByIdController = async (req, res) => {
  try {

    const orderId = parseInt(req.params.id, 10);

    if (!orderId) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await getOrderByIdService({
      orderId,
      userId: req.dbUser.id,
    });

    return res.json({
      success: true,
      order,
    });

  } catch (error) {

    if (error.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({ message: "Order not found" });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};

export const cancelOrderController = async (req, res) => {
  try {

    const orderId = parseInt(req.params.id, 10);

    if (!orderId) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await cancelOrderService({
      orderId,
      userId: req.dbUser.id,
    });

    return res.json({
      success: true,
      order,
    });

  } catch (error) {

    if (error.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({ message: "Order not found" });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    console.error(error);

    return res.status(500).json({
      message: "Failed to cancel order",
    });
  }
};

export const getAllOrdersController =
  async (req, res) => {

    try {

      const orders =
        await getAllOrdersService(
          req.dbUser.id
        );

      return res.json({
        success: true,
        orders,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          "Failed to fetch orders",
      });
    }
};