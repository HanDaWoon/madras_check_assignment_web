"use client";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { mFetch } from "@/util/mFetch";
import { localDateTimeToUtcIso } from "@/util/dateHandling";

const AddIpModal = ({ openModal, setOpenModal, fetchIpAccessList }) => {
  const [ip, setIp] = useState("");
  const [memo, setMemo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [limitEndDate, setLimitEndDate] = useState("");

  useEffect(() => {
    setLimitEndDate(startDate);
  }, [startDate]);

  const handleAddIp = async (e) => {
    e.preventDefault();

    await mFetch("/ip-access", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ipAddress: ip,
        memo: memo,
        startDate: localDateTimeToUtcIso(startDate),
        endDate: localDateTimeToUtcIso(endDate),
      }),
    })
      .then((res) => {
        if (res.ok) {
          fetchIpAccessList();
          onCloseModal();
          return;
          2;
        }
        throw new Error("IP 추가에 실패했습니다.");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleGetCurrentIp = async (e) => {
    e.preventDefault();
    await mFetch("/util/my-ip", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("IP 주소를 가져오는데 실패했습니다.");
      })
      .then((currentIp) => {
        setIp(currentIp.data.ip);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const resetForm = () => {
    setIp("");
    setMemo("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Modal
      show={openModal}
      size="md"
      onClose={onCloseModal}
      dismissible
      popup14
    >
      <Modal.Header>
        <h2 className="text-xl font-semibold text-gray-900">IP 추가</h2>
      </Modal.Header>
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleAddIp}>
          <div className="flex flex-col items-center">
            <div className="mb-2 block text-left w-full">
              <Label htmlFor="ip" value="IP 주소" />
            </div>
            <div className="flex flex-row justify-between w-full">
              <TextInput
                id="ip"
                type="text"
                placeholder="000.000.000.000"
                minLength="7"
                maxLength="15"
                size="15"
                pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                required
              />
              <Button size="sm" color="blue" onClick={handleGetCurrentIp}>
                현재 IP 불러오기
              </Button>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="memo" value="설명" />
            </div>
            <TextInput
              id="memo"
              type="text"
              placeholder="IP 주소에 대한 설명을 입력하세요."
              minLength="1"
              maxLength="20"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="startDate" value="허용 시작 시간" />
            </div>
            <TextInput
              id="startDate"
              type="datetime-local"
              min={new Date().toISOString().split(".")[0].slice(0, -3)}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="endDate" value="하용 끝 시간" />
            </div>
            <TextInput
              id="endDate"
              type="datetime-local"
              min={limitEndDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between px-20">
            <Button size="lg" color="green" type="submit">
              저장
            </Button>
            <Button size="lg" color="red" onClick={onCloseModal}>
              취소
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddIpModal;
