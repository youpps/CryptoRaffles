import { FC, useState } from "react";
import {
  RegisterModalBlock,
  RegisterModalButton,
  RegisterModalClose,
  RegisterModalCloseImage,
  RegisterModalContent,
  RegisterModalHash,
  RegisterModalHashInputBlock,
  RegisterModalHashInputEtherium,
  RegisterModalReferenceInput,
  RegisterModalTitle,
} from "./RegisterModalStyles";
import truncateEthAddress from "truncate-eth-address";
import axios from "axios";

interface IRegisterModal {
  onClose(): any;
  address: string;
  giveaway_id: string;
}

const RegisterModal: FC<IRegisterModal> = ({ onClose, address, giveaway_id }) => {

  const [inputData, setInputData] = useState<string>();

  const handleInput = (event) => {
    setInputData(event.target.value);
  }

  const handleRegistration = () => {
    if (inputData) {
      axios.post('http://localhost:8000/api/giveaways-registry/', {
        wallet_giveaway: [address, giveaway_id],
        wallet: address,
        giveaway_id: giveaway_id,
        social_link: inputData
      })
      .then(res => {

      })
      .catch(err => {
        console.log("Your account hasn't meet the required conditions.")
      })
    } else {
      console.log("No input data provided")
    }
  }

  return (
    <RegisterModalBlock onClick={onClose}>
      <RegisterModalContent onClick={(e) => e.stopPropagation()}>
        <RegisterModalClose onClick={onClose}>
          <RegisterModalCloseImage alt="close" src="/images/modal-close.svg" />
        </RegisterModalClose>
        <RegisterModalTitle>Регистрация</RegisterModalTitle>
        <RegisterModalHashInputBlock>
          <RegisterModalHash>{truncateEthAddress(address)}</RegisterModalHash>
          <RegisterModalHashInputEtherium alt="Ethereum" src="/images/ethereum-small-logo.svg" />
        </RegisterModalHashInputBlock>
        <RegisterModalReferenceInput placeholder="Ссылка на аккаунт в соц. сети (см. условия)" onChange={handleInput} />
        <RegisterModalButton onClick={handleRegistration}>Отправить</RegisterModalButton>
      </RegisterModalContent>
    </RegisterModalBlock>
  );
}

export default RegisterModal;
