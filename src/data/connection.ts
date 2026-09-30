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
  consumerName: 'Srinivas',
  consumerNo: '100245',
  lpgId: '71234567890123456',
  distributor: 'Shree Sai Indane Gramin Vitrak',
  distributorCode: 'IND-HYD-0457',
  connectionType: 'DBC',
  registeredMobile: '••••••4321',
  address: 'Petrobazaar, Miyapur',
  city: 'Hyderabad, Telangana',
  dbtlLinked: true,
}

/** Days since last refill in the normal and "not eligible" demo scenarios. */
export const LAST_REFILL_DAYS = { eligible: 28, notEligible: 5 }

/** Illustrative minimum gap between refill bookings. Verify against current IOCL norms. */
export const REFILL_INTERVAL_DAYS = 15

export interface BusinessAccount {
  businessName: string
  contactPerson: string
  gstin: string
  commercialConsumerNo: string
  category: string
  distributor: string
  distributorCode: string
  registeredMobile: string
  address: string
  city: string
}

/** Sample commercial (non-domestic) account used in the business demo flow. */
export const SAMPLE_BUSINESS: BusinessAccount = {
  businessName: 'Miyapur Food Court',
  contactPerson: SAMPLE_CONNECTION.consumerName,
  gstin: '36ABCDE1234F1Z5',
  commercialConsumerNo: 'C-300871',
  category: 'Restaurant / Food service',
  distributor: SAMPLE_CONNECTION.distributor,
  distributorCode: SAMPLE_CONNECTION.distributorCode,
  registeredMobile: SAMPLE_CONNECTION.registeredMobile,
  address: SAMPLE_CONNECTION.address,
  city: SAMPLE_CONNECTION.city,
}
