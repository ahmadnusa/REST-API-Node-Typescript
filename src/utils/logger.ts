import moment from 'moment'
import pino from 'pino'
import PinoPretty from 'pino-pretty'

export const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `,"time":"${moment().format('YYYY-MM-DD HH:mm:ss')}"`
  },
  PinoPretty()
)
