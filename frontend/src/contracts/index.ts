import _addresses from './addresses.json';
import woteAbi from './abis/wote.json';

export const abis = {
  wote: woteAbi as any,
};

export const addresses: {[key: string]: `0x${string}`} = _addresses as any;
