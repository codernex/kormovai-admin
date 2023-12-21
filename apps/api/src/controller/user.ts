import { requestHandler } from "helper";
import { Controller } from "./base";
import { Account, Membership, User } from "@/models";
import { MembershiType, createUserSchema } from "@codernex/schema";
import * as bcrypt from "bcryptjs";
import { ApiError, ErrorHandler, generateRandomString } from "@/utils";
import { z } from "zod";
import { appDataSource } from "orm.config";
import { sendToken } from "utils/authToken";

export class UserController extends Controller<User> {
  constructor() {
    super(User);
  }

  public getUsers = requestHandler(async (req, res) => {
    const user = await this.repository.createQueryBuilder("user").getMany();

    res.status(200).json({
      data: user,
    });
  });

  public createUser = requestHandler(
    async (req, res, next) => {
      try {
        const user = new User();

        // Initiating User Account
        const account = new Account();
        account.balance = 0;

        await appDataSource.manager.save(account);

        // adding membership
        const membership = await appDataSource.manager.findOne(Membership, {
          where: {
            type: MembershiType.free,
          },
        });

        user.id = generateRandomString(6);
        user.name = req.body.name;
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.dob = req.body.dob;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        user.occupation = req.body.occuption;
        user.fatherName = req.body.fatherName;
        user.motherName = req.body.motherName;
        user.account = account;
        user.nid = req.body.nid;

        // Adding Membership
        if (membership) {
          user.membership = membership;
        }

        if (req.body.referCode) {
          const referrerUser = await this.addRefer(req.body.referCode);

          // Adding Referral Program
          if (referrerUser) {
            referrerUser.addReferral(user);
            user.referrer = referrerUser;
            await this.repository.save(referrerUser);
          } else {
            return ApiError("Refer code invalid", 404, next);
          }
        }

        await this.repository.save(user);

        sendToken(res, user, next);
      } catch (err) {
        console.log(err);

        const body = err as ErrorHandler;

        return ApiError(body.message, 400, next);
      }
    },
    {
      body: createUserSchema,
    }
  );

  public deleteUser = requestHandler(
    async (req, res, next) => {
      if (!req.admin) {
        if (req.user && req.user.id !== req.params.id) {
          return ApiError("You are not able to perform this action", 403, next);
        }
      } else {
        const user = await this.repository.findOne({
          where: {
            id: req.params.id,
          },
        });
        if (!user) {
          return ApiError("user not found", 404, next);
        }
        await this.repository.remove(user);

        res.status(200).json({
          data: user,
        });
      }
    },
    {
      params: z.object({
        id: z.string(),
      }),
    }
  );

  async addRefer(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        referrals: true,
        referrer: true,
      },
    });
  }

  async findUserById(id?: string) {
    return await this.repository.findOne({
      where: { id },
      relations: {
        referrals: true,
        referrer: true,
        account: true,
        membership: true,
      },
    });
  }
}
