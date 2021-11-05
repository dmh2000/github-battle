import React, { useState } from "react";

function useRepos(selected) {
  const { repos, setRepos } = useState([]);
  const { loading, setLoading } = useState(true);

  React.useEffect(() => {
    fetchPopularRepos(selected)
      .then((data) =>
        this.setState(({ repos }) => ({
          repos: {
            ...repos,
            [selected]: data,
          },
          error: null,
        }))
      )
      .catch(() => {
        console.warn("Error fetching repos: ", this.state.error);
        this.setState({
          error: "error fetching repositories",
        });
      });
  }, [selected]);

  return [loading, repos];
}
