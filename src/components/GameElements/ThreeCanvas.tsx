import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'

import Board from './Board'

const ThreeCanvas = () => (
    <Canvas
        gl={{
            // alpha: false,
            antialias: false,
            sortObjects: false
        }}
        camera={{ position: [0, 4, 8], fov: 45 }}
        shadows
    >
        <Board />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={400} intensity={1.5} radius={2} />
        </EffectComposer>
    </Canvas>
)

export default ThreeCanvas
