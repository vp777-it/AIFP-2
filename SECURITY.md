# Security Policy

AIFP-2 handles payment requirements, wallet authorization, settlement verification and receipts. Report vulnerabilities privately.

## Reporting

Do not open a public issue for a vulnerability. Email `security@aifinpay.io` with:

- affected component and version or commit;
- reproduction steps and preconditions;
- expected and observed behavior;
- financial, privacy and availability impact;
- suggested remediation, if known.

Maintainers target an acknowledgement within five business days. This is not an SLA.

## In scope

- payment or receipt forgery;
- verifier bypass or transaction-hash spoofing;
- wrong network, asset, decimals, payee or amount acceptance;
- replay, duplicate settlement consumption and idempotency failures;
- ABI or calldata ambiguity that can redirect or break settlement;
- route-class confusion between AIFP-1 and AIFP-2;
- wallet signing outside the local trust boundary;
- facilitator or backend responses that can override an independent route pin;
- expiry, nonce, resource-scope or authorization binding failures;
- indexer, ledger or webhook behavior that can produce false payment finality.

## Production gate

Production activation requires independent architecture and code review, exact build provenance, runtime verification, asset-decimal checks, secrets review, adversarial and replay tests, clean-machine package installation, real paid E2E, reconciliation, monitoring and incident rollback.

Documentation, unit tests, a deployment address or a successful native transfer is not sufficient evidence of a production-ready AIFP-2 route.

