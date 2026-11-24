---
name: data-quality-and-pipeline-ops
description: Define data quality checks, lineage, freshness, and operations for data pipelines, plus alerts and runbooks. Use when a change adds or modifies a data or analytics pipeline.
---

# Data quality and pipeline operations

Stage: Maintain. Produces: `docs/aidlc/changes/<id>/data-quality.md`.

## Steps
1. Map the pipeline: sources, transforms, targets, schedule, owners, and downstream consumers.
2. Define quality checks per dataset: completeness, uniqueness, validity, consistency, and freshness, each with a threshold.
3. Place checks at ingestion, after transform, and before publish; decide whether failure blocks, quarantines, or warns.
4. Document lineage and classify sensitive columns; hand regulated data to compliance-and-privacy-review.
5. Define SLOs (slo-definition), alerts, and dashboards (observability-setup).
6. Write runbooks for late data, bad data, schema drift, and reprocessing or backfill (runbook-authoring).
7. Define test data and reconciliation against the source of record.

## Rules
- Use masked or synthetic data in non-production.
- Mark thresholds not derived from data [ASSUMPTION].
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
