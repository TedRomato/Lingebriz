import {Vector2D, getScaledVector} from "./Vector2D.js"
import {Line} from "./Line.js"
import {Matrix2D} from "./Matrix2D.js"


class MathToCoordinatesConverter {
  /*
  matrix2DToLines takes matrix basic Vectors and
  converts them into array of evenly spaced parallel lines
  representing transformed grid
  */
  static matrix2DToLines(matrix, unit, origin, canvasUnitWidth, canvasUnitHeight) {

    //scale matrix i hat by i count, and matrix j by j count
    //do the same for -i and -j
    //create a line from both scaled values
    let iScaled = getScaledVector(matrix.getI(), canvasUnitWidth/2);
    let jScaled = getScaledVector(matrix.getJ(), canvasUnitHeight/2);

    let iLine = new Line(this.#unitPointToPixel(iScaled.getX(), iScaled.getY(), origin, unit),this.#unitPointToPixel(-iScaled.getX(), -iScaled.getY(), origin, unit));
    let jLine = new Line(this.#unitPointToPixel(jScaled.getX(), jScaled.getY(), origin, unit),this.#unitPointToPixel(-jScaled.getX(), -jScaled.getY(), origin, unit));
    //find difference between lines for both bases by multiplying other base vector values by unit
    let iDifferenceX = matrix.getJ().getX() * unit;
    let iDifferenceY = matrix.getJ().getY() * unit;
    let jDifferenceX = matrix.getI().getX() * unit;
    let jDifferenceY = matrix.getI().getY() * unit;
    //create parallel lines on both sides of base line
    //save all lines into list

    let lines = [iLine,jLine];
    let iAmount = canvasUnitHeight/2 - 1;
    let jAmount = canvasUnitWidth/2 - 1;


    lines = lines.concat(this.#makeParallelLines(iLine, origin, iDifferenceX, -iDifferenceY, iAmount));
    lines = lines.concat(this.#makeParallelLines(iLine, origin, -iDifferenceX, iDifferenceY, iAmount));
    lines = lines.concat(this.#makeParallelLines(jLine, origin, jDifferenceX, -jDifferenceY, jAmount));
    lines = lines.concat(this.#makeParallelLines(jLine, origin, -jDifferenceX, jDifferenceY, jAmount));


    return lines
  }


  /*
  makeParallelLines creates some amount parallel lines that are further away by some value
  */
  static #makeParallelLines(line, origin, differenceX, differenceY, amount) {
    //make a copy of base line, move it by wanted labelValues
    //start list of lines with the first line
    let lines = []
    lines.push(this.#moveLine(line,differenceX,differenceY))
    //iterate from 0 line amount - 1, because we have already created the first line
    for (let i = 0; i < amount - 1; ++i) {
      //make copy of last line in list and move it by wanted values
      //add it to list
      lines.push(this.#moveLine(lines[i],differenceX,differenceY));
    }
    return lines;
    //return list
  }

  /*
  returns copy of line moved by x and y difference
  */
  static #moveLine(line, differenceX, differenceY) {

    return new Line([line.getA()[0] + differenceX, line.getA()[1] + differenceY],[ line.getB()[0] + differenceX, line.getB()[1] + differenceY]);
  }

  /*
  Vector2DToLine returns vector as coordinates,
  that can be drawn onto canvas to represent the vector
  */
  static vector2DToLine(vector, unit, origin) {
    //Return new Line created from origin and sums
    return new Line(origin, this.#unitPointToPixel(vector.getX(), vector.getY(), origin, unit));
  }


  //unitPointToPixel returns pixel postition of point from unit representation
  static #unitPointToPixel(pointX, pointY, origin, unit) {
    //Multiply point x and -y values by unit to get proper representation in pixels
    //(-y, because y on screen is from top to bottom)
    let positionX = pointX * unit;
    let positionY = -pointY * unit;
    //Add origin x position and y positionto both values products
    positionX += origin[0];
    positionY += origin[1];
    return [positionX, positionY];
  }
}

export {MathToCoordinatesConverter}
