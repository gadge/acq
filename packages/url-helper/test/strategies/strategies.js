const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: {
    simple: [],
    misc: [],
  },
  methods: {
    bench: x => x,
    dev: x => x,
    edge: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
