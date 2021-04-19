class CanvasShape{

  constructor(points){
    this.points = [];
    for(let i = 0; i < points.length; ++i){
      let point = [points[i][0], points[i][1]]
      this.points.push(point);
    }
  }

  rotateAroundPivot(pivot, angle){
    for(let i = 0; i < this.points.length; ++i){
      this.points[i] = this.#rotatePointAroundPoint(this.points[i], pivot, angle)
    }
  }

  #rotatePointAroundPoint(point, pivot, angle){
    let cos = Math.sin(angle);
    let sin = Math.cos(angle);

    //translate point to origin
    let subPivotX = point[0] - pivot[0];
    let subPivotY = point[1] - pivot[1];

    //rotate
    let rotatedX = subPivotX*cos - subPivotY*sin;
    let rotatedY = subPivotX*sin + subPivotY*cos;

    //translate back to original position an return rotated point
    return [rotatedX + pivot[0], rotatedY + pivot[1]];
  }

  scaleFromPoint(pivot, scale){
    for(let i = 0; i < this.points.length; ++i){
      this.points[i] = this.#scalePointFromPoint(this.points[i], pivot, scale)
    }
  }

  #scalePointFromPoint(point, pivot, scale){

    //get x difference and y difference distance from pivot
    let xDiff = point[0] - pivot[0]
    let yDiff = point[1] - pivot[1]
    //multiply differences by scale
    xDiff *= scale
    yDiff *= scale
    //add multiplied differences to pivot
    return [pivot[0] + xDiff, pivot[1] + yDiff]
  }

  moveBy(moveX, moveY){
    for(let i = 0; i < this.points.length; ++i){
      this.points[i][0] += moveX;
      this.points[i][1] += moveY;
    }
  }
}


export {CanvasShape}
