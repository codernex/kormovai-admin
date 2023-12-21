import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { IDeposit } from "@codernex/types";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<IDeposit>[] = [
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
    accessorKey: "mobile",
    header: "Mobile",
    filterFn: "equals",
  },
  {
    accessorKey: "trxId",
    header: "Trx. Id",
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
    accessorKey: "createdAt",
    header: "Deposit Request",
  },
  {
    accessorKey: "id",
    header: "Action",
    cell(props) {
      return <Button key={props.row.id}>Update</Button>;
    },
  },
];

const Deposits = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Deposit</h2>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Deposits;
