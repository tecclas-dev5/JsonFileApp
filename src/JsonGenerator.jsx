import { faker } from "@faker-js/faker";
import download from "downloadjs";
import React from "react";
import { useForm } from "react-hook-form";

const JsonGenerator = () => {
  const { register, handleSubmit } = useForm();
  const [objeto, setObjeto] = React.useState("");

  const submit = async (data) => {
    let json = { data: [] };
    for (let i = 0; i < data.count; i++) {
      let obj = {
        _id: faker.database.mongodbObjectId(),
        nombre: faker.name.fullName(),
        email: faker.internet.email(),
        ciudad: faker.address.cityName(),
        celular: faker.phone.number(),
        walletGC: faker.database.mongodbObjectId(),
        walletUsdt: faker.database.mongodbObjectId(),
        cuentaactiva: faker.database.mongodbObjectId(),
        ide: faker.internet.userName(),
        idPatrocinador: faker.database.mongodbObjectId(),
        atributos: {
          DebeGCTOKENS: faker.random.word(),
          Membresia: faker.random.word(),
          totalpaquetesenprogreso: faker.datatype.number({ max: 100 }),
          Balancependiente: faker.datatype.float({ max: 100 }),
          Billetera: faker.random.numeric(),
          Carterita: faker.random.numeric(),
        },
        fecha_registro: faker.date.past(),
        nodo: faker.datatype.boolean(),
        newPassword: faker.random.word(),
        totalpaquetesenprogreso: faker.datatype.number({ max: 100 }),
      };
      json.data.push(obj);
    }
    // setObjeto(JSON.stringify(json));
    download(
      JSON.stringify(json),
      `fake-${data.count}-data.json`,
      "json/application"
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submit)}>
        <input
          {...register("count")}
          type="number"
          placeholder="Cantidad de datos"
        />
        <input type="submit" value="Generar" />
      </form>
      <button onClick={() => setObjeto("")}>Clear</button>
      <p>{objeto}</p>
    </div>
  );
};

export default JsonGenerator;
