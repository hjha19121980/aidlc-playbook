---
name: containerization
description: Create secure, small container images and runtime configuration (health checks, resource limits, non-root user). Use when packaging a service.
---

# Containerization

Stage: Deploy. Produces: container files in the diff.

## Steps
1. Choose a minimal, maintained base image and pin versions.
2. Use a multi-stage build; run as a non-root user; copy only what is needed.
3. Add health and readiness checks, resource requests and limits, and graceful shutdown.
4. Scan the image and record the result; avoid secrets in layers.
5. Document how to build and run locally.

## Rules
- Never bake credentials or private keys into an image.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
