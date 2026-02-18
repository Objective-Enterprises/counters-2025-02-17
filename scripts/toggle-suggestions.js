const fs = require('fs');
const path = require('path');

const workspaceRoot = process.cwd();
const vscodeDir = path.join(workspaceRoot, '.vscode');
const settingsPath = path.join(vscodeDir, 'settings.json');
const backupPath = path.join(vscodeDir, 'settings.backup.json');

const keysToChange = {
  "editor.quickSuggestions": false,
  "editor.suggestOnTriggerCharacters": false,
  "editor.wordBasedSuggestions": false,
  "editor.parameterHints.enabled": false,
  "editor.inlineSuggest.enabled": false,
  "github.copilot.enable": false
};

function readJson(p) {
  if (!fs.existsSync(p)) return {};
  try {
    const raw = fs.readFileSync(p, 'utf8') || '{}';
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse JSON at', p, e);
    return {};
  }
}

if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir);

const original = readJson(settingsPath);
fs.writeFileSync(backupPath, JSON.stringify(original, null, 2), 'utf8');

const newSettings = Object.assign({}, original, keysToChange);
fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), 'utf8');

console.log('Suggestions disabled in', settingsPath);
console.log('A backup was saved to', backupPath);
console.log('This process will restore settings in 60 minutes. Keep this process running or restore the backup manually.');

const RESTORE_MS = 60 * 60 * 1000;

setTimeout(() => {
  try {
    if (fs.existsSync(backupPath)) {
      const backup = readJson(backupPath);
      fs.writeFileSync(settingsPath, JSON.stringify(backup, null, 2), 'utf8');
      fs.unlinkSync(backupPath);
      console.log('Settings restored from backup.');
    } else {
      const curr = readJson(settingsPath);
      for (const k of Object.keys(keysToChange)) delete curr[k];
      fs.writeFileSync(settingsPath, JSON.stringify(curr, null, 2), 'utf8');
      console.log('Settings restored (no backup found).');
    }
  } catch (e) {
    console.error('Failed to restore settings:', e);
  }
  process.exit(0);
}, RESTORE_MS);

// keep the process alive
process.stdin.resume();
