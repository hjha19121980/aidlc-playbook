# Evals

Regression tests for the agent configuration (project context, skills, agents, guard rules).

One JSON file per eval: a real task with the checks that define acceptable. Collect 20 to 50 real tasks, add one for every production incident, and retire cases that no longer discriminate.

See `/aidlc-evals`. `check.sh` runs the checks listed in an eval file; wire your agent's non-interactive command into `AGENT_CMD`.
