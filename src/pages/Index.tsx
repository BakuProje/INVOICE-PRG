import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";

const formatRupiah = (amount: number) => {
  return "Rp. " + new Intl.NumberFormat("id-ID").format(amount) + ",-";
};

const getIndonesianMonth = (monthIndex: number) => {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return months[monthIndex];
};

const today = new Date();
const defaultDay = today.getDate().toString();
const defaultMonth = getIndonesianMonth(today.getMonth());
const defaultYear = today.getFullYear().toString();

const Index = () => {
  const invoiceRef = useRef<HTMLDivElement>(null!);
  const [data, setData] = useState({
    logo: "/LOGO.png",
    signature: "https://files.catbox.moe/wqa1rv.png",
    company: "PRG MAKASSAR",
    whatsapp: "082349918631",
    address: "JL SUKAMAJU 1 NO 2B",
    day: defaultDay,
    month: defaultMonth,
    year: defaultYear,
    description: "",
    duration: "",
    price: "",
    totalOverride: "",
    note: "",
  });

  const onChange = useCallback((field: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onLogoUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setData((prev) => ({ ...prev, logo: url }));
  }, []);

  const onSignatureUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setData((prev) => ({ ...prev, signature: url }));
  }, []);

  const price = Number(data.price) || 0;
  const duration = data.duration ? Number(data.duration) : 0;
  const autoTotal = price * duration;
  const total = data.totalOverride !== "" ? (Number(data.totalOverride) || 0) : autoTotal;

  const handleCapture = async () => {
    if (!invoiceRef.current) return null;
    
    // Ensure all images are fully loaded before capturing
    const images = Array.from(invoiceRef.current.querySelectorAll("img"));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      })
    );

    // Wait for fonts to be ready
    if (document.fonts) {
      await document.fonts.ready;
    }

    return html2canvas(invoiceRef.current, {
      scale: 4,
      useCORS: true,
      allowTaint: false,
      scrollY: -window.scrollY,
    });
  };

  const downloadImage = async () => {
    const canvas = await handleCapture();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Invoice-PRG-${Date.now()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = await handleCapture();
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-PRG-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat" style={{ backgroundImage: "url('/website-bg.png')" }}>
      <div className="min-h-screen bg-background/80 backdrop-blur-sm">
        {/* Header */}
        <header className="border-b border-border py-4 px-6 bg-card/50 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-sm" />
            <h1 className="font-display text-primary text-sm tracking-[4px] uppercase glow-text">
              PRG Makassar — Invoice Generator
            </h1>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-[1400px] mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-8">
          <InvoiceForm
            data={data}
            onChange={onChange}
            onDownloadImage={downloadImage}
            onDownloadPDF={downloadPDF}
            onLogoUpload={onLogoUpload}
            onSignatureUpload={onSignatureUpload}
            autoTotal={autoTotal}
          />

          <div className="overflow-x-auto">
            <InvoicePreview
              invoiceRef={invoiceRef}
              logo={data.logo}
              signature={data.signature}
              company={data.company}
              whatsapp={data.whatsapp}
              address={data.address}
              date={`${data.day} ${data.month} ${data.year}`}
              description={data.description}
              duration={data.duration}
              priceFormatted={formatRupiah(price)}
              totalFormatted={formatRupiah(total)}
              note={data.note}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
