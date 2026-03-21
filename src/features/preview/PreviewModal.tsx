import { Button, Modal } from "@heroui/react";
import { Lock } from "@gravity-ui/icons";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useAuth } from "#/queries/auth/use-auth";
import { AuthModal } from "#/features/auth/AuthModal";
import { AppStoreMockup } from "./mockups/AppStoreMockup";
import { GooglePlayMockup } from "./mockups/GooglePlayMockup";
import { FaviconMockup } from "./mockups/FaviconMockup";
import { XMockup } from "./mockups/XMockup";
import { SlackMockup } from "./mockups/SlackMockup";
import { DiscordMockup } from "./mockups/DiscordMockup";
import { GitHubMockup } from "./mockups/GitHubMockup";
import { InstagramMockup } from "./mockups/InstagramMockup";
import { LinkedInMockup } from "./mockups/LinkedInMockup";
import { PLATFORMS } from "#/data/platforms";

const MOCKUP_MAP: Record<string, () => React.JSX.Element> = {
  "app-store": AppStoreMockup,
  "google-play": GooglePlayMockup,
  favicon: FaviconMockup,
  x: XMockup,
  slack: SlackMockup,
  discord: DiscordMockup,
  github: GitHubMockup,
  instagram: InstagramMockup,
  linkedin: LinkedInMockup,
};

const FREE_PREVIEW_COUNT = 3;

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  const user = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const isCreator = user?.plan === "creator";
  const visiblePlatforms = isCreator ? PLATFORMS : PLATFORMS.slice(0, FREE_PREVIEW_COUNT);
  const lockedPlatforms = PLATFORMS.slice(FREE_PREVIEW_COUNT);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Preview</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="flex flex-col gap-4">
                  {visiblePlatforms.map((p) => {
                    const Mockup = MOCKUP_MAP[p.id];
                    if (!Mockup) return null;
                    return (
                      <div key={p.id} className="flex flex-col gap-1.5">
                        <p className="text-xs font-medium text-muted">{p.label}</p>
                        <Mockup />
                      </div>
                    );
                  })}

                  {!isCreator && (
                    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5">
                      <Lock className="size-5 text-muted" />
                      <p className="text-sm font-medium">Upgrade to Creator Plan to unlock all previews</p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {lockedPlatforms.map((p) => (
                          <div key={p.id} className="flex items-center gap-1.5 text-muted">
                            <Icon icon={p.icon} width={16} height={16} />
                            <span className="text-xs">{p.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
