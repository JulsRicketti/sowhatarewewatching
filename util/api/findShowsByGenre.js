import axios from 'axios'
import Config from '../../config'

const {
  X_RAPID_API_BASE_URL,
  X_RAPID_API_HOST,
  X_RAPID_API_KEY
} = Config

export default function findShowsByGenre (genre) {
  return axios.get(`${X_RAPID_API_BASE_URL}/api.cgi?t=genres`, {
    headers: {
      'X-RapidAPI-Host': X_RAPID_API_HOST,
      'X-RapidAPI-Key': X_RAPID_API_KEY
    }
  })
    .then(res => {
      console.warn('!!RES', res)
      return res
    })
}
