import { setInstanceUrl } from '../actions/setInstanceUrl'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchInstanceUrl = sdk.setupOnInit(async (effects) => {
  await sdk.action.createOwnTask(effects, setInstanceUrl, 'optional', {
    reason: i18n(
      'If Memos should advertise a stable external origin for generated links and trusted-origin checks, pin the Instance URL to your domain. Otherwise it is derived automatically from the current address.',
    ),
  })
})
