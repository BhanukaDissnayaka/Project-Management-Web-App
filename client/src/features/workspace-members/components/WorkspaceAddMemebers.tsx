import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyGetSearchedUsersQuery } from "../api/workspace-members.api";
import { showErrorToast } from "@/lib/toastHandler";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { useState } from "react";
import MainLoader from "@/components/shared/MainLoader";
import type { searchedUserType } from "../types/workspace-members.type";
import SearchedUserCard from "./SearchedUserCard";

function WorkspaceAddMember() {
  const workspaceId = useWorkspaceId();
  const [getSearchedUsers, { data, isFetching }] =
    useLazyGetSearchedUsersQuery();
  const [searchedUsers, setSearchedUsers] = useState<searchedUserType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const formSchema = z.object({
    searchValue: z.string().trim().min(1, {
      message: "Enter something to search",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchValue: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isFetching) return;

    try {
      setHasSearched(true);
      const res = await getSearchedUsers({ values, workspaceId }).unwrap();
      setSearchedUsers(res?.users ?? []);
    } catch (err: any) {
      setSearchedUsers([]);
      showErrorToast(err?.data?.message || "Search failed");
    }
  };

  return (
    <div>
      <div className="mt-3 md:mt-0">
        <h1 className="text-base md:text-lg font-semibold text-gray-text">
          Add Members to workspace
        </h1>
        <p className="mt-2 text-gray-text max-w-3xl leading-[1.3] text-sm">
          Invite new members to your workspace easily — add collaborators by
          email and assign roles to get them started quickly and securely
        </p>
      </div>
      <hr className="my-5" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full space-y-3 md:space-x-3 md:flex ">
            <FormField
              control={form.control}
              name="searchValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search user by email address"
                      className="!h-[40px] md:min-w-75 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

      <hr className="mt-2" />

      {isFetching && <MainLoader className="mt-5"></MainLoader>}

      {hasSearched && searchedUsers.length === 0 && !isFetching && (
        <p className=" text-gray-500 mt-3">No users found</p>
      )}
      {!isFetching && searchedUsers.length > 0 && (
        <div className="divide-y">
          {data?.users.map((user) => (
            <SearchedUserCard user={user} key={user._id}></SearchedUserCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkspaceAddMember;
