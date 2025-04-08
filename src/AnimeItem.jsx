import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowUp, ArrowDown, Plus, Minus } from "lucide-react";
import { useEffect } from "react";

const AnimeItem = ({ anime, index, listaAnimes, setListaAnimes }) => {
  const atualizarAnime = (campo, valor) => {
    const novaLista = [...listaAnimes];
    novaLista[index] = { ...novaLista[index], [campo]: valor };
    setListaAnimes(novaLista);
  };

  const removerAnime = () => {
    const novaLista = listaAnimes.filter((item) => item.id !== anime.id);
    setListaAnimes(novaLista);
  };

  const mover = (direcao) => {
    const novaLista = [...listaAnimes];
    const novoIndex = index + direcao;
    if (novoIndex < 0 || novoIndex >= listaAnimes.length) return;
    const temp = novaLista[novoIndex];
    novaLista[novoIndex] = novaLista[index];
    novaLista[index] = temp;
    setListaAnimes(novaLista.map((anime, i) => ({ ...anime, prioridade: i })));
  };

  const incrementar = () => {
    if (anime.episodiosAssistidos < anime.totalEpisodios) {
      const novoValor = anime.episodiosAssistidos + 1;
      atualizarAnime("episodiosAssistidos", novoValor);
    }
  };

  const decrementar = () => {
    if (anime.episodiosAssistidos > 0) {
      const novoValor = anime.episodiosAssistidos - 1;
      atualizarAnime("episodiosAssistidos", novoValor);
    }
  };

  useEffect(() => {
    if (
      anime.status !== "Concluído" &&
      anime.episodiosAssistidos >= anime.totalEpisodios
    ) {
      atualizarAnime("status", "Concluído");
    }
  }, [anime.episodiosAssistidos, anime.totalEpisodios]);

  const statusColors = {
    Planejado: "bg-yellow-100 dark:bg-yellow-900",
    Assistindo: "bg-blue-100 dark:bg-blue-900",
    Concluído: "bg-green-100 dark:bg-green-900",
  };

  const progresso = Math.min(
    100,
    Math.round((anime.episodiosAssistidos / anime.totalEpisodios) * 100)
  );

  return (
    <Card className={`p-4 flex flex-col gap-2 ${statusColors[anime.status] || ""}`}>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <strong className="text-lg truncate max-w-[60%]">{anime.nome}</strong>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={() => mover(-1)}>
            <ArrowUp size={16} />
          </Button>
          <Button variant="outline" size="icon" onClick={() => mover(1)}>
            <ArrowDown size={16} />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={removerAnime}
            className="hover:bg-red-600"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <select
          className="border rounded px-2 py-1"
          value={anime.status}
          onChange={(e) => atualizarAnime("status", e.target.value)}
        >
          <option value="Planejado">Planejado</option>
          <option value="Assistindo">Assistindo</option>
          <option value="Concluído">Concluído</option>
        </select>

        <Input
          type="number"
          min={0}
          value={anime.totalEpisodios}
          onChange={(e) => atualizarAnime("totalEpisodios", Number(e.target.value))}
          placeholder="Total de episódios"
        />
      </div>

      <div className="flex items-center gap-2">
  <Button onClick={decrementar} size="icon" variant="outline">
    <Minus size={16} />
  </Button>
  <Input
    type="number"
    min={0}
    max={anime.totalEpisodios}
    value={anime.episodiosAssistidos}
    onChange={(e) => {
      const valor = Number(e.target.value);
      if (valor >= 0 && valor <= anime.totalEpisodios) {
        atualizarAnime("episodiosAssistidos", valor);
      }
    }}
    className="w-24 text-center"
  />
  <span>/ {anime.totalEpisodios}</span>
  <Button onClick={incrementar} size="icon" variant="outline">
    <Plus size={16} />
  </Button>
</div>

      <div className="w-full h-3 bg-gray-200 rounded">
        <div
          className="h-full bg-green-500 rounded"
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      <textarea
        className="border rounded px-2 py-1 w-full mt-2"
        value={anime.descricao}
        onChange={(e) => atualizarAnime("descricao", e.target.value)}
        placeholder="Descrição do anime"
      />
    </Card>
  );
};

export default AnimeItem;
