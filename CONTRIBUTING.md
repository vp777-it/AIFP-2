# Contributing to AIFP-2

## Change classes

- **Editorial:** wording or examples with no wire-format change.
- **Compatible:** optional field, adapter or profile that preserves existing behavior.
- **Normative:** requirement, schema, signature, economics or state-machine change.
- **Breaking:** incompatible wire, security or settlement behavior.

Normative and breaking changes require an AIFP Improvement Proposal, security analysis, migration plan and conformance tests.

## Pull requests

1. State the problem and affected protocol sections.
2. Update prose, OpenAPI and JSON Schemas together.
3. Include positive, negative, replay and boundary cases.
4. Identify any economics, custody, privacy or deployment impact.
5. Do not describe a route as live without the evidence listed in `docs/deployment-evidence.md`.

By contributing, you agree that code and machine-readable artifacts are licensed under Apache-2.0 and documentation contributions under CC BY 4.0.

