export type CylinderVariant = 'domestic14' | 'domestic5' | 'ftl5' | 'commercial19' | 'commercial47'

export type Segment = 'household' | 'business'

export interface Cylinder {
  id: CylinderVariant
  name: string
  weight: string
  category: 'Domestic' | 'FTL' | 'Commercial'
  segment: Segment
  /** Illustrative RSP in ₹, incl. GST. Not an official price. */
  price: number
  /** GST rate included in the RSP. */
  gstRate: number
  useCase: string
  /** Household: per-booking limit by connection type. Business: per-order bulk limit. */
  maxQty: { SBC: number; DBC: number; bulk: number }
}

export const CYLINDERS: Cylinder[] = [
  {
    id: 'domestic14',
    name: '14.2 kg Domestic',
    weight: '14.2 kg',
    category: 'Domestic',
    segment: 'household',
    price: 853,
    gstRate: 0.05,
    useCase: 'The everyday kitchen refill for most households',
    maxQty: { SBC: 1, DBC: 2, bulk: 0 },
  },
  {
    id: 'domestic5',
    name: '5 kg Domestic',
    weight: '5 kg',
    category: 'Domestic',
    segment: 'household',
    price: 318,
    gstRate: 0.05,
    useCase: 'Smaller families and hilly or remote areas',
    maxQty: { SBC: 1, DBC: 2, bulk: 0 },
  },
  {
    id: 'ftl5',
    name: '5 kg FTL "Chhotu"',
    weight: '5 kg',
    category: 'FTL',
    segment: 'household',
    price: 450,
    gstRate: 0.18,
    useCase: 'Free Trade LPG for students and migrant workers',
    maxQty: { SBC: 2, DBC: 2, bulk: 0 },
  },
  {
    id: 'commercial19',
    name: '19 kg Commercial',
    weight: '19 kg',
    category: 'Commercial',
    segment: 'business',
    price: 1720,
    gstRate: 0.18,
    useCase: 'Restaurants, dhabas, canteens and caterers',
    maxQty: { SBC: 0, DBC: 0, bulk: 100 },
  },
  {
    id: 'commercial47',
    name: '47.5 kg Commercial',
    weight: '47.5 kg',
    category: 'Commercial',
    segment: 'business',
    price: 4290,
    gstRate: 0.18,
    useCase: 'Hotels, industrial canteens and large kitchens',
    maxQty: { SBC: 0, DBC: 0, bulk: 50 },
  },
]

export const HOUSEHOLD_CYLINDERS = CYLINDERS.filter((c) => c.segment === 'household')
export const BUSINESS_CYLINDERS = CYLINDERS.filter((c) => c.segment === 'business')

export const getCylinder = (id: CylinderVariant) => CYLINDERS.find((c) => c.id === id)!
