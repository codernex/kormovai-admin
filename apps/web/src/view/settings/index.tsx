import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircle, TrashIcon } from "lucide-react";

export default function Settings() {
  return (
    <Tabs defaultValue="work" className="w-full max-w-5xl">
      <TabsList className="w-full">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
        <TabsTrigger value="applovin">Applovin</TabsTrigger>
        <TabsTrigger value="ad-units">Ad Units</TabsTrigger>
        <TabsTrigger value="user">User</TabsTrigger>
      </TabsList>
      <WorkTab />
      <SystemTab />
      <ApplovinTab />
      <AdUnits />
    </Tabs>
  );
}

const WorkTab = () => {
  return (
    <TabsContent value="work">
      <Card>
        <CardHeader>
          <CardTitle>Work</CardTitle>
          <CardDescription>
            Make changes to work information here. After saving, you'll be
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="free_member_credit">Free User Work Credit</Label>
            <Input id="free_member_credit" defaultValue={1} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="paid_member_credit">Paid User Work Credit</Label>
            <Input id="paid_member_credit" defaultValue={3} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="work_cooldown_time">
              Work Cooldown time (seconds)
            </Label>
            <Input id="work_cooldown_time" defaultValue={60} />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

const SystemTab = () => {
  return (
    <TabsContent value="system">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
const ApplovinTab = () => {
  return (
    <TabsContent value="applovin">
      <Card>
        <CardHeader>
          <CardTitle>
            <span>Applovin</span>
          </CardTitle>
          <CardDescription>Update Applovin information here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>API Key</Label>
            <Input placeholder="Applovin API Key" defaultValue={"test"} />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
const columns: ColumnDef<{
  id: string;
  adUnitId: string;
  adUnitname: string;
}>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell(props) {
      return props.row.id + 1;
    },
  },
  {
    accessorKey: "adUnitId",
    header: "Unit ID",
  },
  {
    accessorKey: "adUnitname",
    header: "Unit Name",
  },
  {
    header: "Actions",
    cell({ row }) {
      return (
        <div>
          <TrashIcon />
        </div>
      );
    },
  },
];
const AdUnits = () => {
  return (
    <TabsContent value="ad-units">
      <Card>
        <CardHeader>
          <CardTitle className="justify-between flex items-center">
            <span>Ad Units</span>
            <Button className="space-x-2" variant={"secondary"}>
              <span>Add Unit</span> <PlusCircle />
            </Button>
          </CardTitle>
          <CardDescription>Manage your ad units here.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={[
              {
                adUnitId: "test",
                adUnitname: "test",
                id: "1",
              },
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
};
