import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Ipayment } from "@codernex/types";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Ipayment>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell(props) {
      return <div>{props.row.index + 1}</div>;
    },
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "accountHolder",
    header: "Ac. Holder",
  },
  {
    accessorKey: "accountNumber",
    header: "Ac. Number",
  },
  {
    accessorKey: "amount",
    header: "TK",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "bank",
    header: "Bank",
  },
  {
    accessorKey: "createdAt",
    header: "Pay Request",
  },
  {
    accessorKey: "id",
    header: "Action",
    cell(props) {
      return <Button key={props.row.id}>Update</Button>;
    },
  },
];

const Payments = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Withdrawl</h2>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Payments;
