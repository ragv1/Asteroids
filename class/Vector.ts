export class Vector{
    public x: number =0;
    public y: number =0;
      
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    // return the angle of the vector in radians
    getDirection = function() {
        return Math.atan2(this.y, this.x);
    };
    
    // set the direction of the vector in radians
    setDirection = function(angle) {
        var magnitude = this.getMagnitude();
    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;
    };
    
    // get the magnitude of the vector
    getMagnitude = function() {
        // use pythagoras theorem to work out the magnitude of the vector
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    
    // set the magnitude of the vector
    setMagnitude = function(magnitude) {
        var direction = this.getDirection(); 
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    };
    
    // add two vectors together and return a new one
    add = function(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y);
    };
    
    // add a vector to this one
    addTo = function(v2) {
        this.x += v2.x;
        this.y += v2.y;
    };
    
    // subtract two vectors and reutn a new one
    subtract = function(v2) {
        return new Vector(this.x - v2.x, this.y - v2.y);
    };
    
    // subtract a vector from this one
    subtractFrom = function(v2) {
        this.x -= v2.x;
    this.y -= v2.y;
    };
    
    // multiply this vector by a scalar and return a new one
    multiply = function(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
    };
    
    // multiply this vector by the scalar
    multiplyBy = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    };
    
    // scale this vector by scalar and return a new vector
    divide = function(scalar) {
    return new Vector(this.x / scalar, this.y / scalar);
    };
    
    // scale this vector by scalar
    divideBy = function(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    };

    // dot product of two vectors
    dotProduct = function(v2) {
    return this.x * v2.x + this.y *v2.y;
    }

    // normalize a given vector
    normalize = function(){
        return new Vector(this.x/(Math.sqrt(this.x * this.x + this.y * this.y)), this.y/(Math.sqrt(this.x * this.x + this.y * this.y)));
    }
      
    // Aliases
    getLength = this.getMagnitude;
    setLength = this.setMagnitude;
    
    getAngle = this.getDirection;
    setAngle = this.setDirection;
    
    // Utilities
    copy = function() {
    return new Vector(this.x||0, this.y||0);
    };
    
    toString = function() {
    return 'x: ' + this.x + ', y: ' + this.y;
    };
    
    toArray = function() {
    return [this.x, this.y];
    };
    
    toObject = function() {
    return {x: this.x, y: this.y};
    };

    vectorFromAngle = function(angle){
        return new Vector(Math.cos(angle),Math.sin(angle));
    }
      
}