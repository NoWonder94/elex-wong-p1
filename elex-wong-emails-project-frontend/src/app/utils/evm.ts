/**
 * From: 0xba1ddcb94b3f8fe5d1c0b2623cf221e099f485d1
 * To: 0xba1d...85d1
 */
export const shortEVMAddress = (address: string): string => {
  return address.substring(0, 6) + "..." + address.substring(address.length - 4);
}