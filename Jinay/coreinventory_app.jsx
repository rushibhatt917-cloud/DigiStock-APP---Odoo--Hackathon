import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  ClipboardList,
  History,
  Bell,
  Settings,
  User,
  LogOut,
  Search,
  Plus,
  Filter,
  AlertTriangle,
  Truck,
  Boxes,
  MapPin,
  ShieldCheck,
  KeyRound,
  Save,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const seedState = {
  profile: {
    fullName: "Inventory Manager",
    email: "manager@coreinventory.app",
    role: "Warehouse Admin",
    phone: "+91 98765 43210",
  },
  products: [
    {
      id: 1,
      name: "Steel Coil",
      sku: "STL-001",
      category: "Raw Material",
      unit: "kg",
      reorderLevel: 100,
      totalStock: 380,
      locationStock: { "Main Warehouse": 220, "Production Rack": 160 },
    },
    {
      id: 2,
      name: "Aluminum Sheet",
      sku: "ALU-002",
      category: "Raw Material",
      unit: "pcs",
      reorderLevel: 40,
      totalStock: 28,
      locationStock: { "Main Warehouse": 28 },
    },
    {
      id: 3,
      name: "Packing Box",
      sku: "PKG-010",
      category: "Packaging",
      unit: "pcs",
      reorderLevel: 150,
      totalStock: 490,
      locationStock: { "Dispatch Area": 320, "Main Warehouse": 170 },
    },
    {
      id: 4,
      name: "Copper Wire",
      sku: "COP-078",
      category: "Components",
      unit: "m",
      reorderLevel: 200,
      totalStock: 0,
      locationStock: { "Main Warehouse": 0 },
    },
  ],
  warehouses: [
    { id: 1, name: "Main Warehouse", location: "Building A" },
    { id: 2, name: "Production Rack", location: "Factory Floor" },
    { id: 3, name: "Dispatch Area", location: "Dock 2" },
  ],
  receipts: [
    {
      id: "RCV-1001",
      supplier: "MetalWorks Ltd",
      warehouse: "Main Warehouse",
      productId: 1,
      quantity: 100,
      status: "Done",
      date: "2026-03-08",
    },
  ],
  deliveries: [
    {
      id: "DEL-2300",
      customer: "North Plant",
      warehouse: "Main Warehouse",
      productId: 1,
      quantity: 20,
      status: "Done",
      date: "2026-03-12",
    },
  ],
  transfers: [
    {
      id: "TRF-4301",
      from: "Main Warehouse",
      to: "Production Rack",
      productId: 1,
      quantity: 60,
      status: "Done",
      date: "2026-03-11",
    },
  ],
  adjustments: [
    {
      id: "ADJ-5101",
      productId: 1,
      location: "Main Warehouse",
      difference: -3,
      reason: "Damaged goods",
      status: "Done",
      date: "2026-03-10",
    },
  ],
  ledger: [
    {
      id: 1,
      type: "Receipt",
      product: "Steel Coil",
      change: "+100 kg",
      source: "MetalWorks Ltd",
      destination: "Main Warehouse",
      status: "Done",
      date: "2026-03-08 10:30",
      note: "Initial seeded receipt",
    },
    {
      id: 2,
      type: "Transfer",
      product: "Steel Coil",
      change: "-60 / +60 kg",
      source: "Main Warehouse",
      destination: "Production Rack",
      status: "Done",
      date: "2026-03-11 14:00",
      note: "Material moved to production",
    },
    {
      id: 3,
      type: "Delivery",
      product: "Steel Coil",
      change: "-20 kg",
      source: "Main Warehouse",
      destination: "North Plant",
      status: "Done",
      date: "2026-03-12 09:15",
      note: "Outgoing shipment",
    },
    {
      id: 4,
      type: "Adjustment",
      product: "Steel Coil",
      change: "-3 kg",
      source: "Main Warehouse",
      destination: "System",
      status: "Done",
      date: "2026-03-10 16:40",
      note: "Damaged goods",
    },
  ],
};

const nav = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: Package },
  { key: "warehouses", label: "Warehouses", icon: Warehouse },
  { key: "operations", label: "Operations", icon: ClipboardList },
  { key: "ledger", label: "Move History", icon: History },
  { key: "alerts", label: "Alerts", icon: Bell },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "profile", label: "My Profile", icon: User },
];

const kpiCard = [
  { key: "totalStock", title: "Total Products in Stock", icon: Boxes, color: "text-sky-600" },
  { key: "lowStock", title: "Low / Out of Stock", icon: AlertTriangle, color: "text-amber-600" },
  { key: "pendingReceipts", title: "Pending Receipts", icon: ArrowDownToLine, color: "text-emerald-600" },
  { key: "pendingDeliveries", title: "Pending Deliveries", icon: Truck, color: "text-fuchsia-600" },
  { key: "scheduledTransfers", title: "Transfers Scheduled", icon: ArrowLeftRight, color: "text-violet-600" },
];

const statuses = ["Draft", "Waiting", "Ready", "Done", "Canceled"];
const today = () => new Date().toISOString().slice(0, 10);
const nowStamp = () =>
  new Date().toLocaleString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(",", "");

function uid(prefix) {
  return `${prefix}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

function readState() {
  if (typeof window === "undefined") return seedState;
  const saved = window.localStorage.getItem("coreinventory_state");
  if (!saved) return seedState;
  try {
    return JSON.parse(saved);
  } catch {
    return seedState;
  }
}

function persistState(state) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("coreinventory_state", JSON.stringify(state));
  }
}

function StatusBadge({ status }) {
  const map = {
    Draft: "bg-slate-100 text-slate-700 border-slate-200",
    Waiting: "bg-amber-100 text-amber-700 border-amber-200",
    Ready: "bg-blue-100 text-blue-700 border-blue-200",
    Done: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Canceled: "bg-rose-100 text-rose-700 border-rose-200",
  };
  return <Badge className={`border ${map[status] || map.Draft}`}>{status}</Badge>;
}

function SectionHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
      {action}
    </div>
  );
}

function AddProductDialog({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "Raw Material",
    unit: "pcs",
    reorderLevel: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl">
          <Plus className="h-4 w-4 mr-2" />Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-3xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>SKU</Label>
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Reorder Level</Label>
              <Input type="number" value={form.reorderLevel} onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Raw Material">Raw Material</SelectItem>
                  <SelectItem value="Packaging">Packaging</SelectItem>
                  <SelectItem value="Components">Components</SelectItem>
                  <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Unit of Measure</Label>
              <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">pcs</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="m">m</SelectItem>
                  <SelectItem value="box">box</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="rounded-2xl"
            onClick={() => {
              if (!form.name || !form.sku) return;
              onAdd({
                id: Date.now(),
                name: form.name,
                sku: form.sku,
                category: form.category,
                unit: form.unit,
                reorderLevel: Number(form.reorderLevel || 0),
                totalStock: 0,
                locationStock: {},
              });
              setForm({ name: "", sku: "", category: "Raw Material", unit: "pcs", reorderLevel: "" });
            }}
          >
            Save Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LoginScreen({ onLogin, mode, setMode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl grid lg:grid-cols-2 gap-6">
        <Card className="rounded-3xl border-0 shadow-xl bg-slate-900 text-white overflow-hidden">
          <CardContent className="p-10 h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
                <Boxes className="h-4 w-4" /> CoreInventory
              </div>
              <h1 className="text-4xl font-bold mt-6 leading-tight">Run your inventory from one modern control center.</h1>
              <p className="text-slate-300 mt-4 text-base max-w-md">
                Track products, manage receipts and deliveries, move stock between warehouses, and keep a complete ledger.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[["Low-stock alerts", Bell], ["Warehouse tracking", Warehouse], ["OTP reset flow", KeyRound]].map(([label, Icon]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-4">
                  <Icon className="h-5 w-5 mb-3 text-sky-300" />
                  <div className="text-sm text-slate-200">{label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{mode === "login" ? "Welcome back" : mode === "signup" ? "Create account" : "Reset password"}</CardTitle>
            <CardDescription>
              {mode === "login" ? "Sign in to open the inventory dashboard." : mode === "signup" ? "Register a new inventory workspace user." : "OTP-based reset flow prototype."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode !== "reset" && (
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input placeholder="manager@coreinventory.app" />
              </div>
            )}
            {mode === "signup" && (
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input placeholder="Inventory Manager" />
              </div>
            )}
            {mode === "reset" ? (
              <>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input placeholder="manager@coreinventory.app" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>OTP</Label>
                    <Input placeholder="123456" />
                  </div>
                  <div className="grid gap-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </>
            ) : (
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            )}
            <Button className="w-full rounded-2xl" onClick={onLogin}>
              {mode === "login" ? "Login" : mode === "signup" ? "Create Account" : "Reset Password"}
            </Button>
            <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
              <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="hover:text-slate-900">
                {mode === "login" ? "Need an account? Sign up" : "Already registered? Login"}
              </button>
              <button onClick={() => setMode("reset")} className="hover:text-slate-900">Forgot password?</button>
            </div>
            {mode === "reset" && <button onClick={() => setMode("login")} className="text-sm text-slate-500 hover:text-slate-900">Back to login</button>}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function CoreInventoryApp() {
  const [authed, setAuthed] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [page, setPage] = useState("dashboard");
  const [state, setState] = useState(seedState);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productForm, setProductForm] = useState({ id: null, name: "", sku: "", category: "Raw Material", unit: "pcs", reorderLevel: 0 });
  const [warehouseForm, setWarehouseForm] = useState({ name: "", location: "" });
  const [receiptForm, setReceiptForm] = useState({ supplier: "", warehouse: "Main Warehouse", productId: "1", quantity: 0, status: "Draft" });
  const [deliveryForm, setDeliveryForm] = useState({ customer: "", warehouse: "Main Warehouse", productId: "1", quantity: 0, status: "Draft" });
  const [transferForm, setTransferForm] = useState({ from: "Main Warehouse", to: "Production Rack", productId: "1", quantity: 0, status: "Draft" });
  const [adjustmentForm, setAdjustmentForm] = useState({ productId: "1", location: "Main Warehouse", counted: 0, reason: "" });

  useEffect(() => {
    setState(readState());
  }, []);

  useEffect(() => {
    persistState(state);
  }, [state]);

  const products = state.products;
  const warehouses = state.warehouses;
  const allCategories = [...new Set(products.map((p) => p.category))];

  const lowStockItems = useMemo(() => products.filter((p) => p.totalStock <= p.reorderLevel), [products]);

  const dashboardStats = useMemo(() => ({
    totalStock: products.reduce((sum, p) => sum + p.totalStock, 0),
    lowStock: lowStockItems.length,
    pendingReceipts: state.receipts.filter((r) => !["Done", "Canceled"].includes(r.status)).length,
    pendingDeliveries: state.deliveries.filter((d) => !["Done", "Canceled"].includes(d.status)).length,
    scheduledTransfers: state.transfers.filter((t) => !["Done", "Canceled"].includes(t.status)).length,
  }), [products, lowStockItems, state]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const bySearch = [p.name, p.sku, p.category].join(" ").toLowerCase().includes(search.toLowerCase());
      const byWarehouse = warehouseFilter === "all" || Object.keys(p.locationStock).includes(warehouseFilter);
      const byCategory = categoryFilter === "all" || p.category === categoryFilter;
      return bySearch && byWarehouse && byCategory;
    });
  }, [products, search, warehouseFilter, categoryFilter]);

  function resetAllData() {
    setState(seedState);
  }

  function addLedgerEntry(entry) {
    return { ...entry, id: Date.now() + Math.random() };
  }

  function upsertProduct(product) {
    setState((prev) => {
      const exists = prev.products.some((p) => p.id === product.id);
      return {
        ...prev,
        products: exists ? prev.products.map((p) => (p.id === product.id ? { ...p, ...product } : p)) : [{ ...product }, ...prev.products],
      };
    });
    setProductForm({ id: null, name: "", sku: "", category: "Raw Material", unit: "pcs", reorderLevel: 0 });
  }

  function deleteProduct(productId) {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }));
  }

  function addWarehouse() {
    if (!warehouseForm.name || !warehouseForm.location) return;
    setState((prev) => ({
      ...prev,
      warehouses: [...prev.warehouses, { id: Date.now(), ...warehouseForm }],
    }));
    setWarehouseForm({ name: "", location: "" });
  }

  function updateProductStock(productId, updater) {
    return state.products.map((p) => {
      if (p.id !== Number(productId)) return p;
      return updater({ ...p, locationStock: { ...p.locationStock } });
    });
  }

  function createReceipt() {
    const product = products.find((p) => p.id === Number(receiptForm.productId));
    if (!product || !receiptForm.supplier || !receiptForm.warehouse || Number(receiptForm.quantity) <= 0) return;
    const qty = Number(receiptForm.quantity);
    const newReceipt = {
      id: uid("RCV"),
      supplier: receiptForm.supplier,
      warehouse: receiptForm.warehouse,
      productId: product.id,
      quantity: qty,
      status: receiptForm.status,
      date: today(),
    };

    setState((prev) => {
      let nextProducts = prev.products;
      let nextLedger = prev.ledger;
      if (receiptForm.status === "Done") {
        nextProducts = prev.products.map((p) => {
          if (p.id !== product.id) return p;
          const nextLoc = (p.locationStock[receiptForm.warehouse] || 0) + qty;
          return {
            ...p,
            totalStock: p.totalStock + qty,
            locationStock: { ...p.locationStock, [receiptForm.warehouse]: nextLoc },
          };
        });
        nextLedger = [
          addLedgerEntry({
            type: "Receipt",
            product: product.name,
            change: `+${qty} ${product.unit}`,
            source: receiptForm.supplier,
            destination: receiptForm.warehouse,
            status: "Done",
            date: nowStamp(),
            note: "Incoming stock validated",
          }),
          ...prev.ledger,
        ];
      }
      return { ...prev, products: nextProducts, receipts: [newReceipt, ...prev.receipts], ledger: nextLedger };
    });
    setReceiptForm({ supplier: "", warehouse: warehouses[0]?.name || "", productId: String(products[0]?.id || 1), quantity: 0, status: "Draft" });
  }

  function createDelivery() {
    const product = products.find((p) => p.id === Number(deliveryForm.productId));
    if (!product || !deliveryForm.customer || !deliveryForm.warehouse || Number(deliveryForm.quantity) <= 0) return;
    const qty = Number(deliveryForm.quantity);
    const available = product.locationStock[deliveryForm.warehouse] || 0;
    if (deliveryForm.status === "Done" && available < qty) return;
    const newDelivery = {
      id: uid("DEL"),
      customer: deliveryForm.customer,
      warehouse: deliveryForm.warehouse,
      productId: product.id,
      quantity: qty,
      status: deliveryForm.status,
      date: today(),
    };
    setState((prev) => {
      let nextProducts = prev.products;
      let nextLedger = prev.ledger;
      if (deliveryForm.status === "Done") {
        nextProducts = prev.products.map((p) => {
          if (p.id !== product.id) return p;
          return {
            ...p,
            totalStock: p.totalStock - qty,
            locationStock: { ...p.locationStock, [deliveryForm.warehouse]: (p.locationStock[deliveryForm.warehouse] || 0) - qty },
          };
        });
        nextLedger = [
          addLedgerEntry({
            type: "Delivery",
            product: product.name,
            change: `-${qty} ${product.unit}`,
            source: deliveryForm.warehouse,
            destination: deliveryForm.customer,
            status: "Done",
            date: nowStamp(),
            note: "Outgoing shipment validated",
          }),
          ...prev.ledger,
        ];
      }
      return { ...prev, products: nextProducts, deliveries: [newDelivery, ...prev.deliveries], ledger: nextLedger };
    });
    setDeliveryForm({ customer: "", warehouse: warehouses[0]?.name || "", productId: String(products[0]?.id || 1), quantity: 0, status: "Draft" });
  }

  function createTransfer() {
    const product = products.find((p) => p.id === Number(transferForm.productId));
    if (!product || !transferForm.from || !transferForm.to || transferForm.from === transferForm.to || Number(transferForm.quantity) <= 0) return;
    const qty = Number(transferForm.quantity);
    const available = product.locationStock[transferForm.from] || 0;
    if (transferForm.status === "Done" && available < qty) return;
    const newTransfer = {
      id: uid("TRF"),
      from: transferForm.from,
      to: transferForm.to,
      productId: product.id,
      quantity: qty,
      status: transferForm.status,
      date: today(),
    };
    setState((prev) => {
      let nextProducts = prev.products;
      let nextLedger = prev.ledger;
      if (transferForm.status === "Done") {
        nextProducts = prev.products.map((p) => {
          if (p.id !== product.id) return p;
          return {
            ...p,
            locationStock: {
              ...p.locationStock,
              [transferForm.from]: (p.locationStock[transferForm.from] || 0) - qty,
              [transferForm.to]: (p.locationStock[transferForm.to] || 0) + qty,
            },
          };
        });
        nextLedger = [
          addLedgerEntry({
            type: "Transfer",
            product: product.name,
            change: `-${qty} / +${qty} ${product.unit}`,
            source: transferForm.from,
            destination: transferForm.to,
            status: "Done",
            date: nowStamp(),
            note: "Internal stock movement",
          }),
          ...prev.ledger,
        ];
      }
      return { ...prev, products: nextProducts, transfers: [newTransfer, ...prev.transfers], ledger: nextLedger };
    });
    setTransferForm({ from: warehouses[0]?.name || "", to: warehouses[1]?.name || warehouses[0]?.name || "", productId: String(products[0]?.id || 1), quantity: 0, status: "Draft" });
  }

  function createAdjustment() {
    const product = products.find((p) => p.id === Number(adjustmentForm.productId));
    if (!product || !adjustmentForm.location) return;
    const current = product.locationStock[adjustmentForm.location] || 0;
    const counted = Number(adjustmentForm.counted);
    const diff = counted - current;
    if (diff === 0) return;
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id !== product.id) return p;
        return {
          ...p,
          totalStock: p.totalStock + diff,
          locationStock: { ...p.locationStock, [adjustmentForm.location]: counted },
        };
      }),
      adjustments: [
        {
          id: uid("ADJ"),
          productId: product.id,
          location: adjustmentForm.location,
          difference: diff,
          reason: adjustmentForm.reason || "Inventory count correction",
          status: "Done",
          date: today(),
        },
        ...prev.adjustments,
      ],
      ledger: [
        addLedgerEntry({
          type: "Adjustment",
          product: product.name,
          change: `${diff > 0 ? "+" : ""}${diff} ${product.unit}`,
          source: adjustmentForm.location,
          destination: "System",
          status: "Done",
          date: nowStamp(),
          note: adjustmentForm.reason || "Inventory count correction",
        }),
        ...prev.ledger,
      ],
    }));
    setAdjustmentForm({ productId: String(products[0]?.id || 1), location: warehouses[0]?.name || "", counted: 0, reason: "" });
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} mode={authMode} setMode={setAuthMode} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <aside className="hidden md:flex w-72 min-h-screen flex-col border-r bg-white p-5">
          <div className="flex items-center gap-3 px-2 pb-6">
            <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">CoreInventory</div>
              <div className="text-xs text-slate-500">Inventory Management System</div>
            </div>
          </div>

          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setPage(item.key)}
                  className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${active ? "bg-slate-900 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4">
            <Card className="rounded-3xl bg-sky-50 border-sky-100 shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-4 w-4 text-sky-600" /> System health</div>
                <p className="text-xs text-slate-500 mt-2">State is persisted locally. Stock mutations update dashboard KPIs, location balances, and ledger history.</p>
                <Progress className="mt-4" value={92} />
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full rounded-2xl" onClick={resetAllData}>Reset Demo Data</Button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{nav.find((n) => n.key === page)?.label || "Dashboard"}</h1>
              <p className="text-slate-500 mt-1">Warehouse operations, stock visibility, and traceable movement history.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-2xl bg-white" placeholder="Search SKU, product, category..." />
              </div>
              <Button variant="outline" className="rounded-2xl" onClick={() => setAuthed(false)}><LogOut className="h-4 w-4 mr-2" />Logout</Button>
            </div>
          </div>

          {page === "dashboard" && (
            <div className="space-y-6">
              <SectionHeader
                title="Inventory Dashboard"
                description="Overview of stock levels, pending operations, and control alerts."
                action={
                  <div className="flex flex-wrap gap-3">
                    <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
                      <SelectTrigger className="w-44 rounded-2xl"><SelectValue placeholder="Warehouse" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All warehouses</SelectItem>
                        {warehouses.map((w) => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-44 rounded-2xl"><SelectValue placeholder="Category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {allCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                }
              />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {kpiCard.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                      <Card className="rounded-3xl border-0 shadow-md">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-slate-500">{item.title}</div>
                              <div className="text-3xl font-bold mt-3">{dashboardStats[item.key]}</div>
                            </div>
                            <div className={`rounded-2xl p-3 bg-slate-50 ${item.color}`}><Icon className="h-5 w-5" /></div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid xl:grid-cols-3 gap-6">
                <Card className="rounded-3xl xl:col-span-2 border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Low-stock and out-of-stock items</CardTitle>
                    <CardDescription>Products at or below reorder level.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Reorder</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowStockItems.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell className="font-medium">{p.name}</TableCell>
                            <TableCell>{p.sku}</TableCell>
                            <TableCell>{p.totalStock} {p.unit}</TableCell>
                            <TableCell>{p.reorderLevel} {p.unit}</TableCell>
                            <TableCell>{p.totalStock === 0 ? <Badge className="bg-rose-100 text-rose-700">Out of stock</Badge> : <Badge className="bg-amber-100 text-amber-700">Low stock</Badge>}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Recent movement</CardTitle>
                    <CardDescription>Latest stock ledger entries.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {state.ledger.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="rounded-2xl border p-4 bg-slate-50">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="secondary" className="rounded-xl">{entry.type}</Badge>
                          <div className="text-xs text-slate-500">{entry.date}</div>
                        </div>
                        <div className="font-medium mt-3">{entry.product}</div>
                        <div className="text-sm text-slate-500 mt-1">{entry.source} → {entry.destination}</div>
                        <div className="text-sm mt-2 font-medium">{entry.change}</div>
                        <div className="text-xs text-slate-500 mt-1">{entry.note}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {page === "products" && (
            <div className="space-y-6">
              <SectionHeader title="Product Management" description="Maintain SKUs, categories, units of measure, reorder levels, and stock by location." action={<AddProductDialog onAdd={upsertProduct} />} />

              <div className="grid xl:grid-cols-3 gap-6">
                <Card className="rounded-3xl border-0 shadow-md xl:col-span-2">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Total Stock</TableHead>
                          <TableHead>Reorder Rule</TableHead>
                          <TableHead>Stock by Location</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell className="font-medium">{p.name}</TableCell>
                            <TableCell>{p.sku}</TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell>{p.unit}</TableCell>
                            <TableCell>{p.totalStock}</TableCell>
                            <TableCell>{p.reorderLevel} {p.unit}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(p.locationStock).map(([loc, qty]) => <Badge key={loc} variant="secondary" className="rounded-xl">{loc}: {qty}</Badge>)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setProductForm({ id: p.id, name: p.name, sku: p.sku, category: p.category, unit: p.unit, reorderLevel: p.reorderLevel })}>Edit</Button>
                                <Button size="sm" variant="outline" className="rounded-xl" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4" /></Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>{productForm.id ? "Edit product" : "Quick edit"}</CardTitle>
                    <CardDescription>Update master product data.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2"><Label>Name</Label><Input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} /></div>
                    <div className="grid gap-2"><Label>SKU</Label><Input value={productForm.sku} onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2"><Label>Category</Label><Input value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} /></div>
                      <div className="grid gap-2"><Label>Unit</Label><Input value={productForm.unit} onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })} /></div>
                    </div>
                    <div className="grid gap-2"><Label>Reorder level</Label><Input type="number" value={productForm.reorderLevel} onChange={(e) => setProductForm({ ...productForm, reorderLevel: Number(e.target.value) })} /></div>
                    <Button className="w-full rounded-2xl" onClick={() => productForm.id && upsertProduct({ ...products.find((p) => p.id === productForm.id), ...productForm })}><Save className="h-4 w-4 mr-2" />Save Changes</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {page === "warehouses" && (
            <div className="space-y-6">
              <SectionHeader title="Warehouses & Locations" description="Manage multiple warehouses, racks, and operational storage areas." />
              <div className="grid xl:grid-cols-3 gap-6">
                <Card className="rounded-3xl border-0 shadow-md xl:col-span-2">
                  <div className="grid md:grid-cols-2 gap-5 p-6">
                    {warehouses.map((w) => (
                      <Card key={w.id} className="rounded-3xl border shadow-none">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">{w.name}</div>
                            <Warehouse className="h-5 w-5 text-sky-600" />
                          </div>
                          <div className="text-sm text-slate-500 mt-2">{w.location}</div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {products.filter((p) => p.locationStock[w.name] !== undefined).map((p) => (
                              <Badge key={p.id} variant="secondary" className="rounded-xl">{p.name}: {p.locationStock[w.name]} {p.unit}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </Card>
                <Card className="rounded-3xl border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Add warehouse</CardTitle>
                    <CardDescription>Create a new storage area or rack.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2"><Label>Name</Label><Input value={warehouseForm.name} onChange={(e) => setWarehouseForm({ ...warehouseForm, name: e.target.value })} /></div>
                    <div className="grid gap-2"><Label>Location</Label><Input value={warehouseForm.location} onChange={(e) => setWarehouseForm({ ...warehouseForm, location: e.target.value })} /></div>
                    <Button className="w-full rounded-2xl" onClick={addWarehouse}><Plus className="h-4 w-4 mr-2" />Add Warehouse</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {page === "operations" && (
            <div className="space-y-6">
              <SectionHeader title="Operations" description="Run incoming receipts, outgoing deliveries, internal transfers, and stock adjustments." action={<Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-44 rounded-2xl"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>} />

              <Tabs defaultValue="receipts" className="space-y-6">
                <TabsList className="rounded-2xl bg-white shadow-sm">
                  <TabsTrigger value="receipts">Receipts</TabsTrigger>
                  <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
                  <TabsTrigger value="transfers">Internal Transfers</TabsTrigger>
                  <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
                </TabsList>

                <TabsContent value="receipts">
                  <div className="grid xl:grid-cols-3 gap-6">
                    <Card className="rounded-3xl border-0 shadow-md xl:col-span-2">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Supplier</TableHead><TableHead>Warehouse</TableHead><TableHead>Product</TableHead><TableHead>Qty</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {state.receipts.filter((r) => statusFilter === "all" || r.status === statusFilter).map((r) => (
                              <TableRow key={r.id}><TableCell className="font-medium">{r.id}</TableCell><TableCell>{r.supplier}</TableCell><TableCell>{r.warehouse}</TableCell><TableCell>{products.find((p) => p.id === r.productId)?.name}</TableCell><TableCell>{r.quantity}</TableCell><TableCell>{r.date}</TableCell><TableCell><StatusBadge status={r.status} /></TableCell></TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    <Card className="rounded-3xl border-0 shadow-md">
                      <CardHeader><CardTitle>New receipt</CardTitle><CardDescription>Done status posts inventory immediately.</CardDescription></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2"><Label>Supplier</Label><Input value={receiptForm.supplier} onChange={(e) => setReceiptForm({ ...receiptForm, supplier: e.target.value })} /></div>
                        <div className="grid gap-2"><Label>Warehouse</Label><Select value={receiptForm.warehouse} onValueChange={(v) => setReceiptForm({ ...receiptForm, warehouse: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{warehouses.map((w) => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Product</Label><Select value={receiptForm.productId} onValueChange={(v) => setReceiptForm({ ...receiptForm, productId: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{products.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Quantity</Label><Input type="number" value={receiptForm.quantity} onChange={(e) => setReceiptForm({ ...receiptForm, quantity: e.target.value })} /></div>
                        <div className="grid gap-2"><Label>Status</Label><Select value={receiptForm.status} onValueChange={(v) => setReceiptForm({ ...receiptForm, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                        <Button className="w-full rounded-2xl" onClick={createReceipt}>Create Receipt</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="deliveries">
                  <div className="grid xl:grid-cols-3 gap-6">
                    <Card className="rounded-3xl border-0 shadow-md xl:col-span-2">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Customer</TableHead><TableHead>Warehouse</TableHead><TableHead>Product</TableHead><TableHead>Qty</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {state.deliveries.filter((d) => statusFilter === "all" || d.status === statusFilter).map((d) => (
                              <TableRow key={d.id}><TableCell className="font-medium">{d.id}</TableCell><TableCell>{d.customer}</TableCell><TableCell>{d.warehouse}</TableCell><TableCell>{products.find((p) => p.id === d.productId)?.name}</TableCell><TableCell>{d.quantity}</TableCell><TableCell>{d.date}</TableCell><TableCell><StatusBadge status={d.status} /></TableCell></TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    <Card className="rounded-3xl border-0 shadow-md">
                      <CardHeader><CardTitle>New delivery</CardTitle><CardDescription>Done status reduces stock from the selected location.</CardDescription></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2"><Label>Customer</Label><Input value={deliveryForm.customer} onChange={(e) => setDeliveryForm({ ...deliveryForm, customer: e.target.value })} /></div>
                        <div className="grid gap-2"><Label>Warehouse</Label><Select value={deliveryForm.warehouse} onValueChange={(v) => setDeliveryForm({ ...deliveryForm, warehouse: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{warehouses.map((w) => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Product</Label><Select value={deliveryForm.productId} onValueChange={(v) => setDeliveryForm({ ...deliveryForm, productId: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{products.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Quantity</Label><Input type="number" value={deliveryForm.quantity} onChange={(e) => setDeliveryForm({ ...deliveryForm, quantity: e.target.value })} /></div>
                        <div className="grid gap-2"><Label>Status</Label><Select value={deliveryForm.status} onValueChange={(v) => setDeliveryForm({ ...deliveryForm, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                        <Button className="w-full rounded-2xl" onClick={createDelivery}>Create Delivery</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="transfers">
                  <div className="grid xl:grid-cols-3 gap-6">
                    <Card className="rounded-3xl border-0 shadow-md xl:col-span-2">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>From</TableHead><TableHead>To</TableHead><TableHead>Product</TableHead><TableHead>Qty</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {state.transfers.filter((t) => statusFilter === "all" || t.status === statusFilter).map((t) => (
                              <TableRow key={t.id}><TableCell className="font-medium">{t.id}</TableCell><TableCell>{t.from}</TableCell><TableCell>{t.to}</TableCell><TableCell>{products.find((p) => p.id === t.productId)?.name}</TableCell><TableCell>{t.quantity}</TableCell><TableCell>{t.date}</TableCell><TableCell><StatusBadge status={t.status} /></TableCell></TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    <Card className="rounded-3xl border-0 shadow-md">
                      <CardHeader><CardTitle>New transfer</CardTitle><CardDescription>Done status moves stock between locations without changing total stock.</CardDescription></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2"><Label>From</Label><Select value={transferForm.from} onValueChange={(v) => setTransferForm({ ...transferForm, from: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{warehouses.map((w) => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>To</Label><Select value={transferForm.to} onValueChange={(v) => setTransferForm({ ...transferForm, to: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{warehouses.map((w) => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Product</Label><Select value={transferForm.productId} onValueChange={(v) => setTransferForm({ ...transferForm, productId: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{products.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Quantity</Label><Input type="number" value={transferForm.quantity} onChange={(e) => setTransferForm({ ...transferForm, quantity: e.target.value })} /></div>
                        <div className="grid gap-2"><Label>Status</Label><Select value={transferForm.status} onValueChange={(v) => setTransferForm({ ...transferForm, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                        <Button className="w-full rounded-2xl" onClick={createTransfer}>Create Transfer</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="adjustments">
                  <div className="grid xl:grid-cols-3 gap-6">
                    <Card className="rounded-3xl border-0 shadow-md xl:col-span-2">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Product</TableHead><TableHead>Location</TableHead><TableHead>Difference</TableHead><TableHead>Reason</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {state.adjustments.map((a) => (
                              <TableRow key={a.id}><TableCell className="font-medium">{a.id}</TableCell><TableCell>{products.find((p) => p.id === a.productId)?.name}</TableCell><TableCell>{a.location}</TableCell><TableCell>{a.difference}</TableCell><TableCell>{a.reason}</TableCell><TableCell>{a.date}</TableCell><TableCell><StatusBadge status={a.status} /></TableCell></TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    <Card className="rounded-3xl border-0 shadow-md">
                      <CardHeader><CardTitle>Inventory adjustment</CardTitle><CardDescription>Count actual stock and apply the difference.</CardDescription></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2"><Label>Product</Label><Select value={adjustmentForm.productId} onValueChange={(v) => setAdjustmentForm({ ...adjustmentForm, productId: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{products.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Location</Label><Select value={adjustmentForm.location} onValueChange={(v) => setAdjustmentForm({ ...adjustmentForm, location: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{warehouses.map((w) => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="grid gap-2"><Label>Counted quantity</Label><Input type="number" value={adjustmentForm.counted} onChange={(e) => setAdjustmentForm({ ...adjustmentForm, counted: e.target.value })} /></div>
                        <div className="grid gap-2"><Label>Reason</Label><Textarea value={adjustmentForm.reason} onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })} /></div>
                        <Button className="w-full rounded-2xl" onClick={createAdjustment}>Apply Adjustment</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {page === "ledger" && (
            <div className="space-y-6">
              <SectionHeader title="Move History / Stock Ledger" description="Every receipt, delivery, transfer, and adjustment is logged with source and destination." />
              <Card className="rounded-3xl border-0 shadow-md">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Note</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {state.ledger.map((l) => (
                        <TableRow key={l.id}>
                          <TableCell>{l.date}</TableCell>
                          <TableCell>{l.type}</TableCell>
                          <TableCell className="font-medium">{l.product}</TableCell>
                          <TableCell>{l.change}</TableCell>
                          <TableCell>{l.source}</TableCell>
                          <TableCell>{l.destination}</TableCell>
                          <TableCell><StatusBadge status={l.status} /></TableCell>
                          <TableCell>{l.note}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {page === "alerts" && (
            <div className="space-y-6">
              <SectionHeader title="Alerts & Inventory Controls" description="Monitor low-stock and out-of-stock items tied to reorder rules." />
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {lowStockItems.map((p) => (
                  <Card key={p.id} className="rounded-3xl border-0 shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-sm text-slate-500 mt-1">{p.sku} · {p.category}</div>
                        </div>
                        <AlertTriangle className={`h-5 w-5 ${p.totalStock === 0 ? "text-rose-600" : "text-amber-600"}`} />
                      </div>
                      <div className="mt-4 text-sm">Current stock: <span className="font-medium">{p.totalStock} {p.unit}</span></div>
                      <div className="text-sm mt-1">Reorder level: <span className="font-medium">{p.reorderLevel} {p.unit}</span></div>
                      <div className="mt-4">{p.totalStock === 0 ? <Badge className="bg-rose-100 text-rose-700">Out of stock</Badge> : <Badge className="bg-amber-100 text-amber-700">Low stock</Badge>}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {page === "settings" && (
            <div className="space-y-6">
              <SectionHeader title="Settings" description="Warehouse setup, storage locations, and baseline inventory rules." />
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="rounded-3xl border-0 shadow-md">
                  <CardHeader><CardTitle>Warehouse configuration</CardTitle><CardDescription>Support multiple warehouses and named storage areas.</CardDescription></CardHeader>
                  <CardContent className="space-y-3">
                    {warehouses.map((w) => <div key={w.id} className="rounded-2xl border p-4 flex items-center justify-between"><div><div className="font-medium">{w.name}</div><div className="text-sm text-slate-500">{w.location}</div></div><Badge variant="secondary">Active</Badge></div>)}
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-0 shadow-md">
                  <CardHeader><CardTitle>Document statuses</CardTitle><CardDescription>Workflow statuses used across receipts, deliveries, transfers, and adjustments.</CardDescription></CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    {statuses.map((s) => <StatusBadge key={s} status={s} />)}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {page === "profile" && (
            <div className="space-y-6">
              <SectionHeader title="My Profile" description="Basic account information and editable user data for the signed-in inventory user." />
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="rounded-3xl border-0 shadow-md lg:col-span-1">
                  <CardContent className="p-6 text-center">
                    <div className="h-20 w-20 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto text-2xl font-bold">IM</div>
                    <div className="font-semibold text-xl mt-4">{state.profile.fullName}</div>
                    <div className="text-sm text-slate-500 mt-1">{state.profile.email}</div>
                    <Badge className="mt-4 bg-emerald-100 text-emerald-700">Active session</Badge>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-0 shadow-md lg:col-span-2">
                  <CardHeader><CardTitle>Profile details</CardTitle><CardDescription>Editable profile view backed by local persistence.</CardDescription></CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2"><Label>Full Name</Label><Input value={state.profile.fullName} onChange={(e) => setState((prev) => ({ ...prev, profile: { ...prev.profile, fullName: e.target.value } }))} /></div>
                    <div className="grid gap-2"><Label>Email</Label><Input value={state.profile.email} onChange={(e) => setState((prev) => ({ ...prev, profile: { ...prev.profile, email: e.target.value } }))} /></div>
                    <div className="grid gap-2"><Label>Role</Label><Input value={state.profile.role} onChange={(e) => setState((prev) => ({ ...prev, profile: { ...prev.profile, role: e.target.value } }))} /></div>
                    <div className="grid gap-2"><Label>Phone</Label><Input value={state.profile.phone} onChange={(e) => setState((prev) => ({ ...prev, profile: { ...prev.profile, phone: e.target.value } }))} /></div>
                    <div className="md:col-span-2 flex gap-3"><Button className="rounded-2xl">Save Profile</Button><Button variant="outline" className="rounded-2xl" onClick={() => setAuthed(false)}>Logout</Button></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
