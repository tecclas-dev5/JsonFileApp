import { UploadcareSimpleAuthSchema } from "@uploadcare/rest-client";
import React from "react";
import useTimer from "./useTimer";

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: "617d36ab18ba030984bd",
  secretKey: "c68a8eb1ae5c6a883be8",
});

const filesUrls = [
  {
    name: "group-0-to-99-data",
    url: "https://ucarecdn.com/d9c1c689-f2c6-4ff0-9282-f54150610f13/",
  },
  {
    name: "group-100-to-199-data",
    url: "https://ucarecdn.com/9e56d128-0611-41ac-9881-22a25baaa20c/",
  },
  {
    name: "group-200-to-299-data",
    url: "https://ucarecdn.com/6676fde8-072b-4475-949d-b042573d47f1/",
  },
  {
    name: "group-300-to-399-data",
    url: "https://ucarecdn.com/254cf2be-d9c7-49fd-9888-6aefeb88eb77/",
  },
  {
    name: "group-400-to-499-data",
    url: "https://ucarecdn.com/47df0809-9506-4ead-926e-8e6c170d37f2/",
  },
  {
    name: "group-500-to-599-data",
    url: "https://ucarecdn.com/3a00be0d-f9dc-405f-95f4-2b232a0cbca3/",
  },
  {
    name: "group-600-to-699-data",
    url: "https://ucarecdn.com/45c556b0-9c73-4e64-a512-2c2ca34d6361/",
  },
  {
    name: "group-700-to-799-data",
    url: "https://ucarecdn.com/87e69c77-a14b-4b1b-9dc7-12307eec3eae/",
  },
  {
    name: "group-800-to-899-data",
    url: "https://ucarecdn.com/7bcbf1db-24e8-4a79-a523-6f80884107fb/",
  },
  {
    name: "group-900-to-999-data",
    url: "https://ucarecdn.com/ee00d00c-ae67-4989-89b5-6410c4132b47/",
  },
];

const JsonDownloading = () => {
  const timer = useTimer();
  const json = React.useRef();
  const [times, setTimes] = React.useState([]);
  const [groupTimes, setGroupTimes] = React.useState([]);

  const downloadDirectFile = (label) => {
    timer.handleStart();
    fetch(json.current)
      .then((res) => res.blob())
      .then((blob) => blob.text())
      .then((text) => {
        const data = JSON.parse(text);
        console.log(data);
        const time = timer.elapsedTime.current;
        setTimes((prevTimes) => prevTimes.concat({ name: label, time: time }));
        timer.handleReset();
      });
  };

  const downloadGroupFiles = () => {
    setGroupTimes([]);
    timer.handleStart();
    filesUrls.forEach((item) => {
      fetch(item.url)
        .then((res) => res.blob())
        .then((blob) => blob.text())
        .then((text) => {
          const data = JSON.parse(text);
          console.log(data);
          const time = timer.elapsedTime.current;
          setGroupTimes((prevTimes) =>
            prevTimes.concat({ name: item.name, time: time })
          );
        });
    });
  };

  return (
    <div>
      <h4>Tiempos de bajada:</h4>
      <ul>
        {times.map((item, i) => (
          <li key={i}>
            {item.name}: {item.time} ms
          </li>
        ))}
      </ul>
      <h4>Tiempos de bajada en paralelo:</h4>
      <ul>
        {groupTimes.map((item, i) => (
          <li key={i}>
            {item.name}: {item.time} ms
          </li>
        ))}
      </ul>
      <button
        disabled={timer.isRunning}
        onClick={() => {
          json.current =
            "https://ucarecdn.com/91fa0f51-2c64-4782-89e2-a987f7de62db/";
          downloadDirectFile("1K");
        }}
      >
        Bajar 1K data
      </button>
      <button
        disabled={timer.isRunning}
        onClick={() => {
          json.current =
            "https://ucarecdn.com/6ddc528d-7e80-489c-9747-505f2d2a5bf3/";
          downloadDirectFile("10K");
        }}
      >
        Bajar 10K data
      </button>
      <button
        disabled={timer.isRunning}
        onClick={() => {
          json.current =
            "https://ucarecdn.com/acb26984-f4f3-4a94-b3e6-ce1f1b64ecde/";
          downloadDirectFile("100K");
        }}
      >
        Bajar 100K data
      </button>
      <button disabled={timer.isRunning} onClick={downloadGroupFiles}>
        Bajar grupo
      </button>
      <button onClick={() => setTimes([])}>Clear</button>
      <button onClick={timer.handleReset}>Stop Timer</button>
    </div>
  );
};

export default JsonDownloading;
