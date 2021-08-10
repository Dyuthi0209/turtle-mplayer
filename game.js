class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
            player1 = createSprite(-100,-500);
            player1.addImage("player1",player_img);
            player1.scale=0.6;  
        
            player2 = createSprite(-100,-500);
            player2.addImage("player2",player_img);
            player2.scale=0.6; 
        
           
            players=[player1,player2,hat1,hat2];

        }
    
    play(){
        
      

                form.hide();

                Player.getPlayerInfo();
                image(bgImg, 0, 0, width, height);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = x + 200;
                     y = 350 - allPlayers[plr].distance;
                   
                     players[index -1].x = x;
                     players[index - 1].y = y;

                                            
                     if(index === player.index){
                         
                         // to display player name on the basket.
                         fill("white");
                         textSize(25);
                         text("(You)"+allPlayers[plr].name ,x-60,y+70);
                         
                          
                         text(allPlayers[plr].name+" : " +allPlayers[plr].score,50,50);
                         
                     }

                     else{
                         fill("black")
                         textSize(25);
                         text(allPlayers[plr].name+" : " + allPlayers[plr].score, 50, 100);
                         text(allPlayers[plr].name ,x-60,y+70);
                     }
                                    
                 }
                
                
                
                 

                if (keyIsDown(UP_ARROW) && player.index !== null) {
                    player.distance +=10
                    
                    
                    player.update();
                }
                if (keyIsDown(DOWN_ARROW) && player.index !== null) {
                    player.distance -= 10
                 
                    
                    player.update();
                }
            
                if (frameCount % 50 === 0) {
                    obstacle = createSprite(910, random(45, 400), 100, 100);
                    obstacle.velocityX = -(6 + 3*score/100);
                    var rand = Math.round(random(1,9));
                    switch(rand){
                        case 1: obstacle.addImage("plastic",urchin);
                        break;
                        case 2: obstacle.addImage("plastic",shark);
                        break;
                        case 3: obstacle.addImage("plastic",pfish);
                        break;
                        case 4: obstacle.addImage("plastic",stingray);
                        break;
                        case 5: obstacle.addImage("plastic",swordfish);
                        break;
                        case 6: obstacle.addImage("plastic",lionfish);
                        break;
                        case 7: obstacle.addImage("plastic",octopus);
                        break;
                        case 8: obstacle.addImage("plastic",eel);
                        break;
                        case 9: obstacle.addImage("plastic",blowfish);
                        break;
                    }
                    obstacle.scale=0.2;
                    obGroup.add(obstacle);
                  }

                  if (player.index !== null) {
                       for(var i = 0; i < obGroup.length; i++){
                       if(obGroup.get(i).isTouching(players)){
                        obGroup.get(i).destroy();
                       game.end();
                       player.update();
                     //  gameState=2;

                     
                       
                    }
                    }}
                         
                                    
                   if(keyIsDown(UP_ARROW)&& player.index !== null&&frameCount % 10 === 0){

                    player.score = player.score+1;
                    player.update();
                   }

                   if(keyIsDown(DOWN_ARROW)&& player.index !== null&&frameCount % 10 === 0){

                    player.score = player.score+1;
                    player.update();          
                  
                  }


                  
                    }

    end(){

        player.score=0;
       
      
        background("black");

        player.update();

        obGroup.setVelocityXEach(0)
        obGroup.setLifetimeEach(-1);
        obGroup.removeSprites();
 
  if(mousePressedOver(restart)){
    player.updateCount(0);
    game.update(0);
    database.ref('/').update({players:null});
  }

  textSize(37)
  fill("#FEBA01")
  text("**Reload the page after clicking on the restart button!", 70,520)

}
}

