import type { ViewModelParams } from "../view-model-params";
import type { ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type EditStickerViewState = {
  type: "edit-sticker";
  stickerId: string;
  newText?: string;
};

export function useEditStickerViewModel({
  nodesModel,
  setViewState,
}: ViewModelParams) {
  return (viewState: EditStickerViewState): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => {
      if (node.id === viewState.stickerId) {
        return {
          ...node,
          isSelected: true,
          isEditing: true,
          text: viewState.newText ?? node.text,
          onTextChange: (text: string) => {
            setViewState({ ...viewState, newText: text });
          },
        };
      }
      // 3 10 10
      return node;
    }),
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setViewState(goToIdle());
          if (viewState.newText) {
            nodesModel.updateStickerText(
              viewState.stickerId,
              viewState.newText,
            );
          }
          // if (e.key === "Enter") {
          // }
          setViewState(goToIdle());
        }
      },
    },
    overlay: {
      onClick: () => {
        if (viewState.newText) {
          nodesModel.updateStickerText(viewState.stickerId, viewState.newText);
        }
        setViewState(goToIdle());
      },
    },
  });
}

export function goToEditSticker(stickerId: string): EditStickerViewState {
  return { type: "edit-sticker", stickerId };
}
