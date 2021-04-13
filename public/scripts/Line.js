class Line{

  constructor(pointA, pointB){
    this.pointA = pointA;
    this.pointB = pointB;
  }
  getA(){
    return this.pointA;
  }
  getB(){
    return this.pointB;
  }
  static initFromLineObject(line){

    return new Line(line.pointA, line.pointB);
  }
}

export {Line}
