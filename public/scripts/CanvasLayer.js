import {Line} from "./Line.js"
import {CanvasShape} from "./CanvasShape.js"

const arrowTip = [[0,-5],[10,20],[0,15],[-10,20]]

class CanvasLayer{
  #canvasWidth
  #canvasHeight

  constructor(canvas){
    this.context = $(canvas)[0].getContext('2d');
    this.canvasWidth = $(canvas).attr('width');
    this.canvasHeight = $(canvas).attr('height');
  }

  drawLine(line){
    line = Line.initFromLineObject(line)
    let pointA = line.getA();
    let pointB = line.getB();
    this.context.beginPath();
    this.context.moveTo(pointA[0], pointA[1]);
    this.context.lineTo(pointB[0], pointB[1]);
    this.context.stroke();
  }

  drawLines(lines){

    for(let line of lines){
      this.drawLine(line);
    }
  }

  drawArrow(line){
    this.drawLine(line);
    let originX = line.getA()[0];
    let originY = line.getA()[1];
    let positionX = line.getB()[0];
    let positionY = line.getB()[1];
    let arrowScale = 10;
    let transformedX = positionX - originX;
    let transformedY = originY - positionY;

    if(transformedX == 0 && transformedY == 0){
      let radius = 10;
      this.fillCircle(positionX,positionY,radius);
    }else{
      let angle = Math.atan2( transformedY, transformedX );
      this.drawArrowTip(positionX, positionY, arrowScale, angle);
    }
  }

  drawArrowTip(positionX, positionY, scale, angle){
    //copy arrow shape into new variable
    let arrow = new CanvasShape(arrowTip);
    //scale it up
    arrow.scaleFromPoint([0,0],1)
    //rotate it
    arrow.rotateAroundPivot([0,0],angle)
    //move it to desired position
    arrow.moveBy(positionX, positionY);
    //draw its outline and fill it
    this.outlineShape(arrow);
    this.context.fill();
  }

  setColor(color){
    this.context.strokeStyle = color;
    this.context.fillStyle = color;
  }

  setLineWidth(width){
    this.context.lineWidth = width;
  }

  clear(){
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  fillRectAroundPoint(pointX, pointY, width, height){
    this.context.fillRect(pointX - width/2, pointY - height/2, width, height);
  }

  fillCircle(centerX, centerY, radius){
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fill();
  }

  outlineShape(shape){
    this.context.moveTo(shape.points[0][0], shape.points[0][1]);
    for(let i = 1; i < shape.points.length; ++i){
      this.context.lineTo(shape.points[i][0],shape.points[i][1]);
    }
  }
}

export {CanvasLayer}
