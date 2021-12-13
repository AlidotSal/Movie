import React from "react";
import { useParams } from "react-router-dom";
import Show from "../components/Show";

export default ({ theme }) => {
  let { id } = useParams();
  return <Show id={id} />;
};
