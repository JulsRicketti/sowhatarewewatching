import axios from 'axios'

export default async function getCountryList () {
  const countryList = (await axios.get('https://restcountries.eu/rest/v2/all'))
    .data
    .map(country => country.name)

  return countryList
}
