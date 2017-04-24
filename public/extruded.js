
			var camera, scene, renderer;

			var group;

			init();
			animate();

			function init() {

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 150, 500 );
				scene.add( camera );

				var light = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( light );

				group = new THREE.Group();
				group.position.y = 50;
				scene.add( group );

				var loader = new THREE.TextureLoader();
				var texture = loader.load( "textures/UV_Grid_Sm.jpg" );

				// it's necessary to apply these settings in order to correctly display the texture on a shape geometry

				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set( 0.008, 0.008 );

				function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {

					var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
					mesh.position.set( x, y, z - 75 );
					mesh.rotation.set( rx, ry, rz );
					mesh.scale.set( s, s, s );
					group.add( mesh );

				}

				// Rounded rectangle

				var roundedRectShape = new THREE.Shape();

				( function roundedRect( ctx, x, y, width, height, radius ) {

					ctx.moveTo( x, y + radius );
					ctx.lineTo( x, y + height - radius );
					ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
					ctx.lineTo( x + width - radius, y + height );
					ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
					ctx.lineTo( x + width, y + radius );
					ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
					ctx.lineTo( x + radius, y );
					ctx.quadraticCurveTo( x, y, x, y + radius );

				} )( roundedRectShape, 0, 0, 200, 350, 10 );

				var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.2, bevelThickness: 0.2 };

				addShape( roundedRectShape, extrudeSettings, 0x008000, -100, -75, 0, 0, 0, 0, 1 );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

			}


			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

		