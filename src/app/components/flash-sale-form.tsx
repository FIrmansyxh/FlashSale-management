import { useState } from "react";
import {
  Check,
  AlertTriangle,
  Info,
  Trash2,
  Upload,
  FileText,
  X,
  Clock,
  Calendar,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary: "#D44000",
  primaryBg: "#FFF3EF",
  pageBg: "#F5F5F5",
  card: "#FFFFFF",
  border: "#E0E0E0",
  green: "#1D9E75",
  greenBg: "#EAF3DE",
  greenText: "#3B6D11",
  warnBg: "#FFFBE6",
  warnBorder: "#FFD666",
  warnText: "#7A5800",
  errorText: "#C0392B",
  errorBg: "#FCEBEB",
  textMain: "#1A1A1A",
  textSub: "#666666",
  textMuted: "#999999",
  btnSecBorder: "#D0D0D0",
  btnSecText: "#333333",
  disabled: "#F0F0F0",
  disabledText: "#AAAAAA",
};

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = ["Jadwal Sesi", "Input Produk", "Preview & Konfirmasi"];

function Stepper({ current }: { current: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "20px 32px",
        marginBottom: 20,
      }}
    >
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        const isPending = stepNum > current;

        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
            {/* Circle + label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isDone ? C.green : isActive ? C.primary : "transparent",
                  border: isPending ? `2px solid ${C.border}` : "none",
                  color: isDone || isActive ? "#fff" : C.textMuted,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {isDone ? <Check size={15} strokeWidth={3} /> : stepNum}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 400,
                  color: isDone ? C.textSub : isActive ? C.textMain : C.textMuted,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: isDone ? C.green : C.border,
                  margin: "0 12px",
                  marginBottom: 18,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Input styles ─────────────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  border: `1px solid ${C.border}`,
  borderRadius: 6,
  padding: "8px 12px",
  fontSize: 13,
  color: C.textMain,
  background: "#fff",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const inputError: React.CSSProperties = {
  ...inputBase,
  border: `1px solid ${C.errorText}`,
  background: "#FFF8F8",
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: C.textMain,
  marginBottom: 4,
  display: "block",
};

// ─── STEP 1: Jadwal Sesi ──────────────────────────────────────────────────────
function Step1({ onNext, onCancel }: { onNext: () => void; onCancel: () => void }) {
  return (
    <div>
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: 15, fontWeight: 700, color: C.textMain, margin: "0 0 20px" }}>
          Detail Jadwal Sesi
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          {/* Nama Sesi */}
          <div>
            <label style={labelStyle}>
              Nama Sesi <span style={{ color: C.errorText }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                style={inputBase}
                defaultValue="Flash Sale Gadget Akhir Pekan"
                maxLength={100}
                placeholder="Contoh: Flash Sale Gadget Akhir Pekan"
              />
              <span
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 9,
                  fontSize: 11,
                  color: C.textMuted,
                }}
              >
                33/100
              </span>
            </div>
          </div>

          {/* Row: Tanggal & Jam Mulai */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>
                Tanggal Mulai <span style={{ color: C.errorText }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input style={inputBase} defaultValue="12/06/2026" readOnly />
                <Calendar size={13} color={C.textMuted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>
                Jam Mulai <span style={{ color: C.errorText }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input style={inputBase} defaultValue="10.00 WIB" readOnly />
                <Clock size={13} color={C.textMuted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
          </div>

          {/* Row: Tanggal & Jam Berakhir */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>
                Tanggal Berakhir <span style={{ color: C.errorText }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input style={inputBase} defaultValue="12/06/2026" readOnly />
                <Calendar size={13} color={C.textMuted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>
                Jam Berakhir <span style={{ color: C.errorText }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input style={{ ...inputError }} defaultValue="09.00 WIB" readOnly />
                <Clock size={13} color={C.errorText} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
              <p style={{ fontSize: 11, color: C.errorText, margin: "4px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                <AlertTriangle size={11} /> Waktu berakhir harus setelah waktu mulai
              </p>
            </div>
          </div>

          {/* Durasi — read only */}
          <div>
            <label style={labelStyle}>Durasi Sesi</label>
            <input
              style={{ ...inputBase, background: C.disabled, color: C.textSub, cursor: "not-allowed" }}
              value="2 jam 0 menit"
              readOnly
            />
            <p style={{ fontSize: 11, color: C.textMuted, margin: "4px 0 0" }}>
              Dihitung otomatis dari jam mulai dan jam berakhir
            </p>
          </div>
        </div>
      </div>

      {/* Overlap Warning */}
      <div
        style={{
          display: "flex",
          gap: 10,
          background: C.warnBg,
          border: `1px solid ${C.warnBorder}`,
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 20,
          alignItems: "flex-start",
        }}
      >
        <AlertTriangle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 13, color: C.warnText, margin: 0 }}>
          Jadwal ini bertabrakan dengan sesi{" "}
          <strong>'Flash Sale Fashion Siang'</strong> (10 Jun 2026, 14.00–16.00 WIB). Pilih slot waktu lain atau lanjutkan jika berbeda.
        </p>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onCancel} style={secBtn}>Batal</button>
        <button
          style={{ ...priBtn, opacity: 0.5, cursor: "not-allowed" }}
          disabled
        >
          Lanjut ke Step 2 →
        </button>
      </div>
    </div>
  );
}

// ─── STEP 2: Input Produk ─────────────────────────────────────────────────────
const products = [
  {
    no: 1, sku: "PROD0001", nama: "Kaos Polos Oversize Pria",
    hargaNormal: "Rp 120.000", diskon: "20", hargaFlash: "Rp 96.000", qty: "20",
    state: "ok",
  },
  {
    no: 2, sku: "PROD7718", nama: "Kemeja Batik Pria Premium",
    hargaNormal: "Rp 250.000", diskon: "0", hargaFlash: "Rp 250.000", qty: "10",
    state: "warn-diskon",
  },
  {
    no: 3, sku: "PROD9999", nama: "—",
    hargaNormal: "—", diskon: "—", hargaFlash: "—", qty: "—",
    state: "error-sku",
  },
  {
    no: 4, sku: "PROD3386", nama: "Rice Cooker Miyabi 1.8L",
    hargaNormal: "Rp 450.000", diskon: "10", hargaFlash: "Rp 405.000", qty: "50",
    state: "warn-qty",
  },
];

function Step2({ onNext, onBack, showModal, setShowModal }: {
  onNext: () => void;
  onBack: () => void;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const thS: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 12,
    fontWeight: 600,
    color: C.textSub,
    background: "#FAFAFA",
    borderBottom: `1px solid ${C.border}`,
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  const tdS: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 13,
    verticalAlign: "top",
    borderBottom: `1px solid ${C.border}`,
  };

  const cellInput = (val: string, disabled?: boolean, err?: boolean): React.CSSProperties => ({
    border: `1px solid ${err ? C.errorText : C.border}`,
    borderRadius: 6,
    padding: "6px 10px",
    fontSize: 12,
    color: disabled ? C.textMuted : C.textMain,
    background: disabled ? C.disabled : err ? "#FFF8F8" : "#fff",
    width: "100%",
    boxSizing: "border-box" as const,
    outline: "none",
    cursor: disabled ? "not-allowed" : "text",
  });

  return (
    <div style={{ position: "relative" }}>
      {/* Import Modal Overlay */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              width: 460,
              padding: 28,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textMain }}>
                Import Produk dari Excel / CSV
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}
              >
                <X size={18} color={C.textSub} />
              </button>
            </div>

            {/* Drop zone */}
            <div
              style={{
                border: `2px dashed ${C.border}`,
                borderRadius: 8,
                padding: "36px 20px",
                textAlign: "center",
                background: "#FAFAFA",
                marginBottom: 12,
                cursor: "pointer",
              }}
            >
              <FileText size={36} color={C.textMuted} style={{ marginBottom: 10 }} />
              <p style={{ margin: 0, fontSize: 13, color: C.textMain, fontWeight: 500 }}>
                Seret file ke sini atau klik untuk memilih
              </p>
            </div>
            <p style={{ fontSize: 11, color: C.textMuted, textAlign: "center", margin: "0 0 24px" }}>
              Format yang diterima: .xlsx, .xls, .csv &nbsp;|&nbsp; Maks. 1 MB
            </p>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={secBtn}>Batal</button>
              <button
                style={{
                  ...priBtn,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Upload size={14} /> Upload &amp; Parsing dengan AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session info banner */}
      <div
        style={{
          background: "#F0F7FF",
          border: "1px solid #B3D3F5",
          borderRadius: 8,
          padding: "10px 16px",
          fontSize: 13,
          color: "#1A4A7A",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Info size={14} />
        <span>
          <strong>Sesi:</strong> Flash Sale Gadget Akhir Pekan &nbsp;|&nbsp; 12 Jun 2026, 10.00–12.00 WIB
        </span>
      </div>

      {/* Table card */}
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {/* Table header row with import button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 16px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: C.textMain }}>Daftar Produk Flash Sale</span>
          <button
            onClick={() => setShowModal(true)}
            style={{
              ...secBtn,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
            }}
          >
            <Upload size={13} /> Import dari Excel/CSV
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["No", "SKU", "Nama Produk", "Harga Normal", "Diskon (%)", "Harga Flash Sale", "Qty Flash Sale", "Aksi"].map((h) => (
                <th key={h} style={thS}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const isErrSku = p.state === "error-sku";
              const isWarnDiskon = p.state === "warn-diskon";
              const isWarnQty = p.state === "warn-qty";
              const rowBg = isErrSku ? "#FFF8F8" : C.card;

              return (
                <tr key={p.no} style={{ background: rowBg }}>
                  <td style={{ ...tdS, color: C.textMuted, width: 32 }}>{p.no}</td>
                  <td style={{ ...tdS, width: 110 }}>
                    <input
                      style={cellInput(p.sku, false, isErrSku)}
                      defaultValue={p.sku}
                      readOnly
                    />
                    {isErrSku && (
                      <p style={{ fontSize: 10, color: C.errorText, margin: "3px 0 0", display: "flex", alignItems: "center", gap: 3 }}>
                        <AlertTriangle size={10} /> SKU tidak ditemukan atau tidak aktif
                      </p>
                    )}
                  </td>
                  <td style={{ ...tdS }}>
                    <input
                      style={cellInput(p.nama, isErrSku)}
                      defaultValue={isErrSku ? "" : p.nama}
                      placeholder={isErrSku ? "—" : ""}
                      readOnly
                    />
                  </td>
                  <td style={{ ...tdS, width: 110 }}>
                    <input style={cellInput(p.hargaNormal, isErrSku || true)} defaultValue={isErrSku ? "" : p.hargaNormal} readOnly />
                  </td>
                  <td style={{ ...tdS, width: 90 }}>
                    <input
                      style={cellInput(p.diskon, isErrSku, isWarnDiskon)}
                      defaultValue={isErrSku ? "" : p.diskon}
                      readOnly
                    />
                    {isWarnDiskon && (
                      <div style={{ marginTop: 4 }}>
                        <p style={{ fontSize: 10, color: C.warnText, margin: "0 0 3px", display: "flex", alignItems: "center", gap: 3 }}>
                          <AlertTriangle size={10} /> Diskon 0%, pastikan nilai benar
                        </p>
                        <label style={{ fontSize: 10, color: C.textSub, display: "flex", alignItems: "center", gap: 4 }}>
                          <input type="checkbox" style={{ accentColor: C.primary }} />
                          Saya konfirmasi
                        </label>
                      </div>
                    )}
                  </td>
                  <td style={{ ...tdS, width: 120 }}>
                    <input style={cellInput(p.hargaFlash, isErrSku || true)} defaultValue={isErrSku ? "" : p.hargaFlash} readOnly />
                  </td>
                  <td style={{ ...tdS, width: 110 }}>
                    <input
                      style={cellInput(p.qty, isErrSku, isWarnQty)}
                      defaultValue={isErrSku ? "" : p.qty}
                      readOnly
                    />
                    {isWarnQty && (
                      <p style={{ fontSize: 10, color: C.warnText, margin: "3px 0 0", display: "flex", alignItems: "center", gap: 3 }}>
                        <AlertTriangle size={10} /> Melebihi stok tersedia (30 unit)
                      </p>
                    )}
                  </td>
                  <td style={{ ...tdS, width: 44 }}>
                    <button style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}>
                      <Trash2 size={14} color={C.errorText} strokeWidth={1.8} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Below table */}
        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <button
            style={{
              border: `1px dashed ${C.primary}`,
              background: C.primaryBg,
              color: C.primary,
              borderRadius: 6,
              padding: "7px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Tambah SKU
          </button>
          <span style={{ fontSize: 12, color: C.textSub }}>
            <strong style={{ color: C.primary }}>4</strong> / 6 SKU ditambahkan
          </span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ ...secBtn, display: "flex", alignItems: "center", gap: 6 }}>
          <ChevronLeft size={14} /> Kembali ke Step 1
        </button>
        <button onClick={onNext} style={priBtn}>
          Lanjut ke Step 3 →
        </button>
      </div>
    </div>
  );
}

// ─── STEP 3: Preview & Konfirmasi ────────────────────────────────────────────
const previewProducts = [
  { nama: "Kaos Polos Oversize Pria", hargaNormal: "Rp 120.000", hargaFlash: "Rp 96.000", diskon: "20" },
  { nama: "Kemeja Batik Pria Premium", hargaNormal: "Rp 250.000", hargaFlash: "Rp 250.000", diskon: null },
  { nama: "Rice Cooker Miyabi 1.8L", hargaNormal: "Rp 450.000", hargaFlash: "Rp 405.000", diskon: "10" },
  { nama: "Lipstik Matte Wardah", hargaNormal: "Rp ???.???", hargaFlash: "Rp ???.???", diskon: "?" },
  { nama: "Minyak Goreng Bimoli 2L", hargaNormal: "Rp ???.???", hargaFlash: "Rp ???.???", diskon: "?" },
  { nama: "Sepatu Sneakers Pria", hargaNormal: "Rp ???.???", hargaFlash: "Rp ???.???", diskon: "?" },
];

function Step3({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      {/* Preview Section */}
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textSub }}>
            Pratinjau tampilan di halaman Home Jakmall
          </span>
        </div>

        {/* Simulated homepage flash sale section */}
        <div style={{ padding: 20, background: "#FFF9F7" }}>
          {/* Flash Sale Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  background: C.primary,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  padding: "4px 12px",
                  borderRadius: 4,
                  letterSpacing: 0.5,
                }}
              >
                ⚡ Flash Sale
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textSub }}>
              <span>Berakhir dalam:</span>
              <div style={{ display: "flex", gap: 4 }}>
                {["01", "45", "22"].map((seg, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span
                      style={{
                        background: C.textMain,
                        color: "#fff",
                        borderRadius: 4,
                        padding: "2px 7px",
                        fontFamily: "monospace",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {seg}
                    </span>
                    {i < 2 && <span style={{ color: C.textMain, fontWeight: 700 }}>:</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {previewProducts.map((p, i) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    height: 90,
                    background: "#EBEBEB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <ShoppingCart size={24} color="#CCCCCC" />
                  {p.diskon && p.diskon !== "?" && (
                    <span
                      style={{
                        position: "absolute",
                        top: 6,
                        left: 6,
                        background: C.primary,
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: 3,
                      }}
                    >
                      -{p.diskon}%
                    </span>
                  )}
                </div>
                <div style={{ padding: "8px 8px 10px" }}>
                  <p
                    style={{
                      fontSize: 11,
                      color: C.textMain,
                      margin: "0 0 4px",
                      lineHeight: 1.3,
                      fontWeight: 500,
                      height: 28,
                      overflow: "hidden",
                    }}
                  >
                    {p.nama}
                  </p>
                  <p style={{ fontSize: 10, color: C.textMuted, margin: "0 0 2px", textDecoration: "line-through" }}>
                    {p.hargaNormal}
                  </p>
                  <p style={{ fontSize: 13, color: C.primary, fontWeight: 700, margin: "0 0 8px" }}>
                    {p.hargaFlash}
                  </p>
                  <button
                    style={{
                      background: C.primary,
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "5px 0",
                      fontSize: 10,
                      fontWeight: 600,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textMain, margin: "0 0 16px" }}>
          Ringkasan Sesi
        </h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[
              ["Nama Sesi", "Flash Sale Gadget Akhir Pekan"],
              ["Jadwal", "12 Jun 2026, 10.00–12.00 WIB (durasi 2 jam)"],
              ["Jumlah SKU Valid", "3 dari 4 (1 SKU error diabaikan)"],
              ["Status setelah Publish", null],
              ["Dibuat oleh", "Rina Marlina (Marketing)"],
            ].map(([key, val], i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "10px 0", fontSize: 13, color: C.textSub, width: "30%", fontWeight: 500 }}>{key}</td>
                <td style={{ padding: "10px 0", fontSize: 13, color: C.textMain }}>
                  {key === "Status setelah Publish" ? (
                    <span
                      style={{
                        background: "#F1F1F1",
                        color: "#5F5E5A",
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 20,
                      }}
                    >
                      Terjadwal
                    </span>
                  ) : val}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Checklist */}
        <div
          style={{
            background: "#F8F8F8",
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            padding: "12px 16px",
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <input
            type="checkbox"
            id="confirm-check"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ accentColor: C.primary, width: 15, height: 15, cursor: "pointer" }}
          />
          <label htmlFor="confirm-check" style={{ fontSize: 13, color: C.textMain, cursor: "pointer" }}>
            Saya telah memeriksa seluruh data produk, harga, dan jadwal sesi
          </label>
        </div>

        {/* Access note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
            padding: "10px 14px",
            background: "#F5F5F5",
            borderRadius: 6,
            border: `1px solid ${C.border}`,
          }}
        >
          <Info size={14} color={C.textMuted} style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>
            Tombol <strong>Publish</strong> hanya aktif untuk Marketing Manager dan Admin
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ ...secBtn, display: "flex", alignItems: "center", gap: 6 }}>
          <ChevronLeft size={14} /> Kembali ke Step 2
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={secBtn}>Simpan sebagai Draft</button>
          <button
            style={{
              ...priBtn,
              opacity: checked ? 1 : 0.45,
              cursor: checked ? "pointer" : "not-allowed",
            }}
            disabled={!checked}
          >
            Publish Sesi
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared button styles ─────────────────────────────────────────────────────
const priBtn: React.CSSProperties = {
  background: C.primary,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "9px 18px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const secBtn: React.CSSProperties = {
  background: C.card,
  color: C.btnSecText,
  border: `1px solid ${C.btnSecBorder}`,
  borderRadius: 6,
  padding: "9px 18px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

// ─── Wizard Shell ─────────────────────────────────────────────────────────────
export function FlashSaleForm({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: 24, flex: 1, overflowY: "auto" }}>
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.textMain, margin: 0 }}>Buat Sesi Flash Sale</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "4px 0 0" }}>
            Lengkapi tiga langkah berikut untuk menjadwalkan sesi baru
          </p>
        </div>
      </div>

      <Stepper current={step} />

      {step === 1 && (
        <Step1
          onNext={() => setStep(2)}
          onCancel={onCancel}
        />
      )}
      {step === 2 && (
        <Step2
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {step === 3 && (
        <Step3 onBack={() => setStep(2)} />
      )}
    </div>
  );
}
