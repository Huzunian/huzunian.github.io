const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})


let enemy 
let playerMonster 
let renderedSprites
let queue

let battleAnimationId

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    enemy = new Monster(monsters.Draggle)
    playerMonster = new Monster(monsters.Emby)
    renderedSprites  = [enemy, playerMonster]
    queue = []

    playerMonster.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

    // event listeners for buttons (attack)
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        playerMonster.attack({
            attack: selectedAttack, 
            recipient: enemy,
            renderedSprites
        })

        if (enemy.health <= 0){
            queue.push(() => {
                enemy.faint()
            })  
            queue.push(() => {
                //fade out
                gsap.to('#overlappingDiv',{
                    opacity: 1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        animate()
                        document.querySelector('#userInterface').style.display = 'none'
                        gsap.to('#overlappingDiv', {
                            opacity: 0
                        })
                        audio.map.play()
                        battle.initiated = false
                    }
                })
            })  
        }
        //Enemy attacks here
        const randomAttack = 
            enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]

        queue.push(() => {
            enemy.attack({
                attack: randomAttack, 
                recipient: playerMonster,
                renderedSprites
            })

            if (playerMonster.health <= 0){
                queue.push(() => {
                    playerMonster.faint()
                })  
                gsap.to('#overlappingDiv',{
                    opacity: 1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        animate()
                        document.querySelector('#userInterface').style.display = 'none'
                        gsap.to('#overlappingDiv', {
                            opacity: 0
                        })

                        battle.initiated = false
                        audio.map.play()
                    }
                })
            }
        })
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color
    })
})
}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

animate()
//initBattle()
//animateBattle()

document.querySelector('#dialogBox').addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue [0] ()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})