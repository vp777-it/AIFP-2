# AIFP-2 Documentation

## Build with the protocol

1. Read the [overview](overview.md).
2. Implement the [normative protocol](protocol-specification.md).
3. Choose native AIFP-2 or the [x402 v2 compatibility profile](x402-compatibility.md).
4. Follow the [integration guide](integration-guide.md).
5. Validate against the [security model](security-model.md).
6. Do not activate a route until its [deployment evidence](deployment-evidence.md) is complete.

## Machine-readable contracts

- [OpenAPI 3.1](../spec/openapi.yaml)
- [Payment Required schema](../schemas/payment-required.schema.json)
- [Payment Receipt schema](../schemas/payment-receipt.schema.json)
- [TypeScript example](../examples/typescript/pay-protected-resource.ts)

## Protocol map

| Layer | AIFP protocol | Result |
|---|---|---|
| Resource monetization | AIFP-1 | quote, quota/access receipt |
| Payment execution | **AIFP-2** | verified settlement receipt |
| Agent identity | AIFP-3 | portable identity and wallet bindings |
| Banking execution | AIFP-4 | approved banking/SWIFT instruction |
| Cryptographic authorization | AIFP-5 | classical/hybrid/PQ authorization |
| Financial governance | AIFP-6 | allow, deny or require approval |

