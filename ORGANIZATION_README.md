<div align="center">

<img src="https://raw.githubusercontent.com/horizon-ai-code/horizon/main/frontend/public/logo-dark.png" width="240" alt="Horizon AI Code Logo">

# Horizon AI Code

**Autonomous, Privacy-First AI Engineering Ecosystem**  
_Empowering intelligent software refactoring through multi-agent LLM orchestration and zero-cloud local execution._

[![Organization](https://img.shields.io/badge/GitHub-horizon--ai--code-181717?logo=github)](https://github.com/horizon-ai-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/horizon-ai-code/horizon/blob/main/LICENSE)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://www.python.org/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

</div>

<br>

---

## 🚀 About Horizon AI Code

**Horizon AI Code** is an open-source software organization dedicated to building state-of-the-art, privacy-preserving AI systems for automated code evolution. Our core focus is delivering robust, production-grade software refactoring pipelines driven by specialized multi-agent small language model (SLM) orchestration.

By executing models entirely locally on commodity hardware, Horizon guarantees **100% data privacy**, **zero cloud dependencies**, and **predictable execution** for software engineering teams.

---

## 📦 Organization Repositories

| Repository | Description | Tech Stack | Role |
| :--- | :--- | :--- | :--- |
| [**`horizon`**](https://github.com/horizon-ai-code/horizon) | Core AI-driven Java refactoring pipeline powered by multi-agent LLM orchestration. | Python 3.10, FastAPI, Next.js, GGUF, Docker | Main Engine & Platform |
| [**`horizon-page`**](https://github.com/horizon-ai-code/horizon-page) | Premium landing page and interactive product showcase with modern animations. | Next.js 16, TypeScript, Tailwind CSS, GSAP | Web Showcase |

---

## ⚡ Ecosystem Highlights

- 🤖 **Multi-Agent Collaboration**: Specialized small language models function as a **Planner**, **Generator**, and **Judge/Verifier** to produce validated refactorings.
- 🔄 **6-Phase Refactoring Pipeline**: Automated workflow: **Plan ➔ Generate ➔ Verify ➔ Mutate ➔ Deduplicate ➔ Rank**.
- 🔒 **Zero Cloud Dependency**: Runs 100% local on consumer hardware. No API keys, no monthly costs, and no code leaving your machine.
- ⚡ **Real-Time WebSockets**: Live bidirectional streaming of agent thoughts, AST validations, syntax diffs, and progress updates.
- 🐳 **Universal Docker Bundles**: One-command setup with automatic runtime GPU auto-detection and CPU fallback.
- 🔌 **Headless REST API**: Full HTTP API interface for automated CI/CD and IDE integrations.

---

## 🏗 Organization Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HORIZON AI CODE ECOSYSTEM                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
       ┌───────────────────────────────┴───────────────────────────────┐
       ▼                                                               ▼
 ┌───────────┐    WebSocket / REST API    ┌───────────┐    ┌─────────────────────────────┐
 │  Next.js  │ ◄────────────────────────► │  FastAPI  │ ──►│     LLM Orchestration       │
 │  Frontend │                            │  Backend  │    │ ┌─────────┐   ┌───────────┐ │
 │  :3000    │                            │  :8000    │    │ │ Planner │   │ Generator │ │
 └───────────┘                            └───────────┘    │ └─────────┘   └───────────┘ │
                                                           │ ┌─────────────────────────┐ │
                                                           │ │     Judge (Verifier)    │ │
                                                           │ └─────────────────────────┘ │
                                                           └──────────────┬──────────────┘
                                                                          │
                                                                    ┌─────▼─────┐
                                                                    │ Local GGUF│
                                                                    │   Models  │
                                                                    └───────────┘
```

---

## 🛠 Tech Stack & Tools

| Layer | Technologies & Tools |
| :--- | :--- |
| **Backend & Engine** | Python 3.10+, FastAPI, `llama-cpp-python`, Uvicorn, WebSockets |
| **Frontend & Web** | Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP, Framer Motion |
| **AI Models** | Qwen2.5-Coder (3B, 7B), Llama-3.2 (3B) — GGUF Quantized |
| **DevOps & Infrastructure** | Docker, Docker Compose, GitHub Container Registry (GHCR), NVIDIA CUDA 13 |

---

## 🚀 Quick Start & Deployment

Run the entire Horizon AI platform on your machine:

### 🎮 GPU Mode (NVIDIA Recommended)
```bash
curl -sL https://raw.githubusercontent.com/horizon-ai-code/horizon/main/docker-compose.yml | docker compose -f - up -d
```

### 💻 CPU Mode (Universal Compatibility)
```bash
curl -sL https://raw.githubusercontent.com/horizon-ai-code/horizon/main/docker-compose.cpu.yml | docker compose -f - up -d
```

Access the UI locally at **[http://localhost:3000](http://localhost:3000)**

---

## 👥 Core Contributors & Team

| Contributor | Role | GitHub Profile |
| :--- | :--- | :--- |
| **Joshua Lopez** | Lead / Fullstack Developer | [@pugarioo](https://github.com/pugarioo) |
| **Jericho Varde** | Frontend Developer | [@vardzz](https://github.com/vardzz) |
| **Christian Balinado** | Contributor | [@blueztian](https://github.com/blueztian) |
| **Andrew Dejito** | Contributor | [@andrewdejito](https://github.com/andrewdejito) |

---

## 📈 Organization Star History

<a href="https://star-history.com/#horizon-ai-code/horizon&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=horizon-ai-code/horizon&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=horizon-ai-code/horizon&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=horizon-ai-code/horizon&type=Date" />
  </picture>
</a>

---

## 📄 License

All projects under **Horizon AI Code** are open-source and released under the [MIT License](https://github.com/horizon-ai-code/horizon/blob/main/LICENSE).

<div align="center">
  <sub>© 2026 Horizon AI Code • Built with passion for open-source AI engineering</sub>
</div>
