import type { Segment } from './cylinders'

export const STEP_LABELS: Record<Segment, readonly string[]> = {
  household: ['Connection', 'Cylinder', 'Address', 'Slot', 'Pay', 'Done'],
  business: ['Account', 'Bulk order', 'Address', 'Schedule', 'Pay', 'Done'],
}

type Line = { title: string; body: string }

export const COMMENTARY: Record<Segment, Line[]> = {
  household: [
    {
      title: 'No login, no typing',
      body: 'The consumer’s Indane connection is already linked: consumer number, LPG ID, distributor and last refill. Eligibility is checked instantly.',
    },
    {
      title: 'The household range',
      body: 'Every cylinder in IOCL’s Hyderabad price list: domestic, FTL and commercial, including XtraTej and Nano Cut. Quantity follows SBC/DBC rules automatically, so distributors get no invalid orders.',
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
      body: 'A transparent MRP breakdown, digital payment or cash on delivery. DBTL subsidy info is shown upfront.',
    },
    {
      title: 'DAC and digital cash memo',
      body: 'A booking reference, a DAC for secure handover, an SMS confirmation and a printable cash memo, all in about 30 seconds.',
    },
  ],
  business: [
    {
      title: 'Commercial account, ready to order',
      body: 'Restaurants, hotels and caterers order against their commercial consumer number with GSTIN on file. No refill interval applies to commercial LPG.',
    },
    {
      title: 'Bulk in one go',
      body: 'Mix 19 kg and 47.5 kg cylinders in a single order. Volume discounts unlock automatically at 10, 25 and 50 cylinders.',
    },
    {
      title: 'Delivered to the business',
      body: 'The order goes to the registered business address, so the distributor can plan a single bulk drop instead of many trips.',
    },
    {
      title: 'Set it and forget it',
      body: 'Pick a delivery window and make it recurring (weekly, fortnightly or monthly), so the kitchen never runs out mid-service.',
    },
    {
      title: 'Business-grade checkout',
      body: 'Net banking, UPI or card, with an 18% GST breakdown for input tax credit and the volume discount applied upfront.',
    },
    {
      title: 'GST tax invoice',
      body: 'A bulk order reference, a DAC for the handover, an SMS confirmation and a GST tax invoice ready for the accounts team.',
    },
  ],
}
