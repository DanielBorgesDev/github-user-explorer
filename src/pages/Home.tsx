import { useSearchHistory } from "@/core/history/useSearchHistory";
import { useGithubRepos, useGithubUser } from "@/github/ui/hooks";
import { RepoList } from "@/github/ui/RepoList";
import { UserCard } from "@/github/ui/UserCard";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { add: addHistory } = useSearchHistory();

  const initialQ = useMemo(() => {
    const qs = new URLSearchParams(location.search);
    return qs.get("q") || "octocat";
  }, [location.search]);

  const [input, setInput] = useState(initialQ);
  const [username, setUsername] = useState<string | null>(initialQ);
  const [page, setPage] = useState(1);

  const userQ = useGithubUser(username);
  const reposQ = useGithubRepos(username, page, 8);

  useEffect(() => {
    setInput(initialQ);
    setUsername(initialQ);
    setPage(1);
  }, [initialQ]);

  useEffect(() => {
    if (userQ.data && username) {
      addHistory(username);
    }
  }, [userQ.data, username, addHistory]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = input.trim();
    if (!next) return;
    setPage(1);
    navigate(`/?q=${encodeURIComponent(next)}`, { replace: false });
  }

  return (
    <div>
      <div className="flex justify-center mt-4  h-[50px]">
        <form
          onSubmit={onSubmit}
          className="flex items-center w-[400px]  justify-between"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="username (ex: torvalds)"
            className="w-[280px] h-14 rounded-lg px-3 
                 bg-[--color-secondary-dark] 
                 text-[--color-secondary-light] 
                 placeholder-gray-400 
                 focus:outline-none focus:ring-2 
                 focus:ring-[--color-primary-medium]"
          />
          <button
            type="submit"
            className="ml-3 px-6 h-14 rounded-lg 
                 bg-[--color-primary-medium] text-white font-semibold
                 hover:opacity-90"
          >
            Buscar
          </button>
        </form>
      </div>

      {userQ.isLoading && <p>Carregando perfil…</p>}
      {userQ.error && (
        <p className="text-[--color-feedback-error]">
          {(userQ.error as Error).message}
        </p>
      )}
      {userQ.data && <UserCard user={userQ.data} />}

      <div>
        <h2 className="text-lg font-semibold mb-2">Repositórios recentes</h2>
        {reposQ.isLoading && <p>Carregando repositórios…</p>}
        {reposQ.error && (
          <p className="text-[--color-feedback-error]">
            {(reposQ.error as Error).message}
          </p>
        )}
        {reposQ.data && reposQ.data.length > 0 && (
          <RepoList repos={reposQ.data} />
        )}
        {reposQ.data && (
          <div className="flex gap-4 mt-4 items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-md bg-[--color-secondary-dark] hover:bg-[--color-highlight-purple] disabled:opacity-40"
            >
              Anterior
            </button>
            <span>Página {page}</span>
            <button
              disabled={(reposQ.data?.length ?? 0) < 8}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded-md bg-[--color-secondary-dark] hover:bg-[--color-highlight-purple] disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
