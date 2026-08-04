// Three.js 3D Background with Enhanced Effects
class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.time = 0;
        
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createParticles();
        this.createLights();
        this.setupEventListeners();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050510);
        this.scene.fog = new THREE.Fog(0x050510, 10, 50);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('three-canvas'),
            antialias: true,
            alpha: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 2000;

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count * 3; i += 3) {
            // Positions
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;

            // Colors (cyber theme)
            colors[i] = Math.random() * 0.5 + 0.5; // R
            colors[i + 1] = Math.random() * 0.8 + 0.2; // G
            colors[i + 2] = Math.random() * 1.0; // B

            // Sizes
            sizes[i / 3] = Math.random() * 1.5 + 0.5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);

        // Add some larger "star" particles
        this.createStarParticles();
    }

    createStarParticles() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 100;
        const starPositions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            starPositions[i] = (Math.random() - 0.5) * 200;
            starPositions[i + 1] = (Math.random() - 0.5) * 200;
            starPositions[i + 2] = (Math.random() - 0.5) * 200;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 2,
            color: 0x00f3ff,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x00aaff, 0.3);
        this.scene.add(ambientLight);

        // Point lights for cyber effect
        const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
        pointLight1.position.set(20, 20, 20);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff00ff, 0.5, 100);
        pointLight2.position.set(-20, -20, 20);
        this.scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0x00ff88, 0.3, 100);
        pointLight3.position.set(0, 20, -20);
        this.scene.add(pointLight3);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
            this.mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
        });

        // Add scroll effect
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            this.camera.position.z = 30 + scrollY * 0.01;
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.time += 0.01;

        // Rotate particles with mouse interaction
        if (this.particles) {
            this.particles.rotation.x += 0.001 + this.mouseY;
            this.particles.rotation.y += 0.002 + this.mouseX;

            // Pulsing effect
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 2] += Math.sin(this.time + i) * 0.01;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Camera movement
        this.camera.position.x += (this.mouseX * 10 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY * 10 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Three.js when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeBackground();
});