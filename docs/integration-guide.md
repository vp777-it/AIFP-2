# Integration Guide

## Resource server

1. Describe the protected method/resource and atomic price.
2. Return HTTP `402` with one or more accepted payment options.
3. Bind a short-lived payment requirement to method, URL/scope, amount, payee and nonce.
4. On retry, verify the payment signature or AIFP receipt.
5. Grant the exact purchased scope and record idempotent consumption.

## Agent client

```ts
const initial = await fetch(resource);
if (initial.status !== 402) return initial;

const required = decodePaymentRequired(initial.headers.get("PAYMENT-REQUIRED"));
const accepted = policy.select(required.accepts);
const signature = await wallet.signPayment(accepted); // local signer

return fetch(resource, {
  headers: { "PAYMENT-SIGNATURE": encode(signature) }
});
```

The example is conceptual. Production clients must validate trusted deployment pins, decimals, expiry and resource binding before signing.

## MCP tool

```text
tools/call
→ payment_challenge
→ choose quote/payment option
→ policy approval + local signature
→ verify/settle
→ signed receipt
→ retry tools/call with Payment-Receipt
→ tool result
```

MCP servers should return structured errors rather than printing secrets or payment material to stderr.

## Native AiFinPay API

- `GET /v1/settlement/routes`
- `POST /v1/settlement/invoice`
- `POST /v1/settlement/confirm`
- `GET /v1/settlement/{payment_id}`

An invoice must persist into a durable state consumed by confirmation and receipt issuance. An endpoint that only returns a transaction plan is not a complete payment lifecycle.

## Related packages

- npm search: [AiFinPay packages](https://www.npmjs.com/search?q=Aifinpay)
- MCP endpoint: [mcp.aifinpay.io/mcp](https://mcp.aifinpay.io/mcp)
- source: [AiFinPay/sdk](https://github.com/AiFinPay/sdk)

Release candidates and stable package versions are different facts. Integrators should pin exact versions and verify a clean install.

