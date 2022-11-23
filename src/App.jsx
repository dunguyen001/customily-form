import { useEffect, useRef, useState } from "react";
import { getProductFromSetting } from "./api";
import { FormContainer } from "./components/FormContainer";

function App() {
  const productRef = useRef(
    "personalized-garden-floral-art-find-my-soul-custom-classic-metal-signs"
  );
  const [setting, setSetting] = useState();

  useEffect(() => {

    // return () => {
    //   setSetting
    // }
  }, []);

  const loadProductSetting = async () => {
    const setting = await getProductFromSetting(productRef.current.value);
    setSetting(setting);
  };
  return (
    <div className="App">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <input type="text" id="product" className="border" ref={productRef} />
          <button onClick={loadProductSetting}>Load</button>
        </div>
        {setting ? <FormContainer {...setting.sets[0]} />  : null}
      </div>
    </div>
  );
}

export default App;
