import { Button, Checkbox, Label, Modal, Separator, Switch } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { SOCIAL_ASSETS } from "#/data/social-assets";
import { exportBrandKit } from "#/commands/export/export-brand-kit";

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrandKitModal({ isOpen, onClose }: BrandKitModalProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>(
    SOCIAL_ASSETS.map((a) => a.id),
  );
  const [includeSvg, setIncludeSvg] = useState(true);
  const [includePng, setIncludePng] = useState(true);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const toggleAsset = (id: string) => {
    setSelectedAssets((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const totalFiles =
    (includeLogo ? 3 : 0) +
    selectedAssets.length * ((includeSvg ? 1 : 0) + (includePng ? 1 : 0));

  const canExport = totalFiles > 0 && (includeSvg || includePng || includeLogo);

  const handleExport = async () => {
    if (!canExport) return;
    setIsExporting(true);
    try {
      await exportBrandKit({
        socialAssets: selectedAssets,
        includeSvg,
        includePng,
        includeLogo,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Brand Kit Export</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-5">
              {/* Logo */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <Label className="text-sm">Include logo</Label>
                  <span className="text-xs text-muted">SVG + PNG (512, 1024)</span>
                </div>
                <Switch isSelected={includeLogo} onChange={setIncludeLogo}>
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch>
              </div>

              <Separator orientation="horizontal" variant="secondary" />

              {/* Social assets */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">Social Assets</p>
                <div className="flex flex-col gap-2 max-h-40 overflow-auto">
                  {SOCIAL_ASSETS.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => toggleAsset(asset.id)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                        selectedAssets.includes(asset.id)
                          ? "border-accent/40 bg-accent/5"
                          : "border-border hover:border-border/80 hover:bg-surface-secondary"
                      }`}
                    >
                      <Checkbox
                        isSelected={selectedAssets.includes(asset.id)}
                        onChange={() => toggleAsset(asset.id)}
                        aria-label={asset.label}
                      >
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox>
                      <Icon icon={asset.icon} width={16} height={16} className="text-muted shrink-0" />
                      <div className="flex flex-col flex-1">
                        <Label>{asset.label}</Label>
                        <span className="text-xs text-muted">{asset.width} × {asset.height}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Separator orientation="horizontal" variant="secondary" />

              {/* Format options */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">Formats</p>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">SVG</Label>
                  <Switch isSelected={includeSvg} onChange={setIncludeSvg}>
                    <Switch.Control><Switch.Thumb /></Switch.Control>
                  </Switch>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">PNG</Label>
                  <Switch isSelected={includePng} onChange={setIncludePng}>
                    <Switch.Control><Switch.Thumb /></Switch.Control>
                  </Switch>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="flex items-center justify-between">
              <span className="text-xs text-muted">
                {totalFiles === 0 ? "Nothing selected" : `${totalFiles} files`}
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button
                  variant="primary"
                  onPress={handleExport}
                  isDisabled={!canExport || isExporting}
                  isPending={isExporting}
                >
                  Export ZIP
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
