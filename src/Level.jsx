import {CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useRef, useState, useMemo} from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {Float, Text, useGLTF } from '@react-three/drei'

const boxGeometry = new THREE.BoxGeometry(1,1,1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen'})
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow'})
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'red'})
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'white'})



export const BlockStart = ({ position= [0,0,0]}) => {
    return <group position={ position }>
        <Float>
            <Text scale={0.5} font='./bebas-neue-v9-latin-regular.woff' maxWidth={0.25} lineHeight= { 0.75 } textAlign='right' position={[ 0.75, 0.65, 0 ]} rotation-y={ -0.25 }>
                Ball Runner
                <meshBasicMaterial toneMapped={ false }/>
            </Text>
            <Text scale={0.1} font='./bebas-neue-v9-latin-regular.woff' maxWidth={5} lineHeight= { 0.5 } textAlign='right' position={[ 0.75, 0.2, 0 ]} rotation-y={ -0.25 }>
                fastest time
            </Text>
        </Float>
      
        {/* Floor */}
         <mesh geometry={ boxGeometry } material={ floor1Material} scale={[ 4, 0.2, 4 ]} receiveShadow position={[0, -0.1, 0]}>
                {/* <boxGeometry args={[ 4, 0.2, 4 ]}/> */}
         </mesh>
    </group> 
}

export const BlockSpinner = ({ position= [0,0,0]}) => {

    const obstacle = useRef()
     // conroll the randomness of the speed and rotation
    const [speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))


    useFrame((state) =>{

        const time =  state.clock.getElapsedTime()
 
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)

    })

    return <group position={ position }>
        {/* Floor2 */}
         <mesh geometry={ boxGeometry } material={ floor2Material} scale={[ 4, 0.2, 4 ]} receiveShadow  position={[0, -0.1, 0]}>                {/* <boxGeometry args={[ 4, 0.2, 4 ]}/> */}
         </mesh>
         <RigidBody ref={ obstacle } type='kinematicPosition' position= {[0, 0.3, 0]} restitution={[ 0.2 ]}  friction={ 0 } >
                <mesh geometry={ boxGeometry} material={ obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow/>
         </RigidBody>

    </group> 
}

export const BlockLimbo = ({ position= [0,0,0]}) => {

    const obstacle = useRef()
     // conroll the randomness of the speed and rotation
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))


    useFrame((state) =>{

        const time =  state.clock.getElapsedTime()
 
        const translation = Math.sin(time + timeOffset) + 1.15
        // rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicTranslation({x: position[0], y: position[1] + translation, z: position[2]})

    })

    return <group position={ position }>
    {/* Floor2 */}
     <mesh geometry={ boxGeometry } material={ floor2Material} scale={[ 4, 0.2, 4 ]} receiveShadow  position={[0, -0.1, 0]}>                {/* <boxGeometry args={[ 4, 0.2, 4 ]}/> */}
     </mesh>
     <RigidBody ref={ obstacle } type='kinematicPosition' position= {[0, 0.3, 0]} restitution={[ 0.2 ]} friction={ 0 }  >
            <mesh geometry={ boxGeometry} material={ obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow/>
     </RigidBody>

</group> 
}

export const BlockAxe = ({ position= [ 0, 0, 0 ]}) => {

    const obstacle = useRef()
     // conroll the randomness of the speed and rotation
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))


    useFrame((state) =>{

        const time =  state.clock.getElapsedTime()
 
        const translation = Math.sin(time + timeOffset) * 1.25
        // rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicTranslation({x: position[0] + translation, y: position[1] + 0.7 , z: position[2]})

    })

    return <group position={ position }>
    {/* Floor2 */}
     <mesh geometry={ boxGeometry } material={ floor2Material} scale={[ 4, 0.2, 4 ]} receiveShadow  position={[0, -0.1, 0]}>                {/* <boxGeometry args={[ 4, 0.2, 4 ]}/> */}
     </mesh>
     <RigidBody ref={ obstacle } type='kinematicPosition' position= {[0, 0.3, 0]} restitution={[ 0.2 ]} friction={ 0 } >
            <mesh geometry={ boxGeometry} material={ obstacleMaterial} scale={[1.5, 1.5, 0.3]} castShadow/>
     </RigidBody>

</group> 
}

export const BlockEnd = ({ position= [0,0,0]}) => {
    
    const trophyTime = useRef()

    const trophy = useGLTF('/trophy.gltf')

    trophy.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useFrame((state) =>{

        const time =  state.clock.getElapsedTime()
 
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time, 0))
        trophyTime.current.setNextKinematicRotation(rotation)

    })


    return <group position={ position }>
        <Text scale={1} font='./bebas-neue-v9-latin-regular.woff'  position={[ 0, 2.25, 2 ]}>
                Ball Runner
                <meshBasicMaterial toneMapped={ false }/>
            </Text>
        {/* FloorEnd */}
         <mesh geometry={ boxGeometry } material={ floor1Material} scale={[ 4, 0.2, 4 ]} receiveShadow  position={[0, 0, 0]}>
                {/* <boxGeometry args={[ 4, 0.2, 4 ]}/> */}
         </mesh>
         <RigidBody type='kinematicPosition' ref={trophyTime}  restitution={0.2} friction={0} position={[0, 1, 0]} >
            <primitive  object={trophy.scene}  castShadow scale={0.3} rotation-z={ Math.PI * 0.5 } />
         </RigidBody>
    </group> 
}

const Bounds = ( {length} ) => {
    return <>
          <RigidBody type='fixed' restitution={0.2} friction={0}>
            <group   position={ [ 2.15, 0.75, - (length * 2) + 2 ] }>
                <mesh geometry={ boxGeometry } material={ wallMaterial} scale={[ 2.5, 0.3, length * 4 ]} castShadow position={[0, 0, 0]} rotation-z={Math.PI * 0.5 }>  
                </mesh>
            </group>
            
         <group  position={ [ - 2.15, 0.75, - (length * 2) + 2 ] }>
            <mesh geometry={ boxGeometry } material={ wallMaterial} scale={[ 2.5, 0.3, length * 4 ]} receiveShadow  position={[0, 0, 0]} rotation-z={Math.PI * 0.5 }>  
            </mesh>
         </group>

         <group   position={ [ 0, 0.75, - (length * 4) + 2] }>
            <mesh geometry={ boxGeometry } material={ wallMaterial} scale={[ 2.5, 0.3, length - 3 ]} receiveShadow  position={[0, 0, 0]} rotation-y={Math.PI * 0.5 } rotation-z={Math.PI * 0.5 }>  
            </mesh>
         </group>
         <CuboidCollider
             args={ [ 2, 0.1, 2* length] }
             position={[0, -0.1, -(length * 2) + 2]}
             friction={ 1 }
             restitution={ 0.2 }
             
             />

         </RigidBody>

      
    </>
}

const Level = ({ count , types = [BlockSpinner, BlockAxe, BlockLimbo], seed  } ) => {

    const blocks = useMemo(() =>
    {
        const blocks = []

            for (let i = 0; i < count; i++) {
                const type = types[Math.floor (Math.random() * types.length)]
                blocks.push(type)
                
            }

        return blocks
    }, [count, types, seed])

  return (
    <>
      
        <BlockStart position={[0, 0, 0]}/>
        {
            blocks.map(( Block, index ) => <Block key={index} position={[0, 0, - (index + 1) * 4]} />
            )
        }
        <BlockEnd position={[0, 0, -(count + 1) * 4]} />
        <Bounds length={count + 2}/>

        {/* <BlockSpinner position={[ 0, 0, 12]}/>
        <BlockLimbo position={[0, 0, 8]}/>
        <BlockAxe position={[ 0, 0, 4 ]} />
        <BlockEnd position={[ 0, 0, 0]}/> */}

    
    </>
  )
}

export default Level