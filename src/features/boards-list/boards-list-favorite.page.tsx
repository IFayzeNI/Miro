import { useBoardsList } from "./model/use-boards-list";
import { useUpdateFavorite } from "./model/use-update-favorite";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";
import { useState } from "react";
import { BoardItem } from "./compose/board-item";
import { BoardCard } from "./compose/board-card";
import { BoardsSidebar } from "./ui/boards-sidebar";

function BoardsListPage() {
  const boardsQuery = useBoardsList({
    isFavorite: true,
  });
  const updateFavorite = useUpdateFavorite();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const boards = boardsQuery.boards.filter((board) =>
    updateFavorite.isOptimisticFavorite(board),
  );

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можете просматривать и управлять своими избранными досками"
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
      list={
        <BoardsListLayoutContent
          isEmpty={boardsQuery.boards.length === 0}
          isPending={boardsQuery.isPending}
          isPendingNext={boardsQuery.isFetchingNextPage}
          cursorRef={boardsQuery.cursorRef}
          hasCursor={boardsQuery.hasNextPage}
          mode={viewMode}
          renderGrid={() =>
            boards.map((board) => <BoardCard key={board.id} board={board} />)
          }
          renderList={() =>
            boards.map((board) => <BoardItem key={board.id} board={board} />)
          }
        />
      }
    />
  );
}

export const Component = BoardsListPage;
