import React from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

export default () => {
  let { id } = useParams();
  return <Movie id={id} />;
};
