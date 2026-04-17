import { useState } from 'react';

const COLORS = {
  base: '#1e1e2e',
  surface: '#313244',
  text: '#cdd6f4',
  mauve: '#cba6f7',
  green: '#a6e3a1',
  blue: '#89b4fa',
  peach: '#fab387',
  red: '#f38ba8',
  yellow: '#f9e2af',
  subtext: '#a6adc8',
};

interface Keybinding {
  keys: string;
  description: string;
}

interface Category {
  name: string;
  color: string;
  bindings: Keybinding[];
  note?: string;
}

interface WorkflowStep {
  keys?: string;
  action: string;
  note?: string;
}

interface Workflow {
  name: string;
  color: string;
  steps: WorkflowStep[];
  note?: string;
}

const CATEGORIES: Category[] = [
  {
    name: 'Essential Emacs',
    color: COLORS.subtext,
    bindings: [
      { keys: 'C-x C-s', description: 'Save file (apheleia auto-formats)' },
      { keys: 'C-x s', description: 'Save all (prompt per file)' },
      { keys: 'C-x C-f', description: 'Open file' },
      { keys: 'C-g', description: 'Cancel anything' },
      { keys: 'M-x', description: 'Command palette (Vertico)' },
      { keys: 'C-/ or C-_', description: 'Undo' },
      { keys: 'C-?', description: 'Redo (undo-redo)' },
      { keys: 'C-x u', description: 'Undo tree' },
      { keys: 'M-:', description: 'Eval elisp expression' },
      { keys: 'C-x C-c', description: 'Quit Emacs' },
      { keys: 'C-.', description: 'Embark act (context menu)' },
    ],
    note: 'After any prefix (C-x, C-c, C-h...) which-key pops up showing all next-key options',
  },
  {
    name: 'Editing & Text',
    color: COLORS.green,
    bindings: [
      { keys: 'C-SPC', description: 'Set mark (begin selection)' },
      { keys: 'C-x C-x', description: 'Swap point and mark' },
      { keys: 'M-w', description: 'Copy region' },
      { keys: 'C-w', description: 'Cut (kill) region' },
      { keys: 'C-y', description: 'Paste (yank)' },
      { keys: 'M-y', description: 'Cycle kill ring (consult)' },
      { keys: 'M-d', description: 'Kill word forward' },
      { keys: 'M-DEL', description: 'Kill word backward' },
      { keys: 'C-k', description: 'Kill to end of line' },
      { keys: 'M-;', description: 'Comment/uncomment region' },
      { keys: 'C-x C-;', description: 'Comment current line' },
      { keys: 'C-x TAB', description: 'Indent rigidly (then arrows)' },
    ],
  },
  {
    name: 'Navigation & Files',
    color: COLORS.blue,
    bindings: [
      { keys: 'C-c f f', description: 'Find file in project' },
      { keys: 'C-c f r', description: 'Recent files' },
      { keys: 'C-c f g', description: 'Ripgrep search in project' },
      { keys: 'C-c f b', description: 'Switch buffer (rich)' },
      { keys: 'C-x b', description: 'Switch buffer (consult)' },
      { keys: 'C-x C-b', description: 'List all buffers (ibuffer)' },
      { keys: 'C-x k', description: 'Kill (close) buffer' },
      { keys: 'C-x r m', description: 'Bookmark set' },
      { keys: 'C-x r b', description: 'Bookmark jump' },
      { keys: 'C-c e', description: 'Toggle Treemacs sidebar' },
    ],
  },
  {
    name: 'Search & Replace',
    color: COLORS.green,
    bindings: [
      { keys: 'C-s', description: 'Search in buffer (consult-line)' },
      { keys: 'C-r', description: 'Reverse search' },
      { keys: 'C-c f g', description: 'Ripgrep in project' },
      { keys: 'M-%', description: 'Query replace' },
      { keys: 'C-M-%', description: 'Query replace regexp' },
      { keys: 'M-g g', description: 'Goto line' },
      { keys: 'M-g i', description: 'Jump to symbol (consult-imenu)' },
    ],
  },
  {
    name: 'Window Management',
    color: '#6c9bd1',
    bindings: [
      { keys: 'C-x 3', description: 'Split right (vertical)' },
      { keys: 'C-x 2', description: 'Split below (horizontal)' },
      { keys: 'C-x 0', description: 'Close current window' },
      { keys: 'C-x 1', description: 'Maximise (close others)' },
      { keys: 'C-x o', description: 'Cycle to next window' },
      { keys: 'M-arrows', description: 'Move focus directionally (windmove)' },
      { keys: 'C-x +', description: 'Balance window sizes' },
      { keys: 'C-x { / }', description: 'Shrink / grow window' },
      { keys: 'C-x ^', description: 'Grow window taller' },
      { keys: 'C-c <left>', description: 'Winner undo layout' },
      { keys: 'C-c <right>', description: 'Winner redo layout' },
      { keys: 'C-x 4 b', description: 'Open buffer in other window' },
      { keys: 'C-x 4 f', description: 'Open file in other window' },
      { keys: 'C-x 5 2', description: 'New frame' },
      { keys: 'C-x 5 0', description: 'Close current frame' },
      { keys: 'C-x 5 o', description: 'Other frame' },
    ],
    note: 'Maximise with C-x 1, then winner-undo (C-c <left>) to restore the layout',
  },
  {
    name: 'Projects & Treemacs',
    color: '#d89664',
    bindings: [
      { keys: 'C-x p p', description: 'Switch project (project.el)' },
      { keys: 'C-x p f', description: 'Find file in project' },
      { keys: 'C-x p g', description: 'Grep in project' },
      { keys: 'C-x p d', description: 'Dired in project root' },
      { keys: 'C-x p b', description: 'Switch to project buffer' },
      { keys: 'C-x p k', description: 'Kill all project buffers' },
      { keys: 'C-x p c', description: 'Compile in project' },
      { keys: 'C-x p s', description: 'Shell in project root' },
      { keys: 'C-x p !', description: 'Run command in project root' },
      { keys: 'C-c e', description: 'Toggle Treemacs' },
      { keys: 'C-c C-w e', description: 'Edit workspaces (in Treemacs)' },
      { keys: 'C-c C-w s', description: 'Switch workspace (in Treemacs)' },
      { keys: 'C-c C-w a', description: 'Add workspace (in Treemacs)' },
      { keys: 'C-c C-w d', description: 'Delete workspace (in Treemacs)' },
      { keys: 'C-c C-w r', description: 'Rename workspace (in Treemacs)' },
      { keys: 'C-c C-p a', description: 'Add project to workspace (in Treemacs)' },
      { keys: 'C-c C-p d', description: 'Remove project from workspace (in Treemacs)' },
      { keys: 'C-c C-p r', description: 'Rename project in workspace (in Treemacs)' },
    ],
    note: 'Treemacs workspaces group multiple project roots — organise personal vs work contexts',
  },
  {
    name: 'LSP & Code (Eglot)',
    color: COLORS.mauve,
    bindings: [
      { keys: 'M-.', description: 'Go to definition (embark-dwim)' },
      { keys: 'M-,', description: 'Pop back from definition' },
      { keys: 'M-?', description: 'Find references (xref)' },
      { keys: 'C-c r n', description: 'Rename symbol' },
      { keys: 'C-c c a', description: 'Code actions' },
      { keys: 'C-c c x', description: 'Diagnostics (consult-flymake)' },
      { keys: 'C-c f m', description: 'Format buffer (apheleia)' },
      { keys: 'C-h .', description: 'Show eldoc / hover' },
    ],
    note: 'Format-on-save runs apheleia automatically (sql-mode excluded)',
  },
  {
    name: 'Context Actions (Embark)',
    color: COLORS.peach,
    bindings: [
      { keys: 'C-.', description: 'Act on selection' },
      { keys: 'M-.', description: 'Do what I mean' },
      { keys: 'C-h B', description: 'Show available actions' },
    ],
  },
  {
    name: 'Git (Magit)',
    color: COLORS.red,
    bindings: [
      { keys: 'C-c g', description: 'Magit status (start here)' },
      { keys: 'C-x v g', description: 'VC blame (vanilla)' },
    ],
    note: 'Workflow: C-c g → review → s stage → c c → type message → C-c C-c → P p push → q',
  },
  {
    name: 'Magit Status Buffer',
    color: COLORS.red,
    bindings: [
      { keys: 's / u', description: 'Stage / unstage hunk or file' },
      { keys: 'c c', description: 'Commit (write msg, C-c C-c to confirm)' },
      { keys: 'C-c C-k', description: 'Abort commit' },
      { keys: 'P p', description: 'Push to remote' },
      { keys: 'F p', description: 'Pull from remote' },
      { keys: 'b b', description: 'Switch branch' },
      { keys: 'b c', description: 'Create branch' },
      { keys: 'd d', description: 'Diff' },
      { keys: 'l l', description: 'Log (current branch)' },
      { keys: 'TAB', description: 'Expand/collapse section' },
      { keys: 'q', description: 'Quit magit' },
    ],
    note: 'These bindings are active inside the Magit status buffer',
  },
  {
    name: 'Email (mu4e)',
    color: COLORS.peach,
    bindings: [
      { keys: 'C-c m p', description: 'Open mu4e main view' },
      { keys: 'j i', description: 'Jump to inbox (in main)' },
      { keys: 'U', description: 'Fetch & reindex mail' },
      { keys: 'n / p', description: 'Next / previous message' },
      { keys: 'RET', description: 'Open message' },
      { keys: 's', description: 'Search mail' },
      { keys: 'd', description: 'Mark for trash' },
      { keys: 'r', description: 'Mark for archive/refile' },
      { keys: '!', description: 'Mark as read' },
      { keys: '?', description: 'Mark as unread' },
      { keys: 'x', description: 'Execute all marks' },
      { keys: 'R', description: 'Reply' },
      { keys: 'W', description: 'Reply all (wide)' },
      { keys: 'F', description: 'Forward' },
      { keys: 'C', description: 'Compose new email' },
      { keys: 'q', description: 'Quit / go back' },
    ],
    note: 'In compose: C-c C-a attach, C-c C-c send, C-c C-d save draft, C-c C-k discard',
  },
  {
    name: 'Org Mode — Structure',
    color: COLORS.yellow,
    bindings: [
      { keys: 'TAB', description: 'Cycle fold on current heading' },
      { keys: 'S-TAB', description: 'Cycle fold on all headings' },
      { keys: 'M-RET', description: 'New heading at same level' },
      { keys: 'M-S-RET', description: 'New TODO heading' },
      { keys: 'M-<up> / M-<down>', description: 'Move heading up/down' },
      { keys: 'M-<left> / M-<right>', description: 'Promote / demote heading' },
      { keys: 'M-S-<left> / M-S-<right>', description: 'Promote / demote subtree' },
      { keys: 'C-c C-w', description: 'Refile heading to another location' },
      { keys: 'C-c ^', description: 'Sort headings' },
      { keys: 'C-c C-n / C-c C-p', description: 'Next / previous heading' },
      { keys: 'C-c C-f / C-c C-b', description: 'Next / prev same-level heading' },
      { keys: 'C-c C-u', description: 'Up to parent heading' },
      { keys: 'C-c C-o', description: 'Open link at point' },
    ],
  },
  {
    name: 'Org Mode — TODO & Scheduling',
    color: COLORS.yellow,
    bindings: [
      { keys: 'S-<left> / S-<right>', description: 'Cycle TODO state' },
      { keys: 'C-c C-t', description: 'Set TODO keyword (with menu)' },
      { keys: 'C-c C-s', description: 'Schedule (add SCHEDULED:)' },
      { keys: 'C-c C-d', description: 'Set deadline (add DEADLINE:)' },
      { keys: 'C-c .', description: 'Insert active timestamp' },
      { keys: 'C-c !', description: 'Insert inactive timestamp' },
      { keys: 'S-<up> / S-<down>', description: '+/- 1 day on timestamp' },
      { keys: 'C-c C-q', description: 'Set tags on heading' },
      { keys: 'C-c C-x p', description: 'Set property' },
      { keys: 'C-c ,', description: 'Set priority (A/B/C)' },
      { keys: 'C-c C-c', description: 'Toggle checkbox / context action' },
    ],
    note: 'States: TODO → IN-PROGRESS → BLOCKED → DONE → CANCELLED',
  },
  {
    name: 'Org Mode — Agenda',
    color: COLORS.yellow,
    bindings: [
      { keys: 'C-c o a', description: 'Agenda dispatcher' },
      { keys: 'C-c o c', description: 'Capture (template menu)' },
      { keys: 'C-c o w', description: 'Load workspace' },
      { keys: 'a', description: 'Weekly agenda (in dispatcher)' },
      { keys: 't', description: 'All TODOs (in dispatcher)' },
      { keys: 'm', description: 'Match tags/properties' },
      { keys: 'f / b', description: 'Forward / back one period' },
      { keys: '.', description: 'Jump to today' },
      { keys: 'v d / w / m', description: 'Day / week / month view' },
      { keys: 'RET / TAB', description: 'Go to item in file' },
      { keys: 'r / g', description: 'Refresh agenda' },
      { keys: 'q', description: 'Quit agenda' },
    ],
    note: 'Capture templates: personal t/n/j/e, work t/m/c — see lisp/my-org.el',
  },
  {
    name: 'Org Mode — Lists & Tables',
    color: COLORS.yellow,
    bindings: [
      { keys: 'M-RET', description: 'New list item' },
      { keys: 'M-S-RET', description: 'New item with checkbox' },
      { keys: 'C-c C-c', description: 'Toggle checkbox [X]' },
      { keys: 'C-c -', description: 'Cycle list bullet style' },
      { keys: 'C-c C-l', description: 'Insert / edit link' },
      { keys: '| col1 | col2 TAB', description: 'Create table, next field' },
      { keys: 'TAB / S-TAB', description: 'Next / previous field' },
      { keys: 'C-c |', description: 'Create / convert to table' },
      { keys: 'M-S-<right> / M-S-<down>', description: 'Insert column / row' },
      { keys: 'M-S-<left> / M-S-<up>', description: 'Delete column / row' },
      { keys: 'C-c -', description: 'Insert horizontal separator' },
      { keys: 'C-c *', description: 'Recalculate table formulas' },
    ],
    note: 'Checkbox stats: [/] or [%] in parent heading auto-update. Table formulas: #+TBLFM: $3=$1+$2',
  },
  {
    name: 'Org Mode — Source Blocks & Export',
    color: COLORS.yellow,
    bindings: [
      { keys: '<s TAB', description: 'Insert src block (snippet)' },
      { keys: 'C-c C-c', description: 'Execute source block' },
      { keys: "C-c '", description: 'Edit src block in native mode' },
      { keys: 'C-c C-v t', description: 'Tangle (export code blocks)' },
      { keys: 'C-c C-v b', description: 'Execute all blocks in buffer' },
      { keys: 'C-c C-e', description: 'Export dispatch menu' },
      { keys: 'h o', description: 'Export to HTML & open' },
      { keys: 'l p', description: 'Export to LaTeX & PDF' },
      { keys: 'l o', description: 'Export to PDF & open' },
      { keys: 't u', description: 'Export to plain text (UTF-8)' },
      { keys: 'm m', description: 'Export to Markdown' },
    ],
    note: 'Enabled babel langs: emacs-lisp, shell, python, mermaid',
  },
  {
    name: 'Org Mode — Clocking & Archive',
    color: COLORS.yellow,
    bindings: [
      { keys: 'C-c C-x C-i', description: 'Clock in on current heading' },
      { keys: 'C-c C-x C-o', description: 'Clock out' },
      { keys: 'C-c C-x C-q', description: 'Cancel current clock' },
      { keys: 'C-c C-x C-d', description: 'Display clocking info' },
      { keys: 'C-c C-x C-r', description: 'Insert clock report' },
      { keys: 'C-c C-x C-a', description: 'Archive subtree' },
      { keys: 'C-x n s', description: 'Narrow to subtree' },
      { keys: 'C-x n w', description: 'Widen (un-narrow)' },
    ],
  },
  {
    name: 'Markdown',
    color: '#a6e3a1',
    bindings: [
      { keys: 'C-c P', description: 'Live browser preview' },
      { keys: 'C-c m', description: 'Mermaid preview at point' },
      { keys: 'C-c C-s b', description: 'Bold selection' },
      { keys: 'C-c C-s i', description: 'Italic selection' },
      { keys: 'C-c C-s c', description: 'Code selection' },
      { keys: 'C-c C-s q', description: 'Blockquote' },
      { keys: 'C-c C-l', description: 'Insert link' },
      { keys: 'C-c C-i', description: 'Insert image' },
      { keys: 'C-c C-=', description: 'Promote heading' },
      { keys: 'C-c C--', description: 'Demote heading' },
      { keys: 'TAB / S-TAB', description: 'Cycle heading fold / all' },
    ],
    note: 'Preview auto-refreshes. Mermaid + KaTeX render via pandoc. mpls LSP runs on the buffer.',
  },
  {
    name: 'Claude Code IDE',
    color: COLORS.mauve,
    bindings: [
      { keys: 'C-c k k', description: 'IDE menu' },
      { keys: 'C-c k s', description: 'Start session' },
      { keys: 'C-c k t', description: 'Toggle side window' },
      { keys: 'C-c k r', description: 'Resume session' },
      { keys: 'C-c k q', description: 'Stop session' },
    ],
    note: 'auto-revert-mode is on globally — buffers update when Claude writes files. MCP tools are auto-exposed.',
  },
  {
    name: 'Help System',
    color: COLORS.subtext,
    bindings: [
      { keys: 'C-h k', description: 'Describe key' },
      { keys: 'C-h f', description: 'Describe function' },
      { keys: 'C-h v', description: 'Describe variable' },
      { keys: 'C-h m', description: 'Describe current mode' },
      { keys: 'C-h o', description: 'Describe symbol at point' },
      { keys: 'C-h B', description: 'Embark live bindings' },
      { keys: 'M-x apropos', description: 'Search commands by keyword' },
    ],
    note: 'When lost: C-h k then press any key to see what it does',
  },
  {
    name: 'Terminal',
    color: COLORS.subtext,
    bindings: [
      { keys: 'M-x vterm', description: 'Open vterm' },
      { keys: 'M-x writeroom-mode', description: 'Distraction-free writing' },
    ],
  },
];

const WORKFLOWS: Workflow[] = [
  {
    name: 'Open a file',
    color: COLORS.blue,
    steps: [
      { keys: 'C-x C-f', action: 'Invoke find-file' },
      { action: 'Type / tab-complete path in the minibuffer' },
      { keys: 'RET', action: 'Open (creates the file if path does not exist)' },
    ],
    note: 'Inside a project, C-c f f or C-x p f is faster — fuzzy-matches tracked files',
  },
  {
    name: 'Save a file',
    color: COLORS.blue,
    steps: [
      { keys: 'C-x C-s', action: 'Save current buffer (apheleia auto-formats on save)' },
    ],
    note: 'C-x s saves every modified buffer, prompting per file',
  },
  {
    name: 'Save and close a file',
    color: COLORS.blue,
    steps: [
      { keys: 'C-x C-s', action: 'Save buffer' },
      { keys: 'C-x k RET', action: 'Kill buffer (RET accepts the current buffer name)' },
    ],
  },
  {
    name: 'Close a file without saving',
    color: COLORS.blue,
    steps: [
      { keys: 'C-x k RET', action: 'Kill buffer' },
      { action: 'If prompted about unsaved changes, answer n (no) then yes to discard' },
    ],
    note: 'M-x revert-buffer reloads from disk instead of killing — useful to undo all edits',
  },
  {
    name: 'Close all project files',
    color: COLORS.blue,
    steps: [
      { keys: 'C-x p k', action: 'Kill all buffers belonging to current project' },
    ],
    note: 'M-x kill-some-buffers walks every buffer and asks per one',
  },
  {
    name: 'Select text (mark a region)',
    color: COLORS.green,
    steps: [
      { action: 'Move cursor to the start of what you want to select' },
      { keys: 'C-SPC', action: 'Set mark — begin the selection' },
      { action: 'Move cursor to the end (arrows, C-f/C-b, C-n/C-p, M-f/M-b by word)' },
    ],
    note: 'C-x C-x swaps point and mark — jumps to the other end of the region',
  },
  {
    name: 'Cut, copy, paste (kill ring)',
    color: COLORS.green,
    steps: [
      { action: 'Select a region (see "Select text")' },
      { keys: 'C-w', action: 'Cut (kill region into kill ring)' },
      { keys: 'M-w', action: 'Copy region to kill ring (no deletion)' },
      { action: 'Move cursor to destination' },
      { keys: 'C-y', action: 'Paste (yank) the most recent kill' },
      { keys: 'M-y', action: 'Cycle to older kills (consult shows the ring)' },
    ],
  },
  {
    name: 'Paste from system clipboard',
    color: COLORS.green,
    steps: [
      { action: 'Copy in the external app (browser, terminal, etc.)' },
      { keys: 'C-y', action: 'Yank — Emacs pulls the system clipboard into the kill ring first' },
    ],
    note: 'If recent internal kills are on top, press M-y after C-y to cycle back to the clipboard entry',
  },
  {
    name: 'Copy to system clipboard',
    color: COLORS.green,
    steps: [
      { action: 'Select a region' },
      { keys: 'M-w', action: 'Copy — region goes to kill ring and system clipboard together' },
    ],
    note: 'Works because select-enable-clipboard is the default. External apps can now paste it',
  },
  {
    name: 'Move selected text',
    color: COLORS.green,
    steps: [
      { action: 'Select the text you want to move' },
      { keys: 'C-w', action: 'Cut it' },
      { action: 'Move cursor to the destination' },
      { keys: 'C-y', action: 'Paste it back in' },
    ],
    note: 'For moving a whole line, C-a C-k C-k cuts line + newline; navigate and C-y',
  },
  {
    name: 'Undo and redo',
    color: COLORS.green,
    steps: [
      { keys: 'C-/', action: 'Undo (also C-_ or C-x u for the short form)' },
      { keys: 'C-?', action: 'Redo (undo-redo — steps forward through the undo history)' },
      { keys: 'C-x u', action: 'Open undo-tree visualiser for branching history' },
    ],
  },
  {
    name: 'Move a file between directories',
    color: COLORS.peach,
    steps: [
      { keys: 'C-x d', action: 'Open Dired on the source directory' },
      { action: 'Move cursor onto the file' },
      { keys: 'R', action: 'Rename — the prompt accepts a full path in another directory' },
      { action: 'Type the destination path and press RET' },
    ],
    note: 'Tip: with two Dired windows open, R defaults the target to the other window\'s directory',
  },
  {
    name: 'Rename a file',
    color: COLORS.peach,
    steps: [
      { keys: 'C-x d', action: 'Open Dired on the directory' },
      { action: 'Move cursor onto the file' },
      { keys: 'R', action: 'Rename — type the new name, RET' },
    ],
    note: 'From an open buffer: M-x rename-visited-file renames the file on disk and the buffer',
  },
  {
    name: 'Delete a file',
    color: COLORS.peach,
    steps: [
      { keys: 'C-x d', action: 'Open Dired on the directory' },
      { keys: 'd', action: 'Flag file for deletion (cursor moves to next line)' },
      { keys: 'x', action: 'Execute — confirms and removes flagged files' },
    ],
    note: 'u unflags a line. D deletes immediately without the flag/execute dance',
  },
  {
    name: 'Create a new file in a directory',
    color: COLORS.peach,
    steps: [
      { keys: 'C-x C-f', action: 'Invoke find-file' },
      { action: 'Type the new path (tab-complete the directory, then type the filename)' },
      { keys: 'RET', action: 'Opens an empty buffer — file is created on first save' },
      { keys: 'C-x C-s', action: 'Save to actually write the file to disk' },
    ],
    note: 'In Dired: + creates a subdirectory. Files are created via find-file',
  },
  {
    name: 'Switch between open files',
    color: COLORS.mauve,
    steps: [
      { keys: 'C-x b', action: 'Switch buffer (consult — fuzzy match, preview)' },
      { action: 'Type part of the filename, RET to select' },
    ],
    note: 'C-x C-b opens ibuffer for a full list view. C-c f b gives a richer picker',
  },
  {
    name: 'Find a file in the project',
    color: COLORS.mauve,
    steps: [
      { keys: 'C-c f f', action: 'Find file in project (fuzzy match across tracked files)' },
      { action: 'Type part of the filename, RET' },
    ],
    note: 'C-x p f is the vanilla project.el equivalent. C-c f r jumps to recent files',
  },
];

const MODIFIERS = [
  { key: 'C-', label: 'Ctrl', desc: 'Control key' },
  { key: 'M-', label: 'Alt', desc: 'Meta key — Alt on PC, Option on Mac' },
  { key: 'S-', label: 'Shift', desc: 'Shift' },
  { key: 's-', label: 'Super', desc: 'Windows/Command key' },
  { key: 'C-M-', label: 'Ctrl + Alt', desc: 'Held together' },
  { key: 'RET', label: 'Enter/Return', desc: 'Enter/Return' },
  { key: 'SPC', label: 'Space', desc: 'Space' },
  { key: 'TAB', label: 'Tab', desc: 'Tab' },
  { key: 'DEL', label: 'Backspace', desc: 'Backspace' },
  { key: '<escape>', label: 'Escape', desc: 'Escape (also equivalent to M- prefix when tapped)' },
];

type View = 'keybindings' | 'workflows';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [view, setView] = useState<View>('keybindings');

  const filteredCategories = CATEGORIES.filter((category) => {
    if (selectedCategory !== 'All' && category.name !== selectedCategory) {
      return false;
    }

    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return category.bindings.some(
      (binding) =>
        binding.keys.toLowerCase().includes(query) ||
        binding.description.toLowerCase().includes(query)
    );
  }).map((category) => ({
    ...category,
    bindings: searchQuery
      ? category.bindings.filter(
          (binding) =>
            binding.keys.toLowerCase().includes(searchQuery.toLowerCase()) ||
            binding.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : category.bindings,
  }));

  const query = searchQuery.toLowerCase();
  const filteredWorkflows = WORKFLOWS.filter((workflow) => {
    if (!searchQuery) return true;
    if (workflow.name.toLowerCase().includes(query)) return true;
    return workflow.steps.some(
      (step) =>
        step.action.toLowerCase().includes(query) ||
        (step.keys?.toLowerCase().includes(query) ?? false) ||
        (step.note?.toLowerCase().includes(query) ?? false)
    );
  });

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: COLORS.yellow, color: COLORS.base }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.base,
        color: COLORS.text,
        fontFamily: "'JetBrains Mono', monospace",
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              color: COLORS.mauve,
            }}
          >
            Emacs Keybindings
          </h1>
          <p style={{ color: COLORS.subtext, fontSize: '0.875rem' }}>
            Interactive reference for Vanilla Emacs with Vertico + Consult + Corfu + Eglot
          </p>
        </header>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          {(['keybindings', 'workflows'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: view === v ? COLORS.mauve : COLORS.surface,
                color: view === v ? COLORS.base : COLORS.text,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <div
          style={{
            backgroundColor: COLORS.surface,
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        >
          <input
            type="text"
            placeholder={view === 'keybindings' ? 'Search keybindings...' : 'Search workflows...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: COLORS.base,
              border: `1px solid ${COLORS.surface}`,
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              color: COLORS.text,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.875rem',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = COLORS.mauve;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = COLORS.surface;
            }}
          />
        </div>

        {view === 'keybindings' && (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: selectedCategory === 'All' ? COLORS.mauve : COLORS.surface,
              color: COLORS.text,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor:
                  selectedCategory === category.name ? category.color : COLORS.surface,
                color: COLORS.text,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
        )}

        {view === 'keybindings' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1rem',
          }}
        >
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              style={{
                backgroundColor: COLORS.surface,
                borderRadius: '8px',
                padding: '1.25rem',
                border: `2px solid transparent`,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = category.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: category.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    width: '4px',
                    height: '20px',
                    backgroundColor: category.color,
                    borderRadius: '2px',
                  }}
                />
                {category.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {category.bindings.map((binding, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem',
                      backgroundColor: COLORS.base,
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      gap: '0.75rem',
                    }}
                  >
                    <code
                      style={{
                        color: category.color,
                        fontWeight: '600',
                        minWidth: '100px',
                      }}
                    >
                      {highlightText(binding.keys, searchQuery)}
                    </code>
                    <span style={{ color: COLORS.text, flex: 1 }}>
                      {highlightText(binding.description, searchQuery)}
                    </span>
                  </div>
                ))}
              </div>
              {category.note && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    backgroundColor: COLORS.base,
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    color: COLORS.subtext,
                    fontStyle: 'italic',
                  }}
                >
                  {category.note}
                </div>
              )}
            </div>
          ))}
        </div>
        )}

        {view === 'workflows' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '1rem',
          }}
        >
          {filteredWorkflows.map((workflow) => (
            <div
              key={workflow.name}
              style={{
                backgroundColor: COLORS.surface,
                borderRadius: '8px',
                padding: '1.25rem',
                border: `2px solid transparent`,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = workflow.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: workflow.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    width: '4px',
                    height: '20px',
                    backgroundColor: workflow.color,
                    borderRadius: '2px',
                  }}
                />
                {highlightText(workflow.name, searchQuery)}
              </h3>
              <ol
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  margin: 0,
                  paddingLeft: '1.25rem',
                  listStyle: 'decimal',
                }}
              >
                {workflow.steps.map((step, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      color: COLORS.text,
                      paddingLeft: '0.25rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {step.keys && (
                        <code
                          style={{
                            color: workflow.color,
                            fontWeight: '600',
                            backgroundColor: COLORS.base,
                            padding: '0.15rem 0.4rem',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                          }}
                        >
                          {highlightText(step.keys, searchQuery)}
                        </code>
                      )}
                      <span style={{ flex: 1 }}>
                        {highlightText(step.action, searchQuery)}
                      </span>
                    </div>
                    {step.note && (
                      <div
                        style={{
                          marginTop: '0.2rem',
                          fontSize: '0.68rem',
                          color: COLORS.subtext,
                          fontStyle: 'italic',
                        }}
                      >
                        {highlightText(step.note, searchQuery)}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              {workflow.note && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    backgroundColor: COLORS.base,
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    color: COLORS.subtext,
                    fontStyle: 'italic',
                  }}
                >
                  {highlightText(workflow.note, searchQuery)}
                </div>
              )}
            </div>
          ))}
        </div>
        )}

        <div
          style={{
            backgroundColor: COLORS.surface,
            padding: '1.5rem',
            borderRadius: '8px',
            marginTop: '2rem',
          }}
        >
          <h2
            style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: COLORS.mauve,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Modifier Key Legend
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            {MODIFIERS.map((mod) => (
              <div
                key={mod.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <code
                  style={{
                    backgroundColor: COLORS.base,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: COLORS.mauve,
                    minWidth: '60px',
                    textAlign: 'center',
                  }}
                >
                  {mod.key}
                </code>
                <span style={{ fontSize: '0.75rem', color: COLORS.text }}>
                  {mod.label}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: COLORS.subtext, fontStyle: 'italic' }}>
            Keybindings are chained sequences — C-c f f means press Ctrl+c, release, then f, then f
          </p>
        </div>

        <footer
          style={{
            marginTop: '3rem',
            padding: '1.5rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: COLORS.subtext,
            borderTop: `1px solid ${COLORS.surface}`,
          }}
        >
          Vanilla Emacs · Catppuccin Mocha · Vertico + Consult + Corfu + Eglot
        </footer>
      </div>
    </div>
  );
}
