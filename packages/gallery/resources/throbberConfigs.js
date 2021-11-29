import { humanScale }          from '@acq/path'
import { FRESH }               from '@palett/presets'
import { ProjectorFactory }    from '@palett/projector-factory'
import { ros }                 from '@spare/logger'
import { CHARSET_SHADE, Spin } from 'baro'


const projectorFactory = ProjectorFactory.fromHEX({ min: 0, max: 2 << 20 }, FRESH)
export const DEZEEN_BARO_CONFIG = {
  autoClear: false,
  hideCursor: true,
  stream: process.stdout,
  fps: 8,
}
export const DEZEEN_BARO_LAYOUT = {
  char: CHARSET_SHADE,
  size: 12,
  autoZero: true,
  bar(notation) {
    notation.spin = !notation.spin ? Spin.build(12, 4, 2) : notation.spin.next()
    return notation.spin.renderBar(this.chars)
  },
  format(notation) {
    const { timestamp, agent, path, url, stage, stageStamp } = notation
    const dye = projectorFactory.make(notation.value)
    const bar =
            stage === 'saved' ? `${this.fullBar}`
              : stage === 'error' ? `${this.zeroBar}` :
                `${this.bar(notation)}`
    return `${timestamp} [${ros(agent)}] ${dye(stageStamp + ' ' + bar)} | ${humanScale(notation.value)} | ${path ?? url}`
  }
}