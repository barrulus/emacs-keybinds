# Emacs Keybindings Reference

A searchable, single-page reference for Vanilla Emacs keybindings with Vertico + Consult + Corfu + Eglot. Built with React and styled with Catppuccin Mocha colours.

## Categories

- Essential Emacs
- Editing & Text
- Navigation & Files
- Search & Replace
- Window Management
- Projects & Treemacs
- LSP & Code (Eglot)
- Context Actions (Embark)
- Git (Magit)
- Magit Status Buffer
- Email (mu4e)
- Org Mode — Structure
- Org Mode — TODO & Scheduling
- Org Mode — Agenda
- Org Mode — Lists & Tables
- Org Mode — Source Blocks & Export
- Org Mode — Clocking & Archive
- Markdown
- Claude Code IDE
- Help System
- Terminal

## Development

```bash
npm install
npm run dev
```

This project uses [direnv](https://direnv.net/) with a Nix flake dev shell. If you have direnv and Nix installed, `cd` into the project and the environment (with Node.js) will be loaded automatically.

## NixOS service

This flake exposes a NixOS module that serves the built static site via `static-web-server`.

```nix
{
  inputs.emacs-keybinds.url = "github:barrulus/emacs-keybinds";

  # In your NixOS config:
  services.emacs-keybinds.enable = true;
  # services.emacs-keybinds.port = 8090;  # default
}
```

Then `nixos-rebuild switch` — the app will be available at `http://localhost:8090`.
