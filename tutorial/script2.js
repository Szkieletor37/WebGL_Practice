
"use strict";

window.onload = function ()
{
  //get canvas element
  var c = document.getElementById('canvas');
  c.width = 500;
  c.height = 300;

  //get webgl context
  var gl = c.getContext('webgl');

  var v_shader = create_shader('vs');
  var f_shader = create_shader('fs');

  var prg = create_program(v_shader, f_shader);

  var attLocation = new Array(1);
  attLocation[0] = gl.getAttribLocation(prg, 'position');

  var attStride = new Array(1);
  attStride[0] = 2;
  
  var vertex_position = [
    0.0, 0.0,
    0.0, 0.5, 
    0.7, 0, 
  ];

  var vbo = new Array(1);
  vbo[0] = create_vbo(vertex_position);

  set_attribute(vbo, attLocation, attStride);
  
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  gl.flush();
  /*	var m = new matIV();

	var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

	var mMatrix = m.identity(m.create());
	var vMatrix = m.identity(m.create());
	var pMatrix = m.identity(m.create());
	var tmpMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());

	m.lookAt([0.0, 0.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
	m.perspective(90, c.width / c.height, 0.1, 100, pMatrix);
	m.multiply(pMatrix, vMatrix, tmpMatrix);
*/
  /*	var count = 0;

	var recursive = function ()
	{
		//init canvas
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// increment counter
		count++;

		var rad = (count % 360) * Math.PI / 180;

		var x = Math.cos(rad);
		var y = Math.sin(rad);
		m.identity(mMatrix);
		m.translate(mMatrix, [x, y + 1.0, 0.0], mMatrix);

		m.multiply(tmpMatrix, mMatrix, mvpMatrix);
		gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
		gl.drawArrays(gl.TRIANGLES, 0, 3);

		m.identity(mMatrix);
		m.translate(mMatrix, [1.0, -1.0, 0.0], mMatrix);
		m.rotate(mMatrix, rad, [0, 1, 0], mMatrix);

		m.multiply(tmpMatrix, mMatrix, mvpMatrix);
		gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
		gl.drawArrays(gl.TRIANGLES, 0, 3);

		var s = Math.sin(rad) + 1.0;
		m.identity(mMatrix);
		m.translate(mMatrix, [-1.0, -1.0, 0.0], mMatrix);
		m.scale(mMatrix, [s, s, 0.0], mMatrix);

		m.multiply(tmpMatrix, mMatrix, mvpMatrix);
		gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
		gl.drawArrays(gl.TRIANGLES, 0, 3);

		gl.flush();

		setTimeout(recursive, 1000 / 30)
	};

	recursive();
*/
  function create_shader(id)
  {
    var shader;

    var scriptElement = document.getElementById(id);

    if (!scriptElement) { return; }

    switch (scriptElement.type)
        {

      case 'x-shader/x-vertex':
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;

      case 'x-shader/x-fragment':
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
      default:
        return;
    }

    gl.shaderSource(shader, scriptElement.text);

    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {

      return shader;
    } else
    {
      alert(gl.getShaderInfoLog(shader));
    }
  }

  function create_program(vs, fs)
  {

    var program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS))
    {

      gl.useProgram(program);

      return program;
    } else
    {

      alert(gl.getProgramInfoLog(program));
    }
  }

  function create_vbo(data)
  {
    var vbo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
  }

  function set_attribute(vbo, attL, attS)
  {
   for (var i in vbo)
    {
      // binding buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);

      // enable attributeLocation
      gl.enableVertexAttribArray(attL[i]);

      // register attributeLocation
      gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);

    }
  }
};

