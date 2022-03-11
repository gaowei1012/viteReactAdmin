import config from '../config'
let domain: any

console.log('logger==>', import.meta)

if (import.meta.env.MODE == 'local' || !import.meta.env.MODE) {
  console.log('Application deploy as mode Local')
  domain = 'http://' + config.dataServer.host + ':' + config.dataServer.port
} else if (import.meta.env.MODE === 'dev') {
  console.log('Application deploy as mode DEV')
  domain = 'http://' + config.dataServerDev.host + ':' + config.dataServerDev.port
} else if (import.meta.env.MODE === 'docker') {
  console.log('Application deploy as mode Docker')
  domain = 'https://' + config.dataServerDocker.host + ':' + config.dataServerDocker.port
}

export const openPath = domain + '/api/v0.1.0/'
export const USERORG_AUTHPATH = domain + '/api/v0.1.0/auth/'
