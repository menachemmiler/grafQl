import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface Props {
  user: { __typename: string; id: string; name: string };
}

const GAMES_QUERY = (fields: string, searchTitle?: string) => {
  if (searchTitle) {
    return gql`
      query GetGameByTitle {
        gameBytitle(title: "${searchTitle}") {
          ${fields}
        }
      }
    `;
  } else {
    return gql`
      query GetGames {
        games  {
          ${fields}
        }
      }
    `;
  }
};

const ADD_REVIEW_MUTATION = gql`
  mutation AddReview(
    $rating: Int!
    $content: String!
    $gameId: ID!
    $authorId: ID!
  ) {
    addReview(
      rating: $rating
      content: $content
      gameId: $gameId
      authorId: $authorId
    ) {
      id
      content
      rating
    }
  }
`;

const Menu = ({ user }: Props) => {
  const navigate = useNavigate();
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "title",
    "id",
  ]);
  const [searcTitle, setSearchTitle] = useState("");
  const { data, loading, error, refetch } = useQuery(
    GAMES_QUERY(selectedFields.join(" "), searcTitle)
  );

  const [addReview] = useMutation(ADD_REVIEW_MUTATION);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleFieldChange = (field: string) => {
    setSelectedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  const handleAddReview = async (
    gameId: string,
    content: string,
    rating: number
  ) => {
    try {
      await addReview({
        variables: { rating, content, gameId, authorId: user.id },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const fields = ["platform", "reviews { rating content id author { name } }"];

  return (
    <div className="menu">
      <div className="header">
        <button onClick={handleLogout}>Logout</button>
        <div>
          <h3>:בחר שדות להצגה</h3>
          {fields.map((field, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedFields.includes(field)}
                  onChange={() => handleFieldChange(field)}
                />
              }
              label={field}
            />
          ))}
          <TextField
            label="חיפוש לפי שם הספר"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTitle(e.target.value)}
            value={searcTitle}
          />
        </div>
      </div>
      <div className="main">
        <h1>Hello {user.name}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        {/* יצירת מערך אחיד של המשחקים */}
        {(() => {
          const games = data?.games || data?.gameBytitle || [];
          // if (games.length === 0 && !loading && !error) {
          //   return <p>No games found.</p>;
          // }

          return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {games.map((game: any) => (
                <Card key={game.id} style={{ width: 300 }}>
                  <CardContent>
                    <Typography variant="h6">{game.title}</Typography>
                    {game.platform && (
                      <Typography variant="body2">
                        Platforms: {game.platform.join(", ")}
                      </Typography>
                    )}
                    {game.reviews && (
                      <>
                        <Typography variant="body2">Reviews:</Typography>
                        {game.reviews.map((review: any) => (
                          <Typography key={review.id} variant="body2">
                            {review.content} (Rating: {review.rating}) (כותב
                            חוות הדעת: {review.author.name})
                          </Typography>
                        ))}
                      </>
                    )}
                    <div>
                      <TextField
                        label="Review Content"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onBlur={(event) =>
                          handleAddReview(game.id, event.target.value, 5)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          );
        })()}
      </div>

      {/* <div className="main">
        <h1>Hello {user.name}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          
        <pre>{JSON.stringify(data, null, 2)}</pre>
            

          {data?.games?.map((game: any) => (
            <Card key={game.id} style={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">{game.title}</Typography>
                {game.platform && (
                  <Typography variant="body2">
                    Platforms: {game.platform.join(", ")}
                  </Typography>
                )}
                {game.reviews && (
                  <>
                    <Typography variant="body2">Reviews:</Typography>
                    {game.reviews.map((review: any) => (
                      <Typography key={review.id} variant="body2">
                        {review.content} (Rating: {review.rating}) (כותב חוות
                        הדעת: {review.author.name})
                      </Typography>
                    ))}
                  </>
                )}
                <div>
                  <TextField
                    label="Review Content"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onBlur={(event) =>
                      handleAddReview(game.id, event.target.value, 5)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Menu;
