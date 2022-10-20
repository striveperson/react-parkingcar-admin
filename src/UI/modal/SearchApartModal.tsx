import _ from 'lodash';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Address from '../../models/Address';
import { useAddressList } from '../../queries/useAddress';
import classes from './SearchApartModal.module.scss';

type ApartModalProps = {
  onSaveAddress: (address: Address) => void,
  onToggleModal: (isOpen: boolean) => void,
  isOpen: boolean,
}


const SearchApartModal = ({onSaveAddress, onToggleModal, isOpen}: ApartModalProps) => {
  const onClose = () => {
    onToggleModal(false);
  }
  
  const [searchKey, setSearchKey] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  // TODO 3번 호출 되는데 왜??
  // TODO Suspense loading 뜨는데 어떻게??
  
  const {data, refetch} = useAddressList(searchKey);
  
  useEffect(() => {
    if (isOpen) {
      setSearchKey('');
      setAddresses([]);
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (data && data.code === 200) {
      setAddresses(data.list ?? []);
    }
  }, [data, setAddresses])
  
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!searchKey.trim()) {
      alert('검색어를 입력해주세요');
      return
    }
    
    refetch();
  }
  
  const debounceOnChangeSearchKey = _.debounce((searchKey: string) => setSearchKey(searchKey), 300);
  const handleSearchKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounceOnChangeSearchKey((event.target.value));
  }

  const onClickAddress = (address: Address) => {
    if (!window.confirm('해당 주소를 선택하시곗습니까?')) {
      return;
    }

    onSaveAddress(address);
  }
  return (
    <React.Fragment>
      <div className={isOpen ? classes.modal : `${classes.modal} ${classes.hidden}`}>
      <div className={classes.fade} onClick={onClose}></div>
      <div className={classes["popup-wrap"]} id={classes["find_address"]}>
        <div className={classes["popup-head"]}>
          <p className={classes.poptit}>주소찾기</p>
          <button type='button' className={classes['btn-close']} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={classes["popup-cont"]}>
          <form onSubmit={onSubmit}>
            <div className={classes["input-wrap"]}>
              <div className={classes.inputbox}>
                <input type="text" name="keyword" onChange={handleSearchKeyChange} />
                <button className="gray_white_btn btn_search">검색</button>
              </div>
            </div>
          </form>
          <div className={classes.cont}>
            <div className={classes["tbl-wrap"]}>
              <table className={classes["tbl_ht01"]}>
                <colgroup>
                  <col width="200px" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>아파트명</th>
                    <th>주소</th>
                  </tr>
                </thead>
                <tbody>
                  { addresses.length === 0 &&
                      <tr>
                        <td colSpan={2} >검색된 주소가 없습니다.</td>
                      </tr>
                  }
                    {
                      addresses.map((address) => 
                        <tr key={address.aptAddr} onClick={() => onClickAddress(address)}>
                          <td>{address.aptName}</td>
                          <td>{address.aptAddr}</td>
                        </tr>
                      )
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
      </React.Fragment>
  );
  
}

export default SearchApartModal