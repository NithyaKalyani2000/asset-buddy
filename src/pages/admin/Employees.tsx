import { useState } from "react";
import { Search, User, Package } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssetCard } from "@/components/assets/AssetCard";
import { employees, assets, Employee } from "@/lib/mockData";

export default function Employees() {
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  const getEmployeeAssets = (employeeId: string) =>
    assets.filter((a) => a.assignedTo?.id === employeeId);

  return (
    <MainLayout isAdmin>
      <PageHeader
        title="Employees"
        description="View employees and their assigned assets."
      />

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => {
          const employeeAssets = getEmployeeAssets(employee.id);
          return (
            <Card
              key={employee.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/20"
              onClick={() => setSelectedEmployee(employee)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {employee.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {employee.role}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {employee.department}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>{employeeAssets.length} assets</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Employee Detail Modal */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedEmployee?.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="block">{selectedEmployee?.name}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {selectedEmployee?.email}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 pr-4">
              {/* Employee Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Department</span>
                  <p className="font-medium">{selectedEmployee?.department}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Role</span>
                  <p className="font-medium">{selectedEmployee?.role}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Employee ID</span>
                  <p className="font-medium">{selectedEmployee?.id}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Total Assets</span>
                  <p className="font-medium">
                    {selectedEmployee && getEmployeeAssets(selectedEmployee.id).length}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Assigned Assets */}
              <div>
                <h4 className="font-semibold mb-3">Assigned Assets</h4>
                {selectedEmployee && getEmployeeAssets(selectedEmployee.id).length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No assets assigned
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedEmployee &&
                      getEmployeeAssets(selectedEmployee.id).map((asset) => (
                        <AssetCard key={asset.id} asset={asset} compact />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
