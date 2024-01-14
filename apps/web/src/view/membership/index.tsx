import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { IMembership } from "@codernex/types";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useMembershipModal } from "@/hooks/useMembershipModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import {
  MembershiType,
  createMembershipSchema,
  updateMembershipSchema,
} from "@codernex/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useTypedSelector } from "@/redux";
import {
  createMembership,
  fetchMembership,
  updateMembership,
} from "@/redux/actions/membership";
import React, { useEffect } from "react";
import { Edit, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const columns: ColumnDef<IMembership>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell(props) {
      return <div>{props.row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell(props) {
      return <div>{props.row.original?.amount || 0}</div>;
    },
  },
  {
    header: "Action",
    cell(props) {
      return <CellAction {...props} />;
    },
  },
];

const CellAction: React.FC<CellContext<IMembership, unknown>> = (props) => {
  const { setOpen } = useMembershipModal();
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <span className=" cursor-pointer">
            <MoreVerticalIcon size={20} />
          </span>
        </PopoverTrigger>
        <PopoverContent className="bg-slate-900 w-fit flex flex-col items-center h-[180px] justify-center space-y-4">
          <Button
            variant={"outline"}
            className="flex w-32 items-center space-x-2"
            onClick={() => {
              setOpen(true, props.row.original);
            }}
          >
            <Edit /> <span>Edit</span>
          </Button>
          <Button
            variant={"outline"}
            className="flex w-32 items-center space-x-2"
          >
            <Trash2Icon /> <span>Delete</span>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
const Membership = () => {
  const { setOpen } = useMembershipModal();
  const { memberships } = useTypedSelector((state) => state.membership);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMembership());
  }, [dispatch]);
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2>Membership</h2>
        <Button onClick={() => setOpen(true)}>Create Membership</Button>
      </div>
      <MembershipModal />
      <DataTable columns={columns} data={memberships} />
    </div>
  );
};

const MembershipModal = React.memo(() => {
  const { open, setOpen, data } = useMembershipModal();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof createMembershipSchema>>({
    defaultValues: data
      ? {
          name: data.name,
          type: MembershiType[data.type],
          amount: data.amount,
          duration: data.duration,
        }
      : {
          name: "",
          amount: 0,
          duration: 1,
          type: MembershiType.free,
        },
    values: data
      ? {
          name: data.name,
          type: MembershiType[data.type],
          amount: data.amount,
          duration: data.duration,
        }
      : {
          name: "",
          amount: 0,
          duration: 1,
          type: MembershiType.free,
        },
    resolver: zodResolver(
      data ? updateMembershipSchema : createMembershipSchema
    ),
  });

  const submit = (values: z.infer<typeof createMembershipSchema>) => {
    if (data) {
      dispatch(
        updateMembership({
          id: data.id,
          data: values,
        })
      );
    } else {
      dispatch(createMembership(values));
    }
    setOpen(false, undefined);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Create Membership</DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Free Membership" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="name"
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 1250"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="amount"
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="duration"
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="capitalize"
                          placeholder="Type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(MembershiType).map((k) => {
                        return (
                          <SelectItem className="capitalize" key={k} value={k}>
                            {k}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
              control={form.control}
              name="type"
            />
            <Button>{data ? "Update" : "Create"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default Membership;
