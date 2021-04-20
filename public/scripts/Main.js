import {Vector2D, getScaledVector, getAddedVectors} from "./Vector2D.js"
import {Matrix2D, getBasicMatrixVectorRepresentation} from "./Matrix2D.js"
import {on2DMatrixChange, on2DVectorChange} from "./DataParser.js"
import {CanvasLayer} from "./CanvasLayer.js"
import {MathToCoordinatesConverter} from "./MathToCoordinatesConverter.js"
import {Animator} from "./Animator.js"

//Displayed values
let displayedVector  = Vector2D.initFromArray([1,1]);
let globalMatrix = Matrix2D.intiFromArray([[1,0],[0,1]]);


//Canvas parameters
let canvasWidth = 800;
let canvasHeight = 500;
<<<<<<< HEAD
//side lenght of one grid square
=======
//change size of grid squares
>>>>>>> 2f30aab2a06745ce4d1936f4f44b41ffb38e0363
let unit = 35;
//Origin coordinates
let origin = [canvasWidth/2, canvasHeight/2];


let animator = new Animator();
//turn animation on and off
let animationOn = true;


<<<<<<< HEAD
//Initialization of canvas layers
=======

//Initialize all matric layers
>>>>>>> 2f30aab2a06745ce4d1936f4f44b41ffb38e0363
let foregroundVector = new CanvasLayer("#ForegroundVector");
foregroundVector.setColor("yellow");
foregroundVector.setLineWidth(3);
displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);

let foregroundMatrix = new CanvasLayer("#ForegroundMatrix");
foregroundMatrix.setColor("blue");
displayMatrix(foregroundMatrix, globalMatrix);

let backgroundMatrix = new CanvasLayer("#BackgroundMatrix");
backgroundMatrix.setColor("grey");
displayMatrix(backgroundMatrix, globalMatrix);

let originCanvas = new CanvasLayer("#Origin");
originCanvas.setColor("blue");


//Origin size
let originCircleRadius = 7;
originCanvas.fillCircle(canvasWidth/2,canvasHeight/2,originCircleRadius);

<<<<<<< HEAD
//animtion speed values
=======
//animation speed
>>>>>>> 2f30aab2a06745ce4d1936f4f44b41ffb38e0363
let animationChangeValue = 0.1;
let animationDelay = 10;


let goalMatrix;
let goalVector;



let matrixAnimationRunning = false;
let vectorAnimationRunning = false;



// This function is called when matrix input occurs
on2DMatrixChange(function(newMatrix){
  if(animationOn){
    //set new goal vector
    goalMatrix = Matrix2D.intiFromArray(newMatrix);
    if(!matrixAnimationRunning){
      //set new goal matrix
      matrixAnimationRunning = true;
      matrixAnimationLoop(animationDelay);
    }
  }else{
    //set global matrix to new value
    globalMatrix = Matrix2D.intiFromArray(newMatrix);
    //display new matrix and vector
    foregroundVector.clear();
    displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
    foregroundMatrix.clear();
    displayMatrix(foregroundMatrix, globalMatrix);
  }
})

function matrixAnimationLoop(delay) {
  setTimeout(function() {
    //if currently displayed matrix is not equal to goal matrix
    if(!animator.checkIfMatrixAnimationIsFinished(globalMatrix, goalMatrix, animationChangeValue)){
      //get next animation step
      globalMatrix = animator.getNextChangeStepMatrix(globalMatrix, goalMatrix, animationChangeValue);
      //display new matrix and vector
      foregroundVector.clear();
      displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
      foregroundMatrix.clear();
      displayMatrix(foregroundMatrix, globalMatrix);
      //repeat
      matrixAnimationLoop(delay, goalMatrix);
    }else{
      //when animation is finished set global matrix to goal matrix to counter any minor differences
      globalMatrix = Matrix2D.intiFromArray([goalMatrix.asArray()[0],goalMatrix.asArray()[1]]);
      //display new matrix and vector
      foregroundVector.clear();
      displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
      foregroundMatrix.clear();
      displayMatrix(foregroundMatrix, globalMatrix);
      matrixAnimationRunning = false;
    }
  }, delay)
}


// This function is called when vector input occurs
on2DVectorChange(function(newVector){
  if(animationOn){
    //set new goal vector
    goalVector = Vector2D.initFromArray(newVector);
    if(!vectorAnimationRunning){
      //start new animation if not started already
      vectorAnimationRunning = true;
      vectorAnimationLoop(animationDelay);
    }
  }else{
    displayedVector = Vector2D.initFromArray(newVector);
    foregroundVector.clear();
    displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
  }
})

function vectorAnimationLoop(delay) {
  setTimeout(function() {
    //if currently displayed matrix is not equal to goal matrix
    if(!animator.checkIfVectorAnimationFinished(displayedVector, goalVector, animationChangeValue)){
      //get next animation step
      displayedVector = animator.getNextChangeStepVector(displayedVector, goalVector, animationChangeValue);
      //display new matrix and vector
      foregroundVector.clear();
      displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
      //repeat
      vectorAnimationLoop(delay, goalVector);
    }else{
      //when animation is finished set global matrix to goal matrix to counter any minor differences
      displayedVector = Vector2D.initFromArray(goalVector.asArray());
      //display new matrix and vector
      foregroundVector.clear();
      displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
      vectorAnimationRunning = false;
    }
  }, delay)
}

function displayVectorInMatrix(vector,matrix,layer){
  layer.drawArrow(MathToCoordinatesConverter.vector2DToLine(getBasicMatrixVectorRepresentation(vector,matrix), unit, origin));
}

function displayMatrix(layer,matrix){
  layer.drawLines(MathToCoordinatesConverter.matrix2DToLines(matrix,unit, origin,canvasWidth/unit, canvasHeight/unit));
}
