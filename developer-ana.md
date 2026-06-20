https://anna.partners/developers
https://anna.partners/docs


---
title: Welcome to the Anna Developer Hub
description: What you can build for Anna, and how to find your way around.
section: overview
slug: welcome
updated: 2026-04-23
estimated_minutes: 3
---

Anna is a universal AI agent — and almost everything she does at runtime is something a third-party developer can extend, replace, or compose.

This hub is the single source of truth for that work. It covers the two building blocks you can ship — **Executa** (the umbrella for both **Tools** and **Skills**) and **Anna Apps** — and walks you from "hello world" to a published listing in the App Store.

> [!IMPORTANT]
> **Executa = Tools + Skills.** They are two flavours of the same first-class object in Anna's catalogue, distribution pipeline, and developer Console. A *Tool* is an executable plugin process; a *Skill* is a declarative `SKILL.md` recipe. Both are stored as `Executa` records, both go through the same draft → version → visibility lifecycle, and both can be bundled into Anna Apps.

## Where to start

- **New to Anna?** Read [Concepts: Executa and Apps](/developers/overview/concepts) first. It's a 4-minute primer that prevents 90% of confusion.
- **Want to ship a Tool today?** Jump to a quickstart: [Python](/developers/tools/executa-python), [Node.js](/developers/tools/executa-nodejs), or [Go](/developers/tools/executa-go).
- **Prefer a declarative recipe?** Start with [What is a Skill](/developers/skills/skill-intro).
- **Building a curated experience?** Start with [What is an Anna App](/developers/apps/app-intro) and the [Manifest Reference](/developers/apps/app-manifest).

## What this hub is not

- It is **not** the Developer Console. The Console (at `/developer`) is where verified developers manage their own Executas and Apps once published; this hub is the public learning resource.
- It is **not** the API reference for end-user features. For Anna's user-facing docs see [docs.anna.partners](https://docs.anna.partners).

## Stay in the loop

- **Examples**: [`anna-executa-examples`](https://github.com/whtcjdtc2007/anna-executa-examples) — runnable Tool plugins in Python, Node.js, and Go.
- **Forum**: [forum.anna.partners](https://forum.anna.partners) — proposals, RFCs, show-and-tell.
- **Changelog**: linked from the Reference section as we ship platform updates.

# Anna Developer Hub

> Developer documentation for the Anna platform: build Tools (Executa plugins), Skills, and Anna Apps; the full Host API, Realtime event, and manifest reference. Every page below is plain Markdown — append `.md` to any `/developers/**` URL, or send `Accept: text/markdown`, to get the raw source instead of the JS-rendered HTML shell.

## Overview

- [Welcome to the Anna Developer Hub](/developers/overview/welcome.md): What you can build for Anna, and how to find your way around.
- [Concepts: Executa (Tools + Skills) and Apps](/developers/overview/concepts.md): One umbrella, two flavours, and the App that bundles them. The 4-minute version.
- [Architecture & Lifecycle](/developers/overview/architecture.md): How an Executa call flows through Anna, from chat input to response.
- [Choosing What to Build](/developers/overview/choosing.md): Tool, Skill, or App? A short decision guide.

## Build a Tool

- [What is Executa](/developers/tools/executa-intro.md): Anna's plugin extension system: standalone processes speaking JSON-RPC 2.0 over stdio.
- [Quickstart — Python](/developers/tools/executa-python.md): Build, smoke-test, and run a Python Executa plugin in under five minutes.
- [Quickstart — Node.js](/developers/tools/executa-nodejs.md): Ship an Anna Executa plugin in JavaScript in under five minutes.
- [Quickstart — Go](/developers/tools/executa-go.md): Ship a single-binary Anna Executa plugin in Go.
- [Protocol Specification](/developers/tools/executa-protocol.md): JSON-RPC 2.0 over stdio — the wire format an Executa plugin must speak.
- [Lifecycle & Capability Negotiation](/developers/tools/executa-lifecycle.md): How the Agent spawns, initializes, calls, and shuts down an Executa plugin — including v2 reverse-RPC capability negotiation.
- [Credentials](/developers/tools/executa-credentials.md): How plugins declare and consume API keys / tokens injected by the platform.
- [Platform Authorization](/developers/tools/executa-authorization.md): Connect Google / X / GitHub / Notion / Slack once in Anna — every plugin that asks for the credential name receives it automatically.
- [Sampling — LLM Calls Without an API Key](/developers/tools/executa-sampling.md): Let your plugin ask the host to perform an LLM completion on the user's behalf, with billing and model selection handled by Anna.
- [Agent Sessions — Multi-turn Tool-using Runs](/developers/tools/executa-agent.md): Drive stateful, tool-using Anna Agent sessions from a stdio plugin via reverse JSON-RPC, with the same surface area as in-iframe anna-apps.
- [Persistent Storage (APS)](/developers/tools/executa-storage.md): Per-user durable KV + object store hosted by Anna — no cloud account, no DB, quota and access control enforced by the host.
- [Binary Distribution](/developers/tools/executa-binary.md): Ship one binary per platform — single-file or full multi-file bundle.
- [Image Generation — LLM Images Without an API Key](/developers/tools/executa-image.md): Ask the host to generate or edit images on the user's behalf, with provider selection, billing, and storage handled by Anna.
- [Host Upload — Persist Files Without S3 Credentials](/developers/tools/executa-host-upload.md): Hand a file (or its bytes) to Anna; the host stores it in shared R2 and returns a presigned download URL — your plugin never sees an S3 key.
- [Publishing a Tool](/developers/tools/executa-publish.md): From local prototype to a discoverable, installable Executa tool.
- [Common Pitfalls](/developers/tools/executa-pitfalls.md): The bugs that show up most often when authors build Executa plugins, and how to spot them fast.

## Build a Skill

- [What is a Skill](/developers/skills/skill-intro.md): Skills are the declarative flavour of Executa: a folder of markdown that Anna loads on demand and turns into a LangChain tool.
- [Skill Format](/developers/skills/skill-format.md): The frontmatter, metadata structure, and supporting files that make a Skill loadable.
- [Local Development](/developers/skills/skill-local.md): Build and iterate on a skill on your own machine before publishing.
- [Publishing a Skill](/developers/skills/skill-publish.md): Submit your skill so other users can discover and install it.

## Build an Anna App

- [What is an Anna App](/developers/apps/app-intro.md): Apps bundle a curated set of Executas plus prompt instructions into a one-click install for end users.
- [Quickstart: anna-app CLI](/developers/apps/app-quickstart.md): From an empty directory to a running Anna App harness in under a minute — scaffold, dev, validate.
- [Build Beautiful: the Focus Flow Example](/developers/apps/app-focus-flow.md): Clone the anna-app-focus-flow reference project and ship a polished Anna App — Tool plugin, Skill, and SPA bundle — in one sitting.
- [App Manifest](/developers/apps/app-manifest.md): The manifest JSON that declares which Executas an app bundles and how the assistant should behave when it is mentioned.
- [Bundling Executas](/developers/apps/app-bundling.md): How an app declares the Executas it bundles, and what install/runtime semantics each kind has.
- [Listing Fields](/developers/apps/app-listing.md): The store-facing metadata you fill in on the Listing tab of the Developer Console.
- [Publishing an App](/developers/apps/app-publish.md): Walk an app through review and into the Anna App Store.
- [Versioning & Updates](/developers/apps/app-versioning.md): How versions are created, ordered, and rolled out to installed users.
- [Anna App UI Overview](/developers/apps/app-ui-overview.md): How Anna Apps render an interactive sandboxed window on the dashboard, and how the LLM, the iframe, and the host coordinate.
- [App UI Manifest](/developers/apps/app-ui-manifest.md): The `ui` section of a schema-2 manifest: bundle, views, host_api, csp_overrides.
- [App UI Bundle Pipeline](/developers/apps/app-ui-bundle.md): Upload your static SPA bundle for a schema-2 Anna App version: init, file PUTs, finalize.
- [App UI Windows](/developers/apps/app-ui-windows.md): Window lifecycle, geometry persistence, multi-tab/device sync, dock, single-instance dedup.
- [App UI SDK](/developers/apps/app-ui-sdk.md): Embed the Anna App SDK in your bundle and call host APIs from inside the iframe.
- [App UI Host API](/developers/apps/app-ui-host-api.md): RPC namespaces and methods your iframe can call on the host, with current implementation status.
- [App UI LLM Integration](/developers/apps/app-ui-llm.md): How the assistant summons, updates, and closes your app windows via LangChain tools and SSE events.
- [App-Side LLM & Agent API](/developers/apps/llm-and-agent.md): Call llm.complete and run a multi-turn agent session from inside your bundled app.
- [Local Development](/developers/apps/local-dev.md): Run an Anna App locally with `anna-app dev` — in-process dispatcher, stdio executa, no nexus checkout required.
- [Local Dev with --llm (PAT setup)](/developers/apps/local-dev-llm.md): Develop apps that call llm.complete or anna.agent.session against a real Nexus from your laptop.
- [Testing the Bundle](/developers/apps/testing-bundle.md): Drive the bundle from vitest with `mountBundle` — same ACL gating and call recording as the dev harness.
- [Testing the Plugin](/developers/apps/testing-plugin.md): Test the executa plugin under `executas/` with `anna-executa-test` — pytest fixtures that spawn the plugin under uv run.
- [Recording and Replay](/developers/apps/recording-replay.md): Record `anna-app dev` sessions to JSONL and verify, summarize, or replay them against the current manifest.
- [Host API vs Executa Tool — When to Use Which](/developers/apps/host-api-vs-executa.md): Anna apps can reach for the platform's host API or for a custom Executa tool to accomplish similar-looking tasks. They are not equivalent — this guide explains the real differences and gives a decision framework.

## Reference

- [Verified Developer](/developers/reference/verified-developer.md): What the Verified Developer flag unlocks, and how it is granted.
- [FAQ](/developers/reference/faq.md): Answers to the questions developers most often ask.

## Reference

- [Reference index](/developers/reference.md)
- [Executa — Anna's plugin extension system](/developers/reference/executa-overview.md)
- [Tool Executa — wire protocol](/developers/reference/executa-protocol.md)
- [Spawn → initialize → describe → invoke → shutdown](/developers/reference/executa-lifecycle.md)
- [Sampling — borrow the host's LLM](/developers/reference/executa-sampling.md)
- [Agent sessions — multi-turn tool-using runs](/developers/reference/executa-agent-sessions.md)
- [Anna Persistent Storage (APS) — per-user KV + objects](/developers/reference/executa-persistent-storage.md)
- [Embeddings — borrow the host's embedding model](/developers/reference/executa-embed.md)
- [LLM image generation & editing](/developers/reference/executa-image.md)
- [Host-managed file upload](/developers/reference/executa-host-upload.md)
- [Credentials & platform authorization](/developers/reference/executa-credentials.md)
- [Distribution, install pipeline & lifecycle](/developers/reference/executa-distribution.md)
- [Common pitfalls](/developers/reference/executa-pitfalls.md)
- [Skill — markdown that teaches the agent](/developers/reference/skill-overview.md)
- [Anna App manifest fields](/developers/reference/app-manifest.md)
- [UI manifest — windows, views, grants](/developers/reference/ui-manifest.md)
- [UI Host API grants](/developers/reference/ui-host-api.md)
- [agent.* — agent sessions](/developers/reference/host-api-agent.md)
- [chat.* — write back into the conversation](/developers/reference/host-api-chat.md)
- [llm.* — host LLM access](/developers/reference/host-api-llm.md)
- [image.* — host-managed image generation & editing](/developers/reference/host-api-image.md)
- [upload.* — persist files without S3 credentials](/developers/reference/host-api-upload.md)
- [storage.* — per-App key-value state (APS)](/developers/reference/host-api-storage.md)
- [llm.embed — host-managed embeddings (RAG / semantic search)](/developers/reference/host-api-embed.md)
- [files.* — per-App blob storage (APS objects + R2)](/developers/reference/host-api-files.md)
- [tools.* — call Executa tools from the UI](/developers/reference/host-api-tools.md)
- [window.* — window lifecycle & chrome](/developers/reference/host-api-window.md)
- [Reserved namespaces (stubs)](/developers/reference/host-api-stubs.md)
- [AnnaAppEvent — SSE event kinds](/developers/reference/sse-events.md)
- [Runtime + schema packages](/developers/reference/packages.md)
- [anna-app CLI commands](/developers/reference/cli.md)
- [Distribution lifecycle](/developers/reference/lifecycle.md)


https://anna.partners/developers/tools/executa-intro
https://anna.partners/developers/skills/skill-intro
https://anna.partners/developers/apps/app-intro 