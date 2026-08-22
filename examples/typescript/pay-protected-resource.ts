/**
 * Illustrative AIFP-2 request loop using the x402 v2 compatibility profile.
 * Use the released AiFinPay SDK for production signing and route validation.
 */
const resource = "https://api.example.com/v1/report";

const first = await fetch(resource);
if (first.status !== 402) {
  console.log(await first.text());
  process.exit(0);
}

const encoded = first.headers.get("PAYMENT-REQUIRED");
if (!encoded) throw new Error("402 response has no PAYMENT-REQUIRED header");

const requirements = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));

// A production client validates resource, expiry, network, asset, atomic amount,
// payee, fee_bps=0, trusted deployment pin and wallet policy before signing.
const paymentSignature = await localWalletSign(requirements);

const paid = await fetch(resource, {
  headers: { "PAYMENT-SIGNATURE": paymentSignature },
});

if (!paid.ok) throw new Error(`paid retry failed: ${paid.status}`);
console.log(await paid.json());

async function localWalletSign(_requirements: unknown): Promise<string> {
  throw new Error("Connect this example to the AiFinPay SDK local signer");
}
