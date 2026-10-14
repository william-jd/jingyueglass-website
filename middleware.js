// Vercel Edge Middleware for Content Negotiation & AI Agent Optimization
// Directs AI Search bots, LLM crawlers, and HTTP clients requesting Markdown to clean, structured markdown bodies

export const config = {
  matcher: [
    '/((?!_next|assets|favicon.ico|sitemap.xml|robots.txt|llms.txt|llms-full.txt|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.svg).*)',
  ],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\\.html$/, '');
  const acceptHeader = request.headers.get('accept') || '';

  // Check if client explicitly requests Markdown or is an AI search crawler requesting markdown format
  const prefersMarkdown =
    acceptHeader.includes('text/markdown') ||
    url.searchParams.get('format') === 'markdown' ||
    url.searchParams.get('format') === 'md';

  if (prefersMarkdown) {
    // 1. Wine Glasses
    if (path === '/wine-glasses') {
      return markdownResponse(`# Wholesale Wine Glasses & Custom Stemware — Jingyue Glass Factory
> OEM/ODM Lead-Free Crystal Wine Glasses, Burgundy/Bordeaux Bowls & Champagne Flutes

## Sourcing Summary
- **Factory**: Wuhan Jingyueda Household Products Co., Ltd. (Jingyue Glass), Wuhan, China
- **Material**: 100% Lead-Free Crystal Glass (COE compliant, high clarity potassium glass)
- **Durability**: 1,000+ Industrial Dishwasher Cycles (resists alkaline clouding)
- **Rim**: CO2 Laser Cold-Cut Thin Rim (1.0–1.2mm, seamless chip resistance)
- **Stem**: Monobloc One-Piece Pulled Stem (zero weld lines, high torsional strength)
- **Standard In-Stock MOQ**: 48 pcs | **Laser Logo MOQ**: 48 pcs (1–3d Proofing)
- **Indicative FOB Price**: About $0.49 – $1.45 / pc
- **Compliance**: US FDA CPG 545.400 / EU LFGB / CA Prop 65 (PTC Certified)
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 2. Wholesale Whiskey Glasses
    if (path === '/wholesale-whiskey-glasses') {
      return markdownResponse(`# Wholesale Whiskey Glasses & Custom Rocks Tumblers — Jingyue Glass Factory
> Heavy Base Lowball Tumblers, Ergonomic Cigar Glasses, Rotating Glasses & Old Fashioned

## Sourcing Summary
- **Factory**: Wuhan Jingyueda Household Products Co., Ltd., Wuhan, China
- **Styles**: Heavy base rocks (250–350ml), cigar rest, rotating base, diamond carved
- **Standard In-Stock MOQ**: 48 pcs | **Laser Logo MOQ**: 48 pcs (1–3d Proofing)
- **Indicative FOB Price**: About $0.55 – $1.85 / pc
- **Branding**: CO2 Laser engraving, UV print (100 pcs), 580°C fired decal (500 pcs)
- **Packaging**: 5-layer drop-tested master cartons, EVA foam gift boxes, pine wooden boxes
- **Compliance**: FDA / LFGB / CA Prop 65 (PTC Report PTC24100807301C-EN01)
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 3. Beer Glasses & Mugs
    if (path === '/beer-glasses') {
      return markdownResponse(`# Wholesale Commercial Beer Glasses & Craft Beer Mugs — Jingyue Glass Factory
> Pub Pints (16oz/20oz), Dimpled Beer Steins, Wheat Beer & IPA Craft Glasses

## Sourcing Summary
- **Styles**: Classic British Nonic pint, American shaker pint, German dimpled stein, craft tulip
- **Standard In-Stock MOQ**: 48 pcs | **Laser Logo MOQ**: 48 pcs (1–3d Proofing)
- **Indicative FOB Price**: About $0.45 – $1.60 / pc
- **Durability**: Commercial bar grade, thick base, 1,000+ dishwasher cycles
- **Branding**: Full-color silk screen, frosted decal, bottom laser etching
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 4. Coffee & Tea Mugs (Borosilicate)
    if (path === '/coffee-tea-mugs') {
      return markdownResponse(`# Wholesale Borosilicate Double-Wall Coffee & Tea Mugs — Jingyue Glass Factory
> High-Borosilicate 3.3 Insulating Glass Cups, Dried-Flower Mugs & Heat-Resistant Drinkware

## Sourcing Summary
- **Material**: 100% High-Borosilicate 3.3 Glass (Thermal shock ΔT ≥ 120°C, microwave safe)
- **Styles**: Double-wall insulating cups (80ml–450ml), dried-flower floating mugs, bamboo lid mugs
- **Standard In-Stock MOQ**: 100 pcs | **Custom Laser Logo MOQ**: 100 pcs (1–3d Proofing)
- **Indicative FOB Price**: About $0.65 – $2.20 / pc
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 5. Wine Decanters
    if (path === '/wine-decanters') {
      return markdownResponse(`# Wholesale Hand-Blown Wine Decanters & Aerators — Jingyue Glass Factory
> Artisan Lead-Free Crystal U-Shape, Swan, Snail & Modern Aerating Decanters

## Sourcing Summary
- **Craft**: 100% Hand-blown artisan lead-free crystal glass with cold-cut slant spout
- **Capacities**: 1,000ml – 1,800ml with broad aeration base
- **Standard In-Stock MOQ**: 48 pcs | **Laser Logo MOQ**: 96 pcs
- **Indicative FOB Price**: About $3.20 – $8.50 / pc
- **Packaging**: Custom ISTA-1A drop-tested molded EVA gift boxes
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 6. Tumblers & Highballs
    if (path === '/tumblers-highballs') {
      return markdownResponse(`# Wholesale Bar Highball & Everyday Tumbler Glasses — Jingyue Glass Factory
> Commercial Collins Glasses, Heavy Base Water Tumblers & Stackable Banquet Glassware

## Sourcing Summary
- **Capacities**: 250ml, 330ml, 400ml, 480ml
- **Standard In-Stock MOQ**: 48 pcs | **Laser Logo MOQ**: 48 pcs
- **Indicative FOB Price**: About $0.38 – $1.10 / pc
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 7. Corporate Holiday Glassware Gifts
    if (path === '/corporate-holiday-glassware-gifts') {
      return markdownResponse(`# Corporate Holiday & Year-End Custom Glassware Gift Sets — Jingyue Glass
> Factory-Direct Custom Engraved Whiskey Stones & Glass Sets for Year-End Corporate Gifting

## Featured Holiday Gift Box Models
- **Model XZM4008-1 (Volume Classic)**: 2x 300ml twisted crystal rocks glasses + 6x natural granite stones + ice tongs + velvet pouch + matte black magnetic flip hard box with custom EVA foam. In-stock MOQ: 24 sets. FOB Price range: About $3.80 – $6.00 / set.
- **Model XZM015 (Executive Luxury)**: 2x 310ml diamond-faceted crystal rock glasses + 8x natural granite stones + silicone-tipped tongs + velvet pouch + burnished pine wooden box with antique bronze latch. Dual laser branding (box lid + glasses). In-stock MOQ: 24 sets. FOB Price range: About $5.00 – $7.00 / set.
- **Lead Time**: 1–3 Day Fast Sample Proofing; 3–7 Day Bulk Dispatch (24–300 sets).
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 8. Luxury Wedding Event Flutes
    if (path === '/luxury-wedding-event-champagne-flutes') {
      return markdownResponse(`# Luxury Wedding Toasting Flutes & Event Glassware Gift Sets — Jingyue Glass
> Factory-Direct Custom Engraved Crystal Flutes & Wine Glass Wooden Gift Sets

## Featured Wedding & Event Gift Box Models
- **Model xzm132 (In-Stock Champagne Flute Set)**: 2x lead-free crystal champagne flutes + heart-shaped wine stopper + multi-tool corkscrew + burnished solid pine wooden box. MOQ: 24 sets. FOB Price range: About $8.00 – $15.00 / set.
- **Model xzm063 (In-Stock Stemless Wine Set)**: 2x 310ml stemless crystal egg wine glasses + complete 5-piece sommelier tool kit + burnished pine wooden box. MOQ: 24 sets. FOB Price range: About $6.00 – $10.00 / set.
- **Model xzm130 (Luxury Lacquered Box Flute Set)**: 2x cylindrical crystal flutes (or optional 24K gold-rimmed tulip flutes) + high-gloss piano lacquer / matte spray painted solid wood box + stationery ribbon card. MOQ: 200 sets. FOB Price range: About $11.00 – $25.00 / set.
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 9. Gift Sets & Drinkware Sets
    if (path === '/gift-sets' || path === '/drinkware-sets' || path === '/whiskey-decanter-gift-sets') {
      return markdownResponse(`# Wholesale Glassware Gift Sets & Decanter Barware Suites — Jingyue Glass Factory
> Custom Branded Decanter + Rocks Glass Gift Sets, Cocktail Sets & Pine Wood Boxes

## Sourcing Summary
- **In-Stock Set MOQ**: 20–30 sets | **Custom Wooden Box Logo**: from 24 sets
- **Indicative FOB Price**: About $3.80 – $18.50 / set depending on components
- **Customization**: Laser engraving on wood box and glasses, custom EVA cutouts, color sleeves
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 10. Smoked Cocktail Mixology Sets
    if (path === '/smoked-cocktail-mixology-sets') {
      return markdownResponse(`# Wholesale Cocktail Smoker Kits & Mixology Gift Sets — Jingyue Glass Factory
> 8 Mixology Configurations, Solid Hardwood Smoker Chimneys, Triple-Jet Torches & Wood Chips

## Sourcing Summary
- **MOQ**: 30 sets (In-Stock) | 100 sets (Custom Laser Engraving)
- **Indicative FOB Price**: About $4.50 – $12.00 / set
- **Inclusions**: Oak/Beech smoker cap, 4 flavor wood chips, torch, stainless mesh, gift box
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 11. Restaurant & Hospitality Wholesale
    if (path === '/restaurant-bar-glassware-wholesale' || path === '/wedding-event-venue-glassware-supply') {
      return markdownResponse(`# Commercial Restaurant, Bar & Event Glassware Supply — Jingyue Glass Factory
> High-Turnover Commercial Stemware, Heavy Beer Mugs, Highballs & Banquet Glassware

## Hospitality Supply Terms
- **Assortments**: Complete 100-seat opening glassware packages and replacement replenishments
- **Durability**: 1,000+ industrial dishwashing cycles, thermal shock tested
- **MOQ**: Flexible mixed-SKU container ordering from 48 pcs per SKU
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 12. Custom Logo & OEM Guides
    if (path === '/custom-logo-glassware' || path === '/glassware-oem-manufacturer-china' || path === '/custom-glassware-sample-approval-process') {
      return markdownResponse(`# Custom Logo Glassware & OEM Manufacturing SOP — Jingyue Glass Factory
> Laser Engraving, UV Printing, 580°C Decal Firing & Private Custom Mold Development

## Customization Routes & MOQs
- **Laser Engraving**: MOQ 48 pcs (1–3 days fast proofing)
- **UV Digital Color Print**: MOQ 100 pcs (multi-color gradient branding)
- **580°C Fired Enamel Decal**: MOQ 500 pcs (scratch-proof, permanent commercial grade)
- **Private OEM Tooling**: MOQ 3,000 pcs (100% mold fee refunded upon volume milestone)
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 13. Quality Inspection & Compliance Guides
    if (path === '/glassware-inspection-aql-standards-guide' || path === '/eu-ppwr-glassware-packaging-compliance-guide' || path === '/california-prop-65-glassware-compliance-guide') {
      return markdownResponse(`# Glassware Quality Inspection, AQL Standards & Compliance Guide — Jingyue Glass
> AQL 2.5 Major Defect Standards, FDA CPG 545.400, EU LFGB §30/31 & EU PPWR Packaging Rules

## Compliance & QC Baselines
- **AQL Standards**: Critical: 0 | Major: 2.5 (bubbles > 1.5mm, rim chips) | Minor: 4.0
- **Lab Test Reports**: US FDA PTC24100807301C-EN01 / EU LFGB PTC23022404104C-EN01V01
- **Packaging Compliance**: Molded pulp inserts & FSC cardboard for EU PPWR zero-plastic rules
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 14. Lead Times & Shipping Calculator
    if (path === '/glassware-lead-time-production-schedule' || path === '/container-cbm-calculator') {
      return markdownResponse(`# Glassware Production Lead Times & CBM Shipping Calculator — Jingyue Glass
> Sample Proofing in 1–3 Days, In-Stock Dispatch 3–7 Days, Mass Production 25–35 Days

## Production & Freight Schedules
- **Sample Time**: 1–3 working days (laser logo in-stock) / 7–10 days (custom decal/box)
- **Mass Production**: 25–35 days after golden sample sign-off
- **CBM Planning**: 20GP (~28 CBM / 25,000–35,000 pcs), 40HQ (~68 CBM / 60,000–80,000 pcs)
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 15. Pricing, MOQ & Catalog Guides
    if (path === '/wholesale-glassware-pricing-guide' || path === '/glassware-product-catalog' || path === '/glassware-moq-guide' || path === '/custom-glassware-quote-checklist') {
      return markdownResponse(`# Master Glassware Catalog, Wholesale Pricing & MOQ Guide — Jingyue Glass
> Direct B2B Factory Tiered Pricing, In-Stock Low MOQ Matrix & Quote Checklist

## Master Tiered Pricing & MOQ Matrix (2026/2027)
- **Standard Wine Glasses**: MOQ 48 pcs | About $0.49 – $1.45 / pc
- **Whiskey Rocks Glasses**: MOQ 48 pcs | About $0.55 – $1.85 / pc
- **Beer Glasses & Pints**: MOQ 48 pcs | About $0.45 – $1.60 / pc
- **High-Borosilicate Mugs**: MOQ 100 pcs | About $0.65 – $2.20 / pc
- **Decanters & Aerators**: MOQ 48 pcs | About $3.20 – $8.50 / pc
- **Whiskey Stone Gift Sets**: MOQ 24 sets | About $3.80 – $7.00 / set
- **Wedding Champagne Sets**: MOQ 24 sets | About $8.00 – $25.00 / set
- **Inquiry**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // 16. Factory About & Evidence Center
    if (path === '/about') {
      return markdownResponse(`# Factory Evidence & Compliance Center — Wuhan Jingyueda Household Products
> 10,000+ sqm Production Facility, 50,000,000 pcs Annual Output & TÜV Rheinland Verified

## Factory Profile & Trust Dossier
- **Company**: Wuhan Jingyueda Household Products Co., Ltd. (Jingyue Glass / 欣华行玻璃)
- **Location**: Wuhan, Hubei Province, China (Central China export hub)
- **Facility**: 10,000+ square meters, 9 core manufacturing workshop sections
- **Annual Capacity**: 50,000,000+ pieces exported to 50+ countries
- **Certifications**: ISO9001, FDA Lead/Cadmium Pass, LFGB Food Grade, BSCI Social Audit
- **Official Contact**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
    }

    // Default Comprehensive Markdown body (for Home / other routes)
    return markdownResponse(`# Wuhan Jingyueda Household Products Co., Ltd. (Jingyue Glass)
> Official AI-Readable Export Profile & B2B Glassware Manufacturer Knowledge Base

- **Website**: https://www.jingyueglass.com/
- **Main Catalog**: https://www.jingyueglass.com/glassware-product-catalog
- **Inquiry Checklist**: https://www.jingyueglass.com/custom-glassware-quote-checklist
- **AI Full Technical Dossier**: https://www.jingyueglass.com/llms-full.txt
- **Official Contact**: sales@jingyueglass.com | WhatsApp: +86 132 5662 7201
`);
  }
}

function markdownResponse(content) {
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
