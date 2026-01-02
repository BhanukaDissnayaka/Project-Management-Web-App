import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import type { CardListType } from "../types/list.type";

function CardList({ cardList }: { cardList: CardListType }) {
  return (
    <Card className="w-full min-w-[250px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{cardList.title}</CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6 ">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        cards
        {/* //todo- cards todo- Crads will render here */}
        <Button className="w-full justify-start ">
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </CardContent>
    </Card>
  );
}
export default CardList;
