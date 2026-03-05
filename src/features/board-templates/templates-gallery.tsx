import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { TemplateCard } from "./template-card";

const templates = [
  {
    id: "1",
    name: "Template 1",
    description: "Template 1 description",
    thumbnail: "https://placehold.jp/150x100.png",
  },
  {
    id: "2",
    name: "Template 2",
    description: "Template 2 description",
    thumbnail: "https://placehold.jp/150x100.png",
  },
  {
    id: "3",
    name: "Template 3",
    description: "Template 3 description",
    thumbnail: "https://placehold.jp/150x100.png",
  },
  {
    id: "4",
    name: "Template 4",
    description: "Template 4 description",
    thumbnail: "https://placehold.jp/150x100.png",
  },
];

export function TemplatesGallery({ className }: { className?: string }) {
  return (
    <ScrollArea className={className}>
      <div className="flex gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => {}}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
