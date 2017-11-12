'use strict';

(function () {
    var moi = undefined;
    var socket = undefined;

    var addMessage = function (content) {
        return $("#messages").append($("<li>").text(content));
    };

    var setMyColor = function (position) {
        return $('#iam').addClass("player_" + position);
    };

    var setCurrentPlayer = function (position) {
        return $('#who_plays').attr('class', "player_" + position);
    };

    var cleanGrid = function () {
        var board;
        board = $('#puissance4');
        return board.find('li').first().children().each(function (line) {
            return line.children().each(function (column) {
                return column.attr('class', '');
            });
        });
    };

    var cleanYouAndCurrent = function () {
        $('#iam').attr('class', '');
        return $('#who_plays').attr('class', "player_0");
    };

    var cleanMessages = function () {
        $("#messages").empty();
    };

    var clean = function () {
        cleanGrid();
        cleanYouAndCurrent();
        return cleanMessages();
    };

    var addToken = function (player, line, column) {
        var c, l;
        l = $('#puissance4').children().children()[line];
        return $($($('#puissance4').children().children()[line]).children()[column]).addClass("player_" + player);
    };

    var uiLock = function (content) {
        if (content == 'undefined') content = '';
        $('div').attr('id', 'uiLockId').css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'z-index': 1000,
            'opacity': 0.6,
            'width': '100%',
            'height': '100%',
            'color': 'white',
            'background-color': 'black'
        }).html(content).appendTo('body');
    };
    var uiUnlock = function () {
        $('#uiLockId').remove();
    };

    var initialize = function () {
        var start_button;
        var play_button;

        socket = io.connect('http://localhost:3000');
        socket.emit('connectPlayer', {
            name: "GRO"
        });

        start_button = $('#start');

        play_button = $('#play');

        start_button.on('click', function (event) {
            clean();
            socket.emit('game:register', socket.id);
        });

        play_button.on('click', function (event) {
            socket.emit("game:play", socket.id);
        });

        $('#puissance4 td').on('click', function (event) {
            $.blockUI();
            var colIndex = $(this).parent().children().index($(this));
            var rowIndex = $(this).parent().parent().children().index($(this).parent());
            console.log('Row: ' + rowIndex + ', Column: ' + colIndex);
            socket.emit("game:play", {
                socketId: socket.id,
                colPlayedAt: colIndex,
                rowPlayedAt: rowIndex
            });
        });

        socket.on('game:registered', function (data) {
            addMessage("You're registered.");
            return setMyColor(data);
        });

        socket.on("game:pleaseRegister", function (data) {
            cleanMessages();
            addMessage("Waiting for you to click start");
        });

        socket.on("game:ready", function (data) {
            cleanMessages();
            addMessage("Game is ready to begin !");
            start_button.prop('disabled', true);
        });

        socket.on("game:firstTurn", function (data) {
            addMessage("Your play first !");
        });

        socket.on("game:secondTurn", function (data) {
            addMessage("Your play second !");
            return setCurrentPlayer(data.player);
        });

        socket.on("game:newturn", function (data) {
            $.unblockUI();
            cleanMessages();
            addToken(data.player, data.line, data.column);
            addMessage("Your turn...");
            return setCurrentPlayer(data.nextPlayer);
        });

        socket.on('game:played', function (data) {
            cleanMessages();
            addToken(data.player, data.line, data.column);
            addMessage("Other turn...");
            return setCurrentPlayer(data.nextPlayer);
        });

        socket.on("game:box_not_available", function () {
            return addMessage("Can't play here, try again.");
        });


        socket.on("played", function (data) {
            ennemy = data.player == "J" ? "R" : "J";
        });
        socket.on("winner", function (data) {});
        socket.on("loser", function (data) {});
        socket.on('disconnect', function () {
            socket.disconnect();
            setTimeout(function () {
                initialize();
            }, 300);
        })
    };
    $(document).ready(initialize());


    function sendGameData() {
        socket.emit("played", {
            matrice: MATRICE,
            player: socket.player
        });
    }

})();