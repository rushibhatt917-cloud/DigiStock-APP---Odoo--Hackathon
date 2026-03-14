-- ============================================================
-- DigiStock Inventory Management System
-- SQL Database File
-- Created: 2026-03-14
-- Manager: Rushi Bhatt
-- ============================================================

-- ── DROP TABLES (clean start) ──────────────────────────────
DROP TABLE IF EXISTS ledger;
DROP TABLE IF EXISTS adjustments;
DROP TABLE IF EXISTS transfers;
DROP TABLE IF EXISTS deliveries;
DROP TABLE IF EXISTS receipts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- ── CREATE TABLES ──────────────────────────────────────────

CREATE TABLE users (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  email    TEXT    NOT NULL UNIQUE,
  password TEXT    NOT NULL,
  name     TEXT    NOT NULL,
  role     TEXT    NOT NULL DEFAULT 'Store Manager',
  created  TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE products (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT    NOT NULL,
  sku      TEXT    NOT NULL UNIQUE,
  category TEXT    NOT NULL,
  unit     TEXT    NOT NULL DEFAULT 'pcs',
  stock    INTEGER NOT NULL DEFAULT 0,
  min_qty  INTEGER NOT NULL DEFAULT 10,
  location TEXT    NOT NULL,
  created  TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE receipts (
  id          TEXT    PRIMARY KEY,
  supplier    TEXT    NOT NULL,
  product     TEXT    NOT NULL,
  qty         INTEGER NOT NULL,
  status      TEXT    NOT NULL DEFAULT 'Draft',
  date        TEXT    NOT NULL,
  created     TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE deliveries (
  id          TEXT    PRIMARY KEY,
  customer    TEXT    NOT NULL,
  product     TEXT    NOT NULL,
  qty         INTEGER NOT NULL,
  status      TEXT    NOT NULL DEFAULT 'Draft',
  date        TEXT    NOT NULL,
  created     TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE transfers (
  id          TEXT    PRIMARY KEY,
  product     TEXT    NOT NULL,
  qty         INTEGER NOT NULL,
  from_loc    TEXT    NOT NULL,
  to_loc      TEXT    NOT NULL,
  status      TEXT    NOT NULL DEFAULT 'Draft',
  date        TEXT    NOT NULL,
  created     TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE adjustments (
  id          TEXT    PRIMARY KEY,
  product     TEXT    NOT NULL,
  old_qty     INTEGER NOT NULL,
  new_qty     INTEGER NOT NULL,
  difference  INTEGER NOT NULL,
  reason      TEXT    NOT NULL,
  date        TEXT    NOT NULL,
  created     TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE ledger (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT    NOT NULL, -- in / out / move / adj
  product     TEXT    NOT NULL,
  qty         INTEGER NOT NULL,
  note        TEXT    NOT NULL,
  time        TEXT    NOT NULL,
  created     TEXT    DEFAULT (datetime('now'))
);

-- ── INSERT: USERS ───────────────────────────────────────────
INSERT INTO users (email, password, name, role) VALUES
('manager@digistock.com', 'password123', 'Rushi Bhatt', 'Store Manager');

-- ── INSERT: PRODUCTS ────────────────────────────────────────

-- MEN'S WEAR
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
("Men's Cotton T-Shirt (S)",    'MTS-001', "Men's Wear", 'pcs', 120, 20, 'Floor A - Men'),
("Men's Cotton T-Shirt (M)",    'MTS-002', "Men's Wear", 'pcs',  95, 20, 'Floor A - Men'),
("Men's Cotton T-Shirt (L)",    'MTS-003', "Men's Wear", 'pcs',   4, 20, 'Floor A - Men'),
("Men's Cotton T-Shirt (XL)",   'MTS-004', "Men's Wear", 'pcs',  60, 15, 'Floor A - Men'),
("Men's Polo Shirt (S)",        'MPL-005', "Men's Wear", 'pcs',   0, 10, 'Floor A - Men'),
("Men's Polo Shirt (M)",        'MPL-006', "Men's Wear", 'pcs',  45, 10, 'Floor A - Men'),
("Men's Polo Shirt (L)",        'MPL-007', "Men's Wear", 'pcs',  38, 10, 'Floor A - Men'),
("Men's Slim Jeans (30W)",      'MJN-008', "Men's Wear", 'pcs',  55, 10, 'Floor A - Men'),
("Men's Slim Jeans (32W)",      'MJN-009', "Men's Wear", 'pcs',  48, 10, 'Floor A - Men'),
("Men's Slim Jeans (34W)",      'MJN-010', "Men's Wear", 'pcs',   3, 10, 'Floor A - Men'),
("Men's Slim Jeans (36W)",      'MJN-011', "Men's Wear", 'pcs',  22,  8, 'Floor A - Men'),
("Men's Casual Chinos (30W)",   'MCH-012', "Men's Wear", 'pcs',  30,  8, 'Floor A - Men'),
("Men's Casual Chinos (32W)",   'MCH-013', "Men's Wear", 'pcs',  25,  8, 'Floor A - Men'),
("Men's Formal Shirt (S)",      'MFS-014', "Men's Wear", 'pcs',  40, 10, 'Floor A - Men'),
("Men's Formal Shirt (M)",      'MFS-015', "Men's Wear", 'pcs',  35, 10, 'Floor A - Men'),
("Men's Formal Shirt (L)",      'MFS-016', "Men's Wear", 'pcs',   0, 10, 'Floor A - Men'),
("Men's Formal Shirt (XL)",     'MFS-017', "Men's Wear", 'pcs',  18,  8, 'Floor A - Men'),
("Men's Blazer (M)",            'MBZ-018', "Men's Wear", 'pcs',  12,  4, 'Floor A - Men'),
("Men's Blazer (L)",            'MBZ-019', "Men's Wear", 'pcs',   8,  4, 'Floor A - Men'),
("Men's Blazer (XL)",           'MBZ-020', "Men's Wear", 'pcs',   5,  3, 'Floor A - Men'),
("Men's Track Pants (M)",       'MTP-021', "Men's Wear", 'pcs',  65, 15, 'Floor A - Men'),
("Men's Track Pants (L)",       'MTP-022', "Men's Wear", 'pcs',  50, 15, 'Floor A - Men'),
("Men's Hoodie (M)",            'MHD-023', "Men's Wear", 'pcs',   2,  8, 'Floor A - Men'),
("Men's Hoodie (L)",            'MHD-024', "Men's Wear", 'pcs',  20,  8, 'Floor A - Men'),
("Men's Kurta (M)",             'MKT-025', "Men's Wear", 'pcs',  35, 10, 'Floor A - Men');

-- WOMEN'S WEAR
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
("Women's Kurti (S)",           'WKT-026', "Women's Wear", 'pcs',  80, 15, 'Floor B - Women'),
("Women's Kurti (M)",           'WKT-027', "Women's Wear", 'pcs',  95, 15, 'Floor B - Women'),
("Women's Kurti (L)",           'WKT-028', "Women's Wear", 'pcs',   4, 15, 'Floor B - Women'),
("Women's Kurti (XL)",          'WKT-029', "Women's Wear", 'pcs',  40, 10, 'Floor B - Women'),
("Women's Salwar Suit (S)",     'WSS-030', "Women's Wear", 'pcs',  28,  8, 'Floor B - Women'),
("Women's Salwar Suit (M)",     'WSS-031', "Women's Wear", 'pcs',  35,  8, 'Floor B - Women'),
("Women's Salwar Suit (L)",     'WSS-032', "Women's Wear", 'pcs',   0,  8, 'Floor B - Women'),
("Women's Saree (Cotton)",      'WSR-033', "Women's Wear", 'pcs',  50, 10, 'Floor B - Women'),
("Women's Saree (Silk)",        'WSR-034', "Women's Wear", 'pcs',  22,  5, 'Floor B - Women'),
("Women's Saree (Chiffon)",     'WSR-035', "Women's Wear", 'pcs',  15,  5, 'Floor B - Women'),
("Women's Leggings (S)",        'WLG-036', "Women's Wear", 'pcs', 100, 20, 'Floor B - Women'),
("Women's Leggings (M)",        'WLG-037', "Women's Wear", 'pcs',  85, 20, 'Floor B - Women'),
("Women's Leggings (L)",        'WLG-038', "Women's Wear", 'pcs',   3, 20, 'Floor B - Women'),
("Women's Palazzo (M)",         'WPZ-039', "Women's Wear", 'pcs',  40, 10, 'Floor B - Women'),
("Women's Palazzo (L)",         'WPZ-040', "Women's Wear", 'pcs',  30, 10, 'Floor B - Women'),
("Women's Tops - Casual (S)",   'WTP-041', "Women's Wear", 'pcs',  55, 12, 'Floor B - Women'),
("Women's Tops - Casual (M)",   'WTP-042', "Women's Wear", 'pcs',  60, 12, 'Floor B - Women'),
("Women's Tops - Casual (L)",   'WTP-043', "Women's Wear", 'pcs',  45, 12, 'Floor B - Women'),
("Women's Anarkali (M)",        'WAN-044', "Women's Wear", 'pcs',  18,  5, 'Floor B - Women'),
("Women's Anarkali (L)",        'WAN-045', "Women's Wear", 'pcs',  12,  5, 'Floor B - Women'),
("Women's Skirt (S)",           'WSK-046', "Women's Wear", 'pcs',  25,  8, 'Floor B - Women'),
("Women's Skirt (M)",           'WSK-047', "Women's Wear", 'pcs',  20,  8, 'Floor B - Women'),
("Women's Dupatta (Cotton)",    'WDP-048', "Women's Wear", 'pcs',  70, 15, 'Floor B - Women'),
("Women's Dupatta (Silk)",      'WDP-049', "Women's Wear", 'pcs',  30, 10, 'Floor B - Women'),
("Women's Blouse (S)",          'WBL-050', "Women's Wear", 'pcs',  40, 10, 'Floor B - Women');

-- KIDS' WEAR
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
("Kids' T-Shirt (2-4Y)",        'KTS-051', "Kids' Wear", 'pcs',  90, 15, 'Floor C - Kids'),
("Kids' T-Shirt (4-6Y)",        'KTS-052', "Kids' Wear", 'pcs',  85, 15, 'Floor C - Kids'),
("Kids' T-Shirt (6-8Y)",        'KTS-053', "Kids' Wear", 'pcs',   0, 15, 'Floor C - Kids'),
("Kids' T-Shirt (8-10Y)",       'KTS-054', "Kids' Wear", 'pcs',  60, 12, 'Floor C - Kids'),
("Kids' Frock (2-4Y)",          'KFR-055', "Kids' Wear", 'pcs',  45, 10, 'Floor C - Kids'),
("Kids' Frock (4-6Y)",          'KFR-056', "Kids' Wear", 'pcs',  38, 10, 'Floor C - Kids'),
("Kids' Frock (6-8Y)",          'KFR-057', "Kids' Wear", 'pcs',   5, 10, 'Floor C - Kids'),
("Kids' Jeans (4-6Y)",          'KJN-058', "Kids' Wear", 'pcs',  40, 10, 'Floor C - Kids'),
("Kids' Jeans (6-8Y)",          'KJN-059', "Kids' Wear", 'pcs',  35, 10, 'Floor C - Kids'),
("Kids' Jeans (8-10Y)",         'KJN-060', "Kids' Wear", 'pcs',  28,  8, 'Floor C - Kids'),
("Kids' Track Suit (4-6Y)",     'KTS-061', "Kids' Wear", 'pcs',  50, 10, 'Floor C - Kids'),
("Kids' Track Suit (6-8Y)",     'KTS-062', "Kids' Wear", 'pcs',   3, 10, 'Floor C - Kids'),
("Kids' Ethnic Set (2-4Y)",     'KET-063', "Kids' Wear", 'pcs',  30,  8, 'Floor C - Kids'),
("Kids' Ethnic Set (4-6Y)",     'KET-064', "Kids' Wear", 'pcs',  25,  8, 'Floor C - Kids'),
("Kids' School Uniform Shirt",  'KSU-065', "Kids' Wear", 'pcs', 120, 20, 'Floor C - Kids');

-- WINTER WEAR
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
("Men's Woollen Sweater (M)",   'MWS-066', 'Winter Wear', 'pcs',  35, 10, 'Store Room 1'),
("Men's Woollen Sweater (L)",   'MWS-067', 'Winter Wear', 'pcs',  28, 10, 'Store Room 1'),
("Men's Jacket (M)",            'MJK-068', 'Winter Wear', 'pcs',   4,  8, 'Store Room 1'),
("Men's Jacket (L)",            'MJK-069', 'Winter Wear', 'pcs',  18,  8, 'Store Room 1'),
("Men's Jacket (XL)",           'MJK-070', 'Winter Wear', 'pcs',  12,  6, 'Store Room 1'),
("Women's Shawl (Woollen)",     'WSH-071', 'Winter Wear', 'pcs',  50, 10, 'Store Room 1'),
("Women's Shawl (Pashmina)",    'WSH-072', 'Winter Wear', 'pcs',  15,  5, 'Store Room 1'),
("Women's Cardigan (M)",        'WCD-073', 'Winter Wear', 'pcs',  22,  8, 'Store Room 1'),
("Women's Cardigan (L)",        'WCD-074', 'Winter Wear', 'pcs',   0,  8, 'Store Room 1'),
("Kids' Woollen Jacket (4-6Y)", 'KWJ-075', 'Winter Wear', 'pcs',  30,  8, 'Store Room 1'),
("Kids' Woollen Jacket (6-8Y)", 'KWJ-076', 'Winter Wear', 'pcs',  25,  8, 'Store Room 1'),
('Unisex Muffler',              'UMF-077', 'Winter Wear', 'pcs',  80, 15, 'Store Room 1'),
('Woollen Gloves (Free Size)',  'WGL-078', 'Winter Wear', 'pcs',  60, 12, 'Store Room 1'),
('Thermal Inner (M)',           'THI-079', 'Winter Wear', 'pcs',   3, 10, 'Store Room 1'),
('Thermal Inner (L)',           'THI-080', 'Winter Wear', 'pcs',  40, 10, 'Store Room 1');

-- ETHNIC WEAR
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
("Men's Kurta-Pyjama Set (M)",  'MKP-081', 'Ethnic Wear', 'pcs',  30,  8, 'Floor D - Ethnic'),
("Men's Kurta-Pyjama Set (L)",  'MKP-082', 'Ethnic Wear', 'pcs',  25,  8, 'Floor D - Ethnic'),
("Men's Sherwani (M)",          'MSW-083', 'Ethnic Wear', 'pcs',   8,  3, 'Floor D - Ethnic'),
("Men's Sherwani (L)",          'MSW-084', 'Ethnic Wear', 'pcs',   5,  3, 'Floor D - Ethnic'),
("Women's Lehenga (S)",         'WLH-085', 'Ethnic Wear', 'pcs',  12,  4, 'Floor D - Ethnic'),
("Women's Lehenga (M)",         'WLH-086', 'Ethnic Wear', 'pcs',  10,  4, 'Floor D - Ethnic'),
("Women's Lehenga (L)",         'WLH-087', 'Ethnic Wear', 'pcs',   0,  4, 'Floor D - Ethnic'),
("Women's Gharara Set (M)",     'WGS-088', 'Ethnic Wear', 'pcs',   6,  3, 'Floor D - Ethnic'),
('Dhoti (Free Size)',           'DHT-089', 'Ethnic Wear', 'pcs',  40,  8, 'Floor D - Ethnic'),
('Nehru Jacket (M)',            'NJK-090', 'Ethnic Wear', 'pcs',  18,  5, 'Floor D - Ethnic');

-- INNERWEAR
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
("Men's Vest (S-Pack of 3)",    'MVT-091', 'Innerwear', 'packs', 80, 15, 'Store Room 2'),
("Men's Vest (M-Pack of 3)",    'MVT-092', 'Innerwear', 'packs', 75, 15, 'Store Room 2'),
("Men's Vest (L-Pack of 3)",    'MVT-093', 'Innerwear', 'packs',  4, 15, 'Store Room 2'),
("Men's Boxers (M)",            'MBX-094', 'Innerwear', 'pcs',   90, 20, 'Store Room 2'),
("Men's Boxers (L)",            'MBX-095', 'Innerwear', 'pcs',   70, 20, 'Store Room 2'),
("Women's Bra (32B)",           'WBR-096', 'Innerwear', 'pcs',   50, 10, 'Store Room 2'),
("Women's Bra (34B)",           'WBR-097', 'Innerwear', 'pcs',   45, 10, 'Store Room 2'),
("Women's Bra (36C)",           'WBR-098', 'Innerwear', 'pcs',    3, 10, 'Store Room 2'),
("Women's Panties (M-Pack 3)",  'WPN-099', 'Innerwear', 'packs', 60, 12, 'Store Room 2'),
("Women's Panties (L-Pack 3)",  'WPN-100', 'Innerwear', 'packs', 50, 12, 'Store Room 2');

-- ACCESSORIES
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
('Cotton Socks (Men, Pk6)',     'ACS-101', 'Accessories', 'packs', 100, 20, 'Accessories Rack'),
('Cotton Socks (Women, Pk6)',   'ACS-102', 'Accessories', 'packs',  80, 15, 'Accessories Rack'),
('Leather Belt (32 inch)',      'BLT-103', 'Accessories', 'pcs',    25,  5, 'Accessories Rack'),
('Leather Belt (34 inch)',      'BLT-104', 'Accessories', 'pcs',    20,  5, 'Accessories Rack'),
('Canvas Belt (Free Size)',     'BLT-105', 'Accessories', 'pcs',     0,  8, 'Accessories Rack'),
('Neck Tie (Formal)',           'TIE-106', 'Accessories', 'pcs',    30,  6, 'Accessories Rack'),
('Bow Tie',                     'TIE-107', 'Accessories', 'pcs',    15,  4, 'Accessories Rack'),
('Handkerchief (Pk6)',          'HKF-108', 'Accessories', 'packs',  60, 10, 'Accessories Rack'),
('Hair Band (Pk12)',            'HBD-109', 'Accessories', 'packs',  45, 10, 'Accessories Rack'),
('Scrunchies (Pk6)',            'SCR-110', 'Accessories', 'packs',  50, 10, 'Accessories Rack'),
("Wallet (Men's, Leather)",     'WAL-111', 'Accessories', 'pcs',    18,  5, 'Accessories Rack'),
("Wallet (Women's, Fabric)",    'WAL-112', 'Accessories', 'pcs',    12,  5, 'Accessories Rack'),
('Stole (Printed)',             'STL-113', 'Accessories', 'pcs',    35,  8, 'Accessories Rack'),
('Cap (Baseball, Unisex)',      'CAP-114', 'Accessories', 'pcs',    40,  8, 'Accessories Rack'),
('Sunglasses (Unisex)',         'SGL-115', 'Accessories', 'pcs',    22,  5, 'Accessories Rack');

-- FOOTWEAR
INSERT INTO products (name, sku, category, unit, stock, min_qty, location) VALUES
("Men's Casual Shoes (Size 8)", 'MCS-116', 'Footwear', 'pairs', 20, 5, 'Footwear Section'),
("Men's Casual Shoes (Size 9)", 'MCS-117', 'Footwear', 'pairs', 15, 5, 'Footwear Section'),
("Men's Formal Shoes (Size 8)", 'MFS-118', 'Footwear', 'pairs', 10, 3, 'Footwear Section'),
("Women's Heels (Size 5)",      'WHE-119', 'Footwear', 'pairs',  0, 4, 'Footwear Section'),
("Women's Flats (Size 5-7)",    'WFL-120', 'Footwear', 'pairs', 25, 6, 'Footwear Section');

-- ── INSERT: RECEIPTS ────────────────────────────────────────
INSERT INTO receipts (id, supplier, product, qty, status, date) VALUES
('REC-001', 'Fab India Textiles', "Women's Kurti (M)",      50, 'Done',  '2026-03-12'),
('REC-002', 'Raymond Fabrics',    "Men's Formal Shirt (M)", 30, 'Draft', '2026-03-13');

-- ── INSERT: DELIVERIES ──────────────────────────────────────
INSERT INTO deliveries (id, customer, product, qty, status, date) VALUES
('DEL-001', 'Style Hub Retail', "Men's Cotton T-Shirt (M)", 20, 'Done',  '2026-03-11'),
('DEL-002', 'Trendy Zone',      "Women's Leggings (M)",     15, 'Draft', '2026-03-13');

-- ── INSERT: TRANSFERS ───────────────────────────────────────
INSERT INTO transfers (id, product, qty, from_loc, to_loc, status, date) VALUES
('TRF-001', "Women's Saree (Cotton)", 20, 'Store Room 1', 'Floor B - Women', 'Done', '2026-03-12');

-- ── INSERT: ADJUSTMENTS ─────────────────────────────────────
INSERT INTO adjustments (id, product, old_qty, new_qty, difference, reason, date) VALUES
('ADJ-001', "Kids' Frock (6-8Y)", 8, 5, -3, 'Damaged goods', '2026-03-11');

-- ── INSERT: LEDGER ──────────────────────────────────────────
INSERT INTO ledger (type, product, qty, note, time) VALUES
('in',   "Women's Kurti (M)",        50, 'Receipt from Fab India Textiles',         'Mar 12, 10:30'),
('out',  "Men's Cotton T-Shirt (M)", 20, 'Delivery to Style Hub Retail',            'Mar 11, 14:20'),
('move', "Women's Saree (Cotton)",   20, 'Transfer: Store Room 1 → Floor B - Women','Mar 12, 11:00'),
('adj',  "Kids' Frock (6-8Y)",       -3, 'Adjustment: Damaged goods',               'Mar 11, 09:00');

-- ── USEFUL QUERIES ──────────────────────────────────────────

-- View all products with low stock:
-- SELECT name, sku, stock, min_qty, location FROM products WHERE stock <= min_qty;

-- View all out of stock items:
-- SELECT name, sku, category, location FROM products WHERE stock = 0;

-- View stock by category:
-- SELECT category, COUNT(*) AS total_items, SUM(stock) AS total_stock FROM products GROUP BY category;

-- View pending receipts:
-- SELECT * FROM receipts WHERE status = 'Draft';

-- View pending deliveries:
-- SELECT * FROM deliveries WHERE status = 'Draft';

-- View full stock ledger:
-- SELECT * FROM ledger ORDER BY id DESC;

-- View stock value by location:
-- SELECT location, COUNT(*) AS items, SUM(stock) AS total_units FROM products GROUP BY location ORDER BY total_units DESC;

-- ── END OF FILE ─────────────────────────────────────────────
