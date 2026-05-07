import { completePaymentService, cancelPaymentService, } from "../services/payment.service.js";

export const completePaymentController = async (req, res) => {

  try {

    const orderId = parseInt(req.params.id, 10);

    if (!orderId) {
      return res.status(400).json({
        message: "Invalid order id",
      });
    }

    const order = await completePaymentService({
      orderId,
      userId: req.dbUser.id,
    });

    return res.json({
      success: true,
      order,
    });

  } catch (error) {

    if (error.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    console.log(error);

    return res.status(500).json({
      message: "Failed to complete payment",
    });
  }
};

export const cancelPaymentController = async (req, res) => {

  try {

    const orderId = parseInt(req.params.id, 10);

    if (!orderId) {
      return res.status(400).json({
        message: "Invalid order id",
      });
    }

    const order = await cancelPaymentService({
      orderId,
      userId: req.dbUser.id,
    });

    return res.json({
      success: true,
      order,
    });

  } catch (error) {

    if (error.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    console.log(error);

    return res.status(500).json({
      message: "Failed to cancel payment",
    });
  }
};