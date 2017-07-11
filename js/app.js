

var player1Name="", player2Name="", turn="";
var grid= [[0,0,0], [0,0,0], [0,0,0]];
var hasWinner = 0, moveCount=0;

function boardMsg(x) {
	return $("#board").text(x);
}

//setting up the turn function
function setTurn() {
	var r=Math.floor((Math.random() *2) +1);
	hasWinner=0;
	if(r==1) {
		turn = player1Name;
		boardMsg(player1Name + "....Your turn!");
	} else {
		turn = player2Name;
		boardMsg(player2Name + "....Your turn!");
	}
}

function init() {
	turn="";
	grid = [[0,0,0], [0,0,0], [0,0,0]];
	boardMsg("");
	$(".col").map(function(){
		$(this).text("");
	}).get();
	hasWinner=0;
	moveCount=0;
}

$("#play").click(function() {
	if(hasWinner==1){
		init();
	}

	player1Name=$("#player-1").val();
	player2Name=$("#player-2").val();

	if (player1Name=="" || player2Name==""){
		alert("Please set player all the names.");
		return;
	}
	setTurn();
});

$(".col").click(function (){
	console.log("it's working!");

	if (player1Name=="" || player2Name=="") {
		alert("Please set all names");
		return;
	}

	var row=$(this).parent().index;
	var col=$(this).index();
	$(this).unbind("click");
	// if(grid[row][col]!=0) {
	// alert("Position taken. Try again.");
	// return;
	// }

	console.log("it's still still working");
	if (hasWinner==1){
		alert("Do you want to try your luck again");
		return;
	}
	if (turn===player1Name) {
		moveCount++;
		$(this).text("O");
		//grid[row][col]=1;
		var ifWin = winnerCheck(1,player1Name);
		if(!ifWin) {
			if(moveCount>=9) {
				boardMsg("Match Draw!");
				moveCount=0;
				$("#play").text("Play again");
				hasWinner=1;
				return;
			} else {
				turn = player2Name;
				boardMsg(player2Name+" Your Turn!");
			}
			return;
		}
		else {
			return;
		}
	}
	else if (turn==player2Name) {
		moveCount++;
		$(this).text("X");
		//grid[row][col] = 2;
		var ifWn = winnerCheck(2,player2Name);
		if (!ifWin) {
			if (moveCount>=9) {
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#play").text("Play again");
				hasWinner=1;
				return;
			} else {
				turn = player1Name;
				boardMsg(player1Name+" Your Turn");
			}
			return;
		}
		else {
			return;
		}
	}


});

function winnerCheck(n,playerName){
	if( 
		(grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
        (grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
        (grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

        (grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
        (grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
        (grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

        (grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
        (grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)


        ){
        boardMsg(playerName+" won the game!");
        hasWinner = 1;
        moveCount=0;
        $("#play").text("Play again");
        return true;
    }
    return false;
}


