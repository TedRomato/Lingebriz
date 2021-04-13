import {Vector2D, getScaledVector, getAddedVectors} from "./Vector2D.js"


class Matrix2D{
  #i
  #j
  constructor(arg1, arg2) {
    if(arg1 instanceof Vector2D && arg2 instanceof Vector2D){
      this.#i = arg1;
      this.#j = arg2;
    }
    else throw new Error("Invalid arguments in Matrix2D constructor");
  }

  //[[x1,y1],[x2,y2]]
  static intiFromArray(arr){
    console.log("init arr");
    console.log(arr);
    console.log(typeof arr[0][0]);
    let ihat = Vector2D.initFromArray(arr[0]);
    let jhat = Vector2D.initFromArray(arr[1]);
    console.log(ihat);
    console.log(jhat);
    return new Matrix2D(ihat, jhat);
  }

  getI(){
    return this.#i;
  }

  getJ(){
    return this.#j;
  }

  setI(x){
    this.#i = i;
  }

  setJ(y){
    this.#j = j;
  }

  trnasform(matrix){
    this.setI(applyVectorToMatrix(this.getI(),matrix));
    this.setJ(applyVectorToMatrix(this.getJ()),matrix);
  }
  asArray(){
    return [getI().asArray(), getJ().asArray()];
  }
}

//getVectorUnitsInMatrix creates new vector from entered vector in entered matrix
//the new vector is representation of entered vector in entered matrix in basic [1,0][0,1] matrix
function getBasicMatrixVectorRepresentation(vector, matrix){
  return new Vector2D(vector.getX()*matrix.getI().getX() + vector.getY()*matrix.getJ().getX(),
                    vector.getX()*matrix.getI().getY() + vector.getY()*matrix.getJ().getY());

}

export {Matrix2D, getBasicMatrixVectorRepresentation}
