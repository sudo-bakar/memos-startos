import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { dataDir, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Memos'))

  const instanceUrlPin = await storeJson
    .read((s) => s.instanceUrl)
    .const(effects)

  const uiInterface = await sdk.host
    .getOwn(effects, 'ui', (h) => h?.bindings[uiPort]?.interfaces['ui'] ?? null)
    .const()
  const addressInfo = uiInterface?.addressInfo ?? null
  const first = (list: string[] | undefined) => list?.[0] ?? null
  // Access mode is captured once from this value on first start: a non-empty
  // URL starts the instance public, an empty one private. Later changes to the
  // URL do not alter it; it is changed only in Memos' own settings.
  const instanceUrl =
    instanceUrlPin ||
    first(addressInfo?.public.format('urlstring')) ||
    first(addressInfo?.nonLocal.format('urlstring')) ||
    ''

  const memosSub = sdk.SubContainer.of(
    effects,
    { imageId: 'memos' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: dataDir,
      readonly: false,
    }),
    'memos',
  )

  return sdk.Daemons.of(effects).addDaemon('memos', {
    subcontainer: memosSub,
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        MEMOS_PORT: String(uiPort),
        MEMOS_DATA: dataDir,
        MEMOS_DRIVER: 'sqlite',
        MEMOS_INSTANCE_URL: instanceUrl,
        MEMOS_LOG_LEVEL: 'info',
      },
    },
    ready: {
      display: i18n('Web Interface'),
      gracePeriod: 30_000,
      fn: () =>
        sdk.healthCheck.checkWebUrl(effects, `http://127.0.0.1:${uiPort}/`, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
