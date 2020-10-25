import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POST_QUERY } from "../util/graphql";

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POST_QUERY
  );

  const { user } = useContext(AuthContext);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading || !posts ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => {
            return (
              <Transition.Group>
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              </Transition.Group>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
