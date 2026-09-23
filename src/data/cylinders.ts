export type CylinderVariant = 'domestic14' | 'domestic5' | 'ftl5' | 'commercial19'

export interface Cylinder {
  id: CylinderVariant
  name: string
  weight: string
  category: 'Domestic' | 'FTL' | 'Commercial'
  /** Illustrative RSP in ₹, incl. GST. Not an official price. */
  price: number
  useCase: string
  maxQty: { SBC: number; DBC: number }
}

export const CYLINDERS: Cylinder[] = [
  {
    id: 'domestic14',
    name: '14.2 kg Domestic',
    weight: '14.2 kg',
    category: 'Domestic',
    price: 853,
    useCase: 'The everyday kitchen refill for most households',
    maxQty: { SBC: 1, DBC: 2 },
  },
  {
    id: 'domestic5',
    name: '5 kg Domestic',
    weight: '5 kg',
    category: 'Domestic',
    price: 318,
    useCase: 'Smaller families and hilly or remote areas',
    maxQty: { SBC: 1, DBC: 2 },
  },
  {
    id: 'ftl5',
    name: '5 kg FTL "Chhotu"',
    weight: '5 kg',
    category: 'FTL',
    price: 450,
    useCase: 'Free Trade LPG for students and migrant workers',
    maxQty: { SBC: 2, DBC: 2 },
  },
  {
    id: 'commercial19',
    name: '19 kg Commercial',
    weight: '19 kg',
    category: 'Commercial',
    price: 1720,
    useCase: 'Restaurants, dhabas, canteens and caterers',
    maxQty: { SBC: 2, DBC: 2 },
  },
]

export const getCylinder = (id: CylinderVariant) => CYLINDERS.find((c) => c.id === id)!
