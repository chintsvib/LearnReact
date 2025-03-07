import React from "react";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(true);
  const toggle = () => {
    setStatus(!status);
    onClick();
  };
  if (status) return <FcLike color="pink" size={20} onClick={toggle} />;
  else return <FaRegHeart size={20} onClick={toggle} />;
};

export default Like;
