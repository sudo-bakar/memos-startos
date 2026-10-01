import { utils } from '@start9labs/start-sdk'
import bcrypt from 'bcryptjs'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { dataDir } from '../utils'

// Memos ships no CLI for user management, so the only way back into a locked-out
// instance is to write the hash into its database directly.
export const resetPassword = sdk.Action.withoutInput(
  'reset-password',

  async () => ({
    name: i18n('Reset Admin Password'),
    description: i18n(
      'Generate a new password for the administrator account. Use this if you are locked out of the web interface.',
    ),
    warning: i18n(
      'This replaces the administrator password with a new random one.',
    ),
    // The database is a file on the volume, so nothing may hold it open.
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,1-9',
      len: 22,
    })
    const hash = bcrypt.hashSync(password, 10)

    let username = ''
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'reset' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: dataDir,
        readonly: false,
      }),
      'reset-password',
      async (sub) => {
        // 0.30 renamed the owner role HOST -> ADMIN; an instance migrated from
        // an older release can still carry HOST rows.
        // The hash reaches the script through the environment because a bcrypt
        // hash is full of `$` and the shell would expand it away.
        // Refresh tokens live in user_setting under the key REFRESH_TOKENS;
        // removing that row signs the account's sessions out, matching what
        // Memos does when a password is changed or reset in the web UI.
        const script = `set -e
DB=${dataDir}/memos_prod.db
[ -f "$DB" ] || exit 2
ID=$(sqlite3 "$DB" "SELECT id FROM user WHERE role IN ('HOST','ADMIN') ORDER BY id LIMIT 1")
[ -n "$ID" ] || exit 2
sqlite3 "$DB" "DELETE FROM user_setting WHERE user_id=$ID AND key='REFRESH_TOKENS'"
sqlite3 "$DB" "UPDATE user SET password_hash='$HASH', updated_ts=strftime('%s','now') WHERE id=$ID"
sqlite3 "$DB" "SELECT username FROM user WHERE id=$ID"`

        const res = await sub.exec(['sh', '-c', script], {
          env: { HASH: hash },
        })

        if (res.exitCode === 2) {
          throw new Error(
            'No administrator account exists yet. Open the web interface and create your account first.',
          )
        }
        if (res.exitCode !== 0) {
          throw new Error(
            `Failed to reset the password: ${res.stderr.toString()}`,
          )
        }
        username = res.stdout.toString().trim()
      },
    )

    return {
      version: '1',
      title: i18n('Admin Password Reset'),
      message: i18n(
        'The administrator password has been reset. Save these credentials somewhere safe — they are shown once. Sessions signed in with the old password have been signed out. Start the service to sign in.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: username,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
