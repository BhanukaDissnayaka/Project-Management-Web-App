import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateBoardDialog from "@/hooks/useCreateBoardDialog";
import { BoardColor } from "@/constant/board";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateBoardMutation } from "../api/board.api";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import ColorPicker from "@/components/shared/ColorPicker";

export default function CreateBoardDialog() {
  const { open, onClose } = useCreateBoardDialog();
  const [createBoard, { isLoading }] = useCreateBoardMutation();
  const workspaceId = useWorkspaceId();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = { workspaceId, body: values };
      const res = await createBoard(body).unwrap();
      form.reset();
      onClose();
      showSuccessToast(res.message || "Board created successfully");
    } catch (err: any) {
      if (isFetchBaseQueryError(err)) {
        if (
          typeof err.data === "object" &&
          err.data !== null &&
          "message" in err.data
        ) {
          const message = (err.data as { message: string }).message;
          showErrorToast(message || "Board create failed");
        }
      }
    }
  };
  const onCancel = () => {
    form.reset();
    onClose();
  };

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

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className=" overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            Create New Board
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-text">
            Set up a new board to organize your projects and tasks.
          </DialogDescription>
        </DialogHeader>

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
                      This is the name of your Board
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
                      <Textarea
                        rows={6}
                        placeholder="Describe what this board is for..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Get your members on board with a few words about your
                      Workspace.
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
                <Label className="text-sm font-medium mb-3 block">
                  Preview
                </Label>
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div
                    style={{ backgroundColor: form.watch("bgColor") }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0`}
                  >
                    {form.watch("name").charAt(0).toUpperCase() || "?"}
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
              <Button variant="outline" disabled={isLoading} onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Board"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
