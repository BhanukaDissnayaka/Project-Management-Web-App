import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetWorkspaceMembersQuery } from "../api/workspace-members.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { showErrorToast } from "@/lib/toastHandler";
import MemberCard from "@/features/workspace-members/components/memberCard";
import MainLoader from "@/components/shared/MainLoader";
import { timeAgo } from "@/utils/timeAgo";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomPagination from "@/components/shared/Pagination";

export default function WorkspaceAllMembers() {
  const workspaceId = useWorkspaceId();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get("page") || 1);
  const rawLimit = Number(searchParams.get("limit") || 5);
  const validLimits = [5, 10, 20];
  const page = Math.max(rawPage, 1);
  const limit = validLimits.includes(rawLimit) ? rawLimit : 5;
  const searchValue = searchParams.get("search") || "";

  const { data, isFetching, error, isError } = useGetWorkspaceMembersQuery(
    { workspaceId, searchValue, page, limit },
    { skip: !workspaceId }
  );
  const members = data?.members || [];
  const roles = data?.roles || [];
  const pagination = data?.pagination ?? {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  };

  const formSchema = z.object({
    search: z.string().trim().min(1, {
      message: "Enter name or email to search",
    }),
    limit: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchValue,
      limit: String(limit),
    },
  });

  const updateSearchParams = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => params.set(k, v));
      return params;
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateSearchParams({
      search: values.search,
      page: "1",
      limit: values.limit,
    });
  };
  const goToPage = (newPage: number) => {
    updateSearchParams({ page: String(newPage) });
  };

  useEffect(() => {
    if (isError && error && isFetchBaseQueryError(error)) {
      if (
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        const message = (error.data as { message: string }).message;
        showErrorToast(message);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (rawPage < 1 || ![5, 10, 20].includes(rawLimit)) {
      updateSearchParams({
        page: String(page),
        limit: String(limit),
      });
    }
  }, []);

  return (
    <div>
      <div className="mt-3 md:mt-0">
        <h1 className="text-base md:text-lg font-semibold text-gray-text">
          Workspace Members
        </h1>
        <p className="mt-2 text-gray-text max-w-3xl leading-[1.3] text-sm">
          Manage your workspace team members efficiently — view all current
          members, their roles, and permissions, and update their roles directly
          from this page to keep your workspace organized and secure.
        </p>
      </div>
      <hr className="my-5" />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full space-y-3 md:space-x-3 md:flex ">
              <div className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Search user by email address"
                          aria-label="Search workspace members"
                          className="!h-[40px] md:min-w-75 w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Results per page" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[5, 10, 20].map((num) => (
                              <SelectItem value={String(num)} key={num}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />{" "}
              </div>

              <Button
                className="w-full md:w-50"
                type="submit"
                disabled={isFetching}
              >
                Search user
              </Button>
            </div>
          </form>
        </Form>

        <hr className="my-4" />
        {isFetching ? (
          <MainLoader className="mt-5"></MainLoader>
        ) : (
          <>
            {members.map((member) => (
              <MemberCard
                member={member}
                roles={roles}
                workspaceId={workspaceId}
                key={member._id}
              />
            ))}

            <div className="my-2">
              <CustomPagination
                pagination={pagination}
                currentPage={page}
                goToPage={goToPage}
              />
            </div>
          </>
        )}
        {!isFetching && members.length === 0 && (
          <div className="text-center text-gray-text my-6">
            "No members found"
            <Button
              className="ml-2"
              variant="outline"
              onClick={() => {
                updateSearchParams({ search: "", page: "1" });
                form.reset({ search: "", limit: String(limit) });
              }}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
