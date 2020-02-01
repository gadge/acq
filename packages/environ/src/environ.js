import os from 'os'

export class Environ {
  static deviceInfo () {
    return {
      hostname: os.hostname(),
      homedir: os.homedir(),
      device: `[arch] ${process.arch} [platform] ${process.platform}`,
      cpus: os.cpus(),
    }
  }

  static loadInfo () {
    const [m1, m5, m15] = os.loadavg().map(x => x.toFixed(3))
    return {
      freemem: `${~~(os.freemem() / 0x100000)} / ${~~(os.totalmem() / 0x100000)}`,
      loadavg: { m1, m5, m15 },
    }
  }

  static ipInfo = (family = 'IPv4') => {
    let o = {}
    for (let [key, list] of Object.entries(os.networkInterfaces()))
      for (let info of list)
        if (!info.internal && info.family === family) o[key] = info.address
    return o
  }
}


