import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export function CreatorPlanButton() {
  return (
    <a href="/creator" rel="noopener noreferrer" target="_blank">
      <Button size="lg" data-umami-event="click creator plan">
        <Icon icon="lucide:crown" width={16} height={16} className="text-primary" />
        Creator Plan
      </Button>
    </a>
  );
}
