import crypto from "crypto";

export function verifySignature(payload: string, signature: string) {
  const secret = process.env.CHARGILY_SECRET_KEY as string;
  const computedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return computedSignature === signature;
}
