import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import type { CardListType } from "../types/list.type";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUpdateListMutation } from "../api/list.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useBoardId from "@/hooks/useBoardId";
import { showErrorToast } from "@/lib/toastHandler";

function CardList({ cardList }: { cardList: CardListType }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(cardList.title);
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const [updateList, { isLoading }] = useUpdateListMutation();

  const handleSave = async () => {
    setIsEditing(false);
    if (!title.trim()) {
      showErrorToast("List title cannot be empty");
      setTitle(cardList.title);
      return;
    }
    if (title.trim() === cardList.title) return;
    try {
      await updateList({
        workspaceId,
        boardId,
        listId: cardList._id,
        body: { title: title.trim() },
      }).unwrap();
    } catch {
      setTitle(cardList.title);
    }
  };

  const handleCancel = () => {
    setTitle(cardList.title);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Use setTimeout to ensure the input is rendered before focusing
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  return (
    <Card className="w-full min-w-[250px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between space-x-5">
          {isEditing ? (
            <Input
              disabled={isLoading}
              className="font-semibold"
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                } else if (e.key === "Escape") {
                  handleCancel();
                }
              }}
            />
          ) : (
            <CardTitle onClick={handleEdit} className="cursor-pointer">
              {cardList.title}
            </CardTitle>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        cards
        {/* //todo- cards todo- Cards will render here */}
        <Button className="w-full justify-start">
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardList;
