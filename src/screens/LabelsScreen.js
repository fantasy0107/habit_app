import Sidebar from "../components/Sidebar";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { makeStyles } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { get } from "lodash";
import SignInContainer from "../containers/SignInContainer";

const LabelsScreen = () => {
  const [open, setOpen] = useState(false);
  const tagIDs = useSelector((state) => get(state, `tag.id`, []));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SignInContainer>
      <div className="flex flex-1 flex-col">
        <div>'LabelsScreen'</div>
        <div>
          {tagIDs.map((tagID) => {
            return <TagItem key={tagID} id={tagID}></TagItem>;
          })}
        </div>
      </div>
    </SignInContainer>
  );
};

const TagItem = ({ id }) => {
  const tag = useSelector((state) => get(state, `db.tags.${id}`));
  const title = get(tag, "title", "default");

  return <div className="hover:bg-gray-400">{title}</div>;
};

const ModalBody = () => (
  <div className=" absolute  top-1/2 left-1/2 w-1/5 bg-white rounded border-solid shadow-sm p-1">
    <h2 id="simple-modal-title">Text in a modal</h2>
    <p id="simple-modal-description">
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </p>
  </div>
);

const TagButton = () => {};

export default LabelsScreen;
