import { Payment } from "@/models";
import { Controller } from "./base";
import { requestHandler } from "helper";

export class PaymentController extends Controller<Payment> {
  constructor() {
    super(Payment);
  }

  createPayment = requestHandler(async (req, res) => {});

  updatePayment = requestHandler(async (req, res) => {});

  getPayments = requestHandler(async (req, res) => {
    res.status(200).json({
      data: ["payments"],
    });
  });
}
