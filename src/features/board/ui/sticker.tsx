import clsx from "clsx";
import { useLayoutEffect, useRef, useState, type Ref } from "react";

export function Sticker({
  id,
  ref,
  text,
  x,
  y,
  onClick,
  isSelected,
  isEditing,
  onTextChange,
}: {
  id: string;
  ref: Ref<HTMLButtonElement>;
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected?: boolean;
  isEditing?: boolean;
  onTextChange?: (text: string) => void;
}) {
  return (
    <button
      data-id={id}
      ref={ref}
      onClick={onClick}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md text-left",
        isSelected && "outline-2 outline-blue-500",
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <TextAreaAutoSize
        value={text}
        onChange={onTextChange}
        isEditing={isEditing}
      />
    </button>
  );
}

function TextAreaAutoSize({
  value,
  onChange,
  isEditing,
}: {
  value: string;
  onChange?: (value: string) => void;
  isEditing?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const { scrollHeight, scrollWidth } = ref.current;
    setHeight(scrollHeight);
    setWidth(scrollWidth);
  }, [value]);
  return (
    <div className="relative">
      <div
        ref={ref}
        className={clsx("whitespace-pre-wrap", isEditing && "opacity-0")}
      >
        {value}
      </div>
      {isEditing && (
        <textarea
          className="absolute left-0 top-0 resize-none overflow-hidden focus:outline-none"
          value={value}
          autoFocus
          onChange={(e) => onChange?.(e.target.value)}
          style={{ width: width + 2, height: height + 2 }}
        />
      )}
    </div>
  );
}
