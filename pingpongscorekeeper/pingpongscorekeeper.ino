// This #include statement was automatically added by the Spark IDE.
#include "LiquidCrystal/LiquidCrystal.h"


// Make sure to update these to match how you've wired your pins.
// pinout on LCD [RS, EN, D4, D5, D6, D7];
// pin nums LCD  [ 4,  6, 11, 12, 13, 14];
// Shield Shield [RS, EN, D4, D5, D6, D7];
// Spark Core    [D3, D5, D2, D4, D7, D8];
LiquidCrystal lcd(D0, D1, D2, D3, D4, D5);

String initializing  = "Initializing... ";
String gameOverMsg   = "    Game Over   ";
String clearStr      = "                ";
String servingAStr   = " X              ";
String servingBStr   = "              X ";

String openBracket = "{";
String closeBracket = "}";
String comma = ",";
String scoreAJSON = "\"scoreA\":";
String scoreBJSON =  "\"scoreB\":";
String servingAJSON =  "\"servingA\":";
String gameOverJSON = "\"gameOver\":";

int buttonAPin = A0;
int buttonBPin = A1;
int scoreA = 0;
int scoreB = 0;

boolean servingA = true;
boolean gameOver = false;

void setup() {
    pinMode(buttonAPin, INPUT_PULLUP);
    pinMode(buttonBPin, INPUT_PULLUP);
    lcd.begin(16, 2);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(initializing);
    displayScore();
    Spark.variable("scoreA", &scoreA, INT);
    Spark.variable("scoreB", &scoreB, INT);
    Spark.variable("servingA", &servingA, BOOLEAN);
    Spark.variable("gameOver", &gameOver, BOOLEAN);
}

void loop() {
    if(readButtonInput()){
        interpretInput();
        displayScore();
        delay(500);
    }
}

void reset() {
    gameOver = false;
    servingA = true;
    scoreA = 0;
    scoreB = 0;
}

String getScoreJson(){
    return openBracket + scoreAJSON + scoreA + comma + scoreBJSON + scoreB + comma + servingAJSON + servingA + comma + gameOverJSON + gameOver + closeBracket;
}

boolean readButtonInput(){
    int valA = digitalRead(buttonAPin);
    int valB = digitalRead(buttonBPin);
    int lastScoreA = scoreA;
    int lastScoreB = scoreB;
    if(valA == LOW && valB == LOW){
        if(gameOver == true){
            reset();
        } else {
            scoreA--;
            scoreB--;
        } 
    } else if(gameOver == false){
        if(valA == LOW){
            scoreA++;
        } else if(valB == LOW){
            scoreB++;
        }
    }
    if(scoreA < 0){
        scoreA = 0;
    }
    if(scoreB < 0){
        scoreB = 0;
    }
    return lastScoreA != scoreA || lastScoreB != scoreB;
}

void interpretInput(){
    if( (scoreA >= 11 && ((scoreA - 2) >= scoreB) ) ||
        (scoreB >= 11 && ((scoreB - 2) >= scoreA) ) ){
        gameOver = true;
    } else if(scoreA >= 10 && scoreB >= 10){
        servingA = !servingA;
    } else {
        if(((scoreA + scoreB) % 2) == 0){
            servingA = !servingA;
        }
    }
    Spark.publish("score", getScoreJson(), 90, PRIVATE);
}

// void scroll(int row, int speed, String oldStr, String newStr){
//     int oldStrLen = oldStr.length();
//     String scrlStr = oldStr;
    
//     for (int i = oldStrLen; i < 16; i++){
//         scrlStr += " ";
//     }
    
//     scrlStr += newStr;
//     scrlStr += clearStr;

//     for (int i = 1; i <= 16; i++){
//         lcd.setCursor(0, row);
//         lcd.print(scrlStr.substring(i, 16+i));
//         delay(speed);
//     }
// }

void displayScore(){
  if(gameOver){
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print(gameOverMsg);
  } else {
      String scoreAStr = String(scoreA, DEC);
      String scoreBStr = String(scoreB, DEC);
      lcd.clear();
      lcd.setCursor(0, 0);
      if(servingA == true){
        lcd.print(servingAStr);   
      } else {
        lcd.print(servingBStr);  
      }
      lcd.setCursor(1, 1);
      lcd.print(scoreAStr);
      lcd.setCursor(16 - scoreBStr.length() - 1, 1);
      lcd.print(scoreBStr);
  }
}