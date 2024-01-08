import Proptypes from "prop-types";

function Empty({ resource }) {
  return <p>No {resource} could be found.</p>;
}

Empty.propTypes = {
  resource: Proptypes.string,
};

export default Empty;
