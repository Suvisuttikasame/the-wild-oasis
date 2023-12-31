import PropsType from "prop-types";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Img = styled.img`
display: block;
width:6.4rem
aspect-ratio:3/2
object-fit:cover
object-position:center
tranform: scale(1.5) translateX(-7px)
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  function handleDuplicateCabin() {
    const duplicateCabin = {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    };
    createCabin(duplicateCabin);
  }

  const [showForm, setShowForm] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fit up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <div>
          <button onClick={() => handleDuplicateCabin()} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropsType.shape({
    id: PropsType.number,
    name: PropsType.string,
    maxCapacity: PropsType.number,
    regularPrice: PropsType.number,
    discount: PropsType.number,
    image: PropsType.string,
    description: PropsType.string,
  }),
};

export default CabinRow;
