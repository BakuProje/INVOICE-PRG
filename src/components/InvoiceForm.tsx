import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileImage } from "lucide-react";

interface InvoiceData {
  logo: string;
  signature: string;
  company: string;
  whatsapp: string;
  address: string;
  day: string;
  month: string;
  year: string;
  description: string;
  duration: string;
  price: string;
  totalOverride: string;
  note: string;
}

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: string) => void;
  onDownloadImage: () => void;
  onDownloadPDF: () => void;
  onLogoUpload: (file: File) => void;
  onSignatureUpload: (file: File) => void;
  autoTotal: number;
}

const formatRupiahPreview = (amount: number) =>
  "Rp. " + new Intl.NumberFormat("id-ID").format(amount) + ",-";

const InvoiceForm = ({ data, onChange, onDownloadImage, onDownloadPDF, onLogoUpload, onSignatureUpload, autoTotal }: InvoiceFormProps) => {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSignatureUpload(file);
    }
  };

  const discount = data.totalOverride !== "" ? autoTotal - (Number(data.totalOverride) || 0) : 0;

  return (
    <div className="bg-card/80 backdrop-blur-md border border-border rounded p-6 glow-border h-fit space-y-4">
      <h1 className="font-display text-lg text-primary glow-text uppercase tracking-[3px] border-l-4 border-primary pl-3 mb-6">
        PRG INVOICE
      </h1>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Logo</Label>
        <div className="flex gap-2">
          <Input
            value={data.logo}
            onChange={(e) => onChange("logo", e.target.value)}
            placeholder="URL Logo"
            className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20"
          />
          <label className="flex items-center justify-center px-3 bg-surface-elevated border border-muted rounded cursor-pointer hover:border-primary transition-colors">
            <FileImage className="w-4 h-4 text-muted-foreground" />
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Tanda Tangan</Label>
        <div className="flex gap-2">
          <Input
            value={data.signature}
            onChange={(e) => onChange("signature", e.target.value)}
            placeholder="URL Tanda Tangan"
            className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20"
          />
          <label className="flex items-center justify-center px-3 bg-surface-elevated border border-muted rounded cursor-pointer hover:border-primary transition-colors">
            <FileImage className="w-4 h-4 text-muted-foreground" />
            <input type="file" accept="image/*" className="hidden" onChange={handleSignatureChange} />
          </label>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Perusahaan</Label>
        <Input value={data.company} onChange={(e) => onChange("company", e.target.value)} className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">WhatsApp</Label>
        <Input value={data.whatsapp} onChange={(e) => onChange("whatsapp", e.target.value)} className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Alamat</Label>
        <textarea
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
          rows={2}
          className="flex w-full rounded border border-muted bg-surface-elevated px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-colors resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Tanggal (Tgl Bln Thn)</Label>
        <div className="grid grid-cols-3 gap-2">
          <Input value={data.day} onChange={(e) => onChange("day", e.target.value)} placeholder="16" className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" />
          <Input value={data.month} onChange={(e) => onChange("month", e.target.value)} placeholder="Maret" className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" />
          <Input value={data.year} onChange={(e) => onChange("year", e.target.value)} placeholder="2026" className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Deskripsi Layanan</Label>
        <Input value={data.description} onChange={(e) => onChange("description", e.target.value)} className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Durasi (Hari)</Label>
        <Input 
          type="text" 
          inputMode="numeric"
          value={data.duration} 
          onChange={(e) => onChange("duration", e.target.value.replace(/\D/g, ""))} 
          placeholder="Misal: 3"
          className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" 
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Harga per Hari (Rp)</Label>
        <Input 
          type="text" 
          inputMode="numeric"
          value={data.price ? new Intl.NumberFormat("id-ID").format(Number(data.price)) : ""} 
          onChange={(e) => onChange("price", e.target.value.replace(/\D/g, ""))} 
          className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20" 
        />
      </div>

      {/* Total with manual override for discount */}
      <div className="space-y-1.5 border border-primary/30 rounded p-3 bg-primary/5">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-primary">Total Pembayaran (Rp)</Label>
        <div className="text-xs text-muted-foreground mb-1">
          Otomatis: {formatRupiahPreview(autoTotal)} — Kosongkan untuk pakai otomatis, atau isi manual untuk diskon
        </div>
        <Input
          type="text"
          inputMode="numeric"
          value={data.totalOverride ? new Intl.NumberFormat("id-ID").format(Number(data.totalOverride)) : ""}
          onChange={(e) => onChange("totalOverride", e.target.value.replace(/\D/g, ""))}
          placeholder={new Intl.NumberFormat("id-ID").format(autoTotal)}
          className="bg-surface-elevated border-primary/40 text-foreground text-sm focus:border-primary focus:ring-primary/20"
        />
        {discount > 0 && (
          <div className="text-xs text-green-400 font-medium mt-1">
            💰 Diskon: {formatRupiahPreview(discount)}
          </div>
        )}
      </div>

      <div className="space-y-1.5 border border-muted/50 rounded p-3 bg-muted/10">
        <Label className="text-[0.7rem] uppercase tracking-[1.5px] text-muted-foreground">Catatan / Note</Label>
        <Input
          value={data.note}
          onChange={(e) => onChange("note", e.target.value)}
          placeholder="Catatan tambahan (Uang kurang / lebih)"
          className="bg-surface-elevated border-muted text-foreground text-sm focus:border-primary focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="neon" size="lg" onClick={onDownloadImage}>
          <FileImage className="w-4 h-4 mr-1" /> JPG
        </Button>
        <Button variant="neon-outline" size="lg" onClick={onDownloadPDF}>
          <Download className="w-4 h-4 mr-1" /> PDF
        </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
