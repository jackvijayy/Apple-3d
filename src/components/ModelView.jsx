import { OrbitControls, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import Iphone from './Iphone'


const ModelView = ({ index,groupRef,gsapType,controllRef,SetRotation,size,item }) => {
  return (
  <View index={index}
  id={gsapType}
  className={`border border-red-500 w-full h-full ${index===2} ?'right-[-100%]:''`}
  >
    <ambientLight intensity={0.3}/>

    <perspectiveCamera makeDefault position={[0,0,4]}/>
    <Lights/>
    <OrbitControls/>
<group ref={groupRef} name={`${index ===1} ?'small' :large`} position={[0,0,0]}>
<Suspense fallback={<div>loading....</div>}>
    <Iphone/>

    </Suspense>

</group>



  </View>
  )
}

export default ModelView