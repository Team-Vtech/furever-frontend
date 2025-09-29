"use client";

import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Button } from "@furever/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@furever/ui/components/dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteRecordDialogProps = {
  recordName: string;
  triggerText?: string;
  recordId: number;
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

export function DeleteRecordDialog({
  recordName,
  triggerText = "Delete Record",
  recordId,
  onDelete,
  isDeleting,
}: DeleteRecordDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      setOpen(false);
      onDelete(recordId);
    } catch (error) {
      console.error("Failed to delete record:", error);
      toastUtils.error.delete(recordName);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete the "{recordName}". This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
