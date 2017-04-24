
		var stats, scene, renderer;
		var camera, cameraControl;
		var hand, card;

		if (!init()) animate();

		// init the scene
		function init() {

			if (Detector.webgl) {
				renderer = new THREE.WebGLRenderer({
					antialias: true,	// to get smoother output
					alpha: true
				});
				renderer.setClearColor(0xffffff, 0);
			} else {
				renderer = new THREE.CanvasRenderer();
			}
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.getElementById('container').appendChild(renderer.domElement);

			// add Stats.js - https://github.com/mrdoob/stats.js
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.bottom = '0px';
			document.body.appendChild(stats.domElement);

			// create a scene
			scene = new THREE.Scene();

			var light = new THREE.DirectionalLight(0xffffff);
			light.position.set(0, 0, 5).normalize();
			scene.add(light);

			var light = new THREE.DirectionalLight(0xffffff);
			light.position.set(0, 0, -5).normalize();
			scene.add(light);

			// put a camera in the scene
			camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.set(0, 2, 20);
			//camera.lookAt(0, 0, 0);
			scene.add(camera);

			// create a camera contol
			cameraControls = new THREE.OrbitControls(camera);
			cameraControls.rotateSpeed = 3.0;

			// here you add your objects
			// - you will most likely replace this part by your own
			var geometry = new THREE.BoxGeometry(4.5, 7.25, 0.02);
			geometry.faceVertexUvs[1] = geometry.faceVertexUvs[0];
			//var material	= new THREE.MeshNormalMaterial();

			var cardback = new THREE.MeshPhysicalMaterial({
				map: THREE.ImageUtils.loadTexture('images/tree2.jpg'),
				roughnessMap: THREE.ImageUtils.loadTexture('images/diamonds.jpg'),
				metalness: 0.15,
				reflectivity: 0.25,
				clearCoat: 0.2,
				clearCoatRoughness: 1.0
			});

			var fronts = [
				'10_of_clubs.png',
				'10_of_diamonds.png',
				'10_of_hearts.png',
				'10_of_spades.png',
				'2_of_clubs.png',
				'2_of_diamonds.png',
				'2_of_hearts.png',
				'2_of_spades.png',
				'3_of_clubs.png',
				'3_of_diamonds.png',
				'3_of_hearts.png',
				'3_of_spades.png',
				'4_of_clubs.png',
				'4_of_diamonds.png',
				'4_of_hearts.png',
				'4_of_spades.png',
				'5_of_clubs.png',
				'5_of_diamonds.png',
				'5_of_hearts.png',
				'5_of_spades.png',
				'6_of_clubs.png',
				'6_of_diamonds.png',
				'6_of_hearts.png',
				'6_of_spades.png',
				'7_of_clubs.png',
				'7_of_diamonds.png',
				'7_of_hearts.png',
				'7_of_spades.png',
				'8_of_clubs.png',
				'8_of_diamonds.png',
				'8_of_hearts.png',
				'8_of_spades.png',
				'9_of_clubs.png',
				'9_of_diamonds.png',
				'9_of_hearts.png',
				'9_of_spades.png',
				'ace_of_clubs.png',
				'ace_of_diamonds.png',
				'ace_of_hearts.png',
				'ace_of_spades.png',
				'ace_of_spades2.png',
				'jack_of_clubs.png',
				'jack_of_clubs2.png',
				'jack_of_diamonds.png',
				'jack_of_diamonds2.png',
				'jack_of_hearts.png',
				'jack_of_hearts2.png',
				'jack_of_spades.png',
				'jack_of_spades2.png',
				'king_of_clubs.png',
				'king_of_clubs2.png',
				'king_of_diamonds.png',
				'king_of_diamonds2.png',
				'king_of_hearts.png',
				'king_of_hearts2.png',
				'king_of_spades.png',
				'king_of_spades2.png',
				'queen_of_clubs.png',
				'queen_of_clubs2.png',
				'queen_of_diamonds.png',
				'queen_of_diamonds2.png',
				'queen_of_hearts.png',
				'queen_of_hearts2.png',
				'queen_of_spades.png',
				'queen_of_spades2.png'
			];

			fronts = shuffle(fronts);
			fronts = fronts.slice(0,5);
			hand = new THREE.Object3D();

			for (var x = 0; x < 5; x++) {

				cardfront = new THREE.MeshPhysicalMaterial({
						map: THREE.ImageUtils.loadTexture('images/playingcards/'+fronts[x]),
						roughnessMap: THREE.ImageUtils.loadTexture('images/diamonds.jpg'),
						color: 0xffffff,
						metalness: 0.1,
						reflectivity: 0.2,
						clearCoat: 0.1,
						clearCoatRoughness: 0.8
					});

				var cardmaterials = [

					new THREE.MeshBasicMaterial({ color: 0x222222 }), // right
					new THREE.MeshBasicMaterial({ color: 0x222222 }), // left
					new THREE.MeshBasicMaterial({ color: 0x222222 }), // top
					new THREE.MeshBasicMaterial({ color: 0x222222 }), // bottom
					cardfront, // front
					cardback //back

				];

				var cardMaterialsMM = new THREE.MultiMaterial(cardmaterials);

				c = new THREE.Mesh(geometry, cardMaterialsMM);

				cardHelper = new THREE.Object3D();
				cardHelper.add(c);
				cardHelper.position.y = -5;
				c.position.y = 5;
				cardHelper.position.z = x * 0.01;
				cardHelper.rotation.z = (2.5 * 360/15 * 0.00872665) + (x * -1 * 360/15) * 0.00872665;
				hand.add(cardHelper);
			}

			scene.add(hand);

		}

		// animation loop
		function animate() {

			// loop on request animation loop
			// - it has to be at the begining of the function
			// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
			requestAnimationFrame(animate);

			// do the render
			render();

			hand.rotation.y += 0.02;

			// update stats
			stats.update();
		}

		// render the scene
		function render() {

			// update camera controls
			cameraControls.update();

			// actually render the scene
			renderer.render(scene, camera);
		}


function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}