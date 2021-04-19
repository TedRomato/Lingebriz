import {Vector2D, getScaledVector, getAddedVectors} from "./Vector2D.js"
import {Matrix2D, getBasicMatrixVectorRepresentation} from "./Matrix2D.js"
import {on2DMatrixChange, on2DVectorChange} from "./DataParser.js"
import {CanvasLayer} from "./CanvasLayer.js"
import {MathToCoordinatesConverter} from "./MathToCoordinatesConverter.js"
import {Animator} from "./Animator.js"


let displayedVector  = Vector2D.initFromArray([1,1]);
let globalMatrix = Matrix2D.intiFromArray([[1,0],[0,1]]);

let canvasWidth = 800;
let canvasHeight = 500;
//change size of grid squares
let unit = 35;
let origin = [canvasWidth/2, canvasHeight/2];

let animator = new Animator();
//turn animation on and off
let animationOn = true;



//Initialize all matric layers
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

let originCircleRadius = 7;
originCanvas.fillCircle(canvasWidth/2,canvasHeight/2,originCircleRadius);

//animation speed
let animationChangeValue = 0.1;
let goalMatrix;
let goalVector;
let animationDelay = 10;


let matrixAnimationRunning = false;
let vectorAnimationRunning = false;

on2DMatrixChange(function(newMatrix){
  if(animationOn){
    goalMatrix = Matrix2D.intiFromArray(newMatrix);
    if(!matrixAnimationRunning){
      matrixAnimationRunning = true;
      matrixAnimationLoop(animationDelay);
    }

  }else{
    globalMatrix = Matrix2D.intiFromArray(newMatrix);
    foregroundVector.clear();
    displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
    foregroundMatrix.clear();
    displayMatrix(foregroundMatrix, globalMatrix);
  }
})

function matrixAnimationLoop(delay) {
  setTimeout(function() {
    if(!animator.checkIfMatrixAnimationIsFinished(globalMatrix, goalMatrix, animationChangeValue)){
      globalMatrix = animator.getNextChangeStepMatrix(globalMatrix, goalMatrix, animationChangeValue);
      foregroundVector.clear();
      displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
      foregroundMatrix.clear();
      displayMatrix(foregroundMatrix, globalMatrix);
      matrixAnimationLoop(delay, goalMatrix);
    }else{
      globalMatrix = Matrix2D.intiFromArray([goalMatrix.asArray()[0],goalMatrix.asArray()[1]]);
      foregroundVector.clear();
      displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
      foregroundMatrix.clear();
      displayMatrix(foregroundMatrix, globalMatrix);
      matrixAnimationRunning = false;
    }
  }, delay)
}

on2DVectorChange(function(newVector){
  if(animationOn){
    goalVector = Vector2D.initFromArray(newVector);
    if(!vectorAnimationRunning){
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
    if(!animator.checkIfVectorAnimationFinished(displayedVector, goalVector, animationChangeValue)){
      displayedVector = animator.getNextChangeStepVector(displayedVector, goalVector, animationChangeValue);
      foregroundVector.clear();
      displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
      vectorAnimationLoop(delay, goalVector);
    }else{
      displayedVector = Vector2D.initFromArray(goalVector.asArray())
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
