/** IOCL MRP circular for LPG cylinders, Hyderabad market, September 2026. */
export const MRP_CIRCULAR = {
  ref: 'SIDO/NDNE/MRP',
  date: '01.09.2026',
  month: 'September 2026',
  market: 'Hyderabad',
  subject: 'MRP of LPG cylinders for the month of September-2026',
  issuedBy: { name: 'Manohar Chinta', designation: 'Manager (LPG-CS)' },
  office: {
    name: 'Secunderabad Indane Divisional Office',
    division: 'Marketing Division, Indian Oil Corporation Limited',
    address: 'Indian Oil Bhavan, Bhavani Nagar, Moosapet, Hyderabad-500018',
    phones: ['040-27686414', '040-27686415', '040-27686411'],
  },
  regdOffice: 'G-9, Ali Yavar Jung Marg, Bandra (East), Mumbai-400051',
}

export interface MrpRow {
  type: string
  /** MRP in ₹ from the standard list. */
  price: number
  /** MRP in ₹ for the XtraTej variant, where the circular lists one. */
  xtraTej?: number
}

/** Both price lists in the circular, merged: standard cylinders plus their XtraTej variants. */
export const MRP_ROWS: MrpRow[] = [
  { type: '14.2 kg', price: 994 },
  { type: '19 kg', price: 2996, xtraTej: 3018.5 },
  { type: '47.5 kg VOT', price: 7485.5, xtraTej: 7541.5 },
  { type: '47.5 kg LOT', price: 7485.5, xtraTej: 7541.5 },
  { type: '425 kg', price: 67018, xtraTej: 67519.5 },
  { type: '19 kg Nano Cut', price: 3173 },
  { type: '47.5 kg Nano Cut', price: 7928 },
  { type: '5 kg FTL (NC)', price: 1950.5 },
  { type: '5 kg FTL (Refill)', price: 829.5 },
  { type: '10 kg Xtralite Now (NC)', price: 4869.27 },
  { type: '10 kg Xtralite Now (Refill)', price: 1683.27 },
]

/** Look up a price in the circular: the standard MRP, or the XtraTej one. */
export const mrp = (type: string, list: 'price' | 'xtraTej' = 'price') => MRP_ROWS.find((r) => r.type === type)![list]!

export const MRP_GLOSSARY = [
  { term: 'NC', meaning: 'New connection: cylinder plus first fill.' },
  { term: 'Refill', meaning: 'Gas only, swapped for your empty cylinder.' },
  { term: 'FTL', meaning: 'Free Trade LPG, sold without a regular domestic connection.' },
  { term: 'VOT / LOT', meaning: 'Vapour off-take / liquid off-take commercial cylinders.' },
  { term: 'XtraTej, Nano Cut', meaning: 'IOCL’s value-added commercial LPG variants.' },
  { term: 'Xtralite Now', meaning: 'Lightweight composite cylinder.' },
]
