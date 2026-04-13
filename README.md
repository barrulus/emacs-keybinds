# Emacs Keybindings Reference

A searchable, single-page reference for Vanilla Emacs keybindings with Vertico + Consult + Corfu + Eglot. Built with React and styled with Catppuccin Mocha colours.

## Categories

- Navigation & Files
- Search & Movement
- Window & Buffer Management
- LSP & Code
- Context Actions (Embark)
- Projects & Treemacs Workspaces
- Git (Magit)
- Org Mode
- Claude Code IDE
- Markdown
- Essential Emacs

## Running locally

```bash
npm install
npm run dev
```

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
