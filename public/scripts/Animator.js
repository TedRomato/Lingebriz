import {Vector2D, getAddedVectors} from "./Vector2D.js"
import {Matrix2D} from "./Matrix2D.js"

class Animator{

  constructor(){

  }

  checkIfMatrixAnimationIsFinished(currentMatrix,goalMatrix,changeValue){
    return (this.checkIfVectorAnimationFinished(currentMatrix.getI(), goalMatrix.getI(), changeValue) && this.checkIfVectorAnimationFinished(currentMatrix.getJ(), goalMatrix.getJ(), changeValue))
  }

  checkIfVectorAnimationFinished(currentVector,goalVector,changeValue){
    return (Math.abs(currentVector.getY() - goalVector.getY()) < changeValue && Math.abs(currentVector.getX() - goalVector.getX()) < changeValue)
  }

  getNextChangeStepMatrix(currentMatrix,goalMatrix, changeValue){
    //calculate differences of i and j current and goal vectors
    let iVectorXDiff = goalMatrix.getI().getX() - currentMatrix.getI().getX();
    let iVectorYDiff = goalMatrix.getI().getY() - currentMatrix.getI().getY();
    let iDiffVector = new Vector2D(iVectorXDiff, iVectorYDiff);
    let jVectorXDiff = goalMatrix.getJ().getX() - currentMatrix.getJ().getX();
    let jVectorYDiff = goalMatrix.getJ().getY() - currentMatrix.getJ().getY();
    let jDiffVector = new Vector2D(jVectorXDiff, jVectorYDiff);

    let iBiggerIndex = 0;
    let jBiggerIndex = 0;


    //find out which of the two vectars has highest maximal value. Let's refer to it as v1 and the other will be v2
    iBiggerIndex = (Math.abs(iVectorXDiff) > Math.abs(iVectorYDiff)) ? 0 : 1;
    jBiggerIndex = (Math.abs(jVectorXDiff) > Math.abs(jVectorYDiff)) ? 0 : 1;
    let iHasHighestValue = (Math.abs(iDiffVector.asArray()[iBiggerIndex]) > Math.abs(jDiffVector.asArray()[jBiggerIndex])) ? true : false; // is i v1?
    //we will be using changeValue to get the next animation step for v1
    //for the v2, we will use changeValue * (ratio of (v2 bigger value)/(v1 bigger value)
    let newI;
    let newJ;
    if(iHasHighestValue){
      newI = this.getNextChangeStepVector(currentMatrix.getI(), goalMatrix.getI(), changeValue);
      newJ = this.getNextChangeStepVector(currentMatrix.getJ(), goalMatrix.getJ(), changeValue*(jDiffVector.asArray()[jBiggerIndex]/iDiffVector.asArray()[iBiggerIndex]));
    }else{
      newJ = this.getNextChangeStepVector(currentMatrix.getJ(), goalMatrix.getJ(), changeValue);
      newI = this.getNextChangeStepVector(currentMatrix.getI(), goalMatrix.getI(), changeValue*(iDiffVector.asArray()[iBiggerIndex]/jDiffVector.asArray()[jBiggerIndex]));
    }
    //create new matrix from vectors, that undergane anmimation step
    return new Matrix2D(newI,newJ);
  }

  getNextChangeStepVector(currentVector,goalVector, inputChangeValue){
    let changeValue = this.alterChangeValueFromVector(inputChangeValue, currentVector);
    //get difference of current point and goal point
    let xDiff = goalVector.getX() - currentVector.getX();
    let yDiff = goalVector.getY() - currentVector.getY();
    //add changeValue to bigger diffference
    let toAddX;
    let toAddY;
    let smallerBiggerRatio;
    if(Math.abs(xDiff) > Math.abs(yDiff)){
      toAddX = changeValue*Math.sign(xDiff);

      smallerBiggerRatio = Math.abs(yDiff/xDiff);
      toAddY = smallerBiggerRatio*changeValue*Math.sign(yDiff);
    }else{
      toAddY = changeValue*Math.sign(yDiff);

      smallerBiggerRatio = Math.abs(xDiff/yDiff);
      toAddX = smallerBiggerRatio*changeValue*Math.sign(xDiff);
    }
    toAddX = toAddX || 0;
    toAddY = toAddY || 0;
    let addVector = new Vector2D(toAddX, toAddY);
    return getAddedVectors(currentVector, addVector)
    //add changeValue multiplied by rati of smaller/bigger values to smaller difference
  }
  alterChangeValueFromVector(changeValue, vector){
    return changeValue*0.2 + Math.abs(changeValue*0.15*vector.getX()) +  Math.abs(changeValue*0.15*vector.getY());
  }
}

export {Animator}
