import axios from 'axios'

const getImage = async (url) => {
  const { data, headers, response } = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

}