export const STEP_LABELS = ['Connection', 'Cylinder', 'Address', 'Slot', 'Pay', 'Done'] as const

export const COMMENTARY: { title: string; body: string }[] = [
  {
    title: 'No login, no typing',
    body: 'The consumer’s Indane connection is already linked: consumer number, LPG ID, distributor and last refill. Eligibility is checked instantly.',
  },
  {
    title: 'The whole Indane range',
    body: '14.2 kg, 5 kg, FTL “Chhotu” and 19 kg commercial. Quantity follows SBC/DBC rules automatically, so distributors get no invalid orders.',
  },
  {
    title: 'Registered address only',
    body: 'Refills go to the address on record with the distributor, which keeps things compliant and speeds up delivery routing.',
  },
  {
    title: 'Slots, not guesswork',
    body: 'Consumers pick a delivery window. Distributors see demand by slot and plan delivery-person routes the evening before.',
  },
  {
    title: 'UPI-first checkout',
    body: 'A transparent RSP breakdown, digital payment or cash on delivery. DBTL subsidy info is shown upfront.',
  },
  {
    title: 'DAC and digital cash memo',
    body: 'A booking reference, a DAC for secure handover, an SMS confirmation and a printable cash memo, all in about 30 seconds.',
  },
]
