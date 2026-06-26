import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

const BIZ = {
  name:        'Tofu Hauz',
  address:     'No. 196, Jalan Dillenia 5, Laman Dillenia, 71800 Nilai, Negeri Sembilan, Malaysia',
  phone:       '+60 11-63146331',
  whatsapp:    '601163146331',
  email:       'tofuhauz@gmail.com',
  instagram:   'https://instagram.com/tofuhauz',
  facebook:    'https://facebook.com/tofuhauz',
  established: '2018',
}

const STORE_LAT = 2.8368688
const STORE_LNG = 101.8007204
const FREE_DELIVERY_MIN = 100   // RM100+ = free delivery
const MAX_DELIVERY_KM   = 20    // beyond this: not available

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const rad = (x: number) => x * Math.PI / 180
  const dLat = rad(lat2 - lat1)
  const dLng = rad(lng2 - lng1)
  const a = Math.sin(dLat/2)**2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function distanceToFee(km: number): number {
  if (km <= 3)  return 4
  if (km <= 7)  return 7
  if (km <= 12) return 10
  return 14
}

const T = {
  en: {
    tagline:     'Fresh. Wholesome. Delicious.',
    description: 'Handcrafted tofu based dishes made with love and plant powered eating that never compromises on taste.',
    nav: { menu:'Menu', about:'About', testimonials:'Testimonials', contact:'Contact', order:'Order Now' },
    hero: {
      badge: `🫘 EST. ${BIZ.established}  ✦  Nilai, Negeri Sembilan`,
      btn1:  'Explore Our Menu',
      btn2:  'Order on WhatsApp',
    },
    craft: ['🫘 TOFU HAUZ','🍚 FRESH DAILY','💚 PLANT-BASED','🏠 HOMEMADE','✦ EST. 2018','🍜 NILAI, NS'],
    features: [
      { icon:'🌱', title:'Plant Based',      text:'Every dish is built around wholesome, plant forward ingredients with no compromise on flavour.' },
      { icon:'🔪', title:'Made Fresh Daily', text:'We prepare our tofu and sauces homemade every morning for the best quality every single time.' },
      { icon:'💚', title:'Guilt Free',       text:'High in protein, low in cholesterol, eating well has never tasted this good.' },
    ],
    menuSection: {
      label:      'What We Serve',
      heading:    'Our Menu',
      sub:        'Every dish is crafted fresh with the finest tofu and seasonal ingredients. Simple food, serious flavour.',
      cantDecide: "Can't decide? Let us recommend!",
      chat:       'Chat with Us on WhatsApp',
      orderBtn:   'Order',
    },
    menu: [
      { name:'Traditional Press Tofu',   basePrice:11,  desc:'Firm, dense, and ready to cook. Our pressed tofu is made from pure, non-GMO soybeans with minimal moisture for a satisfying texture that holds its shape beautifully in any dish.',                                                                                                                                                                                                                                                                                                                                          price:'RM 11.00 for 8 pieces', weight:'115g per piece', badge:'Best Seller',        badgeColor:'bg-amber-100 text-amber-700',  emoji:'🫘', image:'/image1.png' },
      { name:'Traditional Tau Fu Fah',   basePrice:3.5, desc:'Silky smooth and melt in your mouth. Our Tau Fu Fah is crafted from pure, non-GMO soybeans, gently set to achieve a delicate, creamy texture that soothes with every spoonful. Served with fragrant ginger syrup or rich palm sugar syrup, it is a timeless traditional dessert that warms the heart and delights the soul.',                                                                                                                                                                                            price:'RM 3.50 per pack',      weight:'220g per pack', badge:'Fan Fav',            badgeColor:'bg-rose-100 text-rose-700',    emoji:'🍮', image:'/image2.png' },
      { name:'Loaf Press Tofu',          basePrice:6,   desc:'Thick, firm, and beautifully structured. Our Loaf Pressed Tofu is crafted from pure, non-GMO soybeans, pressed into a generous loaf block for maximum versatility in the kitchen. With its dense texture and low moisture content, it slices cleanly, holds its shape perfectly, and soaks up marinades and sauces like no other. Whether pan fried, grilled, steamed, or added into hearty stews and curries, this is the go-to tofu for bold, satisfying meals.',                                                               price:'RM 6.00',               weight:'540g – 660g per piece', badge:'Trending',           badgeColor:'bg-red-100 text-red-700',      emoji:'🥡', image:'/image3.png' },
      { name:'Fresh Soy Water (Pack)',   basePrice:6,   desc:'Pure, refreshing, and naturally wholesome. Our Fresh Soy Water is made from carefully selected, non-GMO soybeans, gently processed to preserve its natural goodness and mild, creamy flavour. Packed fresh for your convenience, it is a clean and nourishing plant based drink that is free from artificial additives, perfect for the whole family to enjoy any time of the day.',                                                                                                                                                 price:'RM 6.00',               weight:'1,200ml per pack', badge:'Local Twist',        badgeColor:'bg-yellow-100 text-yellow-700',emoji:'🧃', image:'/image4.png' },
      { name:'Fresh Soy Water (Bottle)', basePrice:2,   desc:'Pure, refreshing, and naturally wholesome. Our Fresh Soy Water comes in a handy bottle, made from carefully selected, non-GMO soybeans, gently processed to preserve its natural goodness and mild, creamy flavour. Grab and go, sip and clean, nourishing plant based drink with no artificial additives, perfect for a healthy lifestyle on the move.',                                                                                                                                                            price:'RM 2.00',               weight:'330ml per bottle', badge:'Signature',          badgeColor:'bg-cyan-100 text-cyan-700',    emoji:'🍶', image:'/image5.png' },
    ],
    about: {
      label:   'Our Story',
      heading: 'Why We Started Tofu Hauz',
      p1:      'We started Tofu Hauz from a simple belief that plant based food should be exciting, satisfying, and accessible to everyone. No bland salads. No sad substitutes.',
      p2:      `Every Delicacy, Nourishment, and Indulgence we serve is a testament to what tofu can really do when it's treated with care, creativity, and good recipe. Made fresh, made with heart, right from our home kitchen since ${BIZ.established}.`,
      quote:   '"Great food starts with great ingredients and a lot of love."',
    },
    testimonials: {
      label:   'Happy Customers',
      heading: 'What People Say',
      items: [
        { name:'Aisyah R.', rating:5, text:'"The smoothest Tau Fu Fah I have ever had! Silky texture with fragrant palm sugar syrup, tastes just like homemade. A must try!"' },
        { name:'Fatima Z.',  rating:5, text:'"Never been a tofu fan until Tofu Hauz. Best pressed tofu I have used! Firm, fresh and soaks up flavour beautifully. My kitchen staple every single week!"' },
        { name:'Mr.Hamza',  rating:5, text:'"The most delicious soy drink ever! Natural, pure taste and not too sweet. The whole family loves it!"' },
      ],
    },
    cta: {
      heading: 'Ready to Order?',
      sub:     `Skip the queue? order ahead via WhatsApp. Fresh, homemade, ready for pickup or delivery. Free delivery on orders RM${FREE_DELIVERY_MIN}+!`,
      btn:     'Place an Order',
    },
    contact: {
      label:    'Come Visit Us',
      heading:  'Find Us',
      location: 'Our Location',
      hours:    'Opening Hours',
      touch:    'Get in Touch',
      weekday:  'Mon — Fri  ✦  10:00 AM – 9:00 PM',
      weekend:  'Sat — Sun  ✦  Closed',
    },
    footer: { rights: `© ${new Date().getFullYear()} Tofu Hauz. All rights reserved.` },
    waMsg:   "Hi%20Tofu%20Hauz!%20I'd%20like%20to%20place%20an%20order%20%F0%9F%8D%BD%EF%B8%8F",
    orderForm: {
      title:          'Place Your Order',
      name:           'Your Name',          namePh:      'e.g. Ahmad',
      phone:          'Phone Number',       phonePh:     'e.g. 011-1234 5678',
      type:           'Order Type',
      pickup:         '🏠 Pick-up',         delivery:    '🛵 Delivery',
      address:        'Delivery Address',   addressPh:   'Enter your full address...',
      calculating:    'Calculating distance...',
      distOk:         (km: number, fee: number) => `📏 ~${km.toFixed(1)} km — Delivery fee: RM ${fee.toFixed(2)}`,
      distFree:       (km: number) => `📏 ~${km.toFixed(1)} km — 🎉 Free delivery (order RM${FREE_DELIVERY_MIN}+)`,
      distTooFar:     (km: number) => `📏 ~${km.toFixed(1)} km — Outside our delivery range (max ${MAX_DELIVERY_KM} km). Please contact us.`,
      distNotFound:   'Address not found. Try a more specific address (add city/postcode).',
      distError:      'Could not calculate distance. Please try again.',
      distHint:       'Distance is calculated from our store in Nilai.',
      freeDelivNote:  `🎉 Free delivery on orders RM${FREE_DELIVERY_MIN} and above!`,
      items:          'Select Items',
      notes:          'Notes / Special Requests', notesPh: 'Allergies, extra items, notes...',
      subtotal:       'Subtotal',
      deliveryFee:    'Delivery Fee',
      free:           'FREE',
      total:          'Total',
      confirm:        'Confirm Order via WhatsApp',
      cancel:         'Cancel',
      errName:        'Please enter your name.',
      errPhone:       'Please enter your phone number.',
      errItems:       'Please select at least one item.',
      errAddress:     'Please enter your delivery address.',
      errDistance:    'Please wait for distance calculation to complete.',
      errTooFar:      `Your address is outside our delivery range (max ${MAX_DELIVERY_KM} km). Please contact us directly.`,
      errPayment:     'Please select a payment method.',
      errPayRef:      'Please enter your transaction reference number.',
      payStep:        'Payment',
      payNow:         '💳 Pay Now  (DuitNow / TnG)',
      payLater:       '💵 Pay on Pickup / Delivery  (Cash)',
      payNowInstr:    'Scan the QR code with your banking app or Touch \'n Go, then enter the transaction reference below.',
      payRef:         'Transaction Reference No.',
      payRefPh:       'e.g. TT24060100001234',
      payRefHint:     'Found in your banking app after successful payment.',
      payQrMissing:   'QR image not uploaded yet. Please upload duitnow-qr.png to the public folder.',
    },
  },
  bm: {
    tagline:     'Segar. Berkhasiat. Lazat.',
    description: 'Hidangan berasaskan tauhu buatan tangan dengan penuh kasih sayang. Pemakanan berasaskan tumbuhan yang tidak mengorbankan rasa.',
    nav: { menu:'Menu', about:'Tentang', testimonials:'Testimoni', contact:'Hubungi', order:'Pesan Sekarang' },
    hero: {
      badge: `🫘 EST. ${BIZ.established}  ✦  Nilai, Negeri Sembilan`,
      btn1:  'Lihat Menu Kami',
      btn2:  'Pesan via WhatsApp',
    },
    craft: ['🫘 TOFU HAUZ','🍚 SEGAR SETIAP HARI','💚 BERASASKAN TUMBUHAN','🏠 BUATAN SENDIRI','✦ EST. 2018','🍜 NILAI, NS'],
    features: [
      { icon:'🌱', title:'Berasaskan Tumbuhan',      text:'Setiap hidangan dibina dengan bahan-bahan tumbuhan yang sihat tanpa mengorbankan rasa.' },
      { icon:'🔪', title:'Dibuat Segar Setiap Hari', text:'Kami menyediakan tauhu dan resipi sendiri setiap pagi untuk kualiti terbaik setiap masa.' },
      { icon:'💚', title:'Tanpa Rasa Bersalah',      text:'Tinggi protein, rendah kolesterol dan makanan sihat tidak pernah terasa senikmat ini.' },
    ],
    menuSection: {
      label:      'Apa Yang Kami Hidangkan',
      heading:    'Menu Kami',
      sub:        'Setiap hidangan dibuat segar dengan tauhu terbaik dan bahan-bahan bermusim. Makanan mudah, rasa yang serius.',
      cantDecide: 'Tak tahu nak pilih? Biar kami cadangkan!',
      chat:       'Berbual dengan Kami di WhatsApp',
      orderBtn:   'Pesan',
    },
    menu: [
      { name:'Tauhu Press Tradisional',  basePrice:11,  desc:'Padat, kenyal, dan sedia untuk dimasak. Tauhu press kami diperbuat daripada kacang soya tulen tanpa GMO dengan kandungan air yang rendah, menghasilkan tekstur yang memuaskan dan mengekalkan bentuknya dengan sempurna dalam setiap hidangan.',                                                                                                                                                                                                                                                                                                 price:'RM 11.00 untuk 8 ketul', weight:'115g seketul', badge:'Terlaris',          badgeColor:'bg-amber-100 text-amber-700',  emoji:'🫘', image:'/image1.png' },
      { name:'Tau Fu Fah Tradisional',   basePrice:3.5, desc:'Lembut, licin, dan cair di mulut. Tau Fu Fah kami dibuat daripada kacang soya tulen tanpa GMO, diset dengan teliti untuk menghasilkan tekstur yang halus dan berkrim yang menenangkan dengan setiap suapan. Dihidangkan dengan sirap halia yang wangi atau sirap gula merah yang kaya, ia adalah pencuci mulut tradisional yang abadi yang menghangatkan hati dan menyukakan jiwa.',                                                                                                                                                                    price:'RM 3.50 setiap pek',     weight:'220g sepek', badge:'Kegemaran',         badgeColor:'bg-rose-100 text-rose-700',    emoji:'🍮', image:'/image2.png' },
      { name:'Tauhu Press Loaf',         basePrice:6,   desc:'Tebal, padat, dan berstruktur indah. Tauhu Press Loaf kami dibuat daripada kacang soya tulen tanpa GMO, ditekan ke dalam blok loaf yang besar untuk fleksibiliti maksimum di dapur. Dengan teksturnya yang padat dan kandungan air yang rendah, ia dipotong dengan bersih, mengekalkan bentuknya dengan sempurna, dan menyerap marinasi dan sos seperti tiada yang lain. Sama ada digoreng, dibakar, dikukus, atau ditambah ke dalam rebusan dan kari yang sedap, ini adalah tauhu pilihan untuk hidangan yang berani dan memuaskan.',  price:'RM 6.00',                weight:'540g – 660g seketul', badge:'Trending',          badgeColor:'bg-red-100 text-red-700',      emoji:'🥡', image:'/image3.png' },
      { name:'Air Soya Segar (Pek)',     basePrice:6,   desc:'Tulen, menyegarkan, dan semulajadi berkhasiat. Air Soya Segar kami dibuat daripada kacang soya terpilih tanpa GMO, diproses dengan lembut untuk mengekalkan kebaikan semulajadi dan rasa ringan yang berkrim. Dikemas segar untuk kemudahan anda, ia adalah minuman berasaskan tumbuhan yang bersih dan berkhasiat tanpa bahan tambahan buatan, sesuai untuk seluruh keluarga menikmati pada bila-bila masa.',                                                                                                                               price:'RM 6.00',                weight:'1,200ml sepek', badge:'Sentuhan Tempatan', badgeColor:'bg-yellow-100 text-yellow-700',emoji:'🧃', image:'/image4.png' },
      { name:'Air Soya Segar (Botol)',   basePrice:2,   desc:'Tulen, menyegarkan, dan semulajadi berkhasiat. Air Soya Segar kami hadir dalam botol yang mudah, dibuat daripada kacang soya terpilih tanpa GMO, diproses dengan lembut untuk mengekalkan kebaikan semulajadi dan rasa ringan yang berkrim. Ambil dan pergi, teguk dan nikmati minuman berasaskan tumbuhan yang bersih dan berkhasiat tanpa bahan tambahan buatan, sesuai untuk gaya hidup sihat yang aktif.',                                                                                                                             price:'RM 2.00',                weight:'330ml sebotol', badge:'Signature',         badgeColor:'bg-cyan-100 text-cyan-700',    emoji:'🍶', image:'/image5.png' },
    ],
    about: {
      label:   'Kisah Kami',
      heading: 'Mengapa Kami Tubuhkan Tofu Hauz',
      p1:      'Kami memulakan Tofu Hauz dengan satu kepercayaan yang mudah bahawa makanan berasaskan tumbuhan seharusnya menarik, memuaskan, dan mudah diakses oleh semua orang. Tiada salad hambar. Tiada pengganti yang membosankan.',
      p2:      `Setiap Kelazatan, Khasiat, dan Kenikmatan yang kami hidangkan adalah bukti apa yang tauhu benar-benar boleh lakukan apabila diperlakukan dengan penuh perhatian, kreativiti, dan resipi yang baik. Dibuat segar, dibuat dengan hati, terus dari dapur rumah kami sejak ${BIZ.established}.`,
      quote:   '"Makanan yang hebat bermula dengan bahan-bahan yang hebat dan banyak kasih sayang."',
    },
    testimonials: {
      label:   'Pelanggan Gembira',
      heading: 'Apa Kata Mereka',
      items: [
        { name:'Aisyah R.',  rating:5, text:'"Tau Fu Fah paling lembut yang pernah saya rasa! Teksturnya lembut dengan air gula anau yang wangi, rasa seperti masakan rumah. Wajib cuba!"' },
        { name:'Fatima Z.',  rating:5, text:'"Saya tak pernah suka tauhu sebelum ini. Tauhu dari Tofu Hauz terbaik yang pernah saya guna! Padat, segar dan menyerap perisa dengan sempurna. Bahan dapur saya setiap minggu!"' },
        { name:'Mr.Hamza',  rating:5, text:'"Minuman soya paling sedap yang pernah ada! Rasa semula jadi, tulen dan tidak terlalu manis. Seluruh keluarga suka!"' },
      ],
    },
    cta: {
      heading: 'Bersedia untuk Memesan?',
      sub:     `Langkau giliran? Pesan awal melalui WhatsApp. Segar, buatan sendiri, sedia untuk ambil atau penghantaran. Penghantaran percuma untuk pesanan RM${FREE_DELIVERY_MIN}+!`,
      btn:     'Buat Pesanan',
    },
    contact: {
      label:    'Jom Lawat Kami',
      heading:  'Cari Kami',
      location: 'Lokasi Kami',
      hours:    'Waktu Operasi',
      touch:    'Hubungi Kami',
      weekday:  'Isnin — Jumaat  ✦  10:00 PG – 9:00 MLM',
      weekend:  'Sabtu — Ahad  ✦  Tutup',
    },
    footer: { rights: `© ${new Date().getFullYear()} Tofu Hauz. Hak cipta terpelihara.` },
    waMsg:   "Hai%20Tofu%20Hauz!%20Saya%20ingin%20membuat%20pesanan%20%F0%9F%8D%BD%EF%B8%8F",
    orderForm: {
      title:          'Buat Pesanan Anda',
      name:           'Nama Anda',               namePh:      'cth. Ahmad',
      phone:          'Nombor Telefon',          phonePh:     'cth. 011-1234 5678',
      type:           'Jenis Pesanan',
      pickup:         '🏠 Ambil Sendiri',         delivery:    '🛵 Penghantaran',
      address:        'Alamat Penghantaran',     addressPh:   'Masukkan alamat penuh anda...',
      calculating:    'Mengira jarak...',
      distOk:         (km: number, fee: number) => `📏 ~${km.toFixed(1)} km — Yuran penghantaran: RM ${fee.toFixed(2)}`,
      distFree:       (km: number) => `📏 ~${km.toFixed(1)} km — 🎉 Penghantaran percuma (pesanan RM${FREE_DELIVERY_MIN}+)`,
      distTooFar:     (km: number) => `📏 ~${km.toFixed(1)} km — Di luar kawasan penghantaran kami (maks ${MAX_DELIVERY_KM} km). Sila hubungi kami.`,
      distNotFound:   'Alamat tidak dijumpai. Cuba alamat yang lebih spesifik (tambah bandar/poskod).',
      distError:      'Tidak dapat mengira jarak. Sila cuba lagi.',
      distHint:       'Jarak dikira dari kedai kami di Nilai.',
      freeDelivNote:  `🎉 Penghantaran percuma untuk pesanan RM${FREE_DELIVERY_MIN} ke atas!`,
      items:          'Pilih Item',
      notes:          'Nota / Permintaan Khas',  notesPh:     'Alahan, item tambahan, nota...',
      subtotal:       'Subtotal',
      deliveryFee:    'Yuran Penghantaran',
      free:           'PERCUMA',
      total:          'Jumlah',
      confirm:        'Sahkan Pesanan via WhatsApp',
      cancel:         'Batal',
      errName:        'Sila masukkan nama anda.',
      errPhone:       'Sila masukkan nombor telefon anda.',
      errItems:       'Sila pilih sekurang-kurangnya satu item.',
      errAddress:     'Sila masukkan alamat penghantaran anda.',
      errDistance:    'Sila tunggu pengiraan jarak selesai.',
      errTooFar:      `Alamat anda di luar kawasan penghantaran kami (maks ${MAX_DELIVERY_KM} km). Sila hubungi kami terus.`,
      errPayment:     'Sila pilih kaedah pembayaran.',
      errPayRef:      'Sila masukkan nombor rujukan transaksi anda.',
      payStep:        'Pembayaran',
      payNow:         '💳 Bayar Sekarang  (DuitNow / TnG)',
      payLater:       '💵 Bayar Semasa Ambil / Penghantaran  (Tunai)',
      payNowInstr:    'Imbas kod QR dengan apl bank atau Touch \'n Go anda, kemudian masukkan nombor rujukan transaksi di bawah.',
      payRef:         'Nombor Rujukan Transaksi',
      payRefPh:       'cth. TT24060100001234',
      payRefHint:     'Boleh dijumpai dalam apl bank anda selepas pembayaran berjaya.',
      payQrMissing:   'Imej QR belum dimuat naik. Sila muat naik duitnow-qr.png ke folder public.',
    },
  },
}

const ADMIN_PIN    = '2018'
const DUITNOW_QR   = '/duitnow-qr.png'   // ← replace with your actual DuitNow/TnG QR image

interface Bean { x:number; y:number; vy:number; vx:number; size:number; rotation:number; rotSpeed:number; alpha:number; swayAmp:number; swayFreq:number; phase:number }

type GeoStatus = 'idle' | 'loading' | 'ok' | 'toofar' | 'notfound' | 'error'

export default function Home() {
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [scrolled,       setScrolled]       = useState(false)
  const [logoErr,        setLogoErr]        = useState(false)
  const [lang,           setLang]           = useState<'en'|'bm'>('en')
  const [ordersOpen,     setOrdersOpen]     = useState(true)
  const [isAdmin,        setIsAdmin]        = useState(false)
  const [showPinModal,   setShowPinModal]   = useState(false)
  const [pinInput,       setPinInput]       = useState('')
  const [pinError,       setPinError]       = useState(false)
  const [logoTaps,       setLogoTaps]       = useState(0)
  // Order form
  const [showOrderForm,  setShowOrderForm]  = useState(false)
  const [orderName,      setOrderName]      = useState('')
  const [orderPhone,     setOrderPhone]     = useState('')
  const [orderType,      setOrderType]      = useState<'pickup'|'delivery'>('pickup')
  const [orderAddress,   setOrderAddress]   = useState('')
  const [orderNotes,     setOrderNotes]     = useState('')
  const [orderItems,     setOrderItems]     = useState<Record<string,number>>({})
  const [orderError,     setOrderError]     = useState('')
  // Geocoding
  const [geoStatus,          setGeoStatus]          = useState<GeoStatus>('idle')
  const [geoDistKm,          setGeoDistKm]          = useState<number|null>(null)
  const [geoFee,             setGeoFee]             = useState<number|null>(null)
  // Payment
  const [paymentMethod,      setPaymentMethod]      = useState<'now'|'later'|null>(null)
  const [paymentRef,         setPaymentRef]         = useState('')
  const [qrErr,              setQrErr]              = useState(false)
  // Intro
  const [showIntro,          setShowIntro]          = useState(true)
  const [introFading,        setIntroFading]        = useState(false)

  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const tapTimer     = useRef<ReturnType<typeof setTimeout>|null>(null)
  const geocodeTimer = useRef<ReturnType<typeof setTimeout>|null>(null)

  const t = T[lang]
  const waLink = `https://wa.me/${BIZ.whatsapp}?text=${t.waMsg}`

  // Derived totals
  const subtotal = Object.entries(orderItems)
    .filter(([, q]) => q > 0)
    .reduce((sum, [name, qty]) => {
      const item = t.menu.find(m => m.name === name)
      return sum + (item ? item.basePrice * qty : 0)
    }, 0)

  const deliveryFee = (() => {
    if (orderType === 'pickup') return 0
    if (subtotal >= FREE_DELIVERY_MIN && geoStatus === 'ok') return 0
    if (geoStatus === 'ok' && geoFee !== null) return geoFee
    return null
  })()

  const total = subtotal + (deliveryFee ?? 0)
  const freeByMinOrder = orderType === 'delivery' && subtotal >= FREE_DELIVERY_MIN && geoStatus === 'ok'

  // ── Geocoding ─────────────────────────────────────────────────────────────
  const geocodeAddress = async (addr: string) => {
    if (addr.trim().length < 6) return
    setGeoStatus('loading')
    setGeoDistKm(null)
    setGeoFee(null)
    try {
      const q = encodeURIComponent(addr + ', Malaysia')
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=my`,
        { headers: { 'Accept': 'application/json' } }
      )
      const data = await res.json()
      if (!data.length) { setGeoStatus('notfound'); return }
      const km = haversine(STORE_LAT, STORE_LNG, parseFloat(data[0].lat), parseFloat(data[0].lon))
      setGeoDistKm(km)
      if (km > MAX_DELIVERY_KM) {
        setGeoStatus('toofar')
      } else {
        setGeoFee(distanceToFee(km))
        setGeoStatus('ok')
      }
    } catch {
      setGeoStatus('error')
    }
  }

  const resetGeo = () => {
    if (geocodeTimer.current) clearTimeout(geocodeTimer.current)
    setGeoStatus('idle')
    setGeoDistKm(null)
    setGeoFee(null)
  }

  // ── Persisted state ────────────────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('th_orders_open')
    if (stored !== null) setOrdersOpen(stored === 'true')
    if (localStorage.getItem('th_admin') === 'true') setIsAdmin(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('th_orders_open', String(ordersOpen))
  }, [ordersOpen])

  // ── Admin / logo tap ───────────────────────────────────────────────────────
  const handleLogoTap = () => {
    const next = logoTaps + 1
    setLogoTaps(next)
    if (tapTimer.current) clearTimeout(tapTimer.current)
    if (next >= 5) { setShowPinModal(true); setLogoTaps(0) }
    else tapTimer.current = setTimeout(() => setLogoTaps(0), 2000)
  }

  const submitPin = () => {
    if (pinInput === ADMIN_PIN) {
      setIsAdmin(true); localStorage.setItem('th_admin', 'true')
      setShowPinModal(false); setPinError(false)
    } else { setPinError(true) }
    setPinInput('')
  }

  const logout = () => { setIsAdmin(false); localStorage.removeItem('th_admin') }

  // ── Order form ─────────────────────────────────────────────────────────────
  const openOrderForm = (preselect?: string) => {
    setOrderItems(preselect ? { [preselect]: 1 } : {})
    setOrderName(''); setOrderPhone(''); setOrderType('pickup')
    setOrderAddress(''); setOrderNotes(''); setOrderError('')
    setPaymentMethod(null); setPaymentRef(''); setQrErr(false)
    resetGeo()
    setShowOrderForm(true)
  }

  const submitOrder = () => {
    const of = t.orderForm
    if (!orderName.trim())  { setOrderError(of.errName);    return }
    if (!orderPhone.trim()) { setOrderError(of.errPhone);   return }
    const selected = Object.entries(orderItems).filter(([, q]) => q > 0)
    if (!selected.length)   { setOrderError(of.errItems);   return }
    if (orderType === 'delivery') {
      if (!orderAddress.trim())          { setOrderError(of.errAddress);  return }
      if (geoStatus === 'loading')       { setOrderError(of.errDistance); return }
      if (geoStatus === 'toofar')        { setOrderError(of.errTooFar);   return }
      if (geoStatus !== 'ok')            { setOrderError(of.errDistance); return }
    }
    if (!paymentMethod)                            { setOrderError(of.errPayment); return }
    if (paymentMethod === 'now' && !paymentRef.trim()) { setOrderError(of.errPayRef);  return }

    const itemLines = selected.map(([name, qty]) => {
      const item = t.menu.find(m => m.name === name)
      return `  • ${name} x${qty}  (RM ${((item?.basePrice ?? 0) * qty).toFixed(2)})`
    }).join('\n')

    const typeLabel  = orderType === 'pickup' ? (lang==='bm'?'Ambil Sendiri':'Pick-up') : (lang==='bm'?'Penghantaran':'Delivery')
    const feeLabel   = lang==='bm' ? 'Yuran Penghantaran' : 'Delivery Fee'
    const totalLabel = lang==='bm' ? 'Jumlah' : 'Total'
    const feeStr     = orderType === 'pickup' ? (lang==='bm'?'Percuma':'FREE')
      : freeByMinOrder ? (lang==='bm'?'Percuma (pesanan RM100+)':'FREE (order RM100+)')
      : `RM ${(geoFee ?? 0).toFixed(2)}`
    const distStr    = geoDistKm !== null ? `\n📏 *${lang==='bm'?'Jarak':'Distance'}:* ~${geoDistKm.toFixed(1)} km` : ''
    const addrLine   = orderType === 'delivery' ? `\n📍 *${lang==='bm'?'Alamat':'Address'}:* ${orderAddress}${distStr}` : ''
    const noteLine   = orderNotes.trim() ? `\n📝 *${lang==='bm'?'Nota':'Notes'}:* ${orderNotes}` : ''
    const payLine    = paymentMethod === 'now'
      ? `\n💳 *${lang==='bm'?'Pembayaran':'Payment'}:* DuitNow/TnG — Ref: ${paymentRef.trim()}`
      : `\n💵 *${lang==='bm'?'Pembayaran':'Payment'}:* ${lang==='bm'?'Tunai semasa ambil/penghantaran':'Cash on Pickup/Delivery'}`

    const msg = lang === 'bm'
      ? `Hai Tofu Hauz! Saya ingin membuat pesanan 🍽️\n\n👤 *Nama:* ${orderName}\n📱 *Telefon:* ${orderPhone}\n🚗 *Jenis:* ${typeLabel}${addrLine}\n\n🛒 *Pesanan:*\n${itemLines}\n\n💰 *Subtotal:* RM ${subtotal.toFixed(2)}\n🛵 *${feeLabel}:* ${feeStr}\n✅ *${totalLabel}:* RM ${total.toFixed(2)}${payLine}${noteLine}`
      : `Hi Tofu Hauz! I'd like to place an order 🍽️\n\n👤 *Name:* ${orderName}\n📱 *Phone:* ${orderPhone}\n🚗 *Type:* ${typeLabel}${addrLine}\n\n🛒 *Order:*\n${itemLines}\n\n💰 *Subtotal:* RM ${subtotal.toFixed(2)}\n🛵 *${feeLabel}:* ${feeStr}\n✅ *${totalLabel}:* RM ${total.toFixed(2)}${payLine}${noteLine}`

    window.open(`https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    setShowOrderForm(false)
    setOrderItems({})
  }

  // ── Canvas animation ───────────────────────────────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let animId: number; let frame = 0
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    const beans: Bean[] = []
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 32 + 14
      beans.push({ x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, vy:-(Math.random()*0.35+0.12), vx:(Math.random()-0.5)*0.1, size, rotation:Math.random()*Math.PI*2, rotSpeed:(Math.random()-0.5)*0.009, alpha:Math.random()*0.18+0.06, swayAmp:Math.random()*0.8+0.3, swayFreq:Math.random()*0.018+0.008, phase:Math.random()*Math.PI*2 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); frame++
      for (const b of beans) {
        b.x += b.vx + Math.sin(frame * b.swayFreq + b.phase) * b.swayAmp; b.y += b.vy; b.rotation += b.rotSpeed
        if (b.y < -b.size*2) { b.y = canvas.height+b.size; b.x = Math.random()*canvas.width }
        if (b.x < -60) b.x = canvas.width+60; if (b.x > canvas.width+60) b.x = -60
        ctx.save(); ctx.globalAlpha = b.alpha; ctx.translate(b.x, b.y); ctx.rotate(b.rotation)
        ctx.font = `${b.size}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('🫘', 0, 0); ctx.restore()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // ── Geo status label ───────────────────────────────────────────────────────
  const geoLabel = (() => {
    const of = t.orderForm
    if (geoStatus === 'loading')  return { text: of.calculating, color: 'text-amber-600' }
    if (geoStatus === 'notfound') return { text: of.distNotFound, color: 'text-red-500' }
    if (geoStatus === 'error')    return { text: of.distError,    color: 'text-red-500' }
    if (geoStatus === 'toofar' && geoDistKm !== null) return { text: of.distTooFar(geoDistKm), color: 'text-red-500' }
    if (geoStatus === 'ok' && geoDistKm !== null && geoFee !== null) {
      return freeByMinOrder
        ? { text: of.distFree(geoDistKm),          color: 'text-green-600' }
        : { text: of.distOk(geoDistKm, geoFee),    color: 'text-green-700' }
    }
    return null
  })()

  function dismissIntro() {
    setIntroFading(true)
    setTimeout(() => setShowIntro(false), 800)
  }

  return (
    <>
      {showIntro && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-700 ${introFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{background:'linear-gradient(160deg,#fef9ec 0%,#fff8e1 50%,#ffefd5 100%)'}}
        >
          <video
            ref={videoRef}
            src="/Recording%20tofu%20animation%202.mp4"
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 6
                videoRef.current.play().catch(() => {})
              }
            }}
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.currentTime >= 14) {
                videoRef.current.pause()
                dismissIntro()
              }
            }}
          />
          <button
            onClick={dismissIntro}
            className="absolute bottom-8 right-8 text-[#2c1a0e] text-sm font-medium bg-amber-100 hover:bg-amber-200 rounded-full px-5 py-2 z-10 transition-colors"
          >
            Skip ›
          </button>
        </div>
      )}
      <Head>
        <title>{BIZ.name} — {t.tagline}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={BIZ.name} />
        <meta property="og:description" content={t.description} />
      </Head>

      <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}} />

      {!ordersOpen && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white text-center py-2.5 text-sm font-semibold tracking-wide">
          🚫 {lang==='bm' ? 'Pesanan ditutup buat masa ini. Sila semak semula kemudian.' : 'Orders are currently closed. Please check back later.'}
        </div>
      )}

      {/* ── Admin PIN modal ── */}
      {showPinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-80 shadow-2xl">
            <h3 className="text-lg font-bold text-[#2c1a0e] mb-1 text-center">Admin Access</h3>
            <p className="text-[#7a4a28] text-xs text-center mb-6">Enter your PIN to continue</p>
            <input type="password" inputMode="numeric" maxLength={6} value={pinInput}
              onChange={e => { setPinInput(e.target.value); setPinError(false) }}
              onKeyDown={e => e.key==='Enter' && submitPin()} placeholder="Enter PIN"
              className="w-full border-2 border-amber-200 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] mb-3 outline-none focus:border-[#d4891a]"
              autoFocus />
            {pinError && <p className="text-red-500 text-xs text-center mb-3">Incorrect PIN. Try again.</p>}
            <div className="flex gap-3">
              <button onClick={() => { setShowPinModal(false); setPinInput(''); setPinError(false) }}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={submitPin}
                className="flex-1 py-2.5 rounded-xl bg-[#2c1a0e] text-white text-sm font-semibold hover:bg-[#4a2c18]">Login</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Order Form Modal ── */}
      {showOrderForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" style={{maxHeight:'90vh'}}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-[#2c1a0e]">{t.orderForm.title}</h3>
                <p className="text-xs text-[#7a4a28] mt-0.5">{BIZ.name} · WhatsApp</p>
              </div>
              <button onClick={() => setShowOrderForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-xl">×</button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#2c1a0e] mb-1.5 uppercase tracking-wide">{t.orderForm.name}</label>
                <input value={orderName} onChange={e => { setOrderName(e.target.value); setOrderError('') }}
                  placeholder={t.orderForm.namePh}
                  className="w-full border-2 border-amber-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4891a] transition-colors" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#2c1a0e] mb-1.5 uppercase tracking-wide">{t.orderForm.phone}</label>
                <input type="tel" value={orderPhone} onChange={e => { setOrderPhone(e.target.value); setOrderError('') }}
                  placeholder={t.orderForm.phonePh}
                  className="w-full border-2 border-amber-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4891a] transition-colors" />
              </div>

              {/* Order Type */}
              <div>
                <label className="block text-xs font-bold text-[#2c1a0e] mb-2 uppercase tracking-wide">{t.orderForm.type}</label>
                <div className="flex gap-3">
                  {(['pickup','delivery'] as const).map(ot => (
                    <button key={ot} onClick={() => { setOrderType(ot); resetGeo(); setOrderAddress(''); setOrderError('') }}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${orderType===ot ? 'border-[#d4891a] bg-amber-50 text-[#d4891a]' : 'border-amber-100 text-[#7a4a28] hover:border-amber-200'}`}>
                      {ot==='pickup' ? t.orderForm.pickup : t.orderForm.delivery}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery address + autocomplete */}
              {orderType === 'delivery' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#2c1a0e] uppercase tracking-wide">{t.orderForm.address}</label>
                    <span className="text-[10px] font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      {t.orderForm.freeDelivNote}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={orderAddress}
                    onChange={e => {
                      const val = e.target.value
                      setOrderAddress(val)
                      setOrderError('')
                      resetGeo()
                      if (val.trim().length >= 6) {
                        setGeoStatus('loading')
                        if (geocodeTimer.current) clearTimeout(geocodeTimer.current)
                        geocodeTimer.current = setTimeout(() => geocodeAddress(val), 1200)
                      }
                    }}
                    placeholder={t.orderForm.addressPh}
                    className="w-full border-2 border-amber-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4891a] transition-colors"
                  />

                  {/* Distance result */}
                  {geoStatus === 'loading' && (
                    <div className="flex items-center gap-2 mt-2 text-amber-600 text-xs font-medium">
                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                      </svg>
                      {t.orderForm.calculating}
                    </div>
                  )}
                  {geoLabel && geoStatus !== 'loading' && (
                    <p className={`mt-2 text-xs font-semibold ${geoLabel.color}`}>{geoLabel.text}</p>
                  )}
                  {geoStatus === 'idle' && (
                    <p className="mt-2 text-xs text-[#7a4a28]/60">{t.orderForm.distHint}</p>
                  )}
                </div>
              )}

              {/* Items */}
              <div>
                <label className="block text-xs font-bold text-[#2c1a0e] mb-2 uppercase tracking-wide">{t.orderForm.items}</label>
                <div className="space-y-2">
                  {t.menu.map(item => {
                    const qty = orderItems[item.name] || 0
                    return (
                      <div key={item.name}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${qty>0 ? 'border-[#d4891a] bg-amber-50' : 'border-amber-100 hover:border-amber-200'}`}>
                        <span className="text-xl shrink-0">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#2c1a0e] truncate">{item.name}</p>
                          <p className="text-xs text-[#d4891a] font-medium">{item.price}</p>
                          <p className="text-[10px] text-[#7a4a28]/60">{item.weight}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => { setOrderItems(prev => ({ ...prev, [item.name]: Math.max(0,(prev[item.name]||0)-1) })); setOrderError('') }}
                            className="w-7 h-7 rounded-full border-2 border-amber-200 text-[#7a4a28] font-bold text-sm hover:border-[#d4891a] hover:text-[#d4891a] transition-all flex items-center justify-center">−</button>
                          <span className="w-5 text-center text-sm font-bold text-[#2c1a0e]">{qty}</span>
                          <button onClick={() => { setOrderItems(prev => ({ ...prev, [item.name]: (prev[item.name]||0)+1 })); setOrderError('') }}
                            className="w-7 h-7 rounded-full border-2 border-amber-200 text-[#7a4a28] font-bold text-sm hover:border-[#d4891a] hover:text-[#d4891a] transition-all flex items-center justify-center">+</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-[#2c1a0e] mb-1.5 uppercase tracking-wide">
                  {t.orderForm.notes} <span className="text-gray-400 normal-case font-normal">(optional)</span>
                </label>
                <textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)}
                  placeholder={t.orderForm.notesPh} rows={2}
                  className="w-full border-2 border-amber-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4891a] transition-colors resize-none" />
              </div>

              {/* Order Summary */}
              <div className="rounded-2xl overflow-hidden border-2 border-amber-100">
                <div className="bg-amber-50 px-4 py-2 border-b border-amber-100">
                  <p className="text-xs font-bold text-[#2c1a0e] uppercase tracking-wide">
                    {lang==='bm' ? 'Ringkasan Pesanan' : 'Order Summary'}
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex justify-between text-sm text-[#7a4a28]">
                    <span>{t.orderForm.subtotal}</span>
                    <span className="font-semibold text-[#2c1a0e]">RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#7a4a28]">
                    <span>{t.orderForm.deliveryFee}</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : 'text-[#2c1a0e]'}`}>
                      {orderType === 'pickup'
                        ? t.orderForm.free
                        : freeByMinOrder
                          ? t.orderForm.free
                          : deliveryFee !== null
                            ? `RM ${deliveryFee.toFixed(2)}`
                            : geoStatus === 'loading' ? '...' : '—'}
                    </span>
                  </div>
                  {freeByMinOrder && (
                    <p className="text-[10px] text-green-600 font-semibold">{t.orderForm.freeDelivNote}</p>
                  )}
                  <div className="border-t border-amber-100 pt-2 flex justify-between">
                    <span className="font-bold text-[#2c1a0e]">{t.orderForm.total}</span>
                    <span className="font-bold text-lg text-[#d4891a]">
                      {orderType === 'delivery' && deliveryFee === null
                        ? `RM ${subtotal.toFixed(2)} + ?`
                        : `RM ${total.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Payment ── */}
              <div>
                <label className="block text-xs font-bold text-[#2c1a0e] mb-2 uppercase tracking-wide">{t.orderForm.payStep}</label>
                <div className="space-y-2">
                  {/* Pay Now */}
                  <button
                    onClick={() => { setPaymentMethod('now'); setOrderError('') }}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${paymentMethod==='now' ? 'border-[#d4891a] bg-amber-50 text-[#d4891a]' : 'border-amber-100 text-[#2c1a0e] hover:border-amber-200'}`}>
                    {t.orderForm.payNow}
                  </button>
                  {/* Pay Later */}
                  <button
                    onClick={() => { setPaymentMethod('later'); setOrderError('') }}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${paymentMethod==='later' ? 'border-[#d4891a] bg-amber-50 text-[#d4891a]' : 'border-amber-100 text-[#2c1a0e] hover:border-amber-200'}`}>
                    {t.orderForm.payLater}
                  </button>
                </div>

                {/* Pay Now expanded — QR + reference */}
                {paymentMethod === 'now' && (
                  <div className="mt-4 space-y-4">
                    <p className="text-xs text-[#7a4a28] leading-relaxed">{t.orderForm.payNowInstr}</p>

                    {/* QR code + amount */}
                    <div className="flex flex-col items-center gap-3 bg-amber-50 rounded-2xl p-4 border-2 border-amber-100">
                      <p className="text-xs font-bold text-[#2c1a0e] uppercase tracking-wide">
                        {lang==='bm' ? 'Jumlah Perlu Dibayar' : 'Amount to Pay'}:&nbsp;
                        <span className="text-[#d4891a] text-base">RM {total.toFixed(2)}</span>
                      </p>
                      {!qrErr
                        ? <img
                            src={DUITNOW_QR}
                            alt="DuitNow / TnG QR"
                            className="w-48 h-48 object-contain rounded-xl"
                            onError={() => setQrErr(true)}
                          />
                        : <div className="w-48 h-48 rounded-xl Fborder-2 border-dashed border-amber-300 flex flex-col items-center justify-center gap-2 text-center p-4">
                            <span className="text-3xl">📲</span>
                            <p className="text-xs text-[#7a4a28]/70 leading-snug">{t.orderForm.payQrMissing}</p>
                          </div>
                      }
                      <p className="text-[10px] text-[#7a4a28]/60 text-center">DuitNow · Touch 'n Go · Online Banking</p>
                    </div>

                    {/* Transaction reference input */}
                    <div>
                      <label className="block text-xs font-bold text-[#2c1a0e] mb-1.5 uppercase tracking-wide">{t.orderForm.payRef}</label>
                      <input
                        type="text"
                        value={paymentRef}
                        onChange={e => { setPaymentRef(e.target.value); setOrderError('') }}
                        placeholder={t.orderForm.payRefPh}
                        className="w-full border-2 border-amber-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4891a] transition-colors font-mono"
                      />
                      <p className="mt-1 text-[10px] text-[#7a4a28]/60">{t.orderForm.payRefHint}</p>
                    </div>
                  </div>
                )}
              </div>

              {orderError && (
                <p className="text-red-500 text-sm font-medium flex items-center gap-1.5">⚠️ {orderError}</p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-amber-100 flex gap-3 shrink-0">
              <button onClick={() => setShowOrderForm(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-colors">
                {t.orderForm.cancel}
              </button>
              <button onClick={submitOrder}
                className="flex-1 py-3 rounded-xl bg-[#2c1a0e] text-white text-sm font-semibold hover:bg-[#4a2c18] transition-colors flex items-center justify-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.orderForm.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Admin floating panel ── */}
      {isAdmin && (
        <div className="fixed bottom-28 right-6 z-[90] bg-[#2c1a0e] text-white rounded-2xl p-4 shadow-2xl w-56">
          <p className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">Admin Panel</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold">{lang==='bm' ? 'Status Pesanan' : 'Order Status'}</span>
            <button onClick={() => setOrdersOpen(o => !o)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${ordersOpen ? 'bg-green-500' : 'bg-red-500'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${ordersOpen ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          <p className={`text-xs text-center font-semibold mb-3 ${ordersOpen ? 'text-green-400' : 'text-red-400'}`}>
            {ordersOpen ? '✅ Orders OPEN' : '🚫 Orders CLOSED'}
          </p>
          <button onClick={logout} className="w-full py-1.5 rounded-xl border border-white/20 text-xs text-white/60 hover:text-white hover:border-white/40 transition-colors">Logout</button>
        </div>
      )}

      {/* WhatsApp floating button */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Order on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#fef9ec]/95 backdrop-blur-md shadow-md border-b border-amber-100' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center" onClick={handleLogoTap}>
            {!logoErr ? <img src="/logo.png" alt="Tofu Hauz" className="h-12 w-auto" onError={() => setLogoErr(true)} />
              : <span className="brand-name text-2xl text-[#2c1a0e]">TOFU HAUZ</span>}
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2c1a0e]">
            {(['menu','about','testimonials','contact'] as const).map(s => (
              <a key={s} href={`#${s}`} className="nav-link hover:text-[#d4891a] transition-colors">{t.nav[s]}</a>
            ))}
            {ordersOpen
              ? <button onClick={() => openOrderForm()} className="btn-dark px-5 py-2 rounded-full text-sm font-semibold">{t.nav.order}</button>
              : <span className="px-5 py-2 rounded-full text-sm font-semibold bg-gray-200 text-gray-400 cursor-not-allowed">{lang==='bm'?'Ditutup':'Closed'}</span>}
            <button onClick={() => setLang(l => l==='en'?'bm':'en')}
              className="flex items-center gap-1 border-2 border-[#2c1a0e]/20 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider hover:border-[#d4891a] transition-all">
              <span className={lang==='en'?'text-[#d4891a]':'text-[#2c1a0e]/40'}>EN</span>
              <span className="text-[#2c1a0e]/30">|</span>
              <span className={lang==='bm'?'text-[#d4891a]':'text-[#2c1a0e]/40'}>BM</span>
            </button>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setLang(l => l==='en'?'bm':'en')}
              className="flex items-center gap-1 border-2 border-[#2c1a0e]/20 rounded-full px-2.5 py-1 text-xs font-bold">
              <span className={lang==='en'?'text-[#d4891a]':'text-[#2c1a0e]/40'}>EN</span>
              <span className="text-[#2c1a0e]/30">|</span>
              <span className={lang==='bm'?'text-[#d4891a]':'text-[#2c1a0e]/40'}>BM</span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-[#2c1a0e] hover:bg-amber-100 transition-colors">
              <div className="w-5 h-0.5 bg-current mb-1"/><div className="w-5 h-0.5 bg-current mb-1"/><div className="w-5 h-0.5 bg-current"/>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#fef9ec] border-t border-amber-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-[#2c1a0e]">
            {(['menu','about','testimonials','contact'] as const).map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)} className="hover:text-[#d4891a] transition-colors">{t.nav[s]}</a>
            ))}
            {ordersOpen
              ? <button onClick={() => { setMenuOpen(false); openOrderForm() }} className="btn-dark text-center px-5 py-2.5 rounded-full font-semibold">{t.nav.order}</button>
              : <span className="text-center px-5 py-2.5 rounded-full font-semibold bg-gray-200 text-gray-400 cursor-not-allowed">{lang==='bm'?'Ditutup':'Closed'}</span>}
          </div>
        )}
      </nav>

      <main id="top" className="relative z-10">

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
          style={{background:'linear-gradient(160deg,#fef9ec 0%,#fff8e1 50%,#ffefd5 100%)'}}>
          <div className="warm-blob blob-gold w-[500px] h-[500px] absolute top-[-80px] right-[-100px]" style={{zIndex:1}}/>
          <div className="warm-blob blob-cyan w-[380px] h-[380px] absolute bottom-[-60px] left-[-80px]" style={{zIndex:1}}/>
          <div className="warm-blob blob-green w-[300px] h-[300px] absolute top-[40%] left-[5%]" style={{zIndex:1}}/>
          <span className="absolute top-28 left-6 text-8xl opacity-[0.07] animate-sway select-none pointer-events-none" style={{zIndex:1}}>🫘</span>
          <span className="absolute bottom-20 right-8 text-9xl opacity-[0.06] animate-float select-none pointer-events-none" style={{zIndex:1,animationDelay:'1.5s'}}>🫘</span>
          <div className="relative max-w-3xl mx-auto text-center" style={{zIndex:2}}>
            <div className="animate-fade-up mb-5" style={{animationDelay:'0.1s'}}>
              {!logoErr ? <img src="/logo.png" alt="Tofu Hauz" className="h-48 md:h-60 w-auto mx-auto drop-shadow-xl" onError={() => setLogoErr(true)}/>
                : (<><div className="text-7xl mb-3 animate-float">🫘</div><h1 className="brand-name text-8xl md:text-[110px] text-[#2c1a0e] leading-none" style={{textShadow:'4px 4px 0 rgba(0,180,216,0.12)'}}>TOFU HAUZ</h1></>)}
            </div>
            <div className="animate-fade-up mb-5" style={{animationDelay:'0.2s'}}>
              <span className="inline-flex items-center gap-2 bg-[#00b4d8]/10 border border-[#00b4d8]/25 text-[#007fa0] text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">{t.hero.badge}</span>
            </div>
            <p className="animate-fade-up text-xl md:text-2xl text-[#5c3317] font-light mb-3 tracking-wide" style={{animationDelay:'0.3s',fontFamily:'Playfair Display, serif'}}>{t.tagline}</p>
            <p className="animate-fade-up text-[#7a4a28] max-w-xl mx-auto mb-10 leading-relaxed" style={{animationDelay:'0.4s'}}>{t.description}</p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{animationDelay:'0.5s'}}>
              <a href="#menu" className="btn-dark px-9 py-4 rounded-full font-semibold text-base">{t.hero.btn1}</a>
              {ordersOpen
                ? <button onClick={() => openOrderForm()} className="btn-cyan bg-transparent px-9 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {t.hero.btn2}
                  </button>
                : <span className="border-2 border-gray-300 text-gray-400 px-9 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 cursor-not-allowed">🚫 {lang==='bm'?'Pesanan Ditutup':'Orders Closed'}</span>}
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#d4891a]/50" style={{zIndex:2}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
        </section>

        {/* ── Craft divider ── */}
        <div className="craft-divider py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 overflow-hidden">
          {t.craft.map((txt, i) => <span key={i} className="text-[#ffd97a] text-xs font-bold tracking-widest uppercase whitespace-nowrap">{txt}</span>)}
        </div>

        {/* ── Features ── */}
        <section className="py-16 px-6 relative" style={{background:'#fff8f0'}}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.map(f => (
              <div key={f.title} className="warm-card rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-[#2c1a0e] mb-2">{f.title}</h3>
                <p className="text-[#7a4a28] text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Menu ── */}
        <section id="menu" className="py-24 px-6 relative" style={{background:'#fef9ec'}}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(212,137,26,0.1) 0%,transparent 70%)'}}/>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <p className="text-[#00b4d8] text-xs font-bold tracking-widest uppercase mb-3">{t.menuSection.label}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2c1a0e]">{t.menuSection.heading}</h2>
              <div className="section-divider"/>
              <p className="text-[#7a4a28] mt-6 max-w-xl mx-auto">{t.menuSection.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.menu.map(item => (
                <div key={item.name} className="warm-card rounded-2xl overflow-hidden">
                  {item.image && (
                    <div className="w-full bg-amber-50 flex items-center justify-center p-4">
                      <img src={item.image} alt={item.name} className="w-full h-auto object-contain max-h-56"/>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl">{item.emoji}</span>
                      <span className={`menu-badge ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2c1a0e] mb-2">{item.name}</h3>
                    <p className="text-[#7a4a28] text-sm leading-relaxed mb-5">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[#d4891a] font-bold text-lg">{item.price}</span>
                        <p className="text-[10px] text-[#7a4a28]/60 font-medium mt-0.5">{item.weight}</p>
                      </div>
                      {ordersOpen
                        ? <button onClick={() => openOrderForm(item.name)} className="btn-dark text-xs font-bold px-4 py-2 rounded-full">{t.menuSection.orderBtn}</button>
                        : <span className="text-xs font-bold px-4 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed">{lang==='bm'?'Tutup':'Closed'}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-14">
              <p className="text-[#7a4a28] text-sm mb-4">{t.menuSection.cantDecide}</p>
              {ordersOpen
                ? <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-dark inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold">
                    {t.menuSection.chat}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                : <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-gray-200 text-gray-400 cursor-not-allowed">🚫 {lang==='bm'?'Pesanan Ditutup':'Orders Closed'}</span>}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-24 px-6 relative" style={{background:'#fff4e4'}}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="warm-card rounded-3xl h-80 flex items-center justify-center border-2 border-amber-100" style={{background:'linear-gradient(135deg,#fff8e8,#ffefd5)'}}>
                {!logoErr ? <img src="/logo.png" alt="Tofu Hauz" className="h-48 w-auto object-contain p-4" onError={() => setLogoErr(true)}/> : <span className="text-8xl animate-float">🫘</span>}
              </div>
              <div className="absolute -bottom-6 -right-6 warm-card rounded-2xl w-32 h-32 flex flex-col items-center justify-center border border-amber-100" style={{background:'#fff8e8'}}>
                <span className="text-3xl">🫘</span>
                <span className="text-[#d4891a] font-bold text-xs mt-1">EST.</span>
                <span className="brand-name text-xl text-[#2c1a0e]">{BIZ.established}</span>
              </div>
            </div>
            <div>
              <p className="text-[#00b4d8] text-xs font-bold tracking-widest uppercase mb-3">{t.about.label}</p>
              <h2 className="text-4xl font-bold text-[#2c1a0e] mb-6">{t.about.heading}</h2>
              <div className="section-divider" style={{margin:'0 0 24px'}}/>
              <p className="text-[#7a4a28] leading-relaxed mb-4">{t.about.p1}</p>
              <p className="text-[#7a4a28] leading-relaxed mb-6">{t.about.p2}</p>
              <blockquote className="border-l-4 border-[#00b4d8] pl-4 italic text-[#5c3317] text-lg" style={{fontFamily:'Playfair Display, serif'}}>{t.about.quote}</blockquote>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" className="py-24 px-6 relative" style={{background:'#fef9ec'}}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#00b4d8] text-xs font-bold tracking-widest uppercase mb-3">{t.testimonials.label}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2c1a0e]">{t.testimonials.heading}</h2>
              <div className="section-divider"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testimonials.items.map(item => (
                <div key={item.name} className="testimonial-card warm-card rounded-2xl p-8">
                  <div className="flex mb-4">{Array.from({length:item.rating}).map((_,i) => <span key={i} className="text-amber-400 text-lg">★</span>)}</div>
                  <p className="text-[#5c3317] leading-relaxed mb-6 pt-4">{item.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{background:'linear-gradient(135deg,#d4891a,#00b4d8)'}}>
                      {item.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-[#2c1a0e]">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-20 px-6 text-center relative overflow-hidden" style={{background:'#2c1a0e'}}>
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"}}/>
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-5xl mb-6 animate-float">🍽️</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display, serif'}}>{t.cta.heading}</h2>
            <p className="text-amber-200 mb-10 leading-relaxed">{t.cta.sub}</p>
            {!ordersOpen && <p className="text-red-400 font-semibold mb-4 text-sm">🚫 {lang==='bm'?'Pesanan ditutup buat masa ini.':'Orders are currently closed.'}</p>}
            <button onClick={() => ordersOpen && openOrderForm()}
              className={`inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base transition-all ${ordersOpen ? 'bg-[#00b4d8] hover:bg-[#009ab8] text-white hover:-translate-y-1 hover:shadow-xl' : 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-60'}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t.cta.btn}
            </button>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-24 px-6 relative" style={{background:'#fff8f0'}}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#00b4d8] text-xs font-bold tracking-widest uppercase mb-3">{t.contact.label}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2c1a0e]">{t.contact.heading}</h2>
              <div className="section-divider"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="warm-card rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-bold text-[#2c1a0e] mb-3 text-lg">{t.contact.location}</h3>
                <p className="text-[#7a4a28] text-sm leading-relaxed mb-5">{BIZ.address}</p>
                <div className="flex gap-2 justify-center">
                  <a href="https://www.google.com/maps/dir/?api=1&destination=2.8368688,101.8007204" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105" style={{background:'#4285F4'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    Google Maps
                  </a>
                  <a href="https://waze.com/ul?ll=2.8368688,101.8007204&navigate=yes" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105" style={{background:'#33CCFF'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm0 3.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 9c-.6 1.8-2.2 3-4 3s-3.4-1.2-4-3h8z"/></svg>
                    Waze
                  </a>
                </div>
              </div>
              {[
                { icon:'🕐', title:t.contact.hours, lines:[t.contact.weekday, t.contact.weekend] },
                { icon:'📬', title:t.contact.touch, lines:[BIZ.phone, BIZ.email] },
              ].map(b => (
                <div key={b.title} className="warm-card rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-bold text-[#2c1a0e] mb-3 text-lg">{b.title}</h3>
                  {b.lines.map(line => <p key={line} className="text-[#7a4a28] text-sm leading-relaxed">{line}</p>)}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                style={{background:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </a>
              <a href={BIZ.facebook} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                style={{background:'#1877f2'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-10 px-6 text-center text-sm border-t border-amber-900/20" style={{background:'#1a0f05'}}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              {!logoErr ? <img src="/logo.png" alt="Tofu Hauz" className="h-10 w-auto" onError={() => setLogoErr(true)}/> : <span className="text-2xl">🫘</span>}
              <span className="brand-name text-xl text-amber-300">TOFU HAUZ</span>
            </div>
            <p className="text-amber-700/70 mb-1">{t.tagline}</p>
            <p className="text-amber-900/50">{t.footer.rights}</p>
          </div>
        </footer>

      </main>
    </>
  )
}
