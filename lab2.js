var gl;


var x_pos = 0;
var y_pos = 0;

var x_pos_loc;
var y_pos_loc;

window.onload = function init()
{
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }
//
// Configure WebGL
//
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

gl.enable(gl.DEPTH_TEST);

// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );

var vertices = [
	vec2( 0, .1),
	vec2( .1, 0),
	vec2( -.1, 0),
	vec2( 0, -.1)
];

var vertexColors = [
	 [ 1.0, 0.0, 0.0, 1.0 ],  // red
     [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
     [ 0.0, 1.0, 0.0, 1.0 ],  // green
	 [ 0.0, 1.0, 1.0, 1.0 ]  // green
];
	 
// Load the data into the GPU
// Associate our shader variables with our data buffer

 var cBuffer = gl.createBuffer();
 gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
 gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

 var vColor = gl.getAttribLocation( program, "vColor" );
 gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
 gl.enableVertexAttribArray( vColor );


 var vBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

 var vPosition = gl.getAttribLocation( program, "vPosition");
 gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(vPosition);
 
 x_pos_loc = gl.getUniformLocation( program, "x_pos" );
  y_pos_loc = gl.getUniformLocation( program, "y_pos" );
 
 window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case 'D':
             x_pos = x_pos + .1;
            break;
		  case 'W':
             y_pos = y_pos + .1;
            break;
		  case 'A':
             x_pos = x_pos - .1;
            break;
		  case 'S':
             y_pos = y_pos - .1;
            break;
		  case '1':
             x_pos = 0.0;
			 y_pos = 0.0;
            break;
			
        }
		render();
    };
 
 
render();
};
function render() {
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	gl.uniform1f(x_pos_loc,x_pos);
	gl.uniform1f(y_pos_loc,y_pos);

	
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


}
