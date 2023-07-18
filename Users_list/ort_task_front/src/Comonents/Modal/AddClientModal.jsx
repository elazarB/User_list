import { useCallback, useState } from "react";
import Input from "../Inputs/Input";
import Modal from "./Modal";
import useAddClientModal from "../../Hooks/UseAddClientModal";
import { apiPost } from "../../App/Services/Services";
import { API_BASE_URL } from "../users/UsersList";

const AddClientModal = () => {
  const addClientModal = useAddClientModal()
  
  const [fullName, setFullName] = useState('');
  const [errFullName, setErrFullName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [errPhoneNumber, setErrPhoneNumber] = useState('');

  const [ipAddress, setIPAddress] = useState('');
  const [errIpAddress, setErrIPAddress] = useState('');

  const [id, setId] = useState("");
  const [errId, setErrId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const checkFullName = () => {
    const reg = /^[a-zA-Z' -]+$/;
    if(!reg.test(fullName)){
      console.log('err fullName');
      setErrFullName('Validation Error')
    }else{setErrFullName('')}
  }
  const checkPhoneNumber = () => {
    const reg = /^[+]?[0-9-]+$/;
    if(!reg.test(phoneNumber)){
      setErrPhoneNumber('Validation Error')
    }else{setErrPhoneNumber('')}
  }
  const checkIPAddress = () => {
    const reg = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
    if(!reg.test(ipAddress)){
      setErrIPAddress('Validation Error')
    }else{setErrIPAddress('')}
  }
  const checkId = () => {
    const reg = /^[A-Z0-9]+$/;
    if(!reg.test(id)){
      setErrId('Validation Error')
    }else{setErrId('')}
  }

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await apiPost(API_BASE_URL,{fullName,phoneNumber, ipAddress, id })
      
      addClientModal.onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [addClientModal, fullName,phoneNumber, ipAddress, id]);

  const bodyModal = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Full Name"
        onChange={(e) => {setFullName(e.target.value)
          checkFullName()
        }}
        value={fullName}
        disabled={isLoading}
       err={errFullName}
      />
      <Input
        placeholder="Identity"
        onChange={(e) => {setId(e.target.value)
          checkId()
        }}
        value={id}
        disabled={isLoading}
        err={errId}
      />
      <Input
        placeholder="Phone Number"
        onChange={(e) => {setPhoneNumber(e.target.value)
          checkPhoneNumber()
        }}
        value={phoneNumber}
        disabled={isLoading}
        err={errPhoneNumber}
      />
      <Input
        placeholder="IP Address"
        onChange={(e) => {setIPAddress(e.target.value)
          checkIPAddress()
        }}
        value={ipAddress}
        disabled={isLoading}
        err={errIpAddress}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addClientModal.isOpen}
      title="Add Client Form"
      actionLabel="Add Client"
      onClose={addClientModal.onClose}
      onSubmit={onSubmit}
      body={bodyModal}
    />
  );
};

export default AddClientModal;