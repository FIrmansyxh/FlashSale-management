import { useState, useEffect } from "react";
import {
  LayoutDashboard, Zap, Package, Users, BarChart2, Settings,
  ChevronRight, Search, Eye, Edit2, Copy, Trash2, XCircle,
  ChevronLeft, ChevronRight as ChevronRightIcon, Calendar,
  AlertTriangle, Info, Upload, FileText, X, Clock, ShoppingCart, Check,
} from "lucide-react";

/* MARKER-MAKE-KIT-INVOKED */

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary: "#D44000",
  primaryBg: "#FFF3EF",
  pageBg: "#F5F5F5",
  card: "#FFFFFF",
  border: "#E0E0E0",
  sidebarBg: "#FAFAFA",
  topbar: "#FFFFFF",
  badgeActive: { bg: "#EAF3DE", text: "#3B6D11" },
  badgeScheduled: { bg: "#F1F1F1", text: "#5F5E5A" },
  badgeDraft: { bg: "#FFF3CD", text: "#7A5800" },
  badgeEnded: { bg: "#FCEBEB", text: "#A32D2D" },
  rowActive: "#F6FBF4",
  textMain: "#1A1A1A",
  textSub: "#666666",
  textMuted: "#999999",
  green: "#1D9E75",
  greenBg: "#EAF3DE",
  btnSecBorder: "#D0D0D0",
  btnSecText: "#333333",
  warnBg: "#FFFBE6",
  warnBorder: "#FFD666",
  warnText: "#7A5800",
  errorText: "#C0392B",
  disabled: "#F0F0F0",
};

type PageKey = "dashboard" | "step1" | "step2" | "step3";

const PAGE_LABELS: Record<PageKey, string> = {
  dashboard: "Dashboard Flash Sale",
  step1: "Form – Step 1: Jadwal Sesi",
  step2: "Form – Step 2: Input Produk",
  step3: "Form – Step 3: Preview & Konfirmasi",
};

// ─── Page Switcher ────────────────────────────────────────────────────────────
function PageSwitcher({ current, onChange }: { current: PageKey; onChange: (p: PageKey) => void }) {
  const pages: PageKey[] = ["dashboard", "step1", "step2", "step3"];
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: "#1A1A1A",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 2,
        height: 42,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <span style={{ color: "#888", fontSize: 11, marginRight: 12, whiteSpace: "nowrap", fontFamily: "Inter, sans-serif" }}>
        Halaman:
      </span>
      {pages.map((p, i) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            background: current === p ? C.primary : "transparent",
            color: current === p ? "#fff" : "#AAAAAA",
            border: current === p ? "none" : "1px solid #333",
            borderRadius: 5,
            padding: "5px 14px",
            fontSize: 11,
            fontWeight: current === p ? 700 : 400,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {i + 1}. {PAGE_LABELS[p].replace("Form – ", "").replace("Dashboard Flash Sale", "Dashboard")}
        </button>
      ))}
    </div>
  );
}

// ─── Shared: Sidebar ──────────────────────────────────────────────────────────
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Flash Sale", icon: Zap, active: true },
  { label: "Produk", icon: Package },
  { label: "Pengguna", icon: Users },
  { label: "Laporan", icon: BarChart2 },
  { label: "Pengaturan", icon: Settings },
];

function Sidebar() {
  return (
    <aside style={{
      width: 220, minWidth: 220, background: C.sidebarBg,
      borderRight: `1px solid ${C.border}`, display: "flex",
      flexDirection: "column", height: "100%",
    }}>
      <div style={{ height: 56, display: "flex", alignItems: "center", paddingLeft: 20, borderBottom: `1px solid ${C.border}` }}>
        <span style={{ color: C.primary, fontWeight: 700, fontSize: 16 }}>Jakmall Admin</span>
      </div>
      <nav style={{ padding: "12px 0", flex: 1 }}>
        {navItems.map(({ label, icon: Icon, active }) => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 20px", cursor: "pointer",
            background: active ? C.primaryBg : "transparent",
            borderLeft: active ? `3px solid ${C.primary}` : "3px solid transparent",
            color: active ? C.primary : "#444", fontWeight: active ? 600 : 400, fontSize: 14,
          }}>
            <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─── Shared: Topbar ───────────────────────────────────────────────────────────
function Topbar({ crumbs }: { crumbs: string[] }) {
  return (
    <div style={{
      height: 56, background: C.topbar, borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <ChevronRight size={14} color={C.textMuted} />}
            <span style={{ color: i === crumbs.length - 1 ? C.textMain : C.textMuted, fontWeight: i === crumbs.length - 1 ? 500 : 400 }}>
              {c}
            </span>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>RM</div>
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textMain }}>Rina Marlina</div>
          <div style={{ fontSize: 11, color: C.textMuted }}>Marketing</div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared: Shell ────────────────────────────────────────────────────────────
function PageShell({ crumbs, children }: { crumbs: string[]; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100%", background: C.pageBg }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar crumbs={crumbs} />
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Shared: Stepper ─────────────────────────────────────────────────────────
const STEPS = ["Jadwal Sesi", "Input Produk", "Preview & Konfirmasi"];

function Stepper({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 32px", marginBottom: 20 }}>
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < current, active = n === current, pending = n > current;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? C.green : active ? C.primary : "transparent",
                border: pending ? `2px solid ${C.border}` : "none",
                color: done || active ? "#fff" : C.textMuted, fontWeight: 700, fontSize: 13,
              }}>
                {done ? <Check size={15} strokeWidth={3} /> : n}
              </div>
              <span style={{ fontSize: 12, fontWeight: active ? 700 : 400, color: done ? C.textSub : active ? C.textMain : C.textMuted, whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? C.green : C.border, margin: "0 12px", marginBottom: 18 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared: Badge ────────────────────────────────────────────────────────────
type BadgeStatus = "Active" | "Scheduled" | "Draft" | "Ended";
const badgeMap: Record<BadgeStatus, { bg: string; text: string; label: string }> = {
  Active: { ...C.badgeActive, label: "Aktif" },
  Scheduled: { ...C.badgeScheduled, label: "Terjadwal" },
  Draft: { ...C.badgeDraft, label: "Draft" },
  Ended: { ...C.badgeEnded, label: "Berakhir" },
};
function Badge({ status }: { status: BadgeStatus }) {
  const { bg, text, label } = badgeMap[status];
  return <span style={{ background: bg, color: text, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-block", whiteSpace: "nowrap" }}>{label}</span>;
}

// ─── Shared: Countdown ───────────────────────────────────────────────────────
function useCountdown(init: number) {
  const [s, setS] = useState(init);
  useEffect(() => { const id = setInterval(() => setS((v) => Math.max(0, v - 1)), 1000); return () => clearInterval(id); }, []);
  return [String(Math.floor(s / 3600)).padStart(2, "0"), String(Math.floor((s % 3600) / 60)).padStart(2, "0"), String(s % 60).padStart(2, "0")].join(":");
}

// ─── Shared: IconBtn ──────────────────────────────────────────────────────────
function IconBtn({ icon: Icon, label, color = "#555" }: { icon: React.ElementType; label: string; color?: string }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ background: h ? "#F0F0F0" : "transparent", border: "none", borderRadius: 6, padding: 5, cursor: "pointer", display: "flex", alignItems: "center" }}>
        <Icon size={15} color={color} strokeWidth={1.8} />
      </button>
      {h && <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#333", color: "#fff", fontSize: 11, padding: "3px 8px", borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 100 }}>{label}</div>}
    </div>
  );
}

// ─── Shared: Button styles ────────────────────────────────────────────────────
const priBtn: React.CSSProperties = { background: C.primary, color: "#fff", border: "none", borderRadius: 6, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
const secBtn: React.CSSProperties = { background: C.card, color: C.btnSecText, border: `1px solid ${C.btnSecBorder}`, borderRadius: 6, padding: "9px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer" };
const inputBase: React.CSSProperties = { border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", fontSize: 13, color: C.textMain, background: "#fff", outline: "none", width: "100%", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: C.textMain, marginBottom: 4, display: "block" };

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 1 — DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const sessions = [
  { no: 1, nama: "Flash Sale Gadget Pagi", jadwal: "10 Jun 2026, 10.00–12.00 WIB", sku: 6, status: "Active" as BadgeStatus, countdown: 1 * 3600 + 24 * 60 + 38, aksi: ["preview", "cancel"] as const },
  { no: 2, nama: "Flash Sale Fashion Siang", jadwal: "10 Jun 2026, 14.00–16.00 WIB", sku: 6, status: "Scheduled" as BadgeStatus, countdown: 3 * 3600 + 11 * 60 + 22, aksi: ["edit", "duplicate", "preview", "delete"] as const },
  { no: 3, nama: "Flash Sale Kemerdekaan", jadwal: "17 Agt 2026, 08.00–10.00 WIB", sku: 5, status: "Draft" as BadgeStatus, aksi: ["edit", "duplicate", "preview", "delete"] as const },
  { no: 4, nama: "Flash Sale Weekend Elektronik", jadwal: "7 Jun 2026, 20.00–22.00 WIB", sku: 6, status: "Ended" as BadgeStatus, aksi: ["duplicate", "preview"] as const, dimmed: true },
];

const actionMap = {
  preview: { icon: Eye, label: "Preview", color: "#555" },
  edit: { icon: Edit2, label: "Edit", color: "#555" },
  cancel: { icon: XCircle, label: "Batalkan", color: "#C0392B" },
  duplicate: { icon: Copy, label: "Duplikat", color: "#555" },
  delete: { icon: Trash2, label: "Hapus", color: "#C0392B" },
};

const thS: React.CSSProperties = { padding: "11px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: C.textSub, background: "#FAFAFA", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" };
const tdS: React.CSSProperties = { padding: "13px 16px", fontSize: 13, color: C.textMain, verticalAlign: "middle" };

function DashboardPage({ onCreateNew }: { onCreateNew: () => void }) {
  const [page, setPage] = useState(1);
  const inputStyle: React.CSSProperties = { border: `1px solid ${C.border}`, borderRadius: 6, padding: "7px 12px", fontSize: 13, color: C.textMain, background: "#fff", outline: "none", height: 36 };

  return (
    <PageShell crumbs={["Beranda", "Flash Sale"]}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.textMain, margin: 0 }}>Flash Sale Management</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "4px 0 0" }}>Kelola sesi flash sale tanpa bantuan developer</p>
        </div>
        <button onClick={onCreateNew} style={priBtn}>+ Buat Sesi Baru</button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Sesi Aktif Sekarang", value: "1", color: C.green },
          { label: "Terjadwal (Upcoming)", value: "3", color: C.primary },
          { label: "Selesai Bulan Ini (Jun 2026)", value: "14", color: "#888" },
        ].map((c) => (
          <div key={c.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "18px 20px" }}>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <select style={{ ...inputStyle, width: 160 }}>
          <option>Semua Status</option>
          <option>Draft</option><option>Scheduled</option><option>Active</option><option>Ended</option>
        </select>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {["01/06/2026", "30/06/2026"].map((v, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i === 1 && <span style={{ color: C.textMuted, fontSize: 13 }}>s/d</span>}
              <div style={{ position: "relative" }}>
                <input type="text" defaultValue={v} style={{ ...inputStyle, width: 110, paddingRight: 30 }} readOnly />
                <Calendar size={13} color={C.textMuted} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </span>
          ))}
        </div>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} color={C.textMuted} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
          <input placeholder="Cari nama sesi atau SKU..." style={{ ...inputStyle, width: "100%", paddingLeft: 32, boxSizing: "border-box" }} />
        </div>
        <button style={{ ...priBtn, padding: "8px 16px", height: 36, whiteSpace: "nowrap" }}>Terapkan Filter</button>
      </div>

      {/* Table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["No", "Nama Sesi", "Jadwal", "Jumlah SKU", "Status", "Countdown", "Aksi"].map((h) => <th key={h} style={thS}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {sessions.map((row) => {
              const isActive = row.status === "Active";
              return (
                <tr key={row.no} style={{ background: isActive ? C.rowActive : C.card, borderBottom: `1px solid ${C.border}` }}>
                  <td style={tdS}>{row.no}</td>
                  <td style={{ ...tdS, fontWeight: 500, color: row.dimmed ? C.textMuted : C.textMain }}>{row.nama}</td>
                  <td style={{ ...tdS, color: C.textSub }}>{row.jadwal}</td>
                  <td style={tdS}>{row.sku} SKU</td>
                  <td style={tdS}><Badge status={row.status} /></td>
                  <td style={tdS}>
                    {row.countdown
                      ? (() => { const d = useCountdown(row.countdown); return <span style={{ fontFamily: "monospace", fontWeight: 600, letterSpacing: 1 }}>{d}</span>; })()
                      : <span style={{ color: C.textMuted }}>—</span>}
                  </td>
                  <td style={tdS}>
                    <div style={{ display: "flex", gap: 2 }}>
                      {row.aksi.map((a) => { const { icon, label, color } = actionMap[a]; return <IconBtn key={a} icon={icon} label={label} color={color} />; })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: C.textSub }}>Menampilkan <strong>1–4</strong> dari <strong>18</strong> sesi</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ border: `1px solid ${C.btnSecBorder}`, background: "#fff", borderRadius: 6, padding: "6px 12px", fontSize: 13, cursor: "not-allowed", opacity: 0.4, display: "flex", alignItems: "center", gap: 4, color: C.btnSecText }} disabled><ChevronLeft size={14} /> Sebelumnya</button>
          {[1, 2, 3].map((p) => (
            <button key={p} onClick={() => setPage(p)} style={{ border: `1px solid ${page === p ? C.primary : C.btnSecBorder}`, background: page === p ? C.primary : "#fff", borderRadius: 6, padding: "6px 0", fontSize: 13, cursor: "pointer", width: 36, fontWeight: page === p ? 700 : 400, color: page === p ? "#fff" : C.btnSecText }}>{p}</button>
          ))}
          <button onClick={() => setPage(Math.min(3, page + 1))} style={{ border: `1px solid ${C.btnSecBorder}`, background: "#fff", borderRadius: 6, padding: "6px 12px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: C.btnSecText }}>Selanjutnya <ChevronRightIcon size={14} /></button>
        </div>
      </div>
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 2 — STEP 1: JADWAL SESI
// ═══════════════════════════════════════════════════════════════════════════════
function Step1Page({ onNext, onCancel }: { onNext: () => void; onCancel: () => void }) {
  return (
    <PageShell crumbs={["Beranda", "Flash Sale", "Buat Sesi Baru"]}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.textMain, margin: 0 }}>Buat Sesi Flash Sale</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "4px 0 0" }}>Lengkapi tiga langkah berikut untuk menjadwalkan sesi baru</p>
        </div>
      </div>

      <Stepper current={1} />

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 24, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: C.textMain, margin: "0 0 20px" }}>Detail Jadwal Sesi</h2>

        <div style={{ display: "grid", gap: 16 }}>
          {/* Nama Sesi */}
          <div>
            <label style={labelStyle}>Nama Sesi <span style={{ color: C.errorText }}>*</span></label>
            <div style={{ position: "relative" }}>
              <input style={inputBase} defaultValue="Flash Sale Gadget Akhir Pekan" maxLength={100} />
              <span style={{ position: "absolute", right: 10, bottom: 9, fontSize: 11, color: C.textMuted }}>33/100</span>
            </div>
          </div>

          {/* Tanggal & Jam Mulai */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Tanggal Mulai <span style={{ color: C.errorText }}>*</span></label>
              <div style={{ position: "relative" }}>
                <input style={inputBase} defaultValue="12/06/2026" readOnly />
                <Calendar size={13} color={C.textMuted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Jam Mulai <span style={{ color: C.errorText }}>*</span></label>
              <div style={{ position: "relative" }}>
                <input style={inputBase} defaultValue="10.00 WIB" readOnly />
                <Clock size={13} color={C.textMuted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
          </div>

          {/* Tanggal & Jam Berakhir */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Tanggal Berakhir <span style={{ color: C.errorText }}>*</span></label>
              <div style={{ position: "relative" }}>
                <input style={inputBase} defaultValue="12/06/2026" readOnly />
                <Calendar size={13} color={C.textMuted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Jam Berakhir <span style={{ color: C.errorText }}>*</span></label>
              <div style={{ position: "relative" }}>
                <input style={{ ...inputBase, border: `1px solid ${C.errorText}`, background: "#FFF8F8" }} defaultValue="09.00 WIB" readOnly />
                <Clock size={13} color={C.errorText} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
              <p style={{ fontSize: 11, color: C.errorText, margin: "4px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                <AlertTriangle size={11} /> Waktu berakhir harus setelah waktu mulai
              </p>
            </div>
          </div>

          {/* Durasi */}
          <div>
            <label style={labelStyle}>Durasi Sesi</label>
            <input style={{ ...inputBase, background: C.disabled, color: C.textSub, cursor: "not-allowed" }} value="2 jam 0 menit" readOnly />
            <p style={{ fontSize: 11, color: C.textMuted, margin: "4px 0 0" }}>Dihitung otomatis dari jam mulai dan jam berakhir</p>
          </div>
        </div>
      </div>

      {/* Overlap Warning */}
      <div style={{ display: "flex", gap: 10, background: C.warnBg, border: `1px solid ${C.warnBorder}`, borderRadius: 8, padding: "12px 16px", marginBottom: 20, alignItems: "flex-start" }}>
        <AlertTriangle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 13, color: C.warnText, margin: 0 }}>
          Jadwal ini bertabrakan dengan sesi <strong>'Flash Sale Fashion Siang'</strong> (10 Jun 2026, 14.00–16.00 WIB). Pilih slot waktu lain atau lanjutkan jika berbeda.
        </p>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onCancel} style={secBtn}>Batal</button>
        <button style={{ ...priBtn, opacity: 0.45, cursor: "not-allowed" }} disabled>Lanjut ke Step 2 →</button>
      </div>
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 3 — STEP 2: INPUT PRODUK
// ═══════════════════════════════════════════════════════════════════════════════
const productRows = [
  { no: 1, sku: "PROD0001", nama: "Kaos Polos Oversize Pria", hargaNormal: "Rp 120.000", diskon: "20", hargaFlash: "Rp 96.000", qty: "20", state: "ok" },
  { no: 2, sku: "PROD7718", nama: "Kemeja Batik Pria Premium", hargaNormal: "Rp 250.000", diskon: "0", hargaFlash: "Rp 250.000", qty: "10", state: "warn-diskon" },
  { no: 3, sku: "PROD9999", nama: "", hargaNormal: "", diskon: "", hargaFlash: "", qty: "", state: "error-sku" },
  { no: 4, sku: "PROD3386", nama: "Rice Cooker Miyabi 1.8L", hargaNormal: "Rp 450.000", diskon: "10", hargaFlash: "Rp 405.000", qty: "50", state: "warn-qty" },
];

function Step2Page({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [showModal, setShowModal] = useState(false);

  const cellIn = (val: string, disabled?: boolean, err?: boolean): React.CSSProperties => ({
    border: `1px solid ${err ? C.errorText : C.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12,
    color: disabled ? C.textMuted : C.textMain, background: disabled ? C.disabled : err ? "#FFF8F8" : "#fff",
    width: "100%", boxSizing: "border-box" as const, outline: "none", cursor: disabled ? "not-allowed" : "text",
  });

  return (
    <PageShell crumbs={["Beranda", "Flash Sale", "Buat Sesi Baru"]}>
      {/* Import Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, width: 460, padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textMain }}>Import Produk dari Excel / CSV</h3>
              <button onClick={() => setShowModal(false)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}><X size={18} color={C.textSub} /></button>
            </div>
            <div style={{ border: `2px dashed ${C.border}`, borderRadius: 8, padding: "36px 20px", textAlign: "center", background: "#FAFAFA", marginBottom: 12, cursor: "pointer" }}>
              <FileText size={36} color={C.textMuted} style={{ marginBottom: 10 }} />
              <p style={{ margin: 0, fontSize: 13, color: C.textMain, fontWeight: 500 }}>Seret file ke sini atau klik untuk memilih</p>
            </div>
            <p style={{ fontSize: 11, color: C.textMuted, textAlign: "center", margin: "0 0 24px" }}>Format yang diterima: .xlsx, .xls, .csv &nbsp;|&nbsp; Maks. 1 MB</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={secBtn}>Batal</button>
              <button style={{ ...priBtn, display: "flex", alignItems: "center", gap: 6 }}><Upload size={14} /> Upload &amp; Parsing dengan AI</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.textMain, margin: 0 }}>Buat Sesi Flash Sale</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "4px 0 0" }}>Lengkapi tiga langkah berikut untuk menjadwalkan sesi baru</p>
        </div>
      </div>

      <Stepper current={2} />

      {/* Session banner */}
      <div style={{ background: "#F0F7FF", border: "1px solid #B3D3F5", borderRadius: 8, padding: "10px 16px", fontSize: 13, color: "#1A4A7A", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <Info size={14} />
        <span><strong>Sesi:</strong> Flash Sale Gadget Akhir Pekan &nbsp;|&nbsp; 12 Jun 2026, 10.00–12.00 WIB</span>
      </div>

      {/* Table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.textMain }}>Daftar Produk Flash Sale</span>
          <button onClick={() => setShowModal(true)} style={{ ...secBtn, display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 12 }}>
            <Upload size={13} /> Import dari Excel/CSV
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["No", "SKU", "Nama Produk", "Harga Normal", "Diskon (%)", "Harga Flash Sale", "Qty Flash Sale", "Aksi"].map((h) => (
              <th key={h} style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: C.textSub, background: "#FAFAFA", borderBottom: `1px solid ${C.border}`, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {productRows.map((p) => {
              const isErr = p.state === "error-sku";
              const isWarnD = p.state === "warn-diskon";
              const isWarnQ = p.state === "warn-qty";
              return (
                <tr key={p.no} style={{ background: isErr ? "#FFF8F8" : C.card, borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 12px", color: C.textMuted, width: 32, fontSize: 13 }}>{p.no}</td>
                  <td style={{ padding: "10px 12px", width: 110 }}>
                    <input style={cellIn(p.sku, false, isErr)} defaultValue={p.sku} readOnly />
                    {isErr && <p style={{ fontSize: 10, color: C.errorText, margin: "3px 0 0", display: "flex", alignItems: "center", gap: 3 }}><AlertTriangle size={10} /> SKU tidak ditemukan atau tidak aktif</p>}
                  </td>
                  <td style={{ padding: "10px 12px" }}><input style={cellIn(p.nama, isErr)} defaultValue={p.nama} placeholder={isErr ? "—" : ""} readOnly /></td>
                  <td style={{ padding: "10px 12px", width: 110 }}><input style={cellIn(p.hargaNormal, true)} defaultValue={p.hargaNormal} readOnly /></td>
                  <td style={{ padding: "10px 12px", width: 90 }}>
                    <input style={cellIn(p.diskon, isErr, isWarnD)} defaultValue={p.diskon} readOnly />
                    {isWarnD && (<div style={{ marginTop: 4 }}><p style={{ fontSize: 10, color: C.warnText, margin: "0 0 3px", display: "flex", alignItems: "center", gap: 3 }}><AlertTriangle size={10} /> Diskon 0%, pastikan nilai benar</p><label style={{ fontSize: 10, color: C.textSub, display: "flex", alignItems: "center", gap: 4 }}><input type="checkbox" style={{ accentColor: C.primary }} /> Saya konfirmasi</label></div>)}
                  </td>
                  <td style={{ padding: "10px 12px", width: 120 }}><input style={cellIn(p.hargaFlash, true)} defaultValue={p.hargaFlash} readOnly /></td>
                  <td style={{ padding: "10px 12px", width: 110 }}>
                    <input style={cellIn(p.qty, isErr, isWarnQ)} defaultValue={p.qty} readOnly />
                    {isWarnQ && <p style={{ fontSize: 10, color: C.warnText, margin: "3px 0 0", display: "flex", alignItems: "center", gap: 3 }}><AlertTriangle size={10} /> Melebihi stok tersedia (30 unit)</p>}
                  </td>
                  <td style={{ padding: "10px 12px", width: 44 }}>
                    <button style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}><Trash2 size={14} color={C.errorText} strokeWidth={1.8} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}` }}>
          <button style={{ border: `1px dashed ${C.primary}`, background: C.primaryBg, color: C.primary, borderRadius: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Tambah SKU</button>
          <span style={{ fontSize: 12, color: C.textSub }}><strong style={{ color: C.primary }}>4</strong> / 6 SKU ditambahkan</span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ ...secBtn, display: "flex", alignItems: "center", gap: 6 }}><ChevronLeft size={14} /> Kembali ke Step 1</button>
        <button onClick={onNext} style={priBtn}>Lanjut ke Step 3 →</button>
      </div>
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 4 — STEP 3: PREVIEW & KONFIRMASI
// ═══════════════════════════════════════════════════════════════════════════════
const previewProds = [
  { nama: "Kaos Polos Oversize Pria", normal: "Rp 120.000", flash: "Rp 96.000", diskon: "20" },
  { nama: "Kemeja Batik Pria Premium", normal: "Rp 250.000", flash: "Rp 250.000", diskon: null },
  { nama: "Rice Cooker Miyabi 1.8L", normal: "Rp 450.000", flash: "Rp 405.000", diskon: "10" },
  { nama: "Lipstik Matte Wardah", normal: "Rp ???.???", flash: "Rp ???.???", diskon: "?" },
  { nama: "Minyak Goreng Bimoli 2L", normal: "Rp ???.???", flash: "Rp ???.???", diskon: "?" },
  { nama: "Sepatu Sneakers Pria", normal: "Rp ???.???", flash: "Rp ???.???", diskon: "?" },
];

function Step3Page({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <PageShell crumbs={["Beranda", "Flash Sale", "Buat Sesi Baru"]}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.textMain, margin: 0 }}>Buat Sesi Flash Sale</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "4px 0 0" }}>Lengkapi tiga langkah berikut untuk menjadwalkan sesi baru</p>
        </div>
      </div>

      <Stepper current={3} />

      {/* Preview Section */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textSub }}>Pratinjau tampilan di halaman Home Jakmall</span>
        </div>
        <div style={{ padding: 20, background: "#FFF9F7" }}>
          {/* Flash Sale header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ background: C.primary, color: "#fff", fontWeight: 800, fontSize: 16, padding: "4px 14px", borderRadius: 4 }}>⚡ Flash Sale</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textSub }}>
              <span>Berakhir dalam:</span>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {["01", "45", "22"].map((seg, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ background: C.textMain, color: "#fff", borderRadius: 4, padding: "2px 8px", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>{seg}</span>
                    {i < 2 && <span style={{ fontWeight: 700, color: C.textMain }}>:</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Product grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
            {previewProds.map((p, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ height: 90, background: "#EBEBEB", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <ShoppingCart size={24} color="#CCCCCC" />
                  {p.diskon && p.diskon !== "?" && (
                    <span style={{ position: "absolute", top: 6, left: 6, background: C.primary, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>-{p.diskon}%</span>
                  )}
                </div>
                <div style={{ padding: "8px 8px 10px" }}>
                  <p style={{ fontSize: 11, color: C.textMain, margin: "0 0 4px", lineHeight: 1.3, fontWeight: 500, height: 28, overflow: "hidden" }}>{p.nama}</p>
                  <p style={{ fontSize: 10, color: C.textMuted, margin: "0 0 2px", textDecoration: "line-through" }}>{p.normal}</p>
                  <p style={{ fontSize: 13, color: C.primary, fontWeight: 700, margin: "0 0 8px" }}>{p.flash}</p>
                  <button style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 4, padding: "5px 0", fontSize: 10, fontWeight: 600, cursor: "pointer", width: "100%" }}>Beli Sekarang</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textMain, margin: "0 0 16px" }}>Ringkasan Sesi</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[
              ["Nama Sesi", "Flash Sale Gadget Akhir Pekan"],
              ["Jadwal", "12 Jun 2026, 10.00–12.00 WIB (durasi 2 jam)"],
              ["Jumlah SKU Valid", "3 dari 4 (1 SKU error diabaikan)"],
              ["Status setelah Publish", "__badge__"],
              ["Dibuat oleh", "Rina Marlina (Marketing)"],
            ].map(([k, v], i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "10px 0", fontSize: 13, color: C.textSub, width: "30%", fontWeight: 500 }}>{k}</td>
                <td style={{ padding: "10px 0", fontSize: 13, color: C.textMain }}>
                  {v === "__badge__"
                    ? <span style={{ background: "#F1F1F1", color: "#5F5E5A", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Terjadwal</span>
                    : v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Checklist */}
        <div style={{ background: "#F8F8F8", border: `1px solid ${C.border}`, borderRadius: 6, padding: "12px 16px", marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <input type="checkbox" id="confirm" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ accentColor: C.primary, width: 15, height: 15, cursor: "pointer" }} />
          <label htmlFor="confirm" style={{ fontSize: 13, color: C.textMain, cursor: "pointer" }}>Saya telah memeriksa seluruh data produk, harga, dan jadwal sesi</label>
        </div>

        {/* Access note */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, padding: "10px 14px", background: "#F5F5F5", borderRadius: 6, border: `1px solid ${C.border}` }}>
          <Info size={14} color={C.textMuted} style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>Tombol <strong>Publish</strong> hanya aktif untuk Marketing Manager dan Admin</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ ...secBtn, display: "flex", alignItems: "center", gap: 6 }}><ChevronLeft size={14} /> Kembali ke Step 2</button>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={secBtn}>Simpan sebagai Draft</button>
          <button style={{ ...priBtn, opacity: checked ? 1 : 0.45, cursor: checked ? "pointer" : "not-allowed" }} disabled={!checked}>Publish Sesi</button>
        </div>
      </div>
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState<PageKey>("dashboard");

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, minWidth: 1280, minHeight: "100vh", background: C.pageBg }}>
      <PageSwitcher current={page} onChange={setPage} />

      <div style={{ paddingTop: 42, height: "100vh", boxSizing: "border-box" }}>
        {page === "dashboard" && <DashboardPage onCreateNew={() => setPage("step1")} />}
        {page === "step1"     && <Step1Page onNext={() => setPage("step2")} onCancel={() => setPage("dashboard")} />}
        {page === "step2"     && <Step2Page onNext={() => setPage("step3")} onBack={() => setPage("step1")} />}
        {page === "step3"     && <Step3Page onBack={() => setPage("step2")} />}
      </div>
    </div>
  );
}
