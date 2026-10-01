import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'memos',
  title: 'Memos',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/memos-startos',
  upstreamRepo: 'https://github.com/usememos/memos',
  marketingUrl: 'https://usememos.com',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    memos: {
      source: { dockerTag: 'neosmemo/memos:0.31.0' },
      arch: ['x86_64', 'aarch64'],
    },
    reset: {
      source: { dockerBuild: { workdir: 'reset' } },
      arch: ['x86_64', 'aarch64'],
    },
  },
  hardwareRequirements: {
    ram: 256 * 1024 ** 2,
  },
  dependencies: {},
})
