import { UploadClient } from "@uploadcare/upload-client";
import React from "react";
import json1K from "./json/fake-1K-data.json";
import json10K from "./json/fake-10K-data.json";
import json100K from "./json/fake-100K-data.json";
import useTimer from "./useTimer";

const client = new UploadClient({ publicKey: "617d36ab18ba030984bd" });

const JsonUploading = () => {
  const [uploadTimes, setUploadTimes] = React.useState([]);
  const [uploadGroupTimes, setUploadGroupTimes] = React.useState([]);
  const file = React.useRef();
  const timer = useTimer();

  const uploadFile = async () => {
    timer.handleStart();
    client.uploadFile(file.current).then((res) => {
      const time = timer.elapsedTime.current;
      setUploadTimes((prevTimes) =>
        prevTimes.concat({
          file: file.current.name,
          time: time,
        })
      );
      timer.handleReset();
      console.log(res);
    });
  };

  const uploadGroupFiles = async () => {
    setUploadGroupTimes([]);
    const files = [];
    for (let index = 0; index < json1K.data.length; index += 100) {
      let data = json1K.data.slice(index, index + 100);
      const newFile = new File(
        [JSON.stringify({ data: data })],
        `group-${index}-to-${index + 99}-data.json`,
        {
          type: "json/application",
        }
      );
      files.push(newFile);
    }
    timer.handleStart();
    files.forEach((file) => {
      client.uploadFile(file).then((res) => {
        const time = timer.elapsedTime.current;
        setUploadGroupTimes((prevTimes) =>
          prevTimes.concat({ file: file.name, time: time })
        );
      });
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 100,
      }}
    >
      <h4>Tiempos de subida:</h4>
      <ul>
        {uploadTimes.map((item, i) => (
          <li key={i}>
            {item.file}: {item.time} ms
          </li>
        ))}
      </ul>
      <div>
        <h4>Tiempos de subido por grupo:</h4>
        <ul>
          {uploadGroupTimes.map((item, i) => (
            <li key={i}>
              {item.file}: {item.time} ms
            </li>
          ))}
        </ul>
      </div>
      <h4>Opciones</h4>
      <div
        style={{ display: "flex", justifyContent: "space-between", width: 700 }}
      >
        <button
          disabled={timer.isRunning}
          onClick={() => {
            const newFile = new File(
              [JSON.stringify(json1K)],
              "fake-1K-data.json",
              {
                type: "json/application",
              }
            );
            file.current = newFile;
            uploadFile();
          }}
        >
          Subir 1K Datos
        </button>
        <button
          disabled={timer.isRunning}
          onClick={() => {
            const newFile = new File(
              [JSON.stringify(json10K)],
              "fake-10K-data.json",
              {
                type: "json/application",
              }
            );
            file.current = newFile;
            uploadFile();
          }}
        >
          Subir 10K Datos
        </button>
        <button
          disabled={timer.isRunning}
          onClick={() => {
            const newFile = new File(
              [JSON.stringify(json100K)],
              "fake-100K-data.json",
              {
                type: "json/application",
              }
            );
            file.current = newFile;
            uploadFile();
          }}
        >
          Subir 100K Datos
        </button>
        <button disabled={timer.isRunning} onClick={uploadGroupFiles}>
          Subir en Grupo
        </button>
        <button onClick={timer.handleReset}>detener reloj</button>
      </div>
    </div>
  );
};

export default JsonUploading;
