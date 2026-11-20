"use client";
import { ApplicationType } from "@/lib/tutionFormData";
import { DeleteApplicationId } from "@/lib/tutionsApi/applications";
import { Trash2, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const DeleteApplication = ({ app }: { app: ApplicationType }) => {
  const router = useRouter();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const handleDelete = async (id: string) => {
    const res = await DeleteApplicationId(id);

    if (res.deletedCount) {
      toast.success("Application Cancelled Successfully!");

      router.refresh();
    } else {
      toast.error("Failed to cancel application");
    }
  };
  return (
    <div>
      {app.status === "pending" ? (
        <AlertDialog
          open={selectedApp === app._id}
          onOpenChange={(isOpen) => setSelectedApp(isOpen ? app._id : null)}
        >
          <AlertDialogTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-gray-400 transition-all hover:bg-rose-50 hover:text-rose-600"
                title="Cancel Application"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />

          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>

              <AlertDialogTitle>Cancel this application?</AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to cancel your application for{" "}
                <span className="font-semibold">{app.tuitionTitle}</span>? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">
                Keep Application
              </AlertDialogCancel>

              <AlertDialogAction
                variant="destructive"
                onClick={() => handleDelete(app._id)}
              >
                Cancel Application
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <span className="text-xs text-gray-300">—</span>
      )}
    </div>
  );
};

export default DeleteApplication;
