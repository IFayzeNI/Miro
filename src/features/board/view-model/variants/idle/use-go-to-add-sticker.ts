import type { ViewModelParams } from "../../view-model-params";
import { goToAddSticker } from "../add-sticker";

export function useGoToAddSticker({ setViewState }: ViewModelParams) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "s") {
      setViewState(goToAddSticker());
    }
  };
  const handleActionClick = () => {
    setViewState(goToAddSticker());
  };
  return {
    handleKeyDown,
    handleActionClick,
  };
}
