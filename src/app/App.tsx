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

const CATEGORIES: Category[] = [
  {
    name: 'Navigation & Files',
    color: COLORS.blue,
    bindings: [
      { keys: 'C-c f f', description: 'Find file in project' },
      { keys: 'C-c f r', description: 'Recent files' },
      { keys: 'C-c f g', description: 'Ripgrep search' },
      { keys: 'C-c f b', description: 'Switch buffer' },
      { keys: 'C-c e', description: 'Toggle file tree (Treemacs)' },
    ],
  },
  {
    name: 'Search & Movement',
    color: COLORS.green,
    bindings: [
      { keys: 'C-s', description: 'Search in buffer (consult-line)' },
      { keys: 'M-y', description: 'Yank from kill ring' },
      { keys: 'M-g g', description: 'Goto line' },
      { keys: 'M-g i', description: 'Jump to symbol (imenu)' },
    ],
  },
  {
    name: 'Window & Buffer Management',
    color: '#6c9bd1',
    bindings: [
      { keys: 'C-x 2', description: 'Split window below' },
      { keys: 'C-x 3', description: 'Split window right' },
      { keys: 'C-x 0', description: 'Close current window' },
      { keys: 'C-x 1', description: 'Close all other windows' },
      { keys: 'C-x o', description: 'Switch to next window' },
      { keys: 'C-x b', description: 'Switch buffer (Vertico)' },
      { keys: 'C-x C-b', description: 'List all buffers' },
      { keys: 'C-x k', description: 'Kill current buffer' },
      { keys: 'C-x 4 b', description: 'Open buffer in other window' },
      { keys: 'C-x 4 f', description: 'Open file in other window' },
      { keys: 'C-x ^', description: 'Grow window taller' },
      { keys: 'C-x }', description: 'Grow window wider' },
      { keys: 'C-x {', description: 'Shrink window wider' },
      { keys: 'M-<PgUp>', description: 'Scroll other window up' },
      { keys: 'M-<PgDn>', description: 'Scroll other window down' },
      { keys: 'C-x 4 0', description: 'Kill buffer and close its window' },
      { keys: 'C-x <left>', description: 'Previous buffer' },
      { keys: 'C-x <right>', description: 'Next buffer' },
    ],
    note: 'Use winner-mode (C-c <left> / C-c <right>) to undo/redo window layout changes',
  },
  {
    name: 'LSP & Code',
    color: COLORS.mauve,
    bindings: [
      { keys: 'C-c r n', description: 'Rename symbol' },
      { keys: 'C-c c a', description: 'Code actions' },
      { keys: 'C-c c x', description: 'Diagnostics' },
      { keys: 'C-c f m', description: 'Format buffer' },
    ],
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
    name: 'Projects & Treemacs Workspaces',
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
      { keys: 'C-c C-w e', description: 'Edit workspaces (inside Treemacs)' },
      { keys: 'C-c C-w s', description: 'Switch workspace (inside Treemacs)' },
      { keys: 'C-c C-w a', description: 'Add workspace (inside Treemacs)' },
      { keys: 'C-c C-w d', description: 'Delete workspace (inside Treemacs)' },
      { keys: 'C-c C-w r', description: 'Rename workspace (inside Treemacs)' },
      { keys: 'C-c C-p a', description: 'Add project to workspace (inside Treemacs)' },
      { keys: 'C-c C-p d', description: 'Remove project from workspace (inside Treemacs)' },
      { keys: 'C-c C-p r', description: 'Rename project in workspace (inside Treemacs)' },
    ],
    note: 'Treemacs workspaces group multiple project roots — use them to organise personal vs work contexts',
  },
  {
    name: 'Git',
    color: COLORS.red,
    bindings: [
      { keys: 'C-c g', description: 'Magit status' },
    ],
  },
  {
    name: 'Org Mode',
    color: COLORS.yellow,
    bindings: [
      { keys: 'C-c o a', description: 'Agenda' },
      { keys: 'C-c o c', description: 'Capture' },
      { keys: 'C-c o w', description: 'Load workspace' },
    ],
  },
  {
    name: 'Claude Code IDE',
    color: COLORS.mauve,
    bindings: [
      { keys: 'C-c k k', description: 'IDE menu' },
      { keys: 'C-c k s', description: 'Start session' },
      { keys: 'C-c k r', description: 'Resume session' },
      { keys: 'C-c k q', description: 'Stop session' },
      { keys: 'C-c k t', description: 'Toggle panel' },
    ],
  },
  {
    name: 'Markdown',
    color: COLORS.green,
    bindings: [
      { keys: 'C-c P', description: 'Live browser preview' },
      { keys: 'C-c m', description: 'Mermaid preview' },
    ],
  },
  {
    name: 'Essential Emacs',
    color: COLORS.subtext,
    bindings: [
      { keys: 'C-x C-s', description: 'Save file' },
      { keys: 'C-x C-f', description: 'Open file' },
      { keys: 'C-g', description: 'Cancel/quit' },
      { keys: 'M-x', description: 'Command palette (with Vertico)' },
      { keys: 'C-/', description: 'Undo' },
      { keys: 'C-x u', description: 'Undo tree' },
    ],
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

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
            backgroundColor: COLORS.surface,
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        >
          <input
            type="text"
            placeholder="Search keybindings..."
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
