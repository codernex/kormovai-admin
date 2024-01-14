import { Deposit } from "@/models";
import { Controller } from "./base";
import { requestHandler } from "helper";

export class DepositController extends Controller<Deposit> {
  constructor() {
    super(Deposit);
  }

  createDeposit = requestHandler(async (req, res) => {});

  updateDeposit = requestHandler(async (req, res) => {});

  getDeposits = requestHandler(async (req, res) => {});
}
