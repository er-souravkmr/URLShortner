const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function encodeBase62(num) {
  if (num === 0) return "0";
  
  let str = "";
  let n = BigInt(num); // Convert to BigInt
  
  while (n > 0) {
    str = BASE62[Number(n % 62n)] + str;
    n = n / 62n;
  }
  return str;
}

