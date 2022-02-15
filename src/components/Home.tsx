import { render } from "@testing-library/react";
import { useRef, useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const fileInputRef = useRef<any>();

  useEffect(() => {
      if(image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string)
          }
          reader.readAsDataURL(image)
      } else {
        setPreview(null);
      }

  }, [image])


  return (
    <div className="Home">
      <form>
          <img src={preview} alt="" />
          {/* <p>{preview}</p> */}
        <button
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.click();
          }}
        >
          Add Image
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={(event: any) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
      </form>
    </div>
  );
};

export default Home;