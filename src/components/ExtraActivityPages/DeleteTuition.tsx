'use client'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Trash2, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { TuitionType } from "@/lib/tutionFormData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteTuitionId } from "@/lib/tutionsApi/addTution";

const DeleteTuition = ({ tuition }: { tuition: TuitionType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const res = await DeleteTuitionId(tuition._id);
    console.log(tuition._id);
    if (res.deletedCount) {
      setOpen(false);
      toast.success("Tuition Deleted Successfully!");
      router.refresh();
    } else {
      toast.error("Failed to delete the tuition");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            title="Delete tuition"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Do you want to delete this tuition?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTuition;
