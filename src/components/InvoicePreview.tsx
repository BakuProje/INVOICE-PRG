import React from "react";

interface InvoicePreviewProps {
  logo: string;
  signature: string;
  company: string;
  whatsapp: string;
  address: string;
  date: string;
  description: string;
  duration: string;
  priceFormatted: string;
  totalFormatted: string;
  note: string;
  invoiceRef: React.RefObject<HTMLDivElement>;
}

const InvoicePreview = ({
  logo,
  signature,
  company,
  whatsapp,
  address,
  date,
  description,
  duration,
  priceFormatted,
  totalFormatted,
  note,
  invoiceRef,
}: InvoicePreviewProps) => {
  return (
    <div className="flex justify-center">
      <div
        ref={invoiceRef}
        style={{
          width: 800,
          minHeight: 1131,
          color: "#1e293b",
          padding: 60,
          position: "relative",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          backgroundImage: "url('/invoice-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, position: "relative", zIndex: 1 }}>
          {/* Company Info - LEFT */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 15 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "auto", height: "auto", maxWidth: 180, maxHeight: 90, objectFit: "contain", borderRadius: 8 }}
              crossOrigin="anonymous"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {company}
              </p>
              <div style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, marginTop: 4 }}>
                <div>{whatsapp}</div>
                <div>{address}</div>
              </div>
            </div>
          </div>

          {/* INVOICE text + Date - RIGHT */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "3rem",
                fontWeight: 800,
                color: "#0ea5e9",
                letterSpacing: 6,
                textShadow: "0 0 20px rgba(14,165,233,0.4)",
                lineHeight: 1,
              }}
            >
              INVOICE
            </div>
            <div style={{ fontSize: "0.9rem", fontWeight: 500, marginTop: 12, color: "#475569" }}>
              Makassar, {date}
            </div>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", position: "relative", zIndex: 1 }}>
          <thead>
            <tr>
              <th
                style={{
                  background: "#0f172a",
                  color: "white",
                  textAlign: "left",
                  padding: "12px 15px",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: 1,
                }}
              >
                PAKET RENTAL
              </th>
              <th
                style={{
                  background: "#0f172a",
                  color: "white",
                  textAlign: "center",
                  padding: "12px 15px",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: 1,
                }}
              >
                JUMLAH HARI
              </th>
              <th
                style={{
                  background: "#0f172a",
                  color: "white",
                  textAlign: "right",
                  padding: "12px 15px",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: 1,
                }}
              >
                HARGA PER HARI
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 15, borderBottom: "1px solid #e2e8f0" }}>{description || "-"}</td>
              <td style={{ padding: 15, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>{duration ? `${duration} Hari` : "-"}</td>
              <td style={{ padding: 15, borderBottom: "1px solid #e2e8f0", textAlign: "right" }}>{priceFormatted}</td>
            </tr>
            <tr style={{ fontWeight: "bold", background: "rgba(248,250,252,0.8)" }}>
              <td colSpan={2} style={{ padding: 15, textAlign: "right" }}>
                TOTAL PEMBAYARAN
              </td>
              <td style={{ padding: 15, textAlign: "right", color: "#0f172a", fontSize: "1.1rem" }}>
                {totalFormatted}
              </td>
            </tr>
            {note && (
              <tr>
                <td colSpan={3} style={{ padding: 15, textAlign: "right", color: "#b91c1c", fontSize: "0.9rem", fontStyle: "italic", borderTop: "1px dashed #cbd5e1" }}>
                  *Note: {note}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer Signature */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#333", marginBottom: -15, zIndex: 10, position: "relative" }}>
            {company}
          </div>
          <img
            src={signature}
            alt="Signature"
            style={{ width: 280, height: 130, objectFit: "contain", marginBottom: -15 }}
            crossOrigin="anonymous"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ fontWeight: "normal", color: "#333", marginBottom: 2, fontSize: "1rem" }}>
            Muhammad Fatri Syeh
          </div>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>(Pemilik)</div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
