import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PermissionWrapper from "@/components/shared/PermissionWrapper";
import { WorkspacePermissions } from "@/constant/permissions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useGetWorkspaceByIdQuery,
  useUpdateWorkspaceMutation,
} from "@/features/workspace/api/workspace.api";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import MainLoader from "@/components/shared/MainLoader";
import { useEffect } from "react";

export default function EditWorkspaceForm() {
  const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();

  const workspaceId = useWorkspaceId();
  const { data, isLoading: isWorkspaceLoading } =
    useGetWorkspaceByIdQuery(workspaceId);
  const workspace = data?.workspace;

  if (isWorkspaceLoading) {
    return <MainLoader />;
  }

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
  useEffect(() => {
    if (workspace) {
      form.setValue("name", workspace.name);
      form.setValue("description", workspace?.description || "");
    }
  }, [form, data]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateWorkspace({ workspaceId, body: values }).unwrap();
      showSuccessToast(res.message || "Workspace updated successfully");
    } catch (err: any) {
      console.log(err);
      showErrorToast(err?.data?.message || "Workspace update failed");
    }
  };

  return (
    <div>
      {" "}
      <Card>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <PermissionWrapper
                requiredPermission={WorkspacePermissions.EDIT_WORKSPACE}
              >
                <fieldset className="space-y-4">
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
                            This is the name of your company, team or
                            organization.
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
                            Get your members on board with a few words about
                            your Workspace.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      disabled={!form.formState.isDirty || isLoading}
                      type="submit"
                    >
                      Update Workspace
                    </Button>
                  </div>
                </fieldset>
              </PermissionWrapper>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
