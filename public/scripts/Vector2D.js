class Vector2D{
  #x
  #y
  constructor(arg1, arg2) {
    //arg1 can be either vector object
    //or arg1 can be x then arg2 must be y

    if(typeof(arg1) === "number" && typeof(arg2) === "number"){
      this.#x = arg1;
      this.#y = arg2;
    }
    else{
      throw new Error("Invalid arguments in Vector2D constructor");
    }
  }

  //[x,y]
  static initFromArray(arr){
    return new Vector2D(arr[0],arr[1]);
  }

  isLinerayDependent(vector){
    //Y IS ZERO CASES
    thisYIsZero = (this.getY() == 0);
    vectorYIsZero = (vector.getY() == 0);

    //if one of y is zero
    if(thisYIsZero || vectorYIsZero){
      if(thisYIsZero && vectorYIsZero){
        return true;
      }else{
        return false;
      }
    }

    //OTHERS
    return (this.getX() / this.getY() == vector.getX() / vector.getY());
  }

  scale(scaler){
    this.setX(this.getX() * scaler);
    this.setY(this.getY() * scaler);
  }

  addVector(vector){
    this.setX(this.getX() + vector.getX());
    this.setY(this.getY() + vector.getY());
  }

  getX(){
    return this.#x;
  }

  getY(){
    return this.#y;
  }

  setX(x){
    this.#x = x;
  }

  setY(y){
    this.#y = y;
  }

  asArray(){
    return [this.getX(),this.getY()];
  }
}


//return new scaled instance of vector object

function getScaledVector(vector, scaler){
  return new Vector2D(vector.getX() * scaler, vector.getY() * scaler);
}

//return new instance of vector object, that is equal to sum of two vectors

function getAddedVectors(vector1, vector2){
  return new Vector2D(vector1.getX() + vector2.getX(), vector1.getY() + vector2.getY());
}



export {Vector2D, getScaledVector, getAddedVectors}
