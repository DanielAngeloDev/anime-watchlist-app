import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BuscaAnime = ({ adicionarAnime }) => {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (busca.trim() === "") {
        setResultados([]);
        return;
      }

      fetch(`https://api.jikan.moe/v4/anime?q=${busca}&limit=5`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            setResultados(data.data);
          }
        });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [busca]);

  const handleAdicionar = (anime) => {
    adicionarAnime({
      nome: anime.title,
      descricao: anime.synopsis || "",
      status: "Planejado",
      assistidos: 0,
      totalEpisodios: anime.episodes || 0,
    });

    setBusca("");
    setResultados([]);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Buscar anime..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full"
      />
      {resultados.length > 0 && (
        <ul className="absolute z-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 w-full mt-1 rounded shadow max-h-60 overflow-auto">
          {resultados.map((anime) => (
            <li
              key={anime.mal_id}
              onClick={() => handleAdicionar(anime)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer text-sm"
            >
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscaAnime;
