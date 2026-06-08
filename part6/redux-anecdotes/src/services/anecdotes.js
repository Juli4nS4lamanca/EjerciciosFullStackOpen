const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};

const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(asObject(content)),
  };
  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};

const updateLike = async (anecdote) => {
  const updateVotes = anecdote.votes + 1;
  const options = {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ votes: updateVotes }),
  };

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};

export default { getAll, createNew, updateLike };
