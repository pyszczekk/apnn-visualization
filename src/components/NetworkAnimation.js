import React, {useEffect} from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Synapsis from './Synapsis';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
}

export default class NetworkAnimation extends React.Component{
  constructor(...props){
      super(...props);
     
  }
  

getColors = () =>{
  const colors = [this.props.neuronColor==null?"#FFB60A":this.props.neuronColor, this.props.synapsisColor==null?"#012C56":this.props.synapsisColor, this.props.impulseColor==null?"#FF331F":this.props.impulseColor, this.props.refractionColor==null?"#1798DE":this.props.refractionColor, this.props.relaxingColor==null?"#59FFA0":this.props.relaxingColor];
  return colors;
}

generateNetwork(){


  if(this.props.network!=null && this.props.network!=undefined){
  var network = this.props.network.neural_network.map((synapsis, index)=>(
     <Synapsis key={index} weight={synapsis.weight} bgColor={this.props.bgColor==null?"#000E17":this.props.bgColor} changeInfo={this.props.changeInfo} start={synapsis.neuronFrom} end={synapsis.neuronTo} colors={this.getColors()}  />
  ))
  return network
  }
  return null;

}

  generateVisualization=(showVisualization)=>{
      return( 
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
        linear style ={{height:600, width:800, background: this.props.bgColor==null?"#000E17":this.props.bgColor, float:"left", transition: "all .3s ease"}} 
        orthographic camera={{ position: [0, 0, 500] }}>

        <ambientLight intensity={0.4} />
        <directionalLight position={[500, 500, -500]} castShadow intensity={0.5} shadow-camera-far={50} />
        <directionalLight position={[-500, -500,-500]} castShadow intensity={0.5} shadow-camera-far={10} />
        <directionalLight position={[0, 0, 500]} castShadow intensity={1} shadow-camera-far={100} />
      
        <CameraController /> 
   
        {showVisualization? this.generateNetwork():null}
        
        </Canvas>
            )
   }

 
  
  render(){
    
      let showVisualization = this.props.training;
      return (
          <div>
          {this.generateVisualization(showVisualization)}
      </div>
      )
  }
}