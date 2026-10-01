import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { INSTANCE_URL_AUTO, uiPort } from '../utils'

const { InputSpec, Value } = sdk

// The builder runs when the form opens, so the list is whatever addresses are
// reachable at that moment.
const inputSpec = InputSpec.of({
  url: Value.dynamicSelect(async ({ effects }) => {
    const iface = await sdk.host
      .getOwn(
        effects,
        'ui',
        (h) => h?.bindings[uiPort]?.interfaces['ui'] ?? null,
      )
      .once()
    const origins: string[] =
      iface?.addressInfo?.nonLocal.format('urlstring') ?? []

    const values: Record<string, string> = {
      [INSTANCE_URL_AUTO]: i18n('Auto (derive from current address)'),
    }
    for (const origin of origins) values[origin] = origin

    const stored = await storeJson.read((s) => s.instanceUrl).once()
    const defaultKey =
      stored && origins.includes(stored) ? stored : INSTANCE_URL_AUTO

    return {
      name: i18n('Choose a host'),
      description: i18n(
        'Pin the canonical external origin Memos reports as its instance URL, used for generated links and trusted-origin checks. This does not control public access — set that in Memos under Settings → System → Access and policies. Choose Auto to derive the URL from the current address.',
      ),
      warning: null,
      default: defaultKey,
      values,
    }
  }),
})

export const setInstanceUrl = sdk.Action.withInput(
  'set-instance-url',
  {
    name: i18n('Set Instance URL'),
    description: i18n(
      'Pin the canonical external origin Memos reports as its instance URL, used for generated links and trusted-origin checks. This does not control public access — set that in Memos under Settings → System → Access and policies. Choose Auto to derive the URL from the current address.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  inputSpec,
  async ({ effects }) => {
    const stored = await storeJson.read((s) => s.instanceUrl).once()
    return { url: stored || INSTANCE_URL_AUTO }
  },
  async ({ effects, input }) => {
    const origin = input.url === INSTANCE_URL_AUTO ? '' : input.url
    await storeJson.merge(effects, { instanceUrl: origin })

    return {
      version: '1',
      title: i18n('Instance URL'),
      message: i18n(
        'Instance URL updated. The service restarts automatically to pick up the new host.',
      ),
      result: {
        type: 'single',
        name: i18n('Instance URL'),
        description: null,
        value: origin || i18n('Auto (derive from current address)'),
        masked: false,
        copyable: false,
        qr: false,
      },
    }
  },
)
