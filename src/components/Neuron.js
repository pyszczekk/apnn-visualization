import React, { useRef , useState} from 'react'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/three'

function Neuron({changeInfo, ...props}){
    const neuronRef = useRef();
    const chargerRef = props.chargingRef;
    let mnoznik = 1.0;
    let charg = props.charging;
    //const [charg, setCharg] = useState(props.charging);
    const [hover, setHover] = useState(false);
    const [neuronColor, setNeuronColor] = useState(props.colors[0]);
    const [neuronState, setNeuronState] = useState(0);

    function calculateColor (color) {
      color = negativeRGB(color);
      return "#"+componentToHex(color.r)+componentToHex(color.g)+componentToHex(color.b);
    }
    function negativeRGB(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: 255-parseInt(result[1], 16),
        g: 255-parseInt(result[2], 16),
        b: 255-parseInt(result[3], 16)
      } : null;
    }
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    // function hexToRgb(hex) {
    //     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //     return result ? {
    //       r: parseInt(result[1], 16),
    //       g: parseInt(result[2], 16),
    //       b: parseInt(result[3], 16)
    //     } : null;
    //   }

    // function calculateColor (chargingValue, activeColor, nextColor) {
    //     var rColor,gColor,bColor;

    //     var rgbActive = hexToRgb(activeColor);
    //     var rgbNext = hexToRgb(nextColor);
    //     //chargingValue dla rosnacej kulki a dla malejacej na odwrot;
    //     rColor = parseInt((rgbActive.r - (rgbActive.r-rgbNext.r)*(1-chargingValue)));
    //     gColor = parseInt(rgbActive.g - (rgbActive.g-rgbNext.g)*(1-chargingValue));
    //     bColor = parseInt(rgbActive.b - (rgbActive.b-rgbNext.b)*(1-chargingValue));
    //    // console.log("rgb("+rColor+","+gColor+","+bColor+")")

    //     return "rgb("+rColor+","+gColor+","+bColor+")";
    // }
    // useFrame(()=>{
    //     //temporary charging, to see animation
        
        
    //     chargerRef.current.scale.x = charg;
    //     chargerRef.current.scale.y = charg;
    //     chargerRef.current.scale.z = charg;
    //     props.charging = charg;
       
    //     if(charg>=1) {
    //         mnoznik = -1.0;
            
    //         //setNeuronColor(props.colors[2])
    //        // setTimeout(()=>{ setNeuronColor(props.colors[0])}, 500);
    //     }
       
    //     if(charg<=0) {
    //          mnoznik = 1.0
            
    //     }
    //     //if(charg==1) setNeuronColor(props.colors[2])
    //     charg = charg +(0.01*mnoznik);
    //    // setCharg(c+(0.01*mnoznik));
    //     // if(hover){
    //     //     neuronRef.current.scale.x = 1.5;
    //     //     neuronRef.current.scale.y = 1.5;
    //     //     neuronRef.current.scale.z = 1.5;
    //     // }else{
    //     //     neuronRef.current.scale.x = 1;
    //     //     neuronRef.current.scale.y = 1;
    //     //     neuronRef.current.scale.z = 1;
    //     // }

    //     if(chargerRef.current.scale.x<=0.98  && mnoznik<0 && neuronColor==props.colors[2]) {
    //         mnoznik = -1.0;
            
    //     //    neuronColor = props.colors[0];
    //      }
   // })
    
   const { spring } = useSpring({
    spring: neuronState,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  // interpolate values from commong spring
  // const scale = spring.to([0, 1], [1, 5])
  // const rotation = spring.to([0, 1], [0, Math.PI])
  //neuronState -> set color according to state 
   const color = spring.to([0, 1,2,3,4], props.colors)


    return(
        <animated.group
        onPointerOver={() => {
            setHover(true);
            console.log("POINTER OVER");
          
            changeInfo( "Neuron: "+props.position)
          }}
          onPointerOut={() => {
            setHover(false);
           
            setNeuronState(Number(neuronState)==props.colors.length-1?Number(0):Number(neuronState+1));

            changeInfo( "This panel shows informations about hovered element from visualization")
          }}
          >
             <animated.mesh ref={chargerRef} {...props} scale = {[props.charging, props.charging, props.charging]}>
                <sphereGeometry args={[15, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
                <animated.meshStandardMaterial 
                // color= {calculateColor(charg, props.colors[2], props.colors[3])}
                color={color}
                
             />
            </animated.mesh>
            <animated.mesh ref={neuronRef} {...props}>
            <sphereGeometry args={[15, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
            <animated.meshStandardMaterial 
            // color= {calculateColor(charg, props.colors[2], props.colors[3])}
            color={color}
            transparent={true} 
            opacity={0.5} 
            clearcoat={1} 
            clearcoatRoughness={0} 
            roughness={0} 
            />
            </animated.mesh> 
            <mesh  {...props}>
            <sphereGeometry args={[17, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
            <meshStandardMaterial 
            color= {calculateColor(props.bgColor)}
            emissive={calculateColor(props.bgColor)}
            transparent={true} 
            opacity={hover?0.2:0.0} 
            clearcoat={1} 
            clearcoatRoughness={1} 
            roughness={1} 
        
            />
             </mesh> 
           
        </animated.group>
    )
}
export default React.memo(Neuron);