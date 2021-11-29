import axios from 'axios'

const test = async () => {
  let apiRes = null
  try {
    apiRes = await axios.get('https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter-extra_dezeen_2364_col_20.jpg')
  } catch (err) {
    console.error("Error response:")
    console.error(err.response.data)
    console.error(err.response.status)
    console.error(err.response.headers)
  } finally {
    console.log(apiRes)
  }
}

test().then()