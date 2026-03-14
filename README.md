# 👗 DigiStock
> A modular, real-time Inventory Management System for clothing stores — replacing manual registers and Excel sheets with a centralized, easy-to-use digital platform.

---

## 🔗 Live Demo
👉 **[https://rushibhatt917-cloud.github.io/Core-Inventory--Odoo/]( https://rushibhatt917-cloud.github.io/DigiStock-APP---Odoo--Hackathon/)**

**Login Credentials:**
- Email: `manager@onestitch.com`
- Password: `password123`

---

## 📌 Problem Statement

Clothing stores and fashion retailers across India manage their stock using **paper registers, Excel sheets, and WhatsApp messages**.

This leads to:
- ❌ Stock mismatches — items recorded don't match actual physical stock
- ❌ Wrong deliveries — nobody knows what sizes are available
- ❌ No low-stock alerts — popular items run out without warning
- ❌ Zero visibility — managers have no real-time picture of inventory
- ❌ Wasted time — staff spend hours manually counting and cross-checking

**The result?** Lost sales, frustrated customers, and chaotic store operations — every single day.

---

## 💡 Our Solution — DigiStock

**DigiStock** is a modular Inventory Management System that digitizes and streamlines all stock-related operations for a clothing store.

It replaces manual processes with a **centralized, real-time web application** that automatically updates stock the moment garments arrive, move, or are sold — with zero manual calculation.

```
Vendor sends goods   → Create Receipt  → Validate → Stock auto-updates ✅
Customer buys items  → Create Delivery → Validate → Stock auto-reduces ✅
Move stock to floor  → Internal Transfer → Location auto-updates       ✅
Physical count wrong → Stock Adjustment → System auto-corrects         ✅
```

---

## 🎯 Target Users

| User | Role |
|------|------|
| **Store Manager** | Manages all stock, views dashboard, approves operations |
| **Floor Staff** | Performs transfers, stock counting, receives deliveries |

**Industries:** Fashion Retail, Clothing Boutiques, Garment Wholesalers, Multi-brand Outlets

---

## ✨ Features

### 🔐 Authentication
- Secure Sign Up / Login
- OTP-based password reset
- Role-based access (Manager / Staff)

### 📊 Real-Time Dashboard
Live snapshot of all store operations:
- Total Products in Stock
- Low Stock / Out of Stock Alerts
- Pending Receipts (incoming goods)
- Pending Deliveries (outgoing goods)
- Internal Transfers Scheduled

### 👗 Product Management (120+ Items)
Products organized across 8 clothing categories:
- Men's Wear, Women's Wear, Kids' Wear
- Winter Wear, Ethnic Wear, Innerwear
- Accessories, Footwear

Each product has: Name, SKU, Category, Unit, Stock Qty, Min Alert Level, Location

### 📦 Receipts — Incoming Stock
> Vendor delivers 50 Kurtis → Create Receipt → Validate → Stock **+50** ✅

### 📤 Delivery Orders — Outgoing Stock
> Customer orders 20 T-Shirts → Create Delivery → Validate → Stock **-20** ✅

### 🔄 Internal Transfers
Move stock between store sections — every movement logged:
- Store Room → Floor A (Men)
- Store Room → Floor B (Women)
- Floor C (Kids) → Store Room 2

### ⚙️ Stock Adjustments
Fix mismatches between recorded and physical count:
> 3 frocks found damaged → Stock Adjustment → **-3 logged** ✅

### 🔔 Additional Features
- Automated **low stock alerts** with visual indicators
- **Multi-location** support (8 store sections)
- **SKU search** and smart filters (by category, location, stock level)
- Complete **Stock Ledger** — every movement logged forever
- **Database persistence** — all data saved to browser storage
- **Export Database** — download full data as JSON anytime

---

## 🏆 Business Impact

| Pain Point | Before OneStitch | After OneStitch |
|-----------|-----------------|-----------------|
| Stock counting | Manual, 2–3 hrs/day | Real-time, instant |
| Size availability check | Ask staff manually | Live dashboard |
| Low stock situation | Discovered when empty | Alert before runout |
| Delivery accuracy | Frequent wrong orders | Auto-validated stock |
| Manager visibility | Zero without manual report | Live anytime |
| Time on stock management | ~15 hrs/week | ~2 hrs/week |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Database | Browser LocalStorage (SQLite-style) |
| Hosting | GitHub Pages |
| Version Control | GitHub |

---

## 🗂️ Project Structure

```
Core-Inventory--Odoo/
├── index.html              ← Complete OneStitch app (single file)
├── onestitch-database.json ← Full product database (120 items)
├── .nojekyll               ← GitHub Pages config
└── README.md               ← This file
```

---

## 🚀 How to Run Locally

```bash
# Just open index.html in any browser — no installation needed!
# OR serve it locally:
npx serve .

# Then open:
http://localhost:3000
```

---

## 🗄️ Database

The app uses a **browser-based SQLite-style database** via localStorage:

| Table | Records | Description |
|-------|---------|-------------|
| products | 120 | All clothing items with stock levels |
| users | 1+ | Store managers and staff |
| receipts | Auto | Incoming stock from vendors |
| deliveries | Auto | Outgoing stock to customers |
| transfers | Auto | Internal location movements |
| adjustments | Auto | Stock count corrections |
| ledger | Auto | Full audit trail |

**Export database** anytime using the ⬇ Export DB button in the sidebar.

---

## 📽️ Demo Video
🎬 [Watch our solution demo](#)

---

## 🌊 Inventory Flow — Real Example

```
Step 1: Vendor delivers 80 Women's Kurtis (M)
        → Receipt created → Validated → Stock: +80

Step 2: Move 30 pieces to shop floor
        → Transfer: Store Room → Floor B (Women)
        → Location updated, total stock unchanged

Step 3: 20 Kurtis sold to customer
        → Delivery Order validated
        → Stock: -20

Step 4: 2 pieces found damaged during inspection
        → Stock Adjustment logged
        → Stock: -2

Final stock: 58 Kurtis — all movements in Stock Ledger ✅
```

---

## 👥 Team

| Name | Role |
|------|------|
| [Rushi Bhatt] | Team Lead & Developer |
| [Dhanraj Beldar] | Backend & Database |
| [Helly Shah] | Frontend & UI |
| [Jinay Prajapati] | Backend & Database |

**Team Name:** [Codehacks]
**Hackathon:** Odoo Hackathon 2026
