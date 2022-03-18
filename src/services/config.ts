import config from '../config'
let base_url: any

console.log('logger==>', import.meta.env.BASE_URL)

if (import.meta.env.MODE == 'dev' || !import.meta.env.MODE) {
  console.log('Application deploy as mode Local')
  base_url = 'http://' + import.meta.env.API_BASE_URL + ':' + import.meta.env.API_PORT
} else if (import.meta.env.MODE === 'local') {
  console.log('Application deploy as mode DEV')
  base_url = 'http://' + import.meta.env.API_BASE_URL + ':' + import.meta.env.API_PORT
} else if (import.meta.env.MODE === 'docker') {
  console.log('Application deploy as mode Docker')
  base_url = 'http://' + import.meta.env.API_BASE_URL + ':' + import.meta.env.API_PORT
}

export const openPath = base_url + '/api/v0.1.0/'
export const USERORG_AUTHPATH = base_url + '/api/v0.1.0/auth/'
