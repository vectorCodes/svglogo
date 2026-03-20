import { Button, Label, Modal, Separator, Tabs } from "@heroui/react";
import { CHANGELOG } from "#/data/changelog";
import { PRICE_ONE_TIME, PRICE_ONE_TIME_EARLY } from "#/data/creator-plan";

const shortcuts = [
  { action: "Undo", shortcut: "⌘ + Z" },
  { action: "Redo", shortcut: "⌘ + ⇧ + Z" },
  { action: "Open Icon Picker", shortcut: "I" },
  { action: "Like / Add to Collection", shortcut: "L" },
  { action: "Copy image (PNG)", shortcut: "⌘ + C" },
  { action: "Copy icon data", shortcut: "⇧ + C" },
  { action: "Paste icon data", shortcut: "⇧ + V" },
];


interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
  highlightLatest?: boolean;
}

export function InfoModal({ isOpen, onClose, defaultTab, highlightLatest }: InfoModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Backdrop isDismissable>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Body className="p-0">
              <img src="/logo512.png" alt="SVGLogo" className="w-16 h-16" />

              <Tabs className="w-full mt-6" defaultSelectedKey={defaultTab ?? "about"}>
                <Tabs.ListContainer>
                  <Tabs.List
                    aria-label="Info sections"
                    // className="w-fit *:h-7 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
                  >
                    <Tabs.Tab id="about">
                      About
                      <Tabs.Indicator className="bg-accent" />
                    </Tabs.Tab>
                    <Tabs.Tab id="shortcuts">
                      Shortcuts
                      <Tabs.Indicator className="bg-accent" />
                    </Tabs.Tab>
                    <Tabs.Tab id="changelog">
                      Changelog
                      <Tabs.Indicator className="bg-accent" />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>

                <Tabs.Panel id="about" className="h-64 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-3 text-sm text-muted h-full">
                    <p>
                      Free browser-based logo maker — pick an icon, customize colors and backgrounds, export as SVG, PNG, or ICO. No account needed to get started.
                      <Separator className="mt-4"/>
                    </p>
                    <p>
                      Need brand kits, social assets, and logo variants?{" "}
                      <a href="/creator" className="text-primary hover:underline font-medium">Creator Plan</a>
                      {" "}is a one-time purchase at ${PRICE_ONE_TIME_EARLY}.
                    </p>
                    <span className="flex-1"/>
                    <p>
                      Free to use for any purpose, forever.
                    </p>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel id="shortcuts" className="h-64 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-2">
                    {shortcuts.map((s) => (
                      <div
                        key={s.action}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-muted">{s.action}</span>
                        <kbd className="rounded bg-surface-secondary px-2 py-0.5 text-xs font-mono">
                          {s.shortcut}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </Tabs.Panel>

                <Tabs.Panel id="changelog" className="h-64 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-5">
                    {CHANGELOG.map((entry, i) => (
                      <div
                        key={entry.date}
                        className={
                          i === 0 && highlightLatest
                            ? "rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 -mx-1"
                            : undefined
                        }
                      >
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-sm font-semibold">{entry.date}</span>
                          {i === 0 && highlightLatest && (
                            <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">
                              new
                            </span>
                          )}
                        </div>
                        <ul className="flex flex-col gap-1">
                          {entry.changes.map((change) => (
                            <li
                              key={change}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Tabs.Panel>
              </Tabs>
            </Modal.Body>

            <Modal.Footer>
              <Button onPress={onClose}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
