import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { IUser } from "@codernex/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell(props) {
      return <div>{props.row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "Reffered By",
    header: "Refferals",
    cell(props) {
      return <div>{props.row.original?.referrer.name}</div>;
    },
  },
  {
    accessorKey: "referrals",
    header: "Refferals",
    cell(props) {
      return <div>{props.row.original?.referrals.length}</div>;
    },
  },
  {
    accessorKey: "membership",
    header: "Membership",
    cell(props) {
      return <div>{props.row.original?.membership.name}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell(props) {
      return <Button key={props.row.id}>Actions</Button>;
    },
  },
];

const Users = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Users</h2>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Users;
