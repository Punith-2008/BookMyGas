export type ConnectionType = 'SBC' | 'DBC'

export interface Connection {
  consumerName: string
  consumerNo: string
  lpgId: string
  distributor: string
  distributorCode: string
  connectionType: ConnectionType
  registeredMobile: string
  address: string
  city: string
  dbtlLinked: boolean
}

/** Fictional sample consumer. Any resemblance to a real connection is coincidental. */
export const SAMPLE_CONNECTION: Connection = {
  consumerName: 'Priya Sharma',
  consumerNo: '100245',
  lpgId: '71234567890123456',
  distributor: 'Shree Sai Indane Gramin Vitrak',
  distributorCode: 'IND-PUN-0457',
  connectionType: 'DBC',
  registeredMobile: '••••••4321',
  address: 'Flat 302, Sai Krupa Residency, Baner Road, Baner',
  city: 'Pune, Maharashtra 411045',
  dbtlLinked: true,
}

/** Days since last refill in the normal and "not eligible" demo scenarios. */
export const LAST_REFILL_DAYS = { eligible: 28, notEligible: 5 }

/** Illustrative minimum gap between refill bookings. Verify against current IOCL norms. */
export const REFILL_INTERVAL_DAYS = 15
