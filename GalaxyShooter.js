let jet = document.getElementById('jet');
let board = document.getElementById('board');
window.addEventListener('keydown', (e) => {
    let left = parseInt(window.getComputedStyle(jet).getPropertyValue('left'));
    
    if(e.key == 'ArrowLeft' && left > 0){ 
        jet.style.left = left - 10 + 'px';
    }
    //450 => board width - jet width
    else if(e.which == '39' && -left <= 450){
        jet.style.left = left + 10 + 'px';
    }

    // 38 for up arrow & 32 for space bar.
    if(e.which == '38' || e.which == '32'){
        let bullet = document.createElement('div');
        bullet.classList.add('bullets');
        board.appendChild(bullet);

        let movebullet = setInterval(() => {
            let rocks = document.getElementsByClassName('rocks');

            for (var i = 0; i < rocks.length; i++){
                let rock = rocks[i];

                let rockbound = rock.getBoundingClientRect();
                let bulletbound = bullet.getBoundingClientRect();

                // Condition to check wether rock/alien and the bullet are in the same position.
                if(bulletbound.left >= rockbound.left && 
                   bulletbound.right <= rockbound.right && 
                   bulletbound.top <= rockbound.top && 
                   bulletbound.bottom <= rockbound.bottom)
                    {
                        rock.parentElement.removeChild(rock); 
                        document.getElementById('points').innerHTML = 
                        parseInt(document.getElementById('points').innerHTML) + 1;
                }
            }
            
            let bulletbottom = parseInt(
                window.getComputedStyle(bullet).getPropertyValue('bottom')
            );

            //stops bullet from moving outside gamebox
            if(bulletbottom >= 500){
                clearInterval(movebullet);
            }



            bullet.style.left = left + 17 + 'px';
            bullet.style.bottom = bulletbottom + 3 + 'px';
        });
    } 
});

let generaterocks = setInterval(() =>{

    let rock = document.createElement('div');
    rock.classList.add('rocks');
    //getting left of rock to place in random position...
    let rockLeft = parseInt(
        window.getComputedStyle(rock).getPropertyValue('left')
    );
    
    //generate value between 0 and 440 where 460 => board width - rock width
    rock.style.left = Math.floor(Math.random() * 440) + 'px';

    board.appendChild(rock);

}, 1000);

let moverocks = setInterval(() =>{

    let rocks = document.getElementsByClassName('rocks');

    if(rocks != undefined){
        for (let i = 0; i < rocks.length; i++){
            //Now to increase top of each rock, to move them down.
            let rock = rocks[i];
            let rocktop = parseInt(
                window.getComputedStyle(rock).getPropertyValue('top')
            );

            // 475 board height - rock height
            if(rocktop >= 475){
                alert('Game Over');
                clearInterval(moverocks);
                window.location.reload();
            }

            rock.style.top = rocktop + 25 + 'px';

        }

    }



}, 650);