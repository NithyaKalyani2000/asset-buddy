import { Package, CheckCircle, Wrench, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/assets/StatCard";
import { AssetCard } from "@/components/assets/AssetCard";
import { RequestCard } from "@/components/requests/RequestCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { assets, assetRequests } from "@/lib/mockData";

export default function AdminDashboard() {
  const totalAssets = assets.length;
  const availableAssets = assets.filter((a) => a.status === "available").length;
  const assignedAssets = assets.filter((a) => a.status === "assigned").length;
  const repairAssets = assets.filter((a) => a.status === "repair").length;

  const pendingRequests = assetRequests.filter((r) => r.status === "pending");
  const recentAssets = assets.slice(0, 4);

  return (
    <MainLayout isAdmin>
      <PageHeader
        title="IT Asset Dashboard"
        description="Overview of all IT assets and pending requests."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Assets"
          value={totalAssets}
          icon={Package}
          trend={{ value: 12, positive: true }}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatCard
          title="Available"
          value={availableAssets}
          icon={CheckCircle}
          iconClassName="bg-status-available-bg text-status-available"
        />
        <StatCard
          title="Assigned"
          value={assignedAssets}
          icon={Users}
          iconClassName="bg-status-assigned-bg text-status-assigned"
        />
        <StatCard
          title="Under Repair"
          value={repairAssets}
          icon={Wrench}
          iconClassName="bg-status-repair-bg text-status-repair"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Requests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-status-pending" />
                Pending Requests
              </CardTitle>
              <CardDescription>
                {pendingRequests.length} requests awaiting review
              </CardDescription>
            </div>
            <Link to="/admin/requests">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingRequests.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No pending requests
              </p>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {pendingRequests.slice(0, 5).map((request) => (
                    <RequestCard key={request.id} request={request} showActions />
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Asset Summary</CardTitle>
            <CardDescription>Breakdown by asset type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Laptops", count: assets.filter((a) => a.type === "Laptop").length },
              { label: "Monitors", count: assets.filter((a) => a.type === "Monitor").length },
              { label: "Keyboards", count: assets.filter((a) => a.type === "Keyboard").length },
              { label: "Mice", count: assets.filter((a) => a.type === "Mouse").length },
              { label: "Mobiles", count: assets.filter((a) => a.type === "Mobile").length },
              { label: "Other", count: assets.filter((a) => !["Laptop", "Monitor", "Keyboard", "Mouse", "Mobile"].includes(a.type)).length },
            ].map((item, index, array) => (
              <div key={item.label}>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
                {index < array.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Assets */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Assets</CardTitle>
            <CardDescription>Latest assets in the system</CardDescription>
          </div>
          <Link to="/admin/inventory">
            <Button variant="ghost" size="sm">
              View Inventory
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
