import React, { useState, useEffect} from 'react'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/three'
import { extend } from '@react-three/fiber'
import { Text } from 'troika-three-text'
extend({ Text });
function Neuron({changeInfo, ...props}){
    
    const [hover, setHover] = useState(false);
    const [neuronState, setNeuronState] = useState(0);
    const [neuronColor, setNeuronColor] = useState(props.colors[0]);
    const [prevColor, setPrevColor] = useState(props.colors[0]);
    const [prevState, setPrevState] = useState(0);
    const [opts, setOpts] = useState({
      font: "Roboto",
      fontSize: 14,
      color: "#ffffff",
      maxWidth: 70,
      lineHeight: 1,
      letterSpacing: 0,
      textAlign: "justify",
      materialType: "MeshPhongMaterial"
    });

    const neuronColors = [props.colors[0], props.colors[2], calculateColorBetween(props.colors[2],props.colors[3]),props.colors[3],props.colors[4]]
    
    useEffect(
      () => {
        
       
        let timer = null;

        if(neuronState == 1){
          timer = setTimeout(()=>{
                  calculateState("toRefraction")
                },150);
          
        }
        else if(neuronState == 2){
          timer = setTimeout(()=>{
                  calculateState("refraction")
                },150);
        }else {
          timer = setTimeout(()=>{
            calculateState(props.state)
          },100);
        }
      
          
          return () => clearTimeout(timer);
      },
      [neuronState, props.state]
    );
    function calculateState(state){
      setPrevState(neuronState)
      setPrevColor(neuronColor)
      switch (state){
        case "relaxing":
          setNeuronState(4)
          setNeuronColor(neuronColors[4]);
          break;
        case "pulsing":
          setNeuronState(1)
          setNeuronColor(neuronColors[1]);
          break;
        case "toRefraction":
          setNeuronState(2)
          setNeuronColor(neuronColors[2]);
          break;
        case "refraction":
          setNeuronState(3)
          setNeuronColor(neuronColors[3]);
          break;
        case "charging":
          if(props.charging>=0){
            setNeuronState(4)
            setNeuronColor(neuronColors[4]);
          }else{
            setNeuronState(3)
          setNeuronColor(neuronColors[3]);
          }
          break;
        case "discharging":
          if(props.charging>=0){
            setNeuronState(0)
            setNeuronColor(neuronColors[0]);
          }else{
            setNeuronState(3)
            setNeuronColor(neuronColors[3]);
          }
          break;
        default:
          setNeuronState(0)
          setNeuronColor(neuronColors[0]);
      }

    }
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

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

    function calculateColorBetween (activeColor, nextColor) {
        var rColor,gColor,bColor;

        var rgbActive = hexToRgb(activeColor);
        var rgbNext = hexToRgb(nextColor);
        rColor = parseInt((rgbActive.r - (rgbActive.r-rgbNext.r)*0.5));
        gColor = parseInt(rgbActive.g - (rgbActive.g-rgbNext.g)*0.5);
        bColor = parseInt(rgbActive.b - (rgbActive.b-rgbNext.b)*0.5);

        return "rgb("+rColor+","+gColor+","+bColor+")";
    }
  
  
   const { spring } = useSpring({
    spring: neuronState,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001, duration: 100},
    loop: false
  })


   const color = spring.to([prevState, neuronState], [prevColor,neuronColor])
 

    return(
        <animated.group
        onPointerOver={() => {
            setHover(true);
          
            changeInfo( "Neuron \n"+
                        "label: "+props.label+"\n" +
                        "position:"+props.position+"\n"+
                        "charging value: "+props.charging+"\n"+
                        "state: "+props.state+"\n"+
                        "description: "+props.description+"\n"
            )
          }}
          onPointerOut={() => {
            setHover(false);
            changeInfo( "This panel shows informations about hovered element from visualization")
          }}
          >
             <animated.mesh {...props} scale = {Math.abs(props.charging)}>
                <sphereGeometry args={[15, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
                <animated.meshStandardMaterial 
                color={color}
                
             />
            </animated.mesh>
            <animated.mesh {...props}>
            <sphereGeometry args={[15, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
            <animated.meshStandardMaterial 
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
        <mesh {...props}>
        <text
          position-x = {0}
          position-y = {25}
          position-z = {0}
          {...opts}
          text={props.label}
          font={"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"}
          anchorX="center"
          anchorY="middle"
        ></text>
         <text
          position-x = {0}
          position-y = {-25}
          position-z = {0}
          
          {...opts}
          fontSize={8}
          text={props.charging*100 +"%"}
          font={"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"}
          anchorX="center"
          anchorY="middle"
        ></text>
           </mesh>
        </animated.group>
    )
}
export default React.memo(Neuron);