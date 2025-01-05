import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import PersonDetails from "../components/templatePersonPage";
import { getPersonMovieCredits } from "../api/tmdb-api";
import { getPersonBio } from "../api/movies-api";

const PersonPage = () => {
  const { id } = useParams();

  const { data: person, error: personError, isLoading: personLoading, isError: personIsError } = useQuery(
    ["person", { id }],
    getPersonBio
  );

  const { data: credits, error: creditsError, isLoading: creditsLoading, isError: creditsIsError } = useQuery(
    ["credits", { id }],
    getPersonMovieCredits
  );

  if (personLoading || creditsLoading) {
    return <Spinner />;
  }

  if (personIsError) {
    return <h1>{personError.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }

  return <PersonDetails person={person} credits={credits} />;
};

export default PersonPage;