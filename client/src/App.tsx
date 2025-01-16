import "./App.css";

import { useQuery, gql } from "@apollo/client";

export default function App() {
  const { loading, error, data } = useQuery(gql`
    query Query {
      games {
        id
        platform
        reviews {
          id
          author {
            name
          }
          content
        }
        title
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ backgroundColor: "red" }}>
        <h1>Games</h1>
        {data.games.map((game: any) => (
          <div key={game.id}>
            <h2>{game.title}</h2>
            <p>{game.platform}</p>
            {game.reviews.length > 0 && (
              <div>
                <h3>Reviews</h3>
                {game.reviews.map((review: any) => (
                  <div key={review.id}>
                    <p>{review.content}</p>
                    <p>{review.author.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
