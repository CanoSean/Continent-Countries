const continentSelect = document.getElementById('continent-select')
const countryList = document.getElementById('countries-list')

queryFetch(`query{
    continents{
        name
        code
    }
}`
).then(data => {
    data.data.continents.forEach(continent => {
        const option = document.createElement('option')
        option.value = continent.code
        option.innerText = continent.name
        continentSelect.append(option)
    });
    console.log(data.data.continents);
})
//html
continentSelect.addEventListener('change', async e => {
    const contientCode = e.target.value
    const countries = await getContinentCountries(contientCode)
    console.log(countries)
    countryList.innerHTML= ''
    countries.forEach(country => {
        const element = document.createElement('div')
        element.innerHTML = country.name
        countryList.append(element)
    })
})

//getters
function getContinentCountries(contientCode){
    return queryFetch(`
    query getCountries($code: ID!) {
        continent(code: $code){
            countries{
              name
              }
            }
          }
    `, {code: contientCode}).then(data => {
        return data.data.continent.countries
    })
}
//fetch JS
function queryFetch(query, variables){
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    }).then(res => res.json())
}