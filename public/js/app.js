const section = document.querySelector('section')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const city = document.querySelector('#city')
const nation = document.querySelector('#nation')
const worldTime = document.querySelector('#world-time')
const summary = document.querySelector('#summary')
const temperature = document.querySelector('#temperature')

const changeBackground = () => {
    const list = [section, city, nation, worldTime, summary, temperature]
    for(let i=0; i<list.length; i++) {
        if(list[i].classList.contains('c1')){
            list[i].classList.remove('c1')
            list[i].classList.add('c2')
        } else if(list[i].classList.contains('c2')){
            list[i].classList.remove('c2')
            list[i].classList.add('c3')
        } else{
            list[i].classList.remove('c3')
            list[i].classList.add('c1')
        }
    }
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    changeBackground()
    const location = search.value

    city.textContent = 'Loading...'
    nation.textContent = ''
    worldTime.textContent = ''
    summary.textContent = ''
    temperature.textContent = ''

    // fetch this url and the run this callback function
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                city.textContent = data.error
            } else {
                city.textContent = data.city
                nation.textContent = data.nation
                worldTime.textContent = data.time
                summary.textContent = data.summary
                temperature.textContent = Math.floor((data.temperature - 32) * 5 / 9) + '°C'
            }
        })
    })
})