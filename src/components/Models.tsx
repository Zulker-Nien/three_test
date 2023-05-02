import { Html, PresentationControls, useTexture } from "@react-three/drei";
import {
  RepeatWrapping,
  DoubleSide,
  Vector2,
  MeshStandardMaterial,
} from "three";
import { useState } from "react";
import ReactSlider from "react-slider";
import "../App.scss";

interface IProps {
  meshChange: string;
}

const Models = (props: IProps) => {
  const { meshChange } = props;

  const [uploadedTexture, setUploadedTexture] = useState<string | null>(null);

  const [offsetLevelY, setOffsetLevelY] = useState(0);
  const [offsetLevelX, setOffsetLevelX] = useState(0);
  const [scaleTexture, setScaleTexture] = useState(100);
  var mass = 1;
  var tension = 170;

  let texture = useTexture(uploadedTexture ? uploadedTexture : "./texture.jpg");

  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat = new Vector2(scaleTexture, scaleTexture);
  texture.offset = new Vector2(offsetLevelY, offsetLevelX);

  const material = new MeshStandardMaterial({
    side: DoubleSide,
    map: texture,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setUploadedTexture(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveTexture = () => {
    setUploadedTexture(null);
    material.map = null;
  };

  return (
    <>
      <group position={[0, 2, 0]}>
        <Html>
          <div className="htmlInput">
            <div className="inputContainer">
              <h3>Change texture</h3>
              <input type="file" onChange={handleInput} />
              <button onClick={handleRemoveTexture}>Remove Texture</button>
            </div>
            <div className="yContainer">
              <h3>Texture change Y</h3>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => {
                  setOffsetLevelY(state.valueNow * 0.01);
                  return <div {...props}>{state.valueNow}</div>;
                }}
              />
            </div>
            <div className="yContainer">
              <h3>Texture change X</h3>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => {
                  setOffsetLevelX(state.valueNow * 0.01);
                  return <div {...props}>{state.valueNow}</div>;
                }}
              />
            </div>
            <div className="yContainer">
              <h3>Scale Texture</h3>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={100}
                renderThumb={(props, state) => {
                  setScaleTexture(-state.valueNow * 0.01);
                  return <div {...props}>{state.valueNow}</div>;
                }}
              />
            </div>
          </div>
        </Html>
      </group>
      <group position={[0, -1, 0]}>
        <PresentationControls
          enabled={true}
          global
          config={{ mass: mass, tension: tension }}
          polar={[0, Math.PI]}
          azimuth={[-Infinity, Infinity]}
        >
          <mesh material={material} rotation={[10, 0, 10]}>
            {meshChange === "Box" ? (
              <boxGeometry />
            ) : meshChange === "Plane" ? (
              <planeGeometry />
            ) : meshChange === "Sphere" ? (
              <sphereGeometry />
            ) : (
              <cylinderGeometry />
            )}
          </mesh>
        </PresentationControls>
      </group>
    </>
  );
};

export default Models;
