import { h } from 'preact';
import style from './style.css';
import { useState } from 'preact/hooks'

function Home() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [count1,setCount1]= useState();
const [value,setValue]= useState();


  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    console.log("arra",array.filter(item=>item["Igst Rate"] ==0.05),array)
    setCount1(array.filter(item=>item["Igst Rate"] ==0.05).length);
    setValue(array.filter(item=>item["Igst Rate"] ==0.18).length)

  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <table>
        <thead>
          <tr key={"header"} onClick={()=>console.log(array)}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
	 <div>
	 <h3>Number of orders with 5% IGST Rate={count1}</h3></div>
	 <div>
	 <h3>Number of orders with 18% IGST Rate={value}</h3></div>
    </div>
  );
}

export default Home;
