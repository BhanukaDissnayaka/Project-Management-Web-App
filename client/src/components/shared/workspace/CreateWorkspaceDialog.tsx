import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkspaceMutation } from "@/features/workspace/api/workspace.api";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function CreateWorkspaceDialog() {
  // todo - must replace open with useCreateWorkspace custom hook
  const open = false;

  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Workspace name is required",
    }),
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createWorkspace(values).unwrap();
      form.reset();
      showSuccessToast(res.message || "Workspace created successfully");
      navigate(`/workspace/${res.workspace?._id}`);
    } catch (err: any) {
      console.log(err);
      showErrorToast(err?.data?.message || "Workspace create failed");
    }
  };

  return (
    <Dialog modal={true} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Let's build a Workspace</DialogTitle>
          <DialogDescription>
            Boost your productivity by making it easier for everyone to access
            projects in one location.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Workspace name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Taco's Co."
                        className="!h-[40px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the name of your company, team or organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Workspace description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Our team organizes marketing projects and tasks here."
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
            </div>
            <Button
              disabled={isLoading}
              className="w-full h-[40px] text-white font-semibold"
              type="submit"
            >
              {isLoading && <Loader className="animate-spin" />}
              Create Workspace
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export default CreateWorkspaceDialog;
