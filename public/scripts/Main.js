import {Vector2D, getScaledVector, getAddedVectors} from "./Vector2D.js"
import {Matrix2D, getBasicMatrixVectorRepresentation} from "./Matrix2D.js"
import {on2DMatrixChange, on2DVectorChange} from "./DataParser.js"
import {CanvasLayer} from "./CanvasLayer.js"
import {MathToCoordinatesConverter} from "./MathToCoordinatesConverter.js"


let displayedVector  = Vector2D.initFromArray([1,1]);
let globalMatrix = Matrix2D.intiFromArray([[1,0],[0,1]]);

let canvasWidth = 800;
let canvasHeight = 500;
let unit = 35;
let origin = [canvasWidth/2, canvasHeight/2];

let foregroundVector = new CanvasLayer("#ForegroundVector");
foregroundVector.setColor("yellow");
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


on2DMatrixChange(function(newMatrix){
  globalMatrix = Matrix2D.intiFromArray(newMatrix);
  foregroundVector.clear();
  displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
//  foregroundVector.drawLine(MathToCoordinatesConverter.vector2DToLine(getBasicMatrixVectorRepresentation(displayedVector,globalMatrix), unit, origin))
  foregroundMatrix.clear();
  displayMatrix(foregroundMatrix, globalMatrix);
//  foregroundMatrix.drawLines(MathToCoordinatesConverter.matrix2DToLines(globalMatrix,unit, origin,canvasWidth/unit, canvasHeight/unit))
})

on2DVectorChange(function(newVector){
  displayedVector = Vector2D. initFromArray(newVector);
  foregroundVector.clear();
  displayVectorInMatrix(displayedVector,globalMatrix,foregroundVector);
})

function displayVectorInMatrix(vector,matrix,layer){
  layer.drawLine(MathToCoordinatesConverter.vector2DToLine(getBasicMatrixVectorRepresentation(vector,matrix), unit, origin));
}

function displayMatrix(layer,matrix){
  layer.drawLines(MathToCoordinatesConverter.matrix2DToLines(matrix,unit, origin,canvasWidth/unit, canvasHeight/unit));
}
