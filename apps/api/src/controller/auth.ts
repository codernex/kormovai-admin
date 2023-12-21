import { Repository } from "typeorm";
import { Admin, User } from "@/models";
import { appDataSource } from "../orm.config";
import { requestHandler } from "../helper";
import { adminLoginSchema, userLoginSchema } from "@codernex/schema";
import { ApiError } from "@/utils";
import * as bcrypt from "bcryptjs";
import { sendToken } from "../utils/authToken";

export class AuthController {
  private static userRepository: Repository<User> =
    appDataSource.getRepository(User);
  private static adminRepository: Repository<Admin> =
    appDataSource.getRepository(Admin);

  static adminLogin = requestHandler(
    async (req, res, next) => {
      const admin = await AuthController.adminRepository
        .createQueryBuilder("admin")
        .where("admin.username=:username", {
          username: req.body.usernameOrEmail,
        })
        .orWhere("admin.email=:email", {
          email: req.body.usernameOrEmail,
        })
        .getOne();

      if (!admin) {
        return ApiError("Username or password invalid", 404, next);
      }

      const isPasswordMatched = bcrypt.compareSync(
        req.body.password,
        admin.password
      );

      if (!isPasswordMatched) {
        return ApiError("Username or password invalid", 404, next);
      }
      sendToken(res, admin, next);
    },
    {
      body: adminLoginSchema,
    }
  );

  static userLogin = requestHandler(
    async (req, res, next) => {
      try {
        const user = await AuthController.userRepository.findOne({
          where: {
            id: req.body.id,
          },
        });

        if (!user) {
          return ApiError("Username or password invalid", 404, next);
        }

        const isPasswordMatched = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!isPasswordMatched) {
          return ApiError("Username or password invalid", 404, next);
        }
        sendToken(res, user, next);
      } catch (err) {
        console.log(err);
      }
    },
    {
      body: userLoginSchema,
    }
  );

  static logOut = requestHandler(async (req, res, next) => {
    res.clearCookie("token").status(200).json({
      data: "Logout Successful",
    });
  });
}
