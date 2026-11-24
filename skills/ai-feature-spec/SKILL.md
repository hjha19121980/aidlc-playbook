---
name: ai-feature-spec
description: Specify a feature that uses an LLM or ML model - task definition, prompts, guardrails, evaluation, cost, latency, fallback, and human oversight. Use when the intent includes AI behavior.
---

# AI feature spec

Stage: Plan. Produces: `docs/aidlc/changes/<id>/ai-feature.md`.

## Steps
1. Restate the user task the model performs and the decision or action that follows its output.
2. Define inputs, outputs, and output format (schema), and what the model must never do.
3. Choose the model tier and record why; note context-size, latency, and cost-per-call budgets.
4. Draft the prompt structure (system, context, examples) and the data sources it may read; mark sensitive sources.
5. Define guardrails: input validation, prompt-injection handling, output validation, refusal behavior, and human review points.
6. Define the evaluation: golden cases, pass thresholds, regression cases, and who owns the eval set (see aidlc-evals).
7. Specify fallback and degradation when the model is slow, wrong, or unavailable, plus logging and monitoring signals.
8. Hand regulated or personal data questions to compliance-and-privacy-review.

## Rules
- Do not claim accuracy figures that were not measured; mark targets as [ASSUMPTION] until evals run.
- Any output that triggers an irreversible action needs a human gate.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
