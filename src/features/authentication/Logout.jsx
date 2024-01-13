import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { mutate: logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {isLoading ? <SpinnerMini /> : <HiArrowLeftOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
