import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import Board from '../components/Board'

import './Game.css'

const Game = () => (
    <Canvas camera={{ position: [0, 4, 8], fov: 45 }} shadows>
        <Suspense fallback={<></>}>
            <Board />
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            <EffectComposer>
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={400} intensity={2} radius={2} />
            </EffectComposer>
        </Suspense>
    </Canvas>
)

export default Game
