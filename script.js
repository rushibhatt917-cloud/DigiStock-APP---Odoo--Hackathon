// ── DigiStock — script.js ──

// ── STATE ──
let state = {
  user: null,
  users: [{email:'manager@digistock.com', pass:'password123', name:'Priya Sharma', role:'Store Manager'}],
  products: [
    // ── MEN'S WEAR ──
    {id:1,  name:"Men's Cotton T-Shirt (S)",    sku:'MTS-001', cat:"Men's Wear",   unit:'pcs',  stock:120, min:20, loc:'Floor A - Men'},
    {id:2,  name:"Men's Cotton T-Shirt (M)",    sku:'MTS-002', cat:"Men's Wear",   unit:'pcs',  stock:95,  min:20, loc:'Floor A - Men'},
    {id:3,  name:"Men's Cotton T-Shirt (L)",    sku:'MTS-003', cat:"Men's Wear",   unit:'pcs',  stock:4,   min:20, loc:'Floor A - Men'},
    {id:4,  name:"Men's Cotton T-Shirt (XL)",   sku:'MTS-004', cat:"Men's Wear",   unit:'pcs',  stock:60,  min:15, loc:'Floor A - Men'},
    {id:5,  name:"Men's Polo Shirt (S)",        sku:'MPL-005', cat:"Men's Wear",   unit:'pcs',  stock:0,   min:10, loc:'Floor A - Men'},
    {id:6,  name:"Men's Polo Shirt (M)",        sku:'MPL-006', cat:"Men's Wear",   unit:'pcs',  stock:45,  min:10, loc:'Floor A - Men'},
    {id:7,  name:"Men's Polo Shirt (L)",        sku:'MPL-007', cat:"Men's Wear",   unit:'pcs',  stock:38,  min:10, loc:'Floor A - Men'},
    {id:8,  name:"Men's Slim Jeans (30W)",      sku:'MJN-008', cat:"Men's Wear",   unit:'pcs',  stock:55,  min:10, loc:'Floor A - Men'},
    {id:9,  name:"Men's Slim Jeans (32W)",      sku:'MJN-009', cat:"Men's Wear",   unit:'pcs',  stock:48,  min:10, loc:'Floor A - Men'},
    {id:10, name:"Men's Slim Jeans (34W)",      sku:'MJN-010', cat:"Men's Wear",   unit:'pcs',  stock:3,   min:10, loc:'Floor A - Men'},
    {id:11, name:"Men's Slim Jeans (36W)",      sku:'MJN-011', cat:"Men's Wear",   unit:'pcs',  stock:22,  min:8,  loc:'Floor A - Men'},
    {id:12, name:"Men's Casual Chinos (30W)",   sku:'MCH-012', cat:"Men's Wear",   unit:'pcs',  stock:30,  min:8,  loc:'Floor A - Men'},
    {id:13, name:"Men's Casual Chinos (32W)",   sku:'MCH-013', cat:"Men's Wear",   unit:'pcs',  stock:25,  min:8,  loc:'Floor A - Men'},
    {id:14, name:"Men's Formal Shirt (S)",      sku:'MFS-014', cat:"Men's Wear",   unit:'pcs',  stock:40,  min:10, loc:'Floor A - Men'},
    {id:15, name:"Men's Formal Shirt (M)",      sku:'MFS-015', cat:"Men's Wear",   unit:'pcs',  stock:35,  min:10, loc:'Floor A - Men'},
    {id:16, name:"Men's Formal Shirt (L)",      sku:'MFS-016', cat:"Men's Wear",   unit:'pcs',  stock:0,   min:10, loc:'Floor A - Men'},
    {id:17, name:"Men's Formal Shirt (XL)",     sku:'MFS-017', cat:"Men's Wear",   unit:'pcs',  stock:18,  min:8,  loc:'Floor A - Men'},
    {id:18, name:"Men's Blazer (M)",            sku:'MBZ-018', cat:"Men's Wear",   unit:'pcs',  stock:12,  min:4,  loc:'Floor A - Men'},
    {id:19, name:"Men's Blazer (L)",            sku:'MBZ-019', cat:"Men's Wear",   unit:'pcs',  stock:8,   min:4,  loc:'Floor A - Men'},
    {id:20, name:"Men's Blazer (XL)",           sku:'MBZ-020', cat:"Men's Wear",   unit:'pcs',  stock:5,   min:3,  loc:'Floor A - Men'},
    {id:21, name:"Men's Track Pants (M)",       sku:'MTP-021', cat:"Men's Wear",   unit:'pcs',  stock:65,  min:15, loc:'Floor A - Men'},
    {id:22, name:"Men's Track Pants (L)",       sku:'MTP-022', cat:"Men's Wear",   unit:'pcs',  stock:50,  min:15, loc:'Floor A - Men'},
    {id:23, name:"Men's Hoodie (M)",            sku:'MHD-023', cat:"Men's Wear",   unit:'pcs',  stock:2,   min:8,  loc:'Floor A - Men'},
    {id:24, name:"Men's Hoodie (L)",            sku:'MHD-024', cat:"Men's Wear",   unit:'pcs',  stock:20,  min:8,  loc:'Floor A - Men'},
    {id:25, name:"Men's Kurta (M)",             sku:'MKT-025', cat:"Men's Wear",   unit:'pcs',  stock:35,  min:10, loc:'Floor A - Men'},
    // ── WOMEN'S WEAR ──
    {id:26, name:"Women's Kurti (S)",           sku:'WKT-026', cat:"Women's Wear", unit:'pcs',  stock:80,  min:15, loc:'Floor B - Women'},
    {id:27, name:"Women's Kurti (M)",           sku:'WKT-027', cat:"Women's Wear", unit:'pcs',  stock:95,  min:15, loc:'Floor B - Women'},
    {id:28, name:"Women's Kurti (L)",           sku:'WKT-028', cat:"Women's Wear", unit:'pcs',  stock:4,   min:15, loc:'Floor B - Women'},
    {id:29, name:"Women's Kurti (XL)",          sku:'WKT-029', cat:"Women's Wear", unit:'pcs',  stock:40,  min:10, loc:'Floor B - Women'},
    {id:30, name:"Women's Salwar Suit (S)",     sku:'WSS-030', cat:"Women's Wear", unit:'pcs',  stock:28,  min:8,  loc:'Floor B - Women'},
    {id:31, name:"Women's Salwar Suit (M)",     sku:'WSS-031', cat:"Women's Wear", unit:'pcs',  stock:35,  min:8,  loc:'Floor B - Women'},
    {id:32, name:"Women's Salwar Suit (L)",     sku:'WSS-032', cat:"Women's Wear", unit:'pcs',  stock:0,   min:8,  loc:'Floor B - Women'},
    {id:33, name:"Women's Saree (Cotton)",      sku:'WSR-033', cat:"Women's Wear", unit:'pcs',  stock:50,  min:10, loc:'Floor B - Women'},
    {id:34, name:"Women's Saree (Silk)",        sku:'WSR-034', cat:"Women's Wear", unit:'pcs',  stock:22,  min:5,  loc:'Floor B - Women'},
    {id:35, name:"Women's Saree (Chiffon)",     sku:'WSR-035', cat:"Women's Wear", unit:'pcs',  stock:15,  min:5,  loc:'Floor B - Women'},
    {id:36, name:"Women's Leggings (S)",        sku:'WLG-036', cat:"Women's Wear", unit:'pcs',  stock:100, min:20, loc:'Floor B - Women'},
    {id:37, name:"Women's Leggings (M)",        sku:'WLG-037', cat:"Women's Wear", unit:'pcs',  stock:85,  min:20, loc:'Floor B - Women'},
    {id:38, name:"Women's Leggings (L)",        sku:'WLG-038', cat:"Women's Wear", unit:'pcs',  stock:3,   min:20, loc:'Floor B - Women'},
    {id:39, name:"Women's Palazzo (M)",         sku:'WPZ-039', cat:"Women's Wear", unit:'pcs',  stock:40,  min:10, loc:'Floor B - Women'},
    {id:40, name:"Women's Palazzo (L)",         sku:'WPZ-040', cat:"Women's Wear", unit:'pcs',  stock:30,  min:10, loc:'Floor B - Women'},
    {id:41, name:"Women's Tops - Casual (S)",   sku:'WTP-041', cat:"Women's Wear", unit:'pcs',  stock:55,  min:12, loc:'Floor B - Women'},
    {id:42, name:"Women's Tops - Casual (M)",   sku:'WTP-042', cat:"Women's Wear", unit:'pcs',  stock:60,  min:12, loc:'Floor B - Women'},
    {id:43, name:"Women's Tops - Casual (L)",   sku:'WTP-043', cat:"Women's Wear", unit:'pcs',  stock:45,  min:12, loc:'Floor B - Women'},
    {id:44, name:"Women's Anarkali (M)",        sku:'WAN-044', cat:"Women's Wear", unit:'pcs',  stock:18,  min:5,  loc:'Floor B - Women'},
    {id:45, name:"Women's Anarkali (L)",        sku:'WAN-045', cat:"Women's Wear", unit:'pcs',  stock:12,  min:5,  loc:'Floor B - Women'},
    {id:46, name:"Women's Skirt (S)",           sku:'WSK-046', cat:"Women's Wear", unit:'pcs',  stock:25,  min:8,  loc:'Floor B - Women'},
    {id:47, name:"Women's Skirt (M)",           sku:'WSK-047', cat:"Women's Wear", unit:'pcs',  stock:20,  min:8,  loc:'Floor B - Women'},
    {id:48, name:"Women's Dupatta (Cotton)",    sku:'WDP-048', cat:"Women's Wear", unit:'pcs',  stock:70,  min:15, loc:'Floor B - Women'},
    {id:49, name:"Women's Dupatta (Silk)",      sku:'WDP-049', cat:"Women's Wear", unit:'pcs',  stock:30,  min:10, loc:'Floor B - Women'},
    {id:50, name:"Women's Blouse (S)",          sku:'WBL-050', cat:"Women's Wear", unit:'pcs',  stock:40,  min:10, loc:'Floor B - Women'},
    // ── KIDS' WEAR ──
    {id:51, name:"Kids' T-Shirt (2-4Y)",        sku:'KTS-051', cat:"Kids' Wear",   unit:'pcs',  stock:90,  min:15, loc:'Floor C - Kids'},
    {id:52, name:"Kids' T-Shirt (4-6Y)",        sku:'KTS-052', cat:"Kids' Wear",   unit:'pcs',  stock:85,  min:15, loc:'Floor C - Kids'},
    {id:53, name:"Kids' T-Shirt (6-8Y)",        sku:'KTS-053', cat:"Kids' Wear",   unit:'pcs',  stock:0,   min:15, loc:'Floor C - Kids'},
    {id:54, name:"Kids' T-Shirt (8-10Y)",       sku:'KTS-054', cat:"Kids' Wear",   unit:'pcs',  stock:60,  min:12, loc:'Floor C - Kids'},
    {id:55, name:"Kids' Frock (2-4Y)",          sku:'KFR-055', cat:"Kids' Wear",   unit:'pcs',  stock:45,  min:10, loc:'Floor C - Kids'},
    {id:56, name:"Kids' Frock (4-6Y)",          sku:'KFR-056', cat:"Kids' Wear",   unit:'pcs',  stock:38,  min:10, loc:'Floor C - Kids'},
    {id:57, name:"Kids' Frock (6-8Y)",          sku:'KFR-057', cat:"Kids' Wear",   unit:'pcs',  stock:5,   min:10, loc:'Floor C - Kids'},
    {id:58, name:"Kids' Jeans (4-6Y)",          sku:'KJN-058', cat:"Kids' Wear",   unit:'pcs',  stock:40,  min:10, loc:'Floor C - Kids'},
    {id:59, name:"Kids' Jeans (6-8Y)",          sku:'KJN-059', cat:"Kids' Wear",   unit:'pcs',  stock:35,  min:10, loc:'Floor C - Kids'},
    {id:60, name:"Kids' Jeans (8-10Y)",         sku:'KJN-060', cat:"Kids' Wear",   unit:'pcs',  stock:28,  min:8,  loc:'Floor C - Kids'},
    {id:61, name:"Kids' Track Suit (4-6Y)",     sku:'KTS-061', cat:"Kids' Wear",   unit:'pcs',  stock:50,  min:10, loc:'Floor C - Kids'},
    {id:62, name:"Kids' Track Suit (6-8Y)",     sku:'KTS-062', cat:"Kids' Wear",   unit:'pcs',  stock:3,   min:10, loc:'Floor C - Kids'},
    {id:63, name:"Kids' Ethnic Set (2-4Y)",     sku:'KET-063', cat:"Kids' Wear",   unit:'pcs',  stock:30,  min:8,  loc:'Floor C - Kids'},
    {id:64, name:"Kids' Ethnic Set (4-6Y)",     sku:'KET-064', cat:"Kids' Wear",   unit:'pcs',  stock:25,  min:8,  loc:'Floor C - Kids'},
    {id:65, name:"Kids' School Uniform Shirt",  sku:'KSU-065', cat:"Kids' Wear",   unit:'pcs',  stock:120, min:20, loc:'Floor C - Kids'},
    // ── WINTER WEAR ──
    {id:66, name:"Men's Woollen Sweater (M)",   sku:'MWS-066', cat:'Winter Wear',  unit:'pcs',  stock:35,  min:10, loc:'Store Room 1'},
    {id:67, name:"Men's Woollen Sweater (L)",   sku:'MWS-067', cat:'Winter Wear',  unit:'pcs',  stock:28,  min:10, loc:'Store Room 1'},
    {id:68, name:"Men's Jacket (M)",            sku:'MJK-068', cat:'Winter Wear',  unit:'pcs',  stock:4,   min:8,  loc:'Store Room 1'},
    {id:69, name:"Men's Jacket (L)",            sku:'MJK-069', cat:'Winter Wear',  unit:'pcs',  stock:18,  min:8,  loc:'Store Room 1'},
    {id:70, name:"Men's Jacket (XL)",           sku:'MJK-070', cat:'Winter Wear',  unit:'pcs',  stock:12,  min:6,  loc:'Store Room 1'},
    {id:71, name:"Women's Shawl (Woollen)",     sku:'WSH-071', cat:'Winter Wear',  unit:'pcs',  stock:50,  min:10, loc:'Store Room 1'},
    {id:72, name:"Women's Shawl (Pashmina)",    sku:'WSH-072', cat:'Winter Wear',  unit:'pcs',  stock:15,  min:5,  loc:'Store Room 1'},
    {id:73, name:"Women's Cardigan (M)",        sku:'WCD-073', cat:'Winter Wear',  unit:'pcs',  stock:22,  min:8,  loc:'Store Room 1'},
    {id:74, name:"Women's Cardigan (L)",        sku:'WCD-074', cat:'Winter Wear',  unit:'pcs',  stock:0,   min:8,  loc:'Store Room 1'},
    {id:75, name:"Kids' Woollen Jacket (4-6Y)", sku:'KWJ-075', cat:'Winter Wear',  unit:'pcs',  stock:30,  min:8,  loc:'Store Room 1'},
    {id:76, name:"Kids' Woollen Jacket (6-8Y)", sku:'KWJ-076', cat:'Winter Wear',  unit:'pcs',  stock:25,  min:8,  loc:'Store Room 1'},
    {id:77, name:"Unisex Muffler",              sku:'UMF-077', cat:'Winter Wear',  unit:'pcs',  stock:80,  min:15, loc:'Store Room 1'},
    {id:78, name:"Woollen Gloves (Free Size)",  sku:'WGL-078', cat:'Winter Wear',  unit:'pcs',  stock:60,  min:12, loc:'Store Room 1'},
    {id:79, name:"Thermal Inner (M)",           sku:'THI-079', cat:'Winter Wear',  unit:'pcs',  stock:3,   min:10, loc:'Store Room 1'},
    {id:80, name:"Thermal Inner (L)",           sku:'THI-080', cat:'Winter Wear',  unit:'pcs',  stock:40,  min:10, loc:'Store Room 1'},
    // ── ETHNIC WEAR ──
    {id:81, name:"Men's Kurta-Pyjama Set (M)",  sku:'MKP-081', cat:'Ethnic Wear',  unit:'pcs',  stock:30,  min:8,  loc:'Floor D - Ethnic'},
    {id:82, name:"Men's Kurta-Pyjama Set (L)",  sku:'MKP-082', cat:'Ethnic Wear',  unit:'pcs',  stock:25,  min:8,  loc:'Floor D - Ethnic'},
    {id:83, name:"Men's Sherwani (M)",          sku:'MSW-083', cat:'Ethnic Wear',  unit:'pcs',  stock:8,   min:3,  loc:'Floor D - Ethnic'},
    {id:84, name:"Men's Sherwani (L)",          sku:'MSW-084', cat:'Ethnic Wear',  unit:'pcs',  stock:5,   min:3,  loc:'Floor D - Ethnic'},
    {id:85, name:"Women's Lehenga (S)",         sku:'WLH-085', cat:'Ethnic Wear',  unit:'pcs',  stock:12,  min:4,  loc:'Floor D - Ethnic'},
    {id:86, name:"Women's Lehenga (M)",         sku:'WLH-086', cat:'Ethnic Wear',  unit:'pcs',  stock:10,  min:4,  loc:'Floor D - Ethnic'},
    {id:87, name:"Women's Lehenga (L)",         sku:'WLH-087', cat:'Ethnic Wear',  unit:'pcs',  stock:0,   min:4,  loc:'Floor D - Ethnic'},
    {id:88, name:"Women's Gharara Set (M)",     sku:'WGS-088', cat:'Ethnic Wear',  unit:'pcs',  stock:6,   min:3,  loc:'Floor D - Ethnic'},
    {id:89, name:"Dhoti (Free Size)",           sku:'DHT-089', cat:'Ethnic Wear',  unit:'pcs',  stock:40,  min:8,  loc:'Floor D - Ethnic'},
    {id:90, name:"Nehru Jacket (M)",            sku:'NJK-090', cat:'Ethnic Wear',  unit:'pcs',  stock:18,  min:5,  loc:'Floor D - Ethnic'},
    // ── INNERWEAR ──
    {id:91, name:"Men's Vest (S-Pack of 3)",    sku:'MVT-091', cat:'Innerwear',    unit:'packs',stock:80,  min:15, loc:'Store Room 2'},
    {id:92, name:"Men's Vest (M-Pack of 3)",    sku:'MVT-092', cat:'Innerwear',    unit:'packs',stock:75,  min:15, loc:'Store Room 2'},
    {id:93, name:"Men's Vest (L-Pack of 3)",    sku:'MVT-093', cat:'Innerwear',    unit:'packs',stock:4,   min:15, loc:'Store Room 2'},
    {id:94, name:"Men's Boxers (M)",            sku:'MBX-094', cat:'Innerwear',    unit:'pcs',  stock:90,  min:20, loc:'Store Room 2'},
    {id:95, name:"Men's Boxers (L)",            sku:'MBX-095', cat:'Innerwear',    unit:'pcs',  stock:70,  min:20, loc:'Store Room 2'},
    {id:96, name:"Women's Bra (32B)",           sku:'WBR-096', cat:'Innerwear',    unit:'pcs',  stock:50,  min:10, loc:'Store Room 2'},
    {id:97, name:"Women's Bra (34B)",           sku:'WBR-097', cat:'Innerwear',    unit:'pcs',  stock:45,  min:10, loc:'Store Room 2'},
    {id:98, name:"Women's Bra (36C)",           sku:'WBR-098', cat:'Innerwear',    unit:'pcs',  stock:3,   min:10, loc:'Store Room 2'},
    {id:99, name:"Women's Panties (M-Pack 3)",  sku:'WPN-099', cat:'Innerwear',    unit:'packs',stock:60,  min:12, loc:'Store Room 2'},
    {id:100,name:"Women's Panties (L-Pack 3)",  sku:'WPN-100', cat:'Innerwear',    unit:'packs',stock:50,  min:12, loc:'Store Room 2'},
    // ── ACCESSORIES ──
    {id:101,name:"Cotton Socks (Men, Pk6)",     sku:'ACS-101', cat:'Accessories',  unit:'packs',stock:100, min:20, loc:'Accessories Rack'},
    {id:102,name:"Cotton Socks (Women, Pk6)",   sku:'ACS-102', cat:'Accessories',  unit:'packs',stock:80,  min:15, loc:'Accessories Rack'},
    {id:103,name:"Leather Belt (32 inch)",      sku:'BLT-103', cat:'Accessories',  unit:'pcs',  stock:25,  min:5,  loc:'Accessories Rack'},
    {id:104,name:"Leather Belt (34 inch)",      sku:'BLT-104', cat:'Accessories',  unit:'pcs',  stock:20,  min:5,  loc:'Accessories Rack'},
    {id:105,name:"Canvas Belt (Free Size)",     sku:'BLT-105', cat:'Accessories',  unit:'pcs',  stock:0,   min:8,  loc:'Accessories Rack'},
    {id:106,name:"Neck Tie (Formal)",           sku:'TIE-106', cat:'Accessories',  unit:'pcs',  stock:30,  min:6,  loc:'Accessories Rack'},
    {id:107,name:"Bow Tie",                     sku:'TIE-107', cat:'Accessories',  unit:'pcs',  stock:15,  min:4,  loc:'Accessories Rack'},
    {id:108,name:"Handkerchief (Pk6)",          sku:'HKF-108', cat:'Accessories',  unit:'packs',stock:60,  min:10, loc:'Accessories Rack'},
    {id:109,name:"Hair Band (Pk12)",            sku:'HBD-109', cat:'Accessories',  unit:'packs',stock:45,  min:10, loc:'Accessories Rack'},
    {id:110,name:"Scrunchies (Pk6)",            sku:'SCR-110', cat:'Accessories',  unit:'packs',stock:50,  min:10, loc:'Accessories Rack'},
    {id:111,name:"Wallet (Men's, Leather)",     sku:'WAL-111', cat:'Accessories',  unit:'pcs',  stock:18,  min:5,  loc:'Accessories Rack'},
    {id:112,name:"Wallet (Women's, Fabric)",    sku:'WAL-112', cat:'Accessories',  unit:'pcs',  stock:12,  min:5,  loc:'Accessories Rack'},
    {id:113,name:"Stole (Printed)",             sku:'STL-113', cat:'Accessories',  unit:'pcs',  stock:35,  min:8,  loc:'Accessories Rack'},
    {id:114,name:"Cap (Baseball, Unisex)",      sku:'CAP-114', cat:'Accessories',  unit:'pcs',  stock:40,  min:8,  loc:'Accessories Rack'},
    {id:115,name:"Sunglasses (Unisex)",         sku:'SGL-115', cat:'Accessories',  unit:'pcs',  stock:22,  min:5,  loc:'Accessories Rack'},
    // ── FOOTWEAR ──
    {id:116,name:"Men's Casual Shoes (Size 8)", sku:'MCS-116', cat:'Footwear',     unit:'pairs',stock:20,  min:5,  loc:'Footwear Section'},
    {id:117,name:"Men's Casual Shoes (Size 9)", sku:'MCS-117', cat:'Footwear',     unit:'pairs',stock:15,  min:5,  loc:'Footwear Section'},
    {id:118,name:"Men's Formal Shoes (Size 8)", sku:'MFS-118', cat:'Footwear',     unit:'pairs',stock:10,  min:3,  loc:'Footwear Section'},
    {id:119,name:"Women's Heels (Size 5)",      sku:'WHE-119', cat:'Footwear',     unit:'pairs',stock:0,   min:4,  loc:'Footwear Section'},
    {id:120,name:"Women's Flats (Size 5-7)",    sku:'WFL-120', cat:'Footwear',     unit:'pairs',stock:25,  min:6,  loc:'Footwear Section'},
  ],
  receipts: [
    {id:'REC-001', supplier:'Fab India Textiles', product:"Women's Kurti (M)",       qty:50, status:'Done',  date:'2026-03-12'},
    {id:'REC-002', supplier:'Raymond Fabrics',    product:"Men's Formal Shirt (M)",  qty:30, status:'Draft', date:'2026-03-13'},
  ],
  deliveries: [
    {id:'DEL-001', customer:'Style Hub Retail', product:"Men's Cotton T-Shirt (M)", qty:20, status:'Done',  date:'2026-03-11'},
    {id:'DEL-002', customer:'Trendy Zone',      product:"Women's Leggings (M)",     qty:15, status:'Draft', date:'2026-03-13'},
  ],
  transfers: [
    {id:'TRF-001', product:"Women's Saree (Cotton)", qty:20, from:'Store Room 1', to:'Floor B - Women', status:'Done', date:'2026-03-12'},
  ],
  adjustments: [
    {id:'ADJ-001', product:"Kids' Frock (6-8Y)", oldQty:8, newQty:5, diff:-3, reason:'Damaged goods', date:'2026-03-11'},
  ],
  ledger: [
    {type:'in',   product:"Women's Kurti (M)",        qty:50,  note:'Receipt from Fab India Textiles',         time:'Mar 12, 10:30'},
    {type:'out',  product:"Men's Cotton T-Shirt (M)",  qty:20,  note:'Delivery to Style Hub Retail',            time:'Mar 11, 14:20'},
    {type:'move', product:"Women's Saree (Cotton)",    qty:20,  note:"Transfer: Store Room 1 → Floor B - Women",time:'Mar 12, 11:00'},
    {type:'adj',  product:"Kids' Frock (6-8Y)",        qty:-3,  note:'Adjustment: Damaged goods',               time:'Mar 11, 09:00'},
  ],
  nextIds: {rec:3, del:3, trf:2, adj:2}
};

let otpSent = false, generatedOtp = '';

// ── DATABASE (SQLite-style via localStorage) ──
const DB_KEY = 'digistock_db_v1';

function dbSave() {
  const snapshot = {
    users: state.users, products: state.products,
    receipts: state.receipts, deliveries: state.deliveries,
    transfers: state.transfers, adjustments: state.adjustments,
    ledger: state.ledger, nextIds: state.nextIds,
    savedAt: new Date().toISOString()
  };
  try { localStorage.setItem(DB_KEY, JSON.stringify(snapshot)); }
  catch(e) { console.warn('DB save failed:', e); }
}

function dbLoad() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return false;
    const snap = JSON.parse(raw);
    if (snap.users)       state.users       = snap.users;
    if (snap.products)    state.products    = snap.products;
    if (snap.receipts)    state.receipts    = snap.receipts;
    if (snap.deliveries)  state.deliveries  = snap.deliveries;
    if (snap.transfers)   state.transfers   = snap.transfers;
    if (snap.adjustments) state.adjustments = snap.adjustments;
    if (snap.ledger)      state.ledger      = snap.ledger;
    if (snap.nextIds)     state.nextIds     = snap.nextIds;
    return true;
  } catch(e) { console.warn('DB load failed:', e); return false; }
}

function dbReset() {
  if (!confirm('Reset ALL data to factory defaults? This cannot be undone!')) return;
  localStorage.removeItem(DB_KEY);
  location.reload();
}

function dbExport() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) { showAlert('No data to export yet', 'error'); return; }
  const blob = new Blob([raw], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'digistock-database-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  showAlert('Database exported!', 'success');
}

// ── AUTH ──
function switchTab(t) {
  ['login','signup','otp'].forEach(x => { document.getElementById('tab-'+x).style.display = 'none'; });
  document.getElementById('tab-'+t).style.display = 'block';
  document.querySelectorAll('.tab-btn').forEach((b,i) => {
    b.classList.remove('active');
    if (['login','signup','otp'][i] === t) b.classList.add('active');
  });
}

function doLogin() {
  const e = document.getElementById('li-email').value.trim().toLowerCase();
  const p = document.getElementById('li-pass').value.trim();
  if (!e || !p) { showAlert('Please enter email and password', 'error'); return; }
  const u = state.users.find(x => x.email.toLowerCase() === e && x.pass === p);
  if (!u) { showAlert('Invalid email or password', 'error'); return; }
  state.user = u;
  dbSave();
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('sidebar-name').textContent = u.name;
  document.getElementById('sidebar-role').textContent = u.role;
  document.getElementById('sidebar-avatar').textContent = u.name[0].toUpperCase();
  refreshAll();
  showAlert('Welcome back, ' + u.name.split(' ')[0] + '!', 'success');
}

function doSignup() {
  const n = document.getElementById('su-name').value.trim();
  const e = document.getElementById('su-email').value.trim().toLowerCase();
  const p = document.getElementById('su-pass').value.trim();
  const r = document.getElementById('su-role').value;
  if (!n || !e || !p) { showAlert('Please fill all fields', 'error'); return; }
  if (p.length < 6) { showAlert('Password must be at least 6 characters', 'error'); return; }
  if (state.users.find(x => x.email.toLowerCase() === e)) { showAlert('Email already registered', 'error'); return; }
  state.users.push({email:e, pass:p, name:n, role:r});
  dbSave();
  showAlert('Account created! Please login.', 'success');
  switchTab('login');
  document.getElementById('li-email').value = e;
}

function doOtp() {
  if (!otpSent) {
    const e = document.getElementById('otp-email').value.trim();
    if (!e) { showAlert('Enter your email', 'error'); return; }
    if (!state.users.find(x => x.email === e)) { showAlert('Email not found', 'error'); return; }
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpSent = true;
    document.getElementById('otp-step2').style.display = 'block';
    document.getElementById('otp-btn').textContent = 'Reset Password →';
    showAlert('OTP: ' + generatedOtp + ' (demo)', 'success');
  } else {
    const entered = Array.from(document.querySelectorAll('.otp-input')).map(x => x.value).join('');
    if (entered !== generatedOtp) { showAlert('Incorrect OTP', 'error'); return; }
    const np = document.getElementById('otp-newpass').value;
    if (!np) { showAlert('Enter new password', 'error'); return; }
    const e = document.getElementById('otp-email').value.trim();
    state.users.find(x => x.email === e).pass = np;
    showAlert('Password reset successfully!', 'success');
    otpSent = false;
    document.getElementById('otp-step2').style.display = 'none';
    document.getElementById('otp-btn').textContent = 'Send OTP →';
    switchTab('login');
  }
}

function moveOtp(el, n) {
  if (el.value && n < 6) { document.querySelectorAll('.otp-input')[n].focus(); }
}

function doLogout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  state.user = null;
}

// ── NAVIGATION ──
function goto(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const idx = {dashboard:0, products:1, receipts:3, deliveries:4, transfers:5, adjustments:6, ledger:8};
  document.querySelectorAll('.nav-item')[idx[page]]?.classList.add('active');
  if (page === 'products')    renderProducts();
  if (page === 'receipts')    renderOps('receipts');
  if (page === 'deliveries')  renderOps('deliveries');
  if (page === 'transfers')   renderOps('transfers');
  if (page === 'adjustments') renderOps('adjustments');
  if (page === 'ledger')      renderLedger();
  if (page === 'dashboard')   refreshAll();
}

// ── DASHBOARD ──
function refreshAll() {
  const low   = state.products.filter(p => p.stock <= p.min).length;
  const pendR = state.receipts.filter(r => r.status === 'Draft').length;
  const pendD = state.deliveries.filter(d => d.status === 'Draft').length;
  const pendT = state.transfers.filter(t => t.status === 'Draft').length;
  document.getElementById('kpi-total').textContent     = state.products.length;
  document.getElementById('kpi-low').textContent       = low;
  document.getElementById('kpi-receipts').textContent  = pendR;
  document.getElementById('kpi-deliveries').textContent= pendD;
  document.getElementById('kpi-transfers').textContent = pendT;

  const icons = {in:'📥', out:'📤', move:'🔄', adj:'⚙️'};
  const sign  = {in:'+',  out:'-',  move:'↔',  adj:'±'};
  document.getElementById('dash-ledger').innerHTML = state.ledger.slice(-5).reverse().map(l => `
    <div class="ledger-entry">
      <div class="ledger-icon ${l.type}">${icons[l.type]}</div>
      <div class="ledger-info"><div class="ledger-main">${l.product}</div><div class="ledger-time">${l.note} · ${l.time}</div></div>
      <div class="ledger-qty ${l.qty > 0 ? 'pos' : 'neg'}">${sign[l.type]}${Math.abs(l.qty)}</div>
    </div>`).join('');

  const lows = state.products.filter(p => p.stock <= p.min);
  document.getElementById('dash-lowstock').innerHTML = lows.length
    ? lows.map(p => `
      <div class="ledger-entry">
        <div class="ledger-icon ${p.stock === 0 ? 'out' : 'adj'}">⚠️</div>
        <div class="ledger-info"><div class="ledger-main">${p.name}</div><div class="ledger-time">${p.sku} · ${p.loc}</div></div>
        <div class="ledger-qty neg">${p.stock} ${p.unit}</div>
      </div>`).join('')
    : '<div class="empty"><div class="empty-icon">✅</div><div class="empty-text">All stock levels healthy</div></div>';
}

// ── PRODUCTS ──
function renderProducts() {
  const search = (document.getElementById('prod-search') || {}).value || '';
  const cat    = (document.getElementById('prod-cat')    || {}).value || '';
  const loc    = (document.getElementById('prod-loc')    || {}).value || '';
  const stockF = (document.getElementById('prod-stock')  || {}).value || '';
  let list = state.products;
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
  if (cat)    list = list.filter(p => p.cat === cat);
  if (loc)    list = list.filter(p => p.loc === loc);
  if (stockF === 'low') list = list.filter(p => p.stock <= p.min);
  if (stockF === 'ok')  list = list.filter(p => p.stock > p.min);
  const lowCount = list.filter(p => p.stock <= p.min).length;
  const countEl = document.getElementById('prod-count');
  if (countEl) countEl.innerHTML = `Showing <strong style="color:var(--text)">${list.length}</strong> of ${state.products.length} products &nbsp;·&nbsp; <span style="color:var(--danger)">${lowCount} low/out of stock</span>`;
  document.getElementById('product-grid').innerHTML = list.length
    ? list.map(p => {
        const pct   = Math.min(100, Math.round(p.stock / Math.max(p.stock, p.min * 3) * 100));
        const color = p.stock === 0 ? 'var(--danger)' : p.stock <= p.min ? 'var(--warn)' : 'var(--green)';
        const badge = p.stock === 0 ? '<span class="badge danger">Out</span>' : p.stock <= p.min ? '<span class="badge warn">Low</span>' : '';
        return `<div class="product-card">
          <div style="display:flex;align-items:flex-start;justify-content:space-between">${badge}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-sku">${p.sku}</div>
          <div class="product-stock" style="color:${color}">${p.stock} <span style="font-size:13px;color:var(--muted);font-weight:400">${p.unit}</span></div>
          <div class="product-cat">${p.cat} · ${p.loc}</div>
          <div class="stock-bar"><div class="stock-fill" style="width:${pct}%;background:${color}"></div></div>
        </div>`;
      }).join('')
    : '<div class="empty" style="grid-column:1/-1"><div class="empty-icon">📭</div><div class="empty-text">No products found</div></div>';
}

// ── OPERATIONS ──
function renderOps(type, filterStatus = '') {
  const tbody = document.getElementById(type + '-tbody');
  let list = state[type];
  if (filterStatus) list = list.filter(o => o.status === filterStatus);
  if (!list.length) { tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:24px">No records found</td></tr>`; return; }

  if (type === 'receipts') {
    tbody.innerHTML = list.map(r => `<tr>
      <td style="font-family:var(--mono);font-size:12px">${r.id}</td>
      <td>${r.supplier}</td><td>${r.product}</td>
      <td style="font-family:var(--mono)">${r.qty}</td>
      <td><span class="badge ${r.status==='Done'?'green':'warn'}">${r.status}</span></td>
      <td style="color:var(--muted);font-size:12px">${r.date}</td>
      <td>${r.status==='Draft' ? `<button class="btn-sm accent" onclick="validateOp('receipts','${r.id}')">Validate</button>` : '-'}</td>
    </tr>`).join('');
  } else if (type === 'deliveries') {
    tbody.innerHTML = list.map(d => `<tr>
      <td style="font-family:var(--mono);font-size:12px">${d.id}</td>
      <td>${d.customer}</td><td>${d.product}</td>
      <td style="font-family:var(--mono)">${d.qty}</td>
      <td><span class="badge ${d.status==='Done'?'green':'warn'}">${d.status}</span></td>
      <td style="color:var(--muted);font-size:12px">${d.date}</td>
      <td>${d.status==='Draft' ? `<button class="btn-sm accent" onclick="validateOp('deliveries','${d.id}')">Validate</button>` : '-'}</td>
    </tr>`).join('');
  } else if (type === 'transfers') {
    tbody.innerHTML = list.map(t => `<tr>
      <td style="font-family:var(--mono);font-size:12px">${t.id}</td>
      <td>${t.product}</td><td style="font-family:var(--mono)">${t.qty}</td>
      <td>${t.from}</td><td>${t.to}</td>
      <td><span class="badge ${t.status==='Done'?'green':'warn'}">${t.status}</span></td>
      <td style="color:var(--muted);font-size:12px">${t.date}</td>
      <td>${t.status==='Draft' ? `<button class="btn-sm accent" onclick="validateOp('transfers','${t.id}')">Validate</button>` : '-'}</td>
    </tr>`).join('');
  } else if (type === 'adjustments') {
    tbody.innerHTML = list.map(a => `<tr>
      <td style="font-family:var(--mono);font-size:12px">${a.id}</td>
      <td>${a.product}</td>
      <td style="font-family:var(--mono)">${a.oldQty}</td>
      <td style="font-family:var(--mono)">${a.newQty}</td>
      <td style="font-family:var(--mono);color:${a.diff>=0?'var(--green)':'var(--danger)'}">${a.diff>=0?'+':''}${a.diff}</td>
      <td style="color:var(--muted);font-size:12px">${a.reason}</td>
      <td style="color:var(--muted);font-size:12px">${a.date}</td>
    </tr>`).join('');
  }
}

function validateOp(type, id) {
  const op = state[type].find(o => o.id === id);
  if (!op) return;
  op.status = 'Done';
  const prod = state.products.find(p => p.name === op.product);
  const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date();
  const timeStr = mon[d.getMonth()] + ' ' + d.getDate() + ', ' + d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});

  if (type === 'receipts' && prod) {
    prod.stock += parseInt(op.qty);
    state.ledger.push({type:'in', product:op.product, qty:parseInt(op.qty), note:'Receipt from '+op.supplier, time:timeStr});
    showAlert('Stock +' + op.qty + ' for ' + op.product, 'success');
  } else if (type === 'deliveries' && prod) {
    if (prod.stock < op.qty) { showAlert('Insufficient stock! Only '+prod.stock+' available','error'); op.status='Draft'; return; }
    prod.stock -= parseInt(op.qty);
    state.ledger.push({type:'out', product:op.product, qty:parseInt(op.qty), note:'Delivery to '+op.customer, time:timeStr});
    showAlert('Delivery validated. Stock -' + op.qty, 'success');
  } else if (type === 'transfers') {
    state.ledger.push({type:'move', product:op.product, qty:parseInt(op.qty), note:'Transfer: '+op.from+' → '+op.to, time:timeStr});
    showAlert('Transfer completed', 'success');
  }
  renderOps(type);
  refreshAll();
  dbSave();
}

// ── MODALS ──
function openModal(type) {
  document.getElementById('modal-overlay').classList.add('open');
  ['product','receipt','delivery','transfer','adjustment'].forEach(m => {
    const el = document.getElementById('modal-' + m);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById('modal-' + type);
  if (target) target.style.display = 'block';
  const opts = state.products.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
  ['r-product','d-product','t-product','adj-product'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = opts;
  });
  if (type === 'adjustment') fillOldQty();
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal-overlay')) {
    document.getElementById('modal-overlay').classList.remove('open');
  }
}

function addProduct() {
  const n   = document.getElementById('p-name').value.trim();
  const sku = document.getElementById('p-sku').value.trim().toUpperCase();
  if (!n || !sku) { showAlert('Name and SKU are required', 'error'); return; }
  if (state.products.find(p => p.sku === sku)) { showAlert('SKU already exists!', 'error'); return; }
  state.products.push({
    id: Date.now(), name: n, sku,
    cat:   document.getElementById('p-cat').value,
    unit:  document.getElementById('p-unit').value,
    stock: parseInt(document.getElementById('p-stock').value) || 0,
    min:   parseInt(document.getElementById('p-min').value)   || 10,
    loc:   document.getElementById('p-loc').value
  });
  dbSave();
  document.getElementById('modal-overlay').classList.remove('open');
  showAlert('Product "' + n + '" added!', 'success');
  renderProducts();
  refreshAll();
}

function saveOp(type, status) {
  const today = new Date().toISOString().split('T')[0];
  const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date();
  const timeStr = mon[d.getMonth()] + ' ' + d.getDate() + ', ' + d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});

  if (type === 'receipt') {
    const sup  = document.getElementById('r-supplier').value.trim();
    const prod = document.getElementById('r-product').value;
    const qty  = parseInt(document.getElementById('r-qty').value);
    if (!sup || !qty || qty <= 0) { showAlert('Fill all fields with valid quantity', 'error'); return; }
    const id = 'REC-' + String(state.nextIds.rec++).padStart(3,'0');
    state.receipts.push({id, supplier:sup, product:prod, qty, status, date:today});
    if (status === 'Done') {
      const p = state.products.find(x => x.name === prod);
      if (p) { p.stock += qty; state.ledger.push({type:'in', product:prod, qty, note:'Receipt from '+sup, time:timeStr}); }
      showAlert('Receipt validated! Stock +' + qty, 'success');
    } else showAlert('Receipt saved as draft', 'success');
    dbSave(); document.getElementById('modal-overlay').classList.remove('open'); renderOps('receipts');

  } else if (type === 'delivery') {
    const cust = document.getElementById('d-customer').value.trim();
    const prod = document.getElementById('d-product').value;
    const qty  = parseInt(document.getElementById('d-qty').value);
    if (!cust || !qty || qty <= 0) { showAlert('Fill all fields with valid quantity', 'error'); return; }
    if (status === 'Done') {
      const p = state.products.find(x => x.name === prod);
      if (p && p.stock < qty) { showAlert('Insufficient stock! Only '+p.stock+' '+p.unit+' available','error'); return; }
      if (p) { p.stock -= qty; state.ledger.push({type:'out', product:prod, qty, note:'Delivery to '+cust, time:timeStr}); }
      showAlert('Delivery validated! Stock -' + qty, 'success');
    } else showAlert('Delivery saved as draft', 'success');
    const id = 'DEL-' + String(state.nextIds.del++).padStart(3,'0');
    state.deliveries.push({id, customer:cust, product:prod, qty, status, date:today});
    dbSave(); document.getElementById('modal-overlay').classList.remove('open'); renderOps('deliveries');

  } else if (type === 'transfer') {
    const prod = document.getElementById('t-product').value;
    const qty  = parseInt(document.getElementById('t-qty').value);
    const from = document.getElementById('t-from').value;
    const to   = document.getElementById('t-to').value;
    if (!qty || qty <= 0) { showAlert('Enter a valid quantity','error'); return; }
    if (from === to) { showAlert('From and To locations cannot be the same','error'); return; }
    const id = 'TRF-' + String(state.nextIds.trf++).padStart(3,'0');
    state.transfers.push({id, product:prod, qty, from, to, status, date:today});
    if (status === 'Done') state.ledger.push({type:'move', product:prod, qty, note:'Transfer: '+from+' → '+to, time:timeStr});
    showAlert(status === 'Done' ? 'Transfer completed!' : 'Transfer saved as draft', 'success');
    dbSave(); document.getElementById('modal-overlay').classList.remove('open'); renderOps('transfers');

  } else if (type === 'adjustment') {
    const prod   = document.getElementById('adj-product').value;
    const newQty = parseInt(document.getElementById('adj-new').value);
    const reason = document.getElementById('adj-reason').value;
    if (isNaN(newQty) || newQty < 0) { showAlert('Enter a valid quantity (0 or more)','error'); return; }
    const p = state.products.find(x => x.name === prod);
    const oldQty = p ? p.stock : 0;
    const diff = newQty - oldQty;
    const id = 'ADJ-' + String(state.nextIds.adj++).padStart(3,'0');
    state.adjustments.push({id, product:prod, oldQty, newQty, diff, reason, date:today});
    if (p) p.stock = newQty;
    state.ledger.push({type:'adj', product:prod, qty:diff, note:'Adjustment: '+reason, time:timeStr});
    showAlert('Stock adjusted by ' + (diff >= 0 ? '+' : '') + diff, 'success');
    dbSave(); document.getElementById('modal-overlay').classList.remove('open'); renderOps('adjustments');
  }
  refreshAll();
}

function fillOldQty() {
  const prod = document.getElementById('adj-product').value;
  const p = state.products.find(x => x.name === prod);
  document.getElementById('adj-old').value = p ? p.stock : 0;
  document.getElementById('adj-new').value = '';
  document.getElementById('adj-diff').value = '';
}

function calcDiff() {
  const oldQ = parseInt(document.getElementById('adj-old').value) || 0;
  const newQ = parseInt(document.getElementById('adj-new').value) || 0;
  const diff = newQ - oldQ;
  const el = document.getElementById('adj-diff');
  el.value = (diff >= 0 ? '+' : '') + diff;
  el.style.color = diff >= 0 ? 'var(--green)' : 'var(--danger)';
}

// ── LEDGER ──
function renderLedger() {
  const icons = {in:'📥', out:'📤', move:'🔄', adj:'⚙️'};
  const sign  = {in:'+',  out:'-',  move:'↔',  adj:'±'};
  document.getElementById('full-ledger').innerHTML = [...state.ledger].reverse().map(l => `
    <div class="ledger-entry">
      <div class="ledger-icon ${l.type}">${icons[l.type]}</div>
      <div class="ledger-info"><div class="ledger-main">${l.product}</div><div class="ledger-time">${l.note} · ${l.time}</div></div>
      <div class="ledger-qty ${l.qty > 0 ? 'pos' : 'neg'}">${sign[l.type]}${Math.abs(l.qty)}</div>
    </div>`).join('');
}

// ── ALERT ──
function showAlert(msg, type = 'success') {
  const el = document.getElementById('alert');
  el.textContent = msg;
  el.className = 'alert-banner show ' + type;
  setTimeout(() => el.classList.remove('show'), 3000);
}

// ── INIT ──
const loaded = dbLoad();
if (!loaded) dbSave();
refreshAll();
