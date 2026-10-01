export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Memos': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  // interfaces.ts
  'Self-hosted note-taking service — capture and organize Markdown notes.': 4,
  // actions/setInstanceUrl.ts
  'Set Instance URL': 5,
  'Pin the canonical external origin Memos reports as its instance URL, used for generated links and trusted-origin checks. This does not control public access — set that in Memos under Settings → System → Access and policies. Choose Auto to derive the URL from the current address.': 6,
  'Instance URL': 7,
  'Instance URL updated. The service restarts automatically to pick up the new host.': 8,
  'Choose a host': 9,
  'Auto (derive from current address)': 10,
  // init/watchInstanceUrl.ts
  'If Memos should advertise a stable external origin for generated links and trusted-origin checks, pin the Instance URL to your domain. Otherwise it is derived automatically from the current address.': 11,
  // actions/resetPassword.ts
  'Reset Admin Password': 12,
  'Generate a new password for the administrator account. Use this if you are locked out of the web interface.': 13,
  'This replaces the administrator password with a new random one.': 14,
  'Admin Password Reset': 15,
  'The administrator password has been reset. Save these credentials somewhere safe — they are shown once. Sessions signed in with the old password have been signed out. Start the service to sign in.': 16,
  Username: 17,
  Password: 18,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
