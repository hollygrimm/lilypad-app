import LilypadStorageABI from './abis/LilypadStorage.json'
import LilypadPaymentsABI from './abis/LilypadPayments.json'

export const CONTRACTS = {
  STORAGE: {
    address: '0x8d06cEB457d336c6c938FCe9C4862615a4F79af0',
    abi: LilypadStorageABI
  },
  PAYMENTS: {
    address: '0xdE7CEa09A23e7Aa4980B95F69B8912F39A0e323A',
    abi: LilypadPaymentsABI
  }
} as const; 