
    // default character data
    var characterList = [
        {
            name: "Sly Cooper",
            code: 'sly',
            health: 150,
            pic: "../unit-4-game-master/assets/images/sly.jpg",
            moveSet: [{
                name:"Cane Wack",
                attack:8, // damage done to opponent
                defense:0, // damage deflected from self
                attack_chance: 80, // chance to land a hit to opponent (attack success)
                defense_chance: 0 // chance to defend self (defense success)
            },{
                name:"Parry",
                attack:0,
                defense:8,
                attack_chance: 0,
                defense_chance: 80
            }]
        }, {
            name: "Clockwerk",
            code: 'clk',
            health: 180,
            pic: "../unit-4-game-master/assets/images/Clockwerkmetal.png",
            moveSet: [{
                name:"Bird Breath",
                attack:8,
                defense:0,
                attack_chance: 80,
                defense_chance: 0
            },{
                name:"Wing Flutter",
                attack:0,
                defense:8,
                attack_chance: 0,
                defense_chance: 90
            }]
        }, {
            name: "Murray",
            code: 'mur',
            health: 120,
            pic: "../unit-4-game-master/assets/images/murray.jpg",
            moveSet: [{
                name:"Sucka Punch",
                attack:8,
                defense:0,
                attack_chance: 80,
                defense_chance: 0
            },{
                name:"Parry",
                attack:0,
                defense:8,
                attack_chance: 0,
                defense_chance: 80
            }]
        }, {
            name: "Dimitri Lousteau",
            code: 'dim',
            health: 100,
            pic: "../unit-4-game-master/assets/images/dimitrilousteau.jpg",
            moveSet: [{
                name:"Elbow Smack",
                attack:8,
                defense:0,
                attack_chance: 80,
                defense_chance: 0
            },{
                name:"Purple Charge",
                attack:0,
                defense:8,
                attack_chance: 0,
                defense_chance: 100
            }]
        }

    ];

    //varibles for playing the game
    var gameRoster = [];
    var player = {};
    var computer = {};
    var playerPicked = false;
    var computerPicked = false;
    var intervalid;
    var gameRunning = false;
    var audio = new Audio('sly.mp3')
    
    //new/reset function
    function newGame() {
        gameRoster = [...characterList];
        console.log(characterList);
        player = {};
        computer = {};
        gameRunning = true;
        playerPicked = false;
        computerPicked = false;
        audio.play().loop;
        $("#actions").hide();
        $("#character-grid").hide();
        $("#move-grid").hide();
        printCharacters(gameRoster);
        
    }

    //print character list

    function printCharacters(characterArray) {
        $("#character-list").empty();
        if (characterArray.length === 0) {
            $("#character-list").text("No characters left!");
            return false;
        }
        characterArray
            .forEach(function (characterInfo, i) {
                //character div
                var character = $("<div class='character'>");
                character
                    .css({
                        "background-image": "url(" + characterInfo.pic + ")"
                    })
                    .attr({ "data-id": i });
                var charStats = $("<div>");
                charStats
                    .addClass("character-stats")
                    .html(`<h4>${characterInfo.name}</h4>HP: ${characterInfo.health} <br/>`)
                    .appendTo(character);

                $("#character-list").append(character)
            })
    }

    

    //add player to active game area
    function activatePlayer(playerInfo, playerPosition, playerStats, playerTitle) {
        console.log(playerInfo, playerPosition);
        $(playerPosition).css({
            "background-image": "url(" + playerInfo.pic + ")"
        })
        $(playerStats)
            .html(`<h4>${playerInfo.name} - ${playerTitle}</h4>HP: ${playerInfo.health} <br/>`)
            .removeClass("defeated")
    }

    //select character

    $(document)
        .on("click", ".character", function () {
            //get character id so we can pull it out of gameRoster array by it's index
            var playerID = $(this).attr("data-id");

            if (!playerPicked && gameRunning) {
                playerPicked = true;
                player = {
                    ...gameRoster[playerID]
                };
                $("#character-grid").show();
                gameRoster.splice(playerID, 1); 
                printCharacters(gameRoster);
                activatePlayer(player, "#player", "#player-stats", "Attacker");
                $("#move-grid").show();
                $("#slot1").html(`${player.moveSet[0].name}`);
                $("#slot2").html(`${player.moveSet[1].name}`);
                $("#actions").show();
                $("#actions").html(`Player chose ${player.name}<br>`);
            } else if (!computerPicked && gameRunning) {
                computerPicked = true;
                computer = {
                    ...gameRoster[playerID]
                };
                $("#character-grid").show();
                gameRoster.splice(playerID, 1);
                printCharacters(gameRoster);
                activatePlayer(computer, "#computer", "#computer-stats", "Defender");
                $("#actions").append(`Computer is ${computer.name}<br>`);
            }
            else {
                alert("Both players are active");
            }
        });
    
    
        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

    function print_charachters(){
        $("#player-stats").html(`<h4>${player.name} - Attack</h4>HP: ${player.health} <br/>`);
        $("#computer-stats").html(`<h4>${computer.name} - Defender</h4>HP: ${computer.health} <br/>`);
    }

    function changeHealthAfterAttack(attacker, attackee){
        attackee_health = attackee.health;
        if (attacker.attack >= attackee.health){
            attackee.health = 0;
        } else {
            attackee.health -= attacker.attack;
        }
    }


    
    function changeHealthAfterAttack(attacker, attackee){
        attackee_health = attackee.health;
        if (attacker.attack >= attackee.health){
            attackee.health = 0;
        } else {
            attackee.health -= attacker.attack;
        }
    }

    function changeHealth(character, damageDealt) {
        attackee_health = character.health;
        if (damageDealt >= character.health){
            character.health = 0;
        } else {
            character.health -= damageDealt;
        }
    }
    function attackValue(slotMove){
        var ranNum = randomNumber(1, 100); // 1 to 100 inclusive (0 chance items never succeed!)
        if (slotMove.attack_chance >= ranNum){
            return slotMove.attack;
        } else {
            return 0;
        }
    }
    function defenseValue(slotMove){
        var ranNum = randomNumber(1,100); // 1 to 100 inclusive (0 chance items never succeed!)
        if (slotMove.defense_chance >= ranNum){
            return slotMove.defense;
        } else {
            return 0;
        }
    }
    function computerSlot(slots){
        $("#actions").append(`${slots.length}`);
        var ranNum = randomNumber(0, slots.length - 1);
        $("#actions").append(`${ranNum}<br>`);
        return this.slots[ranNum];
    }



    function madeAMove(playerSlot) {

        $("#actions").append(`Player chose ${playerSlot.name}<br>`);
        player_attack = attackValue(playerSlot);
        player_defense = defenseValue(playerSlot);
        
        computerMove = computer.moveSet[randomNumber(0,1)];
        $("#actions").append(`${computer.name} chose ${computerMove.name}<br>`);
        computer_attack = attackValue(computerMove);
        computer_defense = defenseValue(computerMove);

        damageToComp = 0;
        damageToPlayer = 0;
        if (player_attack > computer_defense){
            damageToComp = player_attack - computer_defense;
        }
        if (computer_attack > player_defense){
            damageToPlayer = computer_attack - player_defense;
        }


        message = "";
        if (player_attack == playerSlot.attack && player_attack > 0) {
            message = message + `${playerSlot.name} was a hit! It caused ${player_attack}<br>`
        } else if (player_attack != playerSlot.attack) {
            message = message + `${playerSlot.name} Missed!<br>`
        }

        if (player_defense == playerSlot.defense && player_defense > 0) {
            message = message + `${playerSlot.name} deflected ${player_defense} damage!<br>`
        } else if (player_defense != playerSlot.defense) {
            message = message + `${playerSlot.name} was too slow!<br>`
        }

        if (computer_attack == computerMove.attack && computer_attack > 0) {
            message = message + `${computerMove.name} hit you with ${computer_attack}!<br>`
        } else if (computer_attack != computerMove.attack) {
            message = message + `${computerMove.name} missed!<br>`
        }

        if (computer_defense == computerMove.defense && computer_defense > 0) {
            message = message + `${computerMove.name} deflected ${computer_defense} damage!<br>`
        } else if (computer_defense != computerMove.defense) {
            message = message + `${computerMove.name} was too slow!<br>`
        }

        message = message + `Total Damage given: ${damageToComp}<br>Total Damage taken: ${damageToPlayer}<br>`
        
        $("#actions").append(`${message}`)
        changeHealth(player, damageToPlayer);
        changeHealth(computer, damageToComp);
        print_charachters();
        checkBattleStatus();
    }
    function checkBattleStatus(){
        if (computer.health <= 0) {
            computerPicked = false;
            $("#computer-stats")
                .html(`<h3>Defeated!</h3><h4>${computer.name} - Defender</h4>HP: ${computer.health} <br/>Attack: ${computer.attack}<br/>Counter: ${computer.counter}`)
                .addClass("defeated");
            // check and see if there are anymore characters left
            if (gameRoster.length === 0) {

                gameRunning = false;
                alert("You won! Start a new game!")
            }
            return false;
        }
        if (player.health <= 0) {
            playerPicked = false;
            computerPicked = false;
            gameRunning = false;
            $("#player-stats")
                .html(`<h3> Defeated!</h3><h4>${player.name} - Defender</h4>HP: ${player.health} <br/>Attack: ${player.attack}<br/>Counter: ${player.counter}`)
                .addClass("defeated")

            alert("You've lost! Start new game!")
        }
    }

    function attack() {
        //player attacks cpu
        changeHealthAfterAttack(player, computer);
        //player's attack increases
        player.attack += player.defaultAttack;
        $("#actions").append(`Player chose ${player.moveSet[0].name}<br>`)
        // check to see if defender has lost
        

        // cpu attacks player
        changeHealthAfterAttack(computer, player);
        print_charachters(); 
    }
    function slot1() {
        madeAMove(player.moveSet[0])
    }
    function slot2() {
        madeAMove(player.moveSet[1])
    }

    //New Game Button
    $("#new-game").on("click", newGame);

    // Attack button

    $("#slot1").on("click", function () {
        if (playerPicked && computerPicked && gameRunning) {
            slot1();
        }
        else {
            alert("You need to pick a player!")
        }
    })


    $("#slot2").on("click", function () {
        if (playerPicked && computerPicked && gameRunning) {
            slot2();
        }
        else {
            alert("You need to pick a player!")
        }
    })

    newGame();
    

