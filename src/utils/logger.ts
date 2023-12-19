import moment from 'moment'
import pino from 'pino'
import PinoPretty from 'pino-pretty'

export const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `,"time":"${moment().format()}"`
  },
  PinoPretty()
)
