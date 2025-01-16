// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";


// interface Props {
//   user: { __typename: string; id:string; name: string };
// }

// const Menu = ({user}:Props) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("user")) {
//       navigate("/");
//     }
//   }, []);
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };
//   return (
//     <div className="menu">
//       <div className="header">
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <div className="main">
//         <h1>hello {user.name}</h1>
//       </div>
//     </div>
//   );
// };

// export default Menu;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface Props {
  user: { __typename: string; id: string; name: string };
}

const GAMES_QUERY = (fields: string, filter: string) => gql`
  query GetGames {
    games ${filter} {
      ${fields}
    }
  }
`;

const ADD_REVIEW_MUTATION = gql`
  mutation AddReview($rating: Int!, $content: String!, $gameId: ID!, $authorId: ID!) {
    addReview(rating: $rating, content: $content, gameId: $gameId, authorId: $authorId) {
      id
      content
      rating
    }
  }
`;

const Menu = ({ user }: Props) => {
  const navigate = useNavigate();
  const [selectedFields, setSelectedFields] = useState<string[]>(["title", "id"]);
  const [filter, setFilter] = useState<string>("");
  const { data, loading, error, refetch } = useQuery(
    GAMES_QUERY(selectedFields.join(" "), filter)
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

  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setFilter(value ? `(title: "${value}")` : "");
  // };

  const handleAddReview = async (gameId: string, content: string, rating: number) => {
    try {
      await addReview({
        variables: { rating, content, gameId, authorId: user.id },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const fields = ["platform", "reviews { rating content id }"];

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
          {/* <TextField
            label="Filter by Title"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
          /> */}
        </div>
      </div>
      <div className="main">
        <h1>Hello {user.name}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
                        {review.content} (Rating: {review.rating})
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
      </div>
    </div>
  );
};

export default Menu;
