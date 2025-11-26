import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ColorPicker from "@/components/shared/ColorPicker";

import BoardPermissionWrapper from "@/components/shared/BoardPermissionWrapper";
import {
  useGetBoardByIdAndWorkspaceQuery,
  useUpdateBoardMutation,
} from "../api/board.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useBoardId from "@/hooks/useBoardId";
import { BoardColor } from "@/constant/board";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MainLoader from "@/components/shared/MainLoader";
import { BoardPermissions } from "@/constant/permissions";
import { z } from "zod";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { useEffect } from "react";
import useBoardSettings from "../hooks/useBoardSettings";
import { DialogFooter } from "@/components/ui/dialog";

function BoardSettingsForm() {
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const { data, isLoading: isBoardLoading } = useGetBoardByIdAndWorkspaceQuery({
    workspaceId,
    boardId,
  });

  const { onClose } = useBoardSettings();

  if (isBoardLoading) {
    return <MainLoader />;
  }
  const board = data?.board;

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Board name is required",
    }),
    description: z.string().trim(),
    bgColor: z
      .nativeEnum(BoardColor, { message: "Invalid background color" })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      bgColor: undefined,
    },
  });

  useEffect(() => {
    if (board) {
      form.reset({
        name: board.name,
        description: board.description ?? "",
        bgColor: board.bgColor ?? undefined,
      });
    }
  }, [board]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!form.formState.isDirty) {
        showErrorToast("You need to edit the form before submitting!");
        return;
      }
      if (isLoading) return;
      const body = { workspaceId, boardId, body: values };
      const res = await updateBoard(body).unwrap();
      onClose();
      showSuccessToast(res.message || "Board updated successfully");
    } catch (err: any) {
      if (isFetchBaseQueryError(err)) {
        if (
          typeof err.data === "object" &&
          err.data !== null &&
          "message" in err.data
        ) {
          const message = (err.data as { message: string }).message;
          showErrorToast(message || "Board update failed");
        }
      }
    }
  };
  const onCancel = () => {
    if (form.formState.isDirty) {
      if (confirm("You have unsaved changes. Are you sure?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 py-2">
            {/* Board Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Board name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Website Redesign"
                      className="!h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Update the name of your Board
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Board description
                  </FormLabel>
                  <FormControl>
                    <BoardPermissionWrapper
                      requiredPermission={BoardPermissions.EDIT_BOARD}
                    >
                      <Textarea
                        rows={6}
                        placeholder="Describe what this board is for..."
                        {...field}
                      />
                    </BoardPermissionWrapper>
                  </FormControl>
                  <FormDescription>
                    Update your board with new description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color Selection */}
            <FormField
              control={form.control}
              name="bgColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Background color
                  </FormLabel>
                  <FormControl>
                    <ColorPicker
                      value={field.value}
                      onChange={field.onChange}
                      colors={Object.values(BoardColor)}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a color to identify your board
                  </FormDescription>
                </FormItem>
              )}
            />
            {/* Preview */}
            <div className="pt-2 border-t border-gray-border">
              <Label className="text-sm font-medium mb-3 block">Preview</Label>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div
                  style={{ backgroundColor: form.watch("bgColor") }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0`}
                >
                  {form.watch("name").trim().charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">
                    {form.watch("name") || "Board Name"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-text line-clamp-2">
                    {form.watch("description") || "No description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2 ">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isDirty || isLoading}
            >
              {isLoading ? "Updating..." : "Update Board"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default BoardSettingsForm;
