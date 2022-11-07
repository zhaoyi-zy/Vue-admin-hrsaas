import defaultSettings from '@/settings'

const title = defaultSettings.title || 'HR Saas 中台系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
