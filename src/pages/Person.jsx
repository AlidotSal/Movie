import React from "react";
import { useParams } from "react-router-dom";
import Person from "../components/Person";

export default () => {
  let { id } = useParams();
  return <Person id={id} />;
};
