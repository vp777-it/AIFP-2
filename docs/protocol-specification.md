# AIFP-2 Protocol Specification

Status: **Draft 0.1.0**  
Requirement words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** are normative.

## 1. Roles

- **Resource server:** protects an API, MCP tool, content item or digital action.
- **Payer agent:** evaluates requirements and requests wallet authorization.
- **Wallet/policy engine:** applies limits and signs inside the payer trust boundary.
- **Settlement rail:** blockchain or other approved payment infrastructure.
- **Verifier:** proves that settlement matches the accepted requirement.
- **Receipt issuer:** signs the result used to retry the protected operation.

One implementation may combine resource, verifier and receipt roles, but their security responsibilities remain separate.

## 2. Required identifiers

- `protocol`: `AIFP-2`
- `version`: semantic protocol version
- `payment_id`: globally unique 32-byte identifier
- `resource`: method and canonical resource URI or scope digest
- `network`: CAIP-2 identifier where applicable
- `asset`: canonical asset identifier/address
- `amount_atomic`: unsigned integer string
- `pay_to`: destination or settlement profile merchant address
- `expires_at`: RFC 3339 timestamp
- `nonce`: unpredictable replay-prevention value

## 3. Challenge

The resource server MUST return HTTP `402` when payment is required. The response MUST contain at least one accepted payment option. Every option MUST bind the resource, network, asset, atomic amount, payee, expiry and nonce.

The resource server MUST NOT advertise a route that its current verifier cannot validate.

## 4. Authorization

Before signing, the payer MUST verify:

1. the selected network and chain identifier;
2. the asset contract/mint and decimals from an independent trusted source;
3. the exact atomic amount and payee;
4. route class `AIFP-2` and fee profile `0/0`;
5. expiry and resource binding;
6. wallet policy, per-payment and cumulative limits;
7. deployment address and runtime/program evidence when a contract route is used.

Private keys and recovery phrases MUST NOT leave the wallet boundary.

## 5. Settlement

The settlement payload MUST be deterministic for the accepted option. The same `payment_id` MUST NOT be consumed twice. Amount arithmetic MUST use integer atomic units.

For the current EVM splitter profile, the canonical function signatures are:

```solidity
payNative(bytes32 paymentId, address merchant, uint256 grossAmount,
          address ipCreator, uint256 validUntil, string orderId)

payStable(bytes32 paymentId, address token, uint256 grossAmount,
          address merchant, address ipCreator, uint256 validUntil,
          string orderId)
```

For AIFP-2, `ipCreator` is the zero address, `treasuryBps = 0` and `ipCreatorBps = 0`. ABI tuple/positional ambiguity is forbidden.

## 6. Verification

The verifier MUST retrieve authoritative settlement data and validate:

- correct network and finality policy;
- successful transaction/program execution;
- expected contract/program and runtime profile;
- payment identifier and no prior consumption;
- exact token/mint, decimals, amount and payee;
- expiry, order/resource binding and event/instruction semantics;
- route economics.

A transaction hash supplied by the client is only a lookup key.

## 7. Receipt

A receipt MUST be issued only after successful semantic verification. It MUST bind:

- `payment_id`, transaction reference and finality evidence;
- resource scope and original request digest;
- payer identity or wallet reference when present;
- network, asset, amount and payee;
- issued and expiry times;
- issuer key identifier and signature.

The resource server MUST validate signature, issuer, audience, scope, expiry and replay state before granting access.

## 8. Idempotency

Retries with the same idempotency key and identical request digest MUST return the same terminal result. Reuse with different content MUST fail. A post-settlement service failure MUST enter a recoverable reconciliation state rather than charging again.

## 9. Errors

Errors SHOULD use stable codes including:

- `unsupported_network`
- `unsupported_asset`
- `route_not_active`
- `invoice_expired`
- `policy_denied`
- `trusted_pin_mismatch`
- `calldata_mismatch`
- `settlement_not_found`
- `settlement_invalid`
- `payment_replayed`
- `receipt_invalid`
- `confirmation_pending`

## 10. Compatibility

x402 v2 compatibility is specified in [x402-compatibility.md](x402-compatibility.md). AIFP-2 MAY operate without an external facilitator. Compatibility adapters MUST NOT weaken AIFP-2 route pins, economics or verification.

