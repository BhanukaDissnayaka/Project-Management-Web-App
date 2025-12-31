import React, { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateListMutation } from "../api/list.api";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useBoardId from "@/hooks/useBoardId";

const CreateListCard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();

  const [createList, { isLoading }] = useCreateListMutation();

  const handleCreate = async () => {
    try {
      const body = { title, description, position: 0 };
      const res = await createList({
        workspaceId,
        boardId,
        body,
      }).unwrap();
      showSuccessToast(res.message || "List created successfully");
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    } catch (err) {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsExpanded(false);
  };

  return (
    <div>
      <div
        ref={cardRef}
        className={`bg-sidebar-primary-foreground rounded-lg shadow-md   ${
          isExpanded ? "max-w-md p-6" : "w-64 "
        }`}
      >
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full p-4  flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create New List</span>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New List
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter list title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter list description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleCreate}
                  disabled={!title.trim() || isLoading}
                  className="flex-1"
                >
                  Create
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateListCard;
