import { Button } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const HeartButton = ({ isSelected, toggle, ...props }) => {
  return (
    <Button onClick={toggle} {...props}>
      {isSelected ? <BsHeartFill /> : <BsHeart />}
    </Button>
  );
};

export default HeartButton;
