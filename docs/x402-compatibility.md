# x402 v2 Compatibility Profile

AIFP-2 supports standard x402 v2 request/response headers while retaining AiFinPay-owned policy, route registry, verification and receipt controls.

## Headers

| Header | Direction | Encoding |
|---|---|---|
| `PAYMENT-REQUIRED` | server → client with HTTP 402 | Base64 JSON |
| `PAYMENT-SIGNATURE` | client → server on retry | Base64 JSON |
| `PAYMENT-RESPONSE` | server → client after processing | Base64 JSON |

Version 1 `X-PAYMENT` and `X-PAYMENT-RESPONSE` headers are legacy compatibility only and MUST NOT be emitted by the v2 profile.

## Current exact-payment support

| Profile | Status | Notes |
|---|---|---|
| EVM exact | Source candidate | CAIP-2 networks; EIP-3009 authorization for compatible tokens |
| SVM exact | Planned/conformance pending | Must bind mint, destination, amount and instruction semantics |
| `upto` payments | Unsupported | Fail closed |
| batch payments | Unsupported | Fail closed |
| non-EVM standard adapters | Unsupported | Native AIFP-2 profiles may exist separately |

## AIFP-2 extensions

AIFP-2 may attach passport, policy, receipt and deployment-pin metadata as versioned extensions. A server MUST ignore unknown optional extensions and MUST reject unknown extensions marked critical.

## Facilitators

An implementation may use an AiFinPay-operated verifier, a compatible third-party facilitator or a self-hosted verifier. No facilitator may override the wallet's independently trusted network, asset, payee, amount, runtime hash or fee profile.

