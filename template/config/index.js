import {
  join
} from 'path'

export default {
  assetsPath: (...relativePath) => join(__dirname, '..', ...relativePath),
  port: 8018,
  remUnit: 75
}
