import { Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AssetRequest } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface RequestCardProps {
  request: AssetRequest;
  showActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

export function RequestCard({ request, showActions = false, onApprove, onReject }: RequestCardProps) {
  const statusConfig = {
    pending: { icon: Clock, variant: "pending" as const, label: "Pending" },
    approved: { icon: CheckCircle, variant: "available" as const, label: "Approved" },
    rejected: { icon: XCircle, variant: "destructive" as const, label: "Rejected" },
  };

  const priorityConfig = {
    Low: "bg-muted text-muted-foreground",
    Medium: "bg-status-assigned-bg text-status-assigned",
    High: "bg-status-repair-bg text-status-repair",
  };

  const { icon: StatusIcon, variant, label } = statusConfig[request.status];

  return (
    <Card className="animate-fade-in transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-secondary text-muted-foreground">
                {request.requesterName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-foreground">{request.requesterName}</h4>
              <p className="text-xs text-muted-foreground">{request.requesterDepartment}</p>
            </div>
          </div>
          <Badge variant={variant}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Requested Asset</span>
            <span className="text-sm text-muted-foreground">{request.assetType}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Priority</span>
            <Badge variant="outline" className={cn("text-xs", priorityConfig[request.priority])}>
              {request.priority}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Request Date</span>
            <span className="text-sm text-muted-foreground">
              {new Date(request.requestDate).toLocaleDateString()}
            </span>
          </div>

          <Separator />
          
          <p className="text-sm text-muted-foreground line-clamp-2">{request.reason}</p>
        </div>
      </CardContent>

      {showActions && request.status === "pending" && (
        <CardFooter className="pt-0">
          <div className="flex gap-2 w-full">
            <Button size="sm" className="flex-1" onClick={onApprove}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={onReject}>
              <XCircle className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </div>
        </CardFooter>
      )}

      {request.reviewedDate && (
        <CardFooter className="pt-0 text-xs text-muted-foreground">
          Reviewed by {request.reviewedBy} on {new Date(request.reviewedDate).toLocaleDateString()}
        </CardFooter>
      )}
    </Card>
  );
}
