import { useState } from "react";
import { useEffect } from "react";
import Pokemon from "../components/poke-card";
import StudenPost from "../components/post";
import Formxdd from "../components/form2";
import axios from "axios";

export default function Table() {
  const pokeonURL = "https://pokeapi.co/api/v2/pokemon/minun";
  const backendURL = "https://memory-backend-forjsd11.onrender.com/api/users";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewww, setViewww] = useState(true);
  const [url, setUrl] = useState(pokeonURL);

  const fetchData = async () => {
    //putsomecode to this
    try {
      let response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    setViewww(!viewww);

    if (viewww) {
      setUrl(backendURL);
    } else {
      setUrl(pokeonURL);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className="flex flex-col justify-center items-center text-center gap-12">
      <button className="font-bold rounded-4xl bg-amber-50 w-24" onClick={handleSwitch}>
        Switch
      </button>
      {viewww ? (
        <>
          {loading && <div className="text-4xl font-bold animate-bounce text-white">Loading...</div>}
          {data && <Pokemon data={data} />}
        </>
      ) : (
        <div className="flex flex-col w-auto gap-12">
          <Formxdd onUserCreated={fetchData} />
          <div className="grid grid-cols-4 gap-4">{data && Array.isArray(data) && data.map((e) => <StudenPost key={e.id} {...e} onDelete={fetchData} />)}</div>
        </div>
      )}
    </div>
  );
}