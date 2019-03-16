
    // default character data
    var characterList = [
        {
            name: "Sly Cooper",
            health: 150,
            attack: 8,
            counter: 15,
            defaultAttack: 8,
            pic: "../unit-4-game/assets/images/sly.jpg"
        }, {
            name: "Clockwerk",
            health: 180,
            attack: 7,
            counter: 25,
            defaultAttack: 7,
            pic: "../unit-4-game/assets/images/Clockwerkmetal.png"
        }, {
            name: "Murray",
            health: 120,
            attack: 8,
            counter: 20,
            defaultAttack: 8,
            pic: "../unit-4-game/assets/images/murray.jpg"
        }, {
            name: "Dimitri Lousteau",
            health: 100,
            attack: 14,
            counter: 5,
            defaultAttack: 14,
            pic: "../unit-4-game/assets/images/dimitrilousteau.jpg"
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

    //new/reset function
    function newGame() {
        gameRoster = [...characterList];
        console.log(characterList);
        player = {};
        computer = {};
        gameRunning = true;
        playerPicked = false;
        computerPicked = false;

        $("#character-grid").hide();
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
                    .html(`<h4>${characterInfo.name}</h4>HP: ${characterInfo.health} <br/>Attack: ${characterInfo.attack}<br/>Counter: ${characterInfo.counter}`)
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
            .html(`<h4>${playerInfo.name} - ${playerTitle}</h4>HP: ${playerInfo.health} <br/>Attack: ${playerInfo.attack}<br/>Counter: ${playerInfo.counter}`)
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
            } else if (!computerPicked && gameRunning) {
                computerPicked = true;
                computer = {
                    ...gameRoster[playerID]
                };
                $("#character-grid").show();
                gameRoster.splice(playerID, 1);
                printCharacters(gameRoster);
                activatePlayer(computer, "#computer", "#computer-stats", "Defender");
            }
            else {
                alert("Both players are active");
            }
        });

    function attack() {
        //player attacks cpu
        computer.health -= player.attack;
        //player's attack increases
        player.attack += player.defaultAttack
        // check to see if defender has lost
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

        // cpu attacks player

        player.health -= computer.counter;

        $("#player-stats").html(`<h4>${player.name} - Attack</h4>HP: ${player.health} <br/>Attack: ${player.attack}<br/>Counter: ${player.counter}`);

        $("#computer-stats").html(`<h4>${computer.name} - Defender</h4>HP: ${computer.health} <br/> Attack: ${computer.attack}<br/>Counter: ${computer.counter}`);

        if (player.health <= 0) {
            playerPicked = false;
            computerPicked = false;
            gameRunning = false;
            $("#player-stats").html(`<h3> Defeated!</h3><h4>${player.name} - Defender</h4>HP: ${player.health} <br/>Attack: ${player.attack}<br/>Counter: ${player.counter}`).addClass("defeated")

            alert("You've lost! Start new game!")
        }
    }

    //New Game Button
    $("#new-game").on("click", newGame);

    // Attack button

    $("#attack").on("click", function () {
        if (playerPicked && computerPicked && gameRunning) {
            attack();
        }
        else {
            alert("You need to pick a player!")
        }
    })
    newGame();
    

