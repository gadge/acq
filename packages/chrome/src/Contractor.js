import { says, Xr } from '@spare/logger'

const defaultId = ({ id }) => id
export class Contractor {
  service
  agentPool
  #taskAgenda
  agentId = defaultId

  constructor(service, agentPool, agentId) {
    this.service = service
    this.agentPool = agentPool
    this.agentId = agentId ?? defaultId
  }

  static build(service, agentPool, agentId) { return new Contractor(service, agentPool, agentId) }

  async assignAgent() {
    if (!this.agentPool.length) await Promise.race(this.#taskAgenda)
    return this.agentPool.shift()
  }

  createTask(agent, job) {
    return Promise.resolve().then(this.service.bind(agent, job))
  }

  addAgenda(agent, task) {
    const agentStatus = task.then(() => {
      // Xr()
      //   ['agent'](agent |> deco)
      //   ['agents'](this.agents |> deco)
      //   ['taskAsPromise'](taskAsPromise|> deco)
      //   ['#agentAgenda'](this.#taskAgenda |> deco)
      //   |> says['asyncPool']
      this.#taskAgenda.delete(agentStatus)
      this.agentPool.push(agent)
      return agent
    })
    this.#taskAgenda.add(agentStatus)
  }

  async takeOrders(jobs, log = false) {
    const agentDelivers = []
    this.#taskAgenda = new Set()
    let i = 0
    for (const job of jobs) {
      const agent = await this.assignAgent()
      if (log) Xr().agent(this.agentId(agent)).p(`to job ${ i++ }`).pool(this.agentPool.length) |> says['contractor'].br('assigned')
      const toBeDelivered = this.createTask(agent, job)
      this.addAgenda(agent, toBeDelivered)
      agentDelivers.push(toBeDelivered)
    }
    return Promise.all(agentDelivers)
  }
}