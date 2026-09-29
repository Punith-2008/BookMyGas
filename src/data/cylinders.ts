import { mrp } from './mrp'

export type CylinderVariant =
  | 'domestic14'
  | 'xtralite10'
  | 'xtralite10NC'
  | 'ftl5'
  | 'ftl5NC'
  | 'commercial19'
  | 'commercial47'
  | 'commercial47LOT'
  | 'commercial425'
  | 'xtratej19'
  | 'xtratej47'
  | 'xtratej47LOT'
  | 'xtratej425'
  | 'nanocut19'
  | 'nanocut47'

/** Which illustration a cylinder is drawn with. */
export type CylinderLook = 'domestic14' | 'xtralite10' | 'ftl5' | 'commercial19' | 'commercial47' | 'commercial425'

export type Segment = 'household' | 'business'

export const CYLINDER_GROUPS = ['Domestic', 'Free Trade LPG', 'Commercial', 'Commercial · XtraTej', 'Commercial · Nano Cut'] as const

export interface Cylinder {
  id: CylinderVariant
  name: string
  weight: string
  category: 'Domestic' | 'FTL' | 'Commercial'
  group: (typeof CYLINDER_GROUPS)[number]
  look: CylinderLook
  /** New connection (cylinder plus first fill) rather than a refill. */
  nc?: boolean
  /** IOCL MRP in ₹ (Hyderabad, September 2026), incl. GST. */
  price: number
  /** GST rate included in the MRP. */
  gstRate: number
  useCase: string
  /** Household: per-booking limit by connection type. Business: per-order bulk limit (0 = not in bulk orders). */
  maxQty: { SBC: number; DBC: number; bulk: number }
}

const domestic = { category: 'Domestic', group: 'Domestic', gstRate: 0.05 } as const
const ftl = { category: 'FTL', group: 'Free Trade LPG', look: 'ftl5', weight: '5 kg', gstRate: 0.18 } as const
const commercial = { category: 'Commercial', gstRate: 0.18 } as const
const one = { SBC: 1, DBC: 1, bulk: 0 }

export const CYLINDERS: Cylinder[] = [
  {
    ...domestic,
    id: 'domestic14',
    name: '14.2 kg Domestic',
    weight: '14.2 kg',
    look: 'domestic14',
    price: mrp('14.2 kg'),
    useCase: 'The everyday kitchen refill for most households',
    maxQty: { SBC: 1, DBC: 2, bulk: 0 },
  },
  {
    ...domestic,
    id: 'xtralite10',
    name: '10 kg Xtralite Now',
    weight: '10 kg',
    look: 'xtralite10',
    price: mrp('10 kg Xtralite Now (Refill)'),
    useCase: 'Lightweight composite cylinder, easy to carry',
    maxQty: { SBC: 1, DBC: 2, bulk: 0 },
  },
  {
    ...domestic,
    id: 'xtralite10NC',
    name: '10 kg Xtralite Now (New connection)',
    weight: '10 kg',
    look: 'xtralite10',
    nc: true,
    price: mrp('10 kg Xtralite Now (NC)'),
    useCase: 'A new Xtralite Now composite cylinder with its first fill',
    maxQty: one,
  },
  {
    ...ftl,
    id: 'ftl5',
    name: '5 kg FTL "Chhotu"',
    price: mrp('5 kg FTL (Refill)'),
    useCase: 'Free Trade LPG for students and migrant workers',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
  {
    ...ftl,
    id: 'ftl5NC',
    name: '5 kg FTL (New connection)',
    nc: true,
    price: mrp('5 kg FTL (NC)'),
    useCase: 'Your own 5 kg FTL cylinder with its first fill',
    maxQty: one,
  },
  {
    ...commercial,
    group: 'Commercial',
    id: 'commercial19',
    name: '19 kg Commercial',
    weight: '19 kg',
    look: 'commercial19',
    price: mrp('19 kg'),
    useCase: 'Restaurants, dhabas, canteens and caterers',
    maxQty: { SBC: 2, DBC: 2, bulk: 100 },
  },
  {
    ...commercial,
    group: 'Commercial',
    id: 'commercial47',
    name: '47.5 kg VOT Commercial',
    weight: '47.5 kg',
    look: 'commercial47',
    price: mrp('47.5 kg VOT'),
    useCase: 'Hotels, industrial canteens and large kitchens',
    maxQty: { SBC: 2, DBC: 2, bulk: 50 },
  },
  {
    ...commercial,
    group: 'Commercial',
    id: 'commercial47LOT',
    name: '47.5 kg LOT Commercial',
    weight: '47.5 kg',
    look: 'commercial47',
    price: mrp('47.5 kg LOT'),
    useCase: 'Liquid off-take for vaporiser-fed industrial setups',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
  {
    ...commercial,
    group: 'Commercial',
    id: 'commercial425',
    name: '425 kg Commercial',
    weight: '425 kg',
    look: 'commercial425',
    price: mrp('425 kg'),
    useCase: 'Jumbo cylinder for factories and bulk users',
    maxQty: one,
  },
  {
    ...commercial,
    group: 'Commercial · XtraTej',
    id: 'xtratej19',
    name: '19 kg XtraTej',
    weight: '19 kg',
    look: 'commercial19',
    price: mrp('19 kg', 'xtraTej'),
    useCase: 'IOCL’s value-added commercial LPG for busy kitchens',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
  {
    ...commercial,
    group: 'Commercial · XtraTej',
    id: 'xtratej47',
    name: '47.5 kg VOT XtraTej',
    weight: '47.5 kg',
    look: 'commercial47',
    price: mrp('47.5 kg VOT', 'xtraTej'),
    useCase: 'XtraTej in the 47.5 kg vapour off-take cylinder',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
  {
    ...commercial,
    group: 'Commercial · XtraTej',
    id: 'xtratej47LOT',
    name: '47.5 kg LOT XtraTej',
    weight: '47.5 kg',
    look: 'commercial47',
    price: mrp('47.5 kg LOT', 'xtraTej'),
    useCase: 'XtraTej in the 47.5 kg liquid off-take cylinder',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
  {
    ...commercial,
    group: 'Commercial · XtraTej',
    id: 'xtratej425',
    name: '425 kg XtraTej',
    weight: '425 kg',
    look: 'commercial425',
    price: mrp('425 kg', 'xtraTej'),
    useCase: 'XtraTej in the 425 kg jumbo cylinder',
    maxQty: one,
  },
  {
    ...commercial,
    group: 'Commercial · Nano Cut',
    id: 'nanocut19',
    name: '19 kg Nano Cut',
    weight: '19 kg',
    look: 'commercial19',
    price: mrp('19 kg Nano Cut'),
    useCase: 'IOCL’s Nano Cut commercial LPG in the 19 kg cylinder',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
  {
    ...commercial,
    group: 'Commercial · Nano Cut',
    id: 'nanocut47',
    name: '47.5 kg Nano Cut',
    weight: '47.5 kg',
    look: 'commercial47',
    price: mrp('47.5 kg Nano Cut'),
    useCase: 'IOCL’s Nano Cut commercial LPG in the 47.5 kg cylinder',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
]

/** The household picker lists every cylinder in the IOCL circular. */
export const HOUSEHOLD_CYLINDERS = CYLINDERS
export const BUSINESS_CYLINDERS = CYLINDERS.filter((c) => c.maxQty.bulk > 0)

export const getCylinder = (id: CylinderVariant) => CYLINDERS.find((c) => c.id === id)!
