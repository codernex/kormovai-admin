import { Controller } from "./base";
import { Admin } from "@/models";
import { requestHandler } from "../helper";
import { createAdminSchema } from "@codernex/schema";
import * as bcrypt from "bcryptjs";
import { ApiError } from "utils/error";
export class AdminController extends Controller<Admin> {
  constructor() {
    super(Admin);
  }

  createAdmin = requestHandler(
    async (req, res, next) => {
      if (req.body.secret !== "226593") {
        return ApiError("Invalid secret", 404, next);
      }

      const admin = new Admin();

      admin.username = req.body.username;
      admin.email = req.body.email;
      admin.password = bcrypt.hashSync(req.body.password, 10);
      admin.name = req.body.name;
      await this.repository.save(admin);
      res.status(201).json({
        data: admin,
      });
    },
    {
      body: createAdminSchema,
    }
  );

  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }
}
