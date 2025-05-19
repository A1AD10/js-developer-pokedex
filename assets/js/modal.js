const modalCard = document.getElementById('modal-card')
let loadedPokemons = []


pokemonList.addEventListener('click', function (event) {
    const li = event.target.closest('.pokemon');
    if (li) {

        const pokemonId = parseInt(li.getAttribute('data-pokemon-id'))
        const pokemon = loadedPokemons.find(p => p.number === pokemonId)

        if (pokemon) {
            modalCard.innerHTML = Modal(pokemon)
            modalCard.classList.add('active')
            ExperienceBar()

            const closeBtn = modalCard.querySelector('.close-btn')
            if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                    modalCard.innerHTML = ''
                    modalCard.classList.remove('active')
                })
            }
        }
    }
});

modalCard.addEventListener('click', (event) => {
    if(event.target.classList.contains('tab-btn')) {
        const tabId = event.target.getAttribute('data-tab')

        modalCard.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
            el.classList.remove('active')
        })

        event.target.classList.add('active')
        document.getElementById(tabId).classList.add('active')
    }

    
})

function ExperienceBar() {
    const bars = modalCard.querySelectorAll('.progress')
    bars.forEach(bar => {
        const value = parseInt(bar.getAttribute('data-value'))
        const max = parseInt(bar.getAttribute('data-max'))
        const percent = Math.min((value / max) * 100, 100)
        bar.style.width = percent + '%'
        bar.style.backgroundColor = value > 50 ? "green" : "red";
    })
}



function Modal(pokemon) {
    return `
        <div class="modal-card pokemon ${pokemon.type}">
            <div class="container-pokemon">
                <button class="close-btn">X</button>
                <div class="head-card">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <div>
                    <ol class="pokemons">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <div class="pokemon-img">
                        <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                    </div>
                </div>
            </div>
        </div>

        <div class="skills-pokemon">

            <div class="modal-tabs">
                <button class="tab-btn active" data-tab="about">About</button>
                <button class="tab-btn" data-tab="state">Base State</button>
            </div>

            <div class="titles">
                <div class="tab-content active" id="about">
                    <div class="info-grid">

                        <div class="info-item">
                            <span class="label">Species</span>
                            <span class="value">${pokemon.name}</span>
                        </div>

                        <div class="info-item">
                            <span class="label">Height</span>
                            <span class="value">${pokemon.height } Cm</span>
                        </div>
                        
                        <div class="info-item">
                            <span class="label">Weight</span>
                            <span class="value">${(pokemon.weight / 10).toFixed(1)} Kg</span>
                        </div>

                        <div class="info-item">
                            <span class="label">Abilities</span>
                            <span class="value">${pokemon.abilities}</span>
                        </div>

                    </div>
                </div>

                <div class="tab-content" id="state">
                    <div class="info-grid">

                        <div class="info-item">
                            <span class="label">HP</span>
                            <span class="value">${pokemon.hp}</span>
                            <div class="experienceBar">
                                <div class="progress" data-value=${pokemon.hp} data-max="210"></div>
                            </div>
                        </div>

                        <div class="info-item">
                            <span class="label">Attack</span>
                            <span class="value">${pokemon.attack }</span>
                            <div class="experienceBar">
                                <div class="progress" data-value=${pokemon.attack} data-max="210"></div>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <span class="label">Defense</span>
                            <span class="value">${pokemon.defense}</span>
                            <div class="experienceBar">
                                <div class="progress" data-value=${pokemon.defense} data-max="210"></div>
                            </div>
                        </div>

                        <div class="info-item">
                            <span class="label">Sp. atk</span>
                            <span class="value">${pokemon.specialAttack}</span>
                            <div class="experienceBar">
                                <div class="progress" data-value=${pokemon.specialAttack} data-max="210"></div>
                            </div>
                        </div>

                        <div class="info-item">
                            <span class="label">Sp. def</span>
                            <span class="value">${pokemon.specialDefense}</span>
                            <div class="experienceBar">
                                <div class="progress" data-value=${pokemon.specialDefense} data-max="210"></div>
                            </div>
                        </div>

                        <div class="info-item">
                            <span class="label">Speed</span>
                            <span class="value">${pokemon.speed}</span>
                            <div class="experienceBar">
                                <div class="progress" data-value=${pokemon.speed} data-max="210"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `
}