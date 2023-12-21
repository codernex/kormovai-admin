import { Membership } from "@/models";
import { Controller } from "./base";
import { requestHandler } from "helper";
import {
  createMembershipSchema,
  updateMembershipSchema,
} from "@codernex/schema";
import { ApiError } from "utils/error";
import { z } from "zod";
import dayjs from "dayjs";

export class MembershipController extends Controller<Membership> {
  constructor() {
    super(Membership);
  }

  createMembership = requestHandler(
    async (req, res, next) => {
      try {
        const membership = this.repository.create({
          ...req.body,
          duration: dayjs(req.body.duration).toDate(),
        });

        await this.repository.save(membership);

        res.status(200).json({
          data: membership,
        });
      } catch (err: any) {
        console.log(err.message);

        return ApiError(err.message, 404, next);
      }
    },
    {
      body: createMembershipSchema,
    }
  );

  fetchMembership = requestHandler(async (req, res) => {
    const memberships = await this.repository.find();
    res.status(200).json({
      data: memberships,
    });
  });

  updateMembership = requestHandler(
    async (req, res, next) => {
      try {
        const membership = await this.repository.update(
          req.params.id,
          req.body
        );

        res.status(200).json({
          data: membership,
        });
      } catch (err: any) {
        return ApiError(err.message, 404, next);
      }
    },
    {
      params: z.object({
        id: z.string(),
      }),
      body: updateMembershipSchema,
    }
  );

  deletMembership = requestHandler(
    async (req, res, next) => {
      try {
        const membership = await this.repository.findOneByOrFail({
          id: req.params.id,
        });

        await this.repository
          .createQueryBuilder("membership")
          .delete()
          .where("id=:id", {
            id: req.params.id,
          })
          .execute();

        res.status(200).json({
          data: membership,
        });
      } catch (err: any) {
        if (err.message.includes("Could not find any entity")) {
          err.message = "membership not found";
        }
        return ApiError(err.message, 404, next);
      }
    },
    {
      params: z.object({
        id: z.string(),
      }),
    }
  );
}
